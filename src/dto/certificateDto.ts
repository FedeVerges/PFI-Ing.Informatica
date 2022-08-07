import { StudentDto } from "./studentDto";

export interface CertificateDto {
    id?: number;
    student: StudentDto
    institutionId: string;
    degreeName: string;
    certificateTypeId: number;
    waferNumber: string;
    recordNumber: string;
    volumeNumber: string;
}