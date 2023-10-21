import { RoleHasPermission } from '../models/roleHasPermission';
import { Permission } from '../models/permission';
import { Role } from '../models/role';
import { permissionsSeedData } from './seeders/permisos';
import { roleData } from './seeders/roles';
import { degrees, personsData, userData } from './seeders/user';
import { Person } from '../models/person';
import { User } from '../models/user';
import { Student } from '../models/student';
import { Degree } from '../models/degree';

export const initializer = {
  async seedRoles() {
    try {
      await Promise.all(
        roleData.map(async (rol) => {
          const currentRole = new Role(
            {
              ...rol,
              permissions: rol.permissions
            },
            {
              include: {
                model: Permission,
                required: true
              }
            }
          );
          return await currentRole.save();
        })
      );
      console.info('Roles seeded 🍺');
    } catch (error) {
      console.error('Roles seeder failed.');
      console.error(error);
      console.error('-------------------------------');
    }
  },
  async seedPermissions() {
    try {
      await Permission.bulkCreate(permissionsSeedData);
      // permissionsSeedData.forEach(async (permission) => {
      //   let data = await Permission.findOne({
      //     where: { name: permission.name }
      //   });
      //   if (data) {
      //     data.name = permission.name || '';
      //     data.description = permission.description || '';
      //     await data.save();
      //   } else {
      //     const newPermission = new Permission({
      //       ...permission
      //     });
      //     await newPermission.save();
      //   }
      // });
      console.info('Permissions seeded 🍺');
    } catch (error) {
      console.error('Permissions seeder failed.');
      console.error(error);
      console.error('-------------------------------');
    }
  },
  async relateRolPermission() {
    roleData.forEach(async (rol) => {
      /** Busco el permiso en la base. */
      let currentRole = await Role.findOne({ where: { name: rol.name } });

      /** Obtengo los permisos */
      let currentPermissions: Permission[] = [];
      /** Los permisos deben existir en la base. Son creados antes. */
      if (rol.permissions && rol.permissions.length > 0) {
        currentPermissions = await Permission.findAll({
          where: {
            name: rol.permissions?.map((p: Partial<Permission>) => p.name)
          }
        });
      }
      try {
        /** Relaciono los permisos con los roles. */
        currentPermissions.forEach(async (p) => {
          if (p.id && currentRole) {
            let relation = new RoleHasPermission({
              permissionId: p.id,
              roleId: currentRole.id
            });
            await relation.save().catch();
          }
        });
      } catch (e) {
        console.error('error en la bd');
      }
    });
  },
  async seedStudents() {
    try {
      /* await Promise.all(
        degrees.map(async (degree) => {
          const newDegree = new Degree({
            id: degree.id,
            name: degree.name,
            academicUnit: degree.academicUnit,
            type: degree.type,
            planId: degree.planId,
            university: degree.university
          });

          await newDegree.save();
        })
      ); */

      /* await Promise.all(
        personsData.map(async (person) => {
          // const role = await Degree.findOne({
          //   where: { name: user.role.name }
          // });

          const newPerson = new Person(
            {
              name: person.name,
              lastname: person.lastname,
              docNumber: person.docNumber,
              docType: person.docType,
              sex: person.sex,
              students: person.students
            },
            {
              include: [
                {
                  model: Student,
                  required: true
                }
              ]
            }
          );
          await newPerson.save();
        })
      ); */

      await Degree.bulkCreate(degrees);

      await Person.bulkCreate(personsData, {
        include: [
          {
            model: Student,
            required: true,
            as: 'students'
          }
        ]
      });
      console.info('Persons seeded 🍺');
    } catch (error) {
      console.error('Personsseeder failed.');
      console.error(error);
      console.error('-------------------------------');
    }
  },
  async seedUsers() {
    try {
      await Promise.all(
        userData.map(async (user) => {
          const role = await Role.findOne({
            where: { name: user.role.name }
          });
          const person = await Person.findOne({
            where: { docNumber: user.person.docNumber }
          });
          if (role && person) {
            const newUser = new User({
              name: user.name,
              password: user.password,
              email: user.email,
              createdAt: new Date(),
              updatedAt: new Date(),
              roleId: role.id,
              role: role,
              person: person,
              personId: person.id
            });
            return await newUser.save();
          } else {
            throw new Error('No existe el rol o la persona.');
          }
        })
      );
      console.info('User seeded 🍺');
    } catch (error) {
      console.error('Users seeder failed.');
      console.error(error);
      console.error('-------------------------------');
    }
  }
};
