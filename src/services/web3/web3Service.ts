import { CertificateDto } from 'dto/certificateDto';
import Web3 from 'web3';
import { Contract } from 'web3-eth-contract';
import { TransactionReceipt, TransactionConfig, Account } from 'web3-core';


const URL_GANACHE = 'http://127.0.0.1:7545';
const URL_INFURA = 'https://ropsten.infura.io/v3/04be9cd572fa4376a643b4b78aaa7498';

const contractArtifact = require('../../../../blockchain/certificateContract/build/contracts/Certificates.json');

class Web3Service {
    private _web3!: Web3;
    //   leer del archivo de configuracion la billetera.
    contactAddress: string = '0xA6fD1e205b51a6e6BF22533f853c50e37C1D776f';

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
        this.web3 = new Web3(URL_GANACHE);
        this.web3.setProvider(new Web3.providers.HttpProvider(URL_GANACHE));
        this.certificateContract = this.getCertificateContract();
        this.web3.eth.net.getId().then((id: number) => {
            this.networkId = id
        });
    }

    private getCertificateContract() {
        const abi = contractArtifact.abi;
        const certificateContract = new this.web3.eth.Contract(abi, process.env.CONTRACT_ADDRESS_INFURA_ROPSTEN);
        return certificateContract;
    }

    async getCertificatesByStudentId(id: number) {
        return await this.certificateContract!.methods.getCertificatesByStudentId(id).call() as Promise<any>;
    }

    async getAmountCertificates() {
        return this.certificateContract!.methods.amountCertificates().call() as Promise<any>;
    }

    async createCertificate(certificate: CertificateDto) {
        let receipt = null;
        // Importante que la creacion de la cuenta sea local en el metodo. Para evitar que sea expuesta.
        const account:Account = this.web3.eth.accounts.privateKeyToAccount(process.env.PRIVATE_KEY_METAMASK!);
        if (account) {
            const transaction = this.certificateContract!.methods.createCertificate(certificate.degreeName, certificate.student.name, Number(certificate.student.docNumber));
            // Todo: crear la trasaccion firmada y luego mandarla.
            // const senderWalletAddress = this.accountAddress;
            const gas = await transaction.estimateGas({ from: account?.address! });
            // const gasPrice = await this.web3.eth.getGasPrice()
            const data = transaction.encodeABI();
            const nonce = await this.web3.eth.getTransactionCount(account?.address!);

            const options = {
                to: transaction._parent._address,
                data: data,
                nonce: nonce,
                gas: gas,
                gasPrice: 55000,
            };
            const signed = await this.web3.eth.accounts.signTransaction(options, account.privateKey!);
            try {
                receipt = await this.web3.eth.sendSignedTransaction(signed.rawTransaction!);
            } catch (e) {
                throw e;
            }
        }
        return receipt;
    }

}

export const web3Service = new Web3Service();



 // const rawTx = {
        //     to: transaction._parent._address,
        //     data: data,
        //     nonce: this.web3.utils.toHex(nonce),
        //     gasPrice: this.web3.utils.toHex(this.web3.utils.toWei('2', 'gwei')),
        //     gasLimit: this.web3.utils.toHex(55000),
        // } as TxData

        // const common = new Common({ chain: Chain.Ropsten })
        // const tx = Transaction.fromTxData(rawTx, { common })

        // const signedTx = tx.sign(this.privateKey)

        // const serializedTx = signedTx.serialize()


        // async function send() {
        //     const web3        = new Web3(YOUR_NODE_ADDRESS);
        //     const contract    = new web3.eth.Contract(YOUR_CONTRACT_ABI, YOUR_CONTRACT_ADDRESS);
        //     const account     = web3.eth.accounts.privateKeyToAccount(YOUR_PRIVATE_KEY);
        //     const transaction = contract.methods.notarizeHash(YOUR_ID, YOUR_DOCUMENT_HASH);
        
        //     const options  = {
        //         to      : transaction._parent._address,
        //         data    : transaction.encodeABI(),
        //         gas     : await transaction.estimateGas({from: account.address}),
        //         gasPrice: WHATEVER_GAS_PRICE_YOU_ARE_WILLING_TO_PAY
        //     };
        
        //     const signed  = await web3.eth.accounts.signTransaction(options, account.privateKey);
        //     const receipt = await web3.eth.sendSignedTransaction(signed.rawTransaction);
        
        //     return receipt;
        // }