import { Permission } from '../../models/permission';
import { Role } from '../../models/role';
import { QueryInterface } from 'sequelize/types';

export const roles = {
  up: (queryInterface: QueryInterface) => {
    return queryInterface.bulkInsert('Roles', [
      {
        name: 'ADMIN',
        description: 'Administrador'
      },
      {
        name: 'STUDENT',
        description: 'Estudiante'
      },
      {
        name: 'PUBLIC',
        description: 'endpoints publicos'
      },
      {
        name: 'OWNER',
        description: 'System Owner'
      }
    ]);
  }
};

export const roleData: Partial<Role | any>[] = [
  {
    name: 'ADMIN',
    description: 'Administrador',
    permissions: [
      {
        name: 'CREATE_CERTIFICATE'
      },
      {
        name: 'DELETE_CERTIFICATE'
      },
      {
        name: 'READ_CERTIFICATE'
      },
      {
        name: 'VALIDATE_CERTIFICATE'
      },
      {
        name: 'CREATE_USER'
      }
    ] as Partial<Permission>[]
  },
  {
    name: 'STUDENT',
    description: 'Estudiante',
    permissions: [
      {
        name: 'READ_CERTIFICATE'
      },
      {
        name: 'VALIDATE_CERTIFICATE'
      }
    ]
  },
  {
    name: 'PUBLIC',
    description: 'endpoints publicos',
    permissions: [
      {
        name: 'VALIDATE_CERTIFICATE'
      }
    ]
  },
  {
    name: 'OWNER',
    description: 'System Owner',
    permissions: [
      {
        name: 'CREATE_CERTIFICATE'
      },
      {
        name: 'DELETE_CERTIFICATE'
      },
      {
        name: 'READ_CERTIFICATE'
      },
      {
        name: 'VALIDATE_CERTIFICATE'
      },
      {
        name: 'CREATE_USER'
      }
    ]
  }
];
