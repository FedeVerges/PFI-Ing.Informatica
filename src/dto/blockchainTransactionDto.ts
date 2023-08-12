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
  methodName: string;
}

/*

Si se borran los datos de nuestra base, perdemos el registro de transacciones. 

La idea es que se pueda sacar el transactionhash del get del contrato. y de esa manera recuperar los datos.



Puede darse el caso de que, por nuevas funcionalidades o por hacer errores 

*/
