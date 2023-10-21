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
      docNumber: '41221778'
    },
    role: {
      name: 'ADMIN'
    }
  },
  {
    name: 'Fede',
    password: '1234',
    email: 'fedeverges@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    person: {
      docNumber: '41221778'
    },
    role: {
      name: 'STUDENT'
    }
  },
  {
    name: 'test-estudiante',
    password: '1234',
    email: 'fedeverges@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    person: {
      docNumber: '41221777'
    },
    role: {
      name: 'STUDENT'
    }
  },
  {
    name: 'juani',
    password: '1234',
    email: 'fedeverges@gmail.com',
    createdAt: new Date(),
    updatedAt: new Date(),
    person: {
      docNumber: '36046454'
    },
    role: {
      name: 'STUDENT'
    }
  }
];

export const personsData: Partial<Person>[] = [
  {
    name: 'Federico',
    lastname: 'Verges',
    docNumber: '41221778',
    docType: 'DNI',
    sex: 'Masculino',
    students: [
      {
        /* degree: {
          type: 'POSGRADO',
          university: 'Universidad Nacional de San Luis',
          academicUnit: 'Facultad de Ciencias Físico Matemáticas y Naturales',
          name: 'Ingeniería en Electrónica',
          planId: '16-10'
        }, */
        degreeId: 1,
        blockchainId: '412217783028516',
        registrationNumber: 3028516
      }
    ] as Student[]
  },
  {
    name: 'Francisco',
    lastname: 'Vargas',
    docNumber: '41221777',
    docType: 'DNI',
    sex: 'Masculino',
    students: [
      {
        /* degree: {
          type: 'GRADO',
          university: 'Universidad Nacional de San Luis',
          academicUnit: 'Facultad de Ciencias Físico Matemáticas y Naturales',
          name: 'Ingeniería en Informática',
          planId: '16-05'
        } as Degree, */
        degreeId: 2,
        blockchainId: '412217773028517',
        registrationNumber: 3028517
      }
    ] as Student[]
  },
  {
    name: 'Juan Ignacio',
    lastname: 'Verges',
    docNumber: '36046454',
    docType: 'DNI',
    sex: 'Masculino',
    students: [
      {
        /* degree: {
          type: 'POSGRADO',
          university: 'Universidad Nacional de San Luis',
          academicUnit: 'Facultad de Ciencias Físico Matemáticas y Naturales',
          name: 'Ingeniería en Electrónica',
          planId: '16-10'
        } as Degree, */
        degreeId: 1,
        blockchainId: '360464543028518',
        registrationNumber: 3028518
      }
    ] as Student[]
  }
];

export const degrees: Partial<Degree>[] = [
  {
    id: 1,
    type: 'POSGRADO',
    university: 'Universidad Nacional de San Luis',
    academicUnit: 'Facultad de Ciencias Físico Matemáticas y Naturales',
    name: 'Ingeniería en Electrónica',
    planId: '16-10'
  } as Degree,
  {
    id: 2,
    type: 'GRADO',
    university: 'Universidad Nacional de San Luis',
    academicUnit: 'Facultad de Ciencias Físico Matemáticas y Naturales',
    name: 'Ingeniería en Informática',
    planId: '16-05'
  } as Degree
];
