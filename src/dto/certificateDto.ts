import { StudentDto } from './studentDto';

export interface CertificateDto {
  id?: number;
  student: StudentDto;
  degreeType: string;
  degreeName?: string;
  waferNumber: string; // Numbero de oblea.
  dateCreated?: string;
  dateModified?: string;
  status?: string; // Activo
}
