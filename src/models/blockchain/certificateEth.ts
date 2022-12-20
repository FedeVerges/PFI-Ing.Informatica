import { PersonDto } from 'dto/personDto';
import { Person } from 'models/person';
import { BlockchainTransactionDto } from '../../dto/blockchainTransactionDto';
import { CertificateDto } from '../../dto/certificateDto';
import { StudentDto } from '../../dto/studentDto';
import { StudentEth } from './studentEth';
import { UniversityDegreeEth } from './universityDegreeEth';

export interface CertificateEth {
  id: number;
  student: StudentEth;
  universityDegree: UniversityDegreeEth;
  waferNumber: string;
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
    sex: certificate.student.person.sex,
    registrationNumber: certificate.student.registrationNumber
  };
  const universityDegree: UniversityDegreeEth = {
    universityName: certificate.student.universityName,
    academicUnit: certificate.student.academicUnit,
    degreeProgramName: certificate.student.degreeProgramName,
    degreeProgramCurriculum: certificate.student.degreeProgramCurriculum,
    superiorCouncilOrdinance: certificate.student.superiorCouncilOrdinance,
    directiveCouncilOrdinance: certificate.student.directiveCouncilOrdinance,
    ministerialOrdinance: certificate.student.ministerialOrdinance,
    degreeType: certificate.degreeType
  };
  const certificateEth: CertificateEth = {
    id: 0,
    student,
    universityDegree,
    active: true,
    createdAt: 0,
    updatedAt: 0,
    waferNumber: certificate.waferNumber
  };
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
      sex: certificate.student.sex
    } as PersonDto,
    universityName: certificate.universityDegree.universityName,
    academicUnit: certificate.universityDegree.academicUnit,
    degreeProgramName: certificate.universityDegree.degreeProgramName,
    degreeProgramCurriculum:
      certificate.universityDegree.degreeProgramCurriculum,
    superiorCouncilOrdinance:
      certificate.universityDegree.superiorCouncilOrdinance,
    directiveCouncilOrdinance:
      certificate.universityDegree.directiveCouncilOrdinance,
    ministerialOrdinance: certificate.universityDegree.ministerialOrdinance,
    blockchainId: certificate.student.id,
    registrationNumber: certificate.student.registrationNumber
  };
  const ret: CertificateDto = {
    id: 0,
    student: student,
    degreeName: certificate.universityDegree.degreeProgramName,
    waferNumber: certificate.waferNumber,
    dateCreated: String(new Date(certificate.createdAt * 1000)),
    dateModified: String(new Date(certificate.updatedAt * 1000)),
    degreeType: certificate.universityDegree.degreeType
  };
  return ret;
}

export function toBlockchainTransactionDto(
  certificate: CertificateEth
): BlockchainTransactionDto {
  // Validar todos los campos.
  const transaction: BlockchainTransactionDto = {
    certificate: toDto(certificate),
    certificateBlockchainId: certificate.id
  };
  return transaction;
}
