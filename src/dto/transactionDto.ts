import { BlockchainTransaction } from 'models/blockchainTransaction';
import { TransactionReceipt } from 'web3-core';
import { BlockchainTransactionDto } from './blockchainTransactionDto';
import { CertificateDto } from './certificateDto';
import { CertificateEth } from 'models/blockchain/certificateEth';

export interface TransactionDto {
  receipt: BlockchainTransactionDto;
  certificate: CertificateEth;
  status: string;
}
