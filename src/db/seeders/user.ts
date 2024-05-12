import { Degree } from 'models/degree';
import { Person } from '../../models/person';
import { Student } from '../../models/student';
/* 
export const users = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Users', [
      {
        name: 'fede',
        password: '1234',
        email: 'fedeverges@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      } as User,
      {
        name: 'fede2',
        password: '1234',
        email: 'fedeverges@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'fede3',
        password: '1234',
        email: 'fedeverges@gmail.com',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ]);
  }
}; */

export const userData = [
  {
    name: 'ADMIN',
    password: '1234',
    email: 'fedeverges@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    person: {
      docNumber: '12345678'
    },
    role: {
      name: 'ADMIN'
    }
  }
  // {
  //   name: 'Fede',
  //   password: '1234',
  //   email: 'fedeverges@gmail.com',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   person: {
  //     docNumber: '41221778'
  //   },
  //   role: {
  //     name: 'STUDENT'
  //   }
  // },
  // {
  //   name: 'test-estudiante',
  //   password: '1234',
  //   email: 'fedeverges@gmail.com',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   person: {
  //     docNumber: '41221777'
  //   },
  //   role: {
  //     name: 'STUDENT'
  //   }
  // },
  // {
  //   name: 'juani',
  //   password: '1234',
  //   email: 'fedeverges@gmail.com',
  //   createdAt: new Date(),
  //   updatedAt: new Date(),
  //   person: {
  //     docNumber: '36046454'
  //   },
  //   role: {
  //     name: 'STUDENT'
  //   }
  // }
];

export const personsData: Partial<Person>[] = [
  {
    name: 'Admin',
    lastname: 'Admin',
    docNumber: '12345678',
    docType: 'DNI',
    sex: 'Masculino'
  }
];

export const degrees: Partial<Degree>[] = [
  {
    type: 'POSGRADO',
    university: 'Universidad Nacional de San Luis',
    academicUnit: 'Facultad de Ciencias Físico Matemáticas y Naturales',
    name: 'Ingeniería en Electrónica',
    planId: '16-10'
  } as Degree,
  {
    type: 'GRADO',
    university: 'Universidad Nacional de San Luis',
    academicUnit: 'Facultad de Ciencias Físico Matemáticas y Naturales',
    name: 'Ingeniería en Informática',
    planId: '16-05'
  } as Degree
];
