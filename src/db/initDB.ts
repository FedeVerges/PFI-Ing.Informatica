import { RoleHasPermission } from '../models/roleHasPermission';
import { Permission } from '../models/permission';
import { Role } from '../models/role';
import { permissionsSeedData } from './seeders/permisos';
import { roleData } from './seeders/roles';
import { personsData, userData } from './seeders/user';
import { Person } from '../models/person';
import { User } from '../models/user';

export const initializer = {
  // async getByField(model:any, whereClause: { fieldName: string, fieldToCompare: string }, include: Includeable) {
  //     const res = await model.findOne();
  //     return res;
  // },

  async seedRoles() {
    try {
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

        /** Si existe el rol, lo edito. Sino creo uno nuevo. */
        if (currentRole !== null) {
          currentRole.name = rol.name || '';
          currentRole.description = rol.description || '';
          await currentRole.save();
        } else {
          currentRole = new Role({
            ...rol
          });
          await currentRole.save();
        }

        /** Relaciono los permisos con los roles. */
        currentPermissions.forEach(async (p) => {
          if (p.id && currentRole) {
            let relation = new RoleHasPermission({
              permissionId: p.id,
              roleId: currentRole.id
            });
            await relation.save();
          }
        });
      });
      console.info('Roles seeded 🍺');
    } catch (error) {
      console.error('Roles seeder failed.');
      console.error(error);
      console.error('-------------------------------');
    }
  },
  async seedPermissions() {
    try {
      permissionsSeedData.forEach(async (permission) => {
        let data = await Permission.findOne({
          where: { name: permission.name }
        });
        if (data) {
          data.name = permission.name || '';
          data.description = permission.description || '';
          await data.save();
        } else {
          const newPermission = new Permission({
            ...permission
          });
          await newPermission.save();
        }
      });
      console.info('Permissions seeded 🍺');
    } catch (error) {
      console.error('Permissions seeder failed.');
      console.error(error);
      console.error('-------------------------------');
    }
  },
  async seedUsers() {
    try {
      userData.forEach(async (user) => {
        let personFinded = await Person.findOne({
          where: { docNumber: user?.person?.docNumber }
        });
        const role = await Role.findAll();

        const newPerson = new Person({
          ...user.person
        });
        await newPerson.save();

        if (role) {
          const newUser = new User({
            name: user.name,
            password: user.password,
            email: user.email,
            createdAt: new Date(),
            updatedAt: new Date(),
            roleId: role[0].id,
            role: role[0],
            person: newPerson
          });
          await newUser.save();
        }

        // if (role) {
        //     if (personFinded && personFinded.user) {
        //         personFinded.user.name = user.name;
        //         personFinded.user.password = user.password;
        //         personFinded.user.email = user.email;
        //         personFinded.user.createdAt = user.createdAt;
        //         personFinded.user.updatedAt = user.updatedAt;
        //         personFinded.user.role = role;

        //         personFinded.name = user.name || '';
        //         personFinded.lastname = user.person.lastname || '';
        //         personFinded.docNumber = user.person.docNumber || '';
        //         personFinded.sex = user.person.sex || '';
        //         await personFinded.save();
        //     } else {

        //     }
        // } else {
        //     throw new Error('No existe el rol');
        // }
      });
    } catch (error) {
      console.error('Users seeder failed.');
      console.error(error);
      console.error('-------------------------------');
    }
  }
  // async seedPerson(){

  // }
};
