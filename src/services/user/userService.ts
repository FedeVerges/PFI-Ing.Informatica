import { User } from '../../models/user';
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TokenDto } from '../../dto/tokenDto';
import { UserDto } from '../../dto/userDto';
import { Role } from '../../models/role';
import { CONSTANT_CONFIG } from '../../constants/constanConfig';
import { Person } from '../../models/person';
import { Student } from '../../models/student';

export const SECRET_KEY: Secret = 'HOLIS';

export const UserService = {
  async getUserLogged(userBody: { user: string; password: string }) {
    const user = userBody.user;
    const password = userBody.password;
    if (!user || !password) {
      throw new Error('Deben existir usuario y contraseña');
    }
    const foundUser = await User.findOne({
      where: { name: user },
      include: [
        {
          model: Person,
          required: true,
          include:[{
            model:Student,
            required:true
          }]
        }
      ]
    });
    if (foundUser && foundUser.id) {
      // Validar el hash del password.
      const isMatch = bcrypt.compareSync(userBody.password, foundUser.password);
      if (isMatch) {
        // creo el token.
        const token = jwt.sign(
          { _id: String(foundUser.id), name: foundUser.name },
          SECRET_KEY,
          {
            expiresIn: '2 days'
          }
        );
        const userDto = User.toDto(foundUser);
        const userRol = await Role.findOne({
          include: [
            {
              model: User,
              required: true,
              where: {
                id: userDto.id
              }
            }
          ]
        });
        let ret: TokenDto<UserDto> = {
          content: userDto,
          token,
          role: {}
        };
        if (userRol) {
          ret = {
            content: userDto,
            token,
            role: Role.toDto(userRol)
          };
        }
        return ret;
      } else {
        throw new Error('El usuario o la contraseña son incorrectos');
      }
    } else {
      throw new Error('El usuario o la contraseña son incorrectos');
    }
  },
  async signUser(dto: UserDto): Promise<User> {
    const userName = dto.name;
    const password = dto.password;
    if (!userName || !password) {
      throw new Error('El nombre de usuario y la contraseña son obligatorios');
    }
    if (!dto?.person?.id)
      throw new Error('Los datos de la persona son obligatorios');

    const role = await Role.findOne({
      where: { name: CONSTANT_CONFIG.ROLE_ADMIN_CODE }
    });

    const user = await User.findOne({ where: { personId: dto.person.id } });

    if (user) throw new Error('Existe un usuario asociado a la persona.');

    if (!role) throw new Error('No existe el rol.');

    //TODO: Controlar idempotencia de los usuarios.

    const newUser = new User({
      name: userName,
      password: password,
      email: '',
      createdAt: new Date(),
      updatedAt: new Date(),
      roleId: role.id,
      personId: dto?.person.id
    });

    return await newUser.save();
  }
};
