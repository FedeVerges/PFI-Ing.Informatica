import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import {
  TransactionReceipt,
  TransactionConfig,
  Account,
  SignedTransaction
} from 'web3-core';
import { AbiInput } from 'web3-utils';
import { CertificateEth } from '../../models/blockchain/certificateEth';
import { notificationService } from '../../services/notifications/notificationService';
import { NotificationDto } from '../../dto/notificationDto';

const URL = process.env.NETWORK_URL!;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS!;

const contractArtifact = require('../../../../blockchain/certificateContract/build/contracts/Certificates.json');

class Web3Service {
  private _web3!: Web3;

  readonly certificateContract: Contract | undefined = undefined;
  certificates = [];
  networkId: number = 0;

  public get web3(): Web3 {
    return this._web3;
  }

  public set web3(value: Web3) {
    this._web3 = value;
  }

  constructor() {
    if (URL) {
      this.web3 = new Web3(URL);
      this.certificateContract = this.getCertificateContract();
    } else {
      throw new Error('No existe URL para conectar con blockchain');
    }
  }

  connectNetwork() {
    this.web3.setProvider(new Web3.providers.HttpProvider(URL));
    this.web3.eth.net.getId().then((id: number) => {
      this.networkId = id;
      console.log('Blockchain conectada');
    });
  }

  private getCertificateContract() {
    if (CONTRACT_ADDRESS) {
      const abi = contractArtifact.abi;
      const certificateContract = new this.web3.eth.Contract(
        abi,
        CONTRACT_ADDRESS
      );
      return certificateContract;
    } else {
      throw new Error('No existe Direccion de contrato.');
    }
  }

  /**
   * Ejecuta un metodo del contrato inteligente para obtener los titulos por id de estudiante.
   * @param id - BlockchainId del estudiante.
   * @returns
   */
  async getCertificatesByStudentId(id: number) {
    return (await this.certificateContract!.methods.getCertificatesByStudentId(
      id
    ).call()) as Promise<CertificateEth[]>;
  }

  async getCertificatesById(id: number) {
    return (await this.certificateContract!.methods.getCertificatesById(
      id
    ).call()) as Promise<CertificateEth>;
  }

  async getAmountCertificates() {
    return this.certificateContract!.methods.amountCertificates().call() as Promise<CertificateEth>;
  }

  async sendTransaction(signed: SignedTransaction) {
    let receipt = null;
    let blockchainCertificate: Partial<CertificateEth> | null = null;
    // Todo: agregar gestion de eventos. No se va a poder usar ese await.
    try {
      receipt = (await this.web3.eth.sendSignedTransaction(
        signed.rawTransaction!
      )) as TransactionReceipt;
    } catch (e) {
      throw e;
    }
    if (receipt) {
      blockchainCertificate = this.decodeTransactionLog(receipt);
    }
    return [blockchainCertificate, receipt] as const;
  }

  private decodeTransactionLog(
    receipt: TransactionReceipt
  ): Partial<CertificateEth> {
    // Topico del log de la transaccion
    const topics = receipt?.logs[0].topics;
    const logCodedData = receipt?.logs[0].data || '';
    // Inputs del metodo del contrato que seran parseados en el log.

    const abiInputs: AbiInput[] = [
      { type: 'uint256', name: 'id' },
      { type: 'uint256', name: ' createdAt' },
      { type: 'uint256', name: ' updatedAt' }
    ];
    const logData = this.web3.eth.abi.decodeLog(
      abiInputs,
      logCodedData,
      topics!
    );
    const cert = this.createEthCertificate(logData);

    return cert;
  }

  private createEthCertificate(logData: {
    [key: string]: string;
  }): Partial<CertificateEth> {
    const cert: Partial<CertificateEth> = {
      id: logData.id ? Number(logData.id) : 0,
      createdAt: logData['createdAt'] ? Number(logData['createdAt']) : 0,
      updatedAt: logData['updatedAt'] ? Number(logData['updatedAt']) : 0
    };
    return cert;
  }

  async createSignCreateTransaction(
    certificate: CertificateEth
  ): Promise<SignedTransaction> {
    const privateKey = process.env.PRIVATE_KEY;
    if (privateKey) {
      const account: Account =
        this.web3.eth.accounts.privateKeyToAccount(privateKey);
      if (account) {
        // Creo la transaccion con el metodo a ejecutar del smart-contract con su data.
        const transaction =
          this.certificateContract!.methods.createCertificate(certificate);

        // Calculo el gas estimado de la transaccion.
        const gas = await transaction.estimateGas({ from: account?.address! });

        // Codifico la transaccion para ser firmada.
        const data = transaction.encodeABI();

        // Obtengo el numero de transacciones de la cuenta.
        const nonce = await this.web3.eth.getTransactionCount(
          account?.address!
        );

        // Creo la configuracion de la transaccion con los datos para ser firmada.
        const options = {
          to: transaction._parent._address,
          data: data,
          nonce: nonce,
          gas: gas,
          gasPrice: 55000
        } as TransactionConfig;

        // Firmo la transaccion con la clave privada.
        const signed = await this.web3.eth.accounts.signTransaction(
          options,
          account.privateKey!
        );
        return signed;
      } else {
        throw new Error(
          'Ocurrio un error al firmar la transaccion. Revise sus parametros.'
        );
      }
    } else {
      throw new Error(
        'Error al obtener la clave privada. Revise la configuracion'
      );
    }
  }
  async createSignDeleteTransaction(id: number): Promise<SignedTransaction> {
    const privateKey = process.env.PRIVATE_KEY;
    if (privateKey) {
      const account: Account =
        this.web3.eth.accounts.privateKeyToAccount(privateKey);
      if (account) {
        // Creo la transaccion con el metodo a ejecutar del smart-contract con su data.
        const transaction =
          this.certificateContract!.methods.deleteCertificate(id);

        // Calculo el gas estimado de la transaccion.
        const gas = await transaction.estimateGas({ from: account?.address! });

        // Codifico la transaccion para ser firmada.
        const data = transaction.encodeABI();

        // Obtengo el numero de transacciones de la cuenta.
        const nonce = await this.web3.eth.getTransactionCount(
          account?.address!
        );

        // Creo la configuracion de la transaccion con los datos para ser firmada.
        const options = {
          to: transaction._parent._address,
          data: data,
          nonce: nonce,
          gas: gas,
          gasPrice: 55000
        } as TransactionConfig;

        // Firmo la transaccion con la clave privada.
        const signed = await this.web3.eth.accounts.signTransaction(
          options,
          account.privateKey!
        );
        return signed;
      } else {
        throw new Error(
          'Ocurrio un error al firmar la transaccion. Revise sus parametros.'
        );
      }
    } else {
      throw new Error(
        'Error al obtener la clave privada. Revise la configuracion'
      );
    }
  }

  getNetworkStatus() {
    let notification: NotificationDto = {
      type: 'STATUS',
      networkId: 0,
      blockchainName: '',
      connected: false
    };
    if (this.networkId && this.web3 && this.web3.currentProvider) {
      notification = {
        type: 'STATUS',
        networkId: this.networkId,
        blockchainName: this.web3.currentProvider?.toString(),
        connected: true
      };
    }
    notificationService.sendNotification(1, notification);
  }

  async deleteCertificate(id: number) {}
}

export const web3Service = new Web3Service();
