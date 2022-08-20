import { CertificateDto } from "dto/certificateDto";
import { StudentEth } from "./studentEth";
import { UniversityDegreeEth } from "./universityDegreeEth";

export interface CertificateEth {
    id?: number;
    student?: StudentEth;
    UniversityDegree?: UniversityDegreeEth;
    degreeName?: string;
    ministerialOrdninance?: string; // Resolucion ministerial.
    waferNumber?: string; // Resolucion ministerial.
    volumeNumber?: string; // Resolucion ministerial.
    recordNumber?: string; // Resolucion ministerial.
    createdAt?: number;
    updatedAt?: number;
    active?: boolean; // Activo
}

export function fromDto(certificate: CertificateDto): CertificateEth {
    const student: StudentEth = {
        docNumber: certificate.student.docNumber,
        studentName: certificate.student.name,
        studentLastname: certificate.student.lastname,
        documentType: certificate.student.documentType,
        sex: certificate.student.sex,
        genderIdentity: certificate.student.genderIdentity || '',
    };
    const universityDegree: UniversityDegreeEth = {
        universityName: certificate.universityName,
        academicUnit: certificate.academicUnit,
        degreeProgramName: certificate.degreeProgramName,
        degreeProgramCurriculum: certificate.degreeProgramCurriculum,
        degreeProgramOrdinance: certificate.degreeProgramOrdinance,
        degreeType: certificate.degreeType,
    }
    return {
        student: student,
        UniversityDegree: universityDegree,
        ministerialOrdninance: certificate.ministerialOrdninance,
        waferNumber: certificate.waferNumber,
        volumeNumber: certificate.volumeNumber,
        recordNumber: certificate.recordNumber,
    } as CertificateEth
}
