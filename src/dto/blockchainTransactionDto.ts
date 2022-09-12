import { CertificateDto } from "./certificateDto"

export interface BlockchainTransactionDto {
    transactionHash?: string
    ceritificate?: CertificateDto;
    ceritificateBlockchainId?: number
    status?: string
    blockHash?: number
    gasUsed?: number
}