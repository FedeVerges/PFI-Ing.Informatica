import { Person } from "../../models/person";
import { User } from "../../models/user";
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
    person: {
        name: "Federico",
        lastname: "Verges",
        docNumber: "41221778",
        sex: "Masculino",
    },
    role: {
        name: 'ADMIN',
    },
},
{
    name: "francisco",
    password: "1234",
    email: "fedeverges@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    person: {
        name: "Francisco",
        lastname: "Vargas",
        docNumber: "41221777",
        sex: "Masculino",
    },
    role: {
        name: 'STUDENT',
    },
},
{
    name: "juani",
    password: "1234",
    email: "fedeverges@gmail.com",
    createdAt: new Date(),
    updatedAt: new Date(),
    person: {
        name: "Juan Ignacio",
        lastname: "Verges",
        docNumber: "36046454",
        sex: "Masculino",
    },
    role: {
        name: 'STUDENT',
    },
}];

export const personsData: Partial<Person>[] = [
    {
        name: "Federico",
        lastname: "Verges",
        docNumber: "41221778",
        sex: "Masculino",
    },
    {
        name: "Francisco",
        lastname: "Vargas",
        docNumber: "41221777",
        sex: "Masculino",
    },
    {
        name: "Juan Ignacio",
        lastname: "Verges",
        docNumber: "36046454",
        sex: "Masculino",
    },
]