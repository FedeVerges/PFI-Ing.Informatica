import { BlockchainTransaction } from 'models/transaction';
import {TransactionReceipt} from 'web3-core';
import { CertificateDto } from './certificateDto';


export interface TransactionDto {
    receipt: BlockchainTransaction;
    certificate:CertificateDto
}