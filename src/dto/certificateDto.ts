import { StudentDto } from "./studentDto";
export interface CertificateDto {
    id?: number;
    student: StudentDto;
    universityName: string;
    academicUnit: string; // Facultad
    degreeProgramName: string; // Nombre de la carrera
    degreeProgramCurriculum: string; // Plan de estudios
    degreeProgramOrdinance: string; // Ordenanza
    degreeType: string;
    degreeName?: string;
    ministerialOrdinance?: string; // Resolucion ministerial.
    waferNumber?: string; // Resolucion ministerial.
    volumeNumber?: string; // Resolucion ministerial.
    recordNumber?: string; // Resolucion ministerial.
    createdAt?: string;
    updatedAt?: string;
    active?: boolean; // Activo
}