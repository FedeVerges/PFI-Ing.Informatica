export interface PersonDto {
    id: number;
    name: string;
    lastname: string;
    fullname?: string;
    docNumber: string;
    documentType: string;
    sex: string;
    genderIdentity?: string | null;
}