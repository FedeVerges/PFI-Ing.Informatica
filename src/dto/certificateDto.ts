import {StudentDto} from "./studentDto";

export interface CertificateDto {
    id?: number;
    student: StudentDto;
    degreeType: string;
    degreeName?: string;
    ministerialOrdinance?: string; // Resolucion ministerial.
    waferNumber?: string; // Resolucion ministerial.
    volumeNumber?: string; // Resolucion ministerial.
    recordNumber?: string; // Resolucion ministerial.
    createdAt?: string;
    updatedAt?: string;
    status?: string; // Activo
}