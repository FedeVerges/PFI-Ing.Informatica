import { PersonDto } from './personDto';

export interface StudentDto {
  id: number;
  blockchainId: number;
  person: PersonDto;
  registrationNumber: number;
  universityName: string;
  academicUnit: string; // Facultad
  degreeProgramName: string; // Nombre de la carrera
  degreeType: string; // Tipo de carrera.
  degreeProgramCurriculum: string; // Plan de estudios.
}
