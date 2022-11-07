import { CertificateDto } from "dto/certificateDto";
import { StudentEth } from "./studentEth";
import { UniversityDegreeEth } from "./universityDegreeEth";

export interface CertificateEth {
    id: number;
    student: StudentEth;
    universityDegree: UniversityDegreeEth;
    degreeName: string;
    ministerialOrdinance: string; // Resolucion ministerial.
    waferNumber: string; // Resolucion ministerial.
    volumeNumber: string; // Resolucion ministerial.
    recordNumber: string; // Resolucion ministerial.
    createdAt: number;
    updatedAt: number;
    active: boolean; // Activo
}

export function fromDto(certificate: CertificateDto): CertificateEth {
    // Validar todos los campos.

    const student: StudentEth = {
        id: Number(certificate.student.person.docNumber),
        docNumber: certificate.student.person.docNumber,
        studentName: certificate.student.person.name,
        studentLastname: certificate.student.person.lastname,
        documentType: certificate.student.person.documentType || 'DNI',
        sex: certificate.student.person.sex,
        genderIdentity: certificate.student.person.genderIdentity || '',
    };
    const universityDegree: UniversityDegreeEth = {
        universityName: certificate.student.universityName,
        academicUnit: certificate.student.academicUnit,
        degreeProgramName: certificate.student.degreeProgramName,
        degreeProgramCurriculum: certificate.student.degreeProgramCurriculum,
        degreeProgramOrdinance: certificate.student.degreeProgramOrdinance,
        degreeType: certificate.degreeType,
    }
    const certificateEth: CertificateEth = {
        id: 0,
        degreeName: certificate.degreeName!,
        student,
        universityDegree,
        ministerialOrdinance: certificate.ministerialOrdinance!,
        waferNumber: certificate.waferNumber!,
        volumeNumber: certificate.volumeNumber!,
        recordNumber: certificate.recordNumber!,
        active: true,
        createdAt: 0,
        updatedAt: 0,
    }
    return certificateEth;
}
