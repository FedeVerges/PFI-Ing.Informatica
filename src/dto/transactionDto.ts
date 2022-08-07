import {TransactionReceipt} from 'web3-core';
import { CertificateDto } from './certificateDto';


export interface TransactionDto {
    receipt: TransactionReceipt;
    certificate:CertificateDto
}