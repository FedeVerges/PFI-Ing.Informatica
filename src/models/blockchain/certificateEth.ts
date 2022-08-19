import { StudentEth } from "./studentEth";
import { UniversityDegreeEth } from "./universityDegreeEth";

export interface CertificateEth {
    id: number;
    student?: StudentEth;
    UniversityDegree?: UniversityDegreeEth;
    degreeName?: string;
    ministerialOrdninance?: string; // Resolucion ministerial.
    waferNumber?: string; // Resolucion ministerial.
    volumeNumber?: string; // Resolucion ministerial.
    recordNumber?: string; // Resolucion ministerial.
    createdAt: number;
    updatedAt: number;
    active?: boolean; // Activo
}