import { StudentDto } from "./studentDto";

export interface CertificateDto {
    id?: number;
    student: StudentDto;
    universityDegree:UniversityDegree;
}