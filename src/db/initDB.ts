import { RoleHasPermission } from '../models/roleHasPermission';
import { Permission } from '../models/permission';
import { Role } from '../models/role';
import { permissionsSeedData } from './seeders/permisos';
import { roleData } from './seeders/roles';
import { userData } from './seeders/user';
import { Person } from '../models/person';
import { User } from '../models/user';

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
  async seedUsers() {
    try {
      await Promise.all(
        userData.map(async (user) => {
          const role = await Role.findOne({
            where: { name: user.role.name }
          });
          if (role) {
            const newUser = new User(
              {
                name: user.name,
                password: user.password,
                email: user.email,
                createdAt: new Date(),
                updatedAt: new Date(),
                roleId: role.id,
                role: role,
                person: {
                  ...user.person
                }
              },
              {
                include: [{ model: Person, required: true }]
              }
            );
            return await newUser.save();
          } else {
            throw new Error('No existe el rol');
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
