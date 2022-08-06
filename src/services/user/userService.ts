import { User } from "../../models/user";
import jwt, { Secret } from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { TokenDto } from "dto/tokenDto";
import { UserDto } from "dto/userDto";
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
                    return { content: userDto, token: token } as TokenDto<UserDto>;
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
            const newUser = new User({ name: userName, password: password, email: '', createdAt: new Date(), updatedAt: new Date() })
            await newUser.save();
            return newUser;
            // Todo: Hacer un create del usuario.
        } catch (error) {
            throw error;
        }
    }


}