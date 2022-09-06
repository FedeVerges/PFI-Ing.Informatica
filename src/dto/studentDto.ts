import {PersonDto} from "./personDto";

export interface StudentDto {
    id: number;
    person: PersonDto;
    universityName: string;
    academicUnit: string; // Facultad
    degreeProgramName: string; // Nombre de la carrera
    degreeProgramCurriculum: string; // Plan de estudios
    degreeProgramOrdinance: string; // Ordenanza
}