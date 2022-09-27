import { RoleDto } from "./roleDto";

export interface TokenDto<T> {
    content: T,
    token: string,
    role: RoleDto;
}