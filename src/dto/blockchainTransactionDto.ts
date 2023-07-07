import { CertificateEth } from 'models/blockchain/certificateEth';
import { CertificateDto } from './certificateDto';

export interface BlockchainTransactionDto {
  transactionHash?: string;
  studentName: string;
  certificate?: CertificateEth; // Solo para cuando quiero mostrar toda la info del titulo.
  certificateBlockchainId?: number;
  status?: string;
  blockHash?: string;
  etherscanLink?: string;
  gasUsed?: number;
  dateCreated?: string;
  dateModified?: string;
}
