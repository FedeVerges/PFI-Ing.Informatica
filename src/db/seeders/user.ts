import { User } from "models/user";
import { QueryInterface } from "sequelize/types";

export const users = {
    up: (queryInterface: QueryInterface) => {
        return queryInterface.bulkInsert('Users', [{
            name: "fede",
            password: "1234",
            email: "fedeverges@gmail.com",
            createdAt: new Date(),
            updatedAt: new Date(),
        } as User,
        {
            name: "fede2",
            password: "1234",
            email: "fedeverges@gmail.com",
            createdAt: new Date(),
            updatedAt: new Date(),
        },
        {
            name: "fede3",
            password: "1234",
            email: "fedeverges@gmail.com",
            createdAt: new Date(),
            updatedAt: new Date(),
        }]);
    }
};

export const userData = [{
    name: "fede",
    password: "1234",
    email: "fedeverges@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
} as User,
{
    name: "fede2",
    password: "1234",
    email: "fedeverges@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
},
{
    name: "fede3",
    password: "1234",
    email: "fedeverges@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
}];