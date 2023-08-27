import { Person } from '../../models/person';
import { User } from '../../models/user';
import { QueryInterface } from 'sequelize/types';
import { Student } from 'models/student';

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
};

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
    name: 'TEST',
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
    sex: 'Masculino',
    students: [
      {
        universityName: 'Universidad Nacional de San Luis',
        academicUnit: 'Facultad de ciencias fisico matemáticas y naturales',
        degreeProgramName: 'Ingeniería en informática',
        degreeProgramCurriculum: '16-05',
        ministerialOrdinance: '',
        blockchainId: '412217783028516',
        registrationNumber: 3028516,
        superiorCouncilOrdinance: '12312312312',
        directiveCouncilOrdinance: '123123123'
      },
      {
        universityName: 'Universidad Nacional de San Luis',
        academicUnit: 'Facultad de ciencias fisico matemáticas y naturales',
        degreeProgramName: 'Ingeniería en Alientos',
        degreeProgramCurriculum: '16-10',
        ministerialOrdinance: '',
        blockchainId: '412217783028520',
        registrationNumber: 3028520,
        superiorCouncilOrdinance: '12312312312',
        directiveCouncilOrdinance: '123123123'
      }
    ] as Student[]
  },
  {
    name: 'Francisco',
    lastname: 'Vargas',
    docNumber: '41221777',
    sex: 'Masculino',
    students: [
      {
        universityName: 'Universidad Nacional de San Luis',
        academicUnit: 'Facultad de ciencias fisico matemáticas y naturales',
        degreeProgramName: 'Ingeniería en informática',
        degreeProgramCurriculum: '16-05',
        ministerialOrdinance: '',
        blockchainId: '412217773028517',
        registrationNumber: 3028517,
        superiorCouncilOrdinance: '12312312312',
        directiveCouncilOrdinance: '123123123'
      }
    ] as Student[]
  },
  {
    name: 'Juan Ignacio',
    lastname: 'Verges',
    docNumber: '36046454',
    sex: 'Masculino',
    students: [
      {
        universityName: 'Universidad Nacional de San Luis',
        academicUnit: 'Facultad de ciencias fisico matemáticas y naturales',
        degreeProgramName: 'Ingeniería en Alientos',
        degreeProgramCurriculum: '16-10',
        ministerialOrdinance: '',
        blockchainId: '360464543028518',
        registrationNumber: 3028518,
        superiorCouncilOrdinance: '12312312312',
        directiveCouncilOrdinance: '123123123'
      }
    ] as Student[]
  }
];
