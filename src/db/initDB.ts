import { RoleHasPermission } from "../models/permissionHasRole";
import { Permission } from "../models/permission";
import { Role } from "../models/role";
import { permissionsSeedData } from "./seeders/permisos";
import { roleData as roleSeedData, } from "./seeders/roles";

export const initializer = {
    // async getByField(model:any, whereClause: { fieldName: string, fieldToCompare: string }, include: Includeable) {
    //     const res = await model.findOne();
    //     return res;
    // },

    async seedRoles() {
        try {
            roleSeedData.forEach(async rol => {
                /** Busco el permiso en la base. */
                let currentRole = await Role.findOne({ where: { name: rol.name } });

                /** Obtengo los permisos */
                let currentPermissions: Permission[] = [];
                if (rol.permissions && rol.permissions.length > 0) {
                    currentPermissions = await Permission.findAll(
                        {
                            where:
                                { name: rol.permissions?.map((p: Partial<Permission>) => p.name) }
                        });
                }

                /**Si existe el rol, lo edito. Sino creo uno nuevo. */
                if (currentRole !== null) {
                    currentRole.name = rol.name || '';
                    currentRole.description = rol.description || '';
                    // currentRole.permissions = currentPermissions
                    await currentRole.save();
                } else {
                    currentRole = new Role({
                        ...rol,
                        permissions: currentPermissions,
                    });
                    await currentRole.save();
                }
                /** Relaciono los permisos con los roles. */
                currentPermissions.forEach(async p => {
                    if (p.id && currentRole) {
                        let relation = new RoleHasPermission({
                            permissionId: p.id,
                            roleId: currentRole.id,
                        })
                        await relation.save();
                    }
                })
            })
            console.info('Roles seeded 🍺');
        } catch (error) {
            console.error('Roles seeder failed.');
            console.error(error);
            console.error('-------------------------------');
        }
    },
    async seedPermissions() {
        try {
            permissionsSeedData.forEach(async permission => {
                let data = await Permission.findOne({ where: { name: permission.name } });
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
            })
            console.info('Permissions seeded 🍺');
        } catch (error) {
            console.error('Roles seeder failed.');
            console.error(error);
            console.error('-------------------------------');
        }
    }

}