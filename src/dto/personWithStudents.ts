import { StudentDto } from "./studentDto";

export interface PersonWithStudentsDto {
    id: number;
    name: string;
    lastname: string;
    fullname?: string;
    docNumber: string;
    sex: string;
    students: StudentDto[];
  }