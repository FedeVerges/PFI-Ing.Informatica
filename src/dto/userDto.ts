import { PersonDto } from "./personDto";

export interface UserDto {
    id?: number,
    name?: string;
    password?: string;
    email?: string;
    person?: PersonDto;
}