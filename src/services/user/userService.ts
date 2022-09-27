import { User } from "../../models/user";
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TokenDto } from "../../dto/tokenDto";
import { UserDto } from "../../dto/userDto";
import { Permission } from "../../models/permission";
import { Role } from "../../models/role";

export const SECRET_KEY: Secret = 'HOLIS';

export const UserService = {
    async getUserLogged(userBody: { user: string, password: string }) {
        try {
            const user = userBody.user;
            const password = userBody.password;
            if (!user || !password) {
                throw new Error('Deben existir usuario y contraseña')
            }
            const foundUser = await User.findOne({ where: { name: user } });
            if (foundUser && foundUser.id) {
                // Validar el hash del password.
                const isMatch = bcrypt.compareSync(userBody.password, foundUser.password);
                if (isMatch) {
                    // creo el token.
                    const token = jwt.sign({ _id: String(foundUser.id), name: foundUser.name }, SECRET_KEY, {
                        expiresIn: '2 days',
                    });
                    const userDto = User.toDto(foundUser);
                    const userRol = await Role.findOne({
                        include: [
                            {
                                model:User,
                                where: {
                                    id: userDto.id
                            }
                            }
                        ]
                    })
                    let ret:TokenDto<UserDto> = {
                        content: userDto,
                        token,
                        role: {},
                    };
                    if (userRol) {
                        ret = {
                            content:userDto,
                            token,
                            role: Role.toDto(userRol),
                        }
                    }
                    return ret;
                } else {
                    throw new Error('El usuario o la contraseña son incorrectos');
                }
            } else {
                throw new Error('El usuario o la contraseña son incorrectos');
            }
        } catch (error) {
            throw error;
        }
    },
    async signUser(userBody: { user: string, password: string }) {
        try {
            const userName = userBody.user;
            const password = userBody.password;
            if (!userName || !password) {
                throw new Error('Deben existir usuario y contraseña')
            }
            const role = await Role.findOne({ where: { name: 'ADMIN' } });
            // Todo: Hay que crear a la persona tambien.
            if (role) {
                const newUser = new User({
                    name: userName,
                    password,
                    email: '',
                    createdAt: new Date(),
                    updatedAt: new Date(),
                    roleId: role.id,
                    role: role,
                })
                await newUser.save();
                return newUser;
            } else {
                throw new Error('Ocurrio un error al crear al usuario');
            }
        } catch (error) {
            throw error;
        }
    }


}