import { PersonDto } from './personDto';
import { PersonWithStudentsDto } from './personWithStudents';

export interface UserDto {
  id?: number;
  name?: string;
  password?: string;
  email?: string;
  person?: PersonWithStudentsDto; 
}
