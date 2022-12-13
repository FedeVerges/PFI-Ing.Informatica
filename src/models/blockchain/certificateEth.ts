import { PersonDto } from "dto/personDto";
import { Person } from "models/person";
import { BlockchainTransactionDto } from "../../dto/blockchainTransactionDto";
import { CertificateDto } from "../../dto/certificateDto";
import { StudentDto } from "../../dto/studentDto";
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


export function toDto(certificate: CertificateEth): CertificateDto {
    // Validar todos los campos.
    const student: StudentDto = {
        id: 0,
        person: {
            docNumber: certificate.student.docNumber,
            name: certificate.student.studentName,
            lastname: certificate.student.studentLastname,
            fullname: `${certificate.student.studentName} ${certificate.student.studentLastname}`,
            documentType: certificate.student.documentType,
            sex: certificate.student.sex,
            genderIdentity: certificate.student.genderIdentity,
        } as PersonDto,
        universityName: certificate.universityDegree.universityName,
        academicUnit: certificate.universityDegree.academicUnit,
        degreeProgramName: certificate.universityDegree.degreeProgramName,
        degreeProgramCurriculum: certificate.universityDegree.degreeProgramCurriculum,
        degreeProgramOrdinance: certificate.universityDegree.degreeProgramOrdinance,
    };
    const ret: CertificateDto = {
        id: 0,
        student: student,
        degreeName: certificate.degreeName,
        ministerialOrdinance: certificate.ministerialOrdinance,
        waferNumber: certificate.waferNumber,
        volumeNumber: certificate.volumeNumber,
        recordNumber: certificate.recordNumber,
        createdAt: String(certificate.createdAt),
        updatedAt: String(certificate.updatedAt),
        degreeType: ""
    }
    return ret;
}


export function toBlockchainTransactionDto(certificate: CertificateEth): BlockchainTransactionDto {
    // Validar todos los campos.
    const transaction: BlockchainTransactionDto = {
        certificate: toDto(certificate),
        certificateBlockchainId: certificate.id,
    }
    return transaction;
}

