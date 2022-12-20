import { PersonDto } from './personDto';

export interface StudentDto {
  id: number;
  blockchainId: number;
  person: PersonDto;
  registrationNumber: number;
  universityName: string;
  academicUnit: string; // Facultad
  degreeProgramName: string; // Nombre de la carrera
  degreeProgramCurriculum: string; // Plan de estudios.
  superiorCouncilOrdinance: string; // Ordenanza consejo superior.
  directiveCouncilOrdinance: string; // Ordenanza consejo superior.
  ministerialOrdinance: string; // Ordenanza ministerial
}
