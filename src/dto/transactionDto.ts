import { BlockchainTransaction } from 'models/blockchainTransaction';
import { TransactionReceipt } from 'web3-core';
import { BlockchainTransactionDto } from './blockchainTransactionDto';
import { CertificateDto } from './certificateDto';

export interface TransactionDto {
  receipt: BlockchainTransactionDto;
  certificate: CertificateDto;
  status: string;
}
