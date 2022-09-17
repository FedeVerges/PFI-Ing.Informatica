import { PermissionDto } from "./permissionDto";

export interface TokenDto<T> {
    content: T,
    token: string,
    permissions: PermissionDto;
}