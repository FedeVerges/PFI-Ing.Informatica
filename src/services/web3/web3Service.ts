import { CertificateDto } from 'dto/certificateDto';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import {TransactionReceipt} from 'web3-core';
const URL_GANACHE = 'http://127.0.0.1:7545';
declare let require: any;
let tokenAbi = require('../../../../blockchain/certificateContract/build/contracts/Certificates.json');

class Web3Service {
    private _web3!: Web3;
    //   leer del archivo de configuracion la billetera.
    contactAddress: string = '';
    readonly certificateContract: Contract | undefined = undefined;
    certificates = [];

    public get web3(): Web3 {
        return this._web3;
    }
    public set web3(value: Web3) {
        this._web3 = value;
    }
    private accounts: string[] = [];

    constructor() {
        // // URL de la conexion.
        this.web3 = new Web3(URL_GANACHE);
        this.web3.setProvider(new Web3.providers.HttpProvider(URL_GANACHE));

        console.log("connected");
        this.web3.eth.getAccounts().then(
            (result: string[]) => {
                this.accounts = result;
            }
        );
        this.certificateContract = this.getCertificateContract();
    }
    private getCertificateContract() {
        const abi = tokenAbi.abi;
        const certificateContract = new this.web3.eth.Contract(abi, this.contactAddress);
        return certificateContract;
    }

    async getCertificatesByStudentId(id: number) {
        return this.certificateContract!.methods.getCertificatesByStudentId(id).call() as Promise<any>;
    }

    async getAmountCertificates() {
        return this.certificateContract!.methods.amountCertificates().call() as Promise<any>;
    }

    async createCertificate(certificate: CertificateDto){
        let receipt = null;
        // Hacer el correcto manejo de errores.
        const transaction = this.certificateContract!.methods.createCertificate(certificate.degreeName, certificate.student.fullname, certificate.student.id);
        // Todo: crear la trasaccion firmada y luego mandarla.
        const senderWalletAddress = this.accounts[0];
        const gas = await transaction.estimateGas({ from: senderWalletAddress });
        const data = transaction.encodeABi();
        // Obtener private key de archivo de configuracion.
        const privateKey = ''
        const signed = await this.web3.eth.accounts.signTransaction({
            data: data,
            gas: gas,
        }, privateKey);

        if (signed) {
            receipt = await this.web3.eth.sendSignedTransaction(signed.rawTransaction!);
        }else{
            throw new Error('No se ha podido firmar la transaccion. Revise sus claves.')
        }

        return receipt;
        // return transaction.send({ from: senderWalletAddress, gas: gas }) as Promise<any>;
    }

}

export const web3Service = new Web3Service();

