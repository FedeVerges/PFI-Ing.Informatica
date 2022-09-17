import { Permission } from "../../models/permission";
import { QueryInterface } from "sequelize/types";
import { Role } from "../../models/role";

export const permisos = {
    up: async (queryInterface: QueryInterface) => {
        try {
            const roles = await Role.findAll();
            // const admin = roles.find(r => r.name === 'ADMIN')
            const permissions = [{
                name: "PUBLIC",
                description: "endpoints publicos",
                Roles: roles
            }] as Permission[];

            return queryInterface.bulkInsert('Permisos', [permissions]);
        } catch (error) {
            console.error('Error al hacer la migracion.')
        }

    }
};



export const permissionsSeedData: Partial<Permission>[] = [
    /**
     * Certificados.
     */
    {
        name: "CREATE_CERTIFICATE",
        description: "Crear certificados"
    },
    {
        name: "DELETE_CERTIFICATE",
        description: "Dar de baja certificados"
    },
    {
        name: "READ_CERTIFICATE",
        description: "Ver informacion de los certificados"
    },
    {
        name: "VALIDATE_CERTIFICATE",
        description: "Validar certificado"
    },
    /**
     * Usuarios
     */
    {
        name: "CREATE_USER",
        description: "endpoints publicos"
    },
];

