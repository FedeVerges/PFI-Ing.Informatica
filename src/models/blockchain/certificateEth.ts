import dayjs from 'dayjs';
import { PersonDto } from 'dto/personDto';
import { CERTIFICATE_STATUS } from '../../enum/certificateStatus';
import { BlockchainTransactionDto } from '../../dto/blockchainTransactionDto';
import { CertificateDto } from '../../dto/certificateDto';
import { StudentDto } from '../../dto/studentDto';
import { StudentEth } from './studentEth';
import { UniversityDegreeEth } from './universityDegreeEth';
dayjs.locale('es');

export interface CertificateEth {
  id: number;
  student: StudentEth;
  universityDegree: UniversityDegreeEth;
  waferNumber: string;
  createdAt: number;
  updatedAt: number;
  active: boolean; // Activo
  createdAtDesc?: string;
  updatedAtDesc?: string;
}

export function fromDto(certificate: CertificateDto): CertificateEth {
  // Validar todos los campos.
  const student: StudentEth = {
    id: certificate.student.blockchainId,
    docNumber: certificate.student.person.docNumber,
    name: certificate.student.person.name,
    lastname: certificate.student.person.lastname,
    sex: certificate.student.person.sex,
    registrationNumber: certificate.student.registrationNumber
  };
  const universityDegree: UniversityDegreeEth = {
    universityName: certificate.student.universityName,
    academicUnit: certificate.student.academicUnit,
    degreeProgramName: certificate.degreeName || '',
    degreeProgramCurriculum: certificate.student.degreeProgramCurriculum,
    degreeType: certificate.degreeType,
    superiorCouncilOrdinance:
      certificate.student.superiorCouncilOrdinance || '',
    directiveCouncilOrdinance:
      certificate.student.directiveCouncilOrdinance || '',
    ministerialOrdinance: certificate.student.ministerialOrdinance || ''
  };
  const certificateEth: CertificateEth = {
    id: 0,
    student,
    universityDegree,
    active: true,
    createdAt: new Date().getTime(), // Pasar a milisgundos.
    updatedAt: new Date().getTime(), // Pasar a milisgundos.
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
      name: certificate.student.name,
      lastname: certificate.student.lastname,
      fullname: `${certificate.student.name} ${certificate.student.lastname}`,
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
    dateCreated: dayjs(certificate.createdAt * 1000).format(
      'DD/MM/YYYY HH:mm - hh:mm'
    ),
    dateModified: dayjs(certificate.updatedAt * 1000).format(
      'DD/MM/YYYY HH:mm'
    ),
    degreeType: certificate.universityDegree.degreeType,
    status: certificate.active
      ? CERTIFICATE_STATUS.ACTIVE
      : CERTIFICATE_STATUS.INACTIVE
  };
  return ret;
}
