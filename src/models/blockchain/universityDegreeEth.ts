export interface UniversityDegreeEth {
  universityName: string;
  academicUnit: string; // Facultad
  degreeProgramName: string; // Nombre de la carrera
  degreeProgramCurriculum: string; // Plan de estudios
  degreeType: string;
  superiorCouncilOrdinance?: string;
  directiveCouncilOrdinance?: string;
  ministerialOrdinance?: string;
}
