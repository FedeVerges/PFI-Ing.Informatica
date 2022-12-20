import { CertificateDto } from './certificateDto';

export interface BlockchainTransactionDto {
  transactionHash?: string;
  certificate?: CertificateDto;
  certificateBlockchainId?: number;
  status?: string;
  blockHash?: string;
  etherscanLink?: string;
  gasUsed?: number;
}
