import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/manageError';
import { CertificateService } from '../services/certificates/certificatesService';
import { BlockchainTransactionDto } from 'dto/blockchainTransactionDto';
import { CertificateEth } from 'models/blockchain/certificateEth';

export const certificateController = {
  async create(req: Request, res: Response) {
    try {
      // todo: Funcion para validar permisos.
      validateFields(req.body);
      // Todo: Crear Dto a partir del req.body y ahi verificar los datos.
      const transactionRes = await CertificateService.createCertificate(
        req.body
      );
      // const newCertificate = await CertificateService.createCertificate(req.body as CertificateDto);
      res.status(200).json(transactionRes);
    } catch (error) {
      console.log(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  },
  async deleteCertificate(req: Request, res: Response) {
    try {
      const id = Number(req.params.id);
      const receipt = await CertificateService.deleteCertificate(id);
      res.status(200).json(receipt);
    } catch (error) {
      console.error(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  },
  async getByStudentBlockchainId(req: Request, res: Response) {
    try {
      let transactions: BlockchainTransactionDto[] = [];
      const studentId = req.params.studentId;
      transactions = await CertificateService.getCertificatesByStudentId(
        Number(studentId)
      );
      res.status(200).json(transactions);
    } catch (error) {
      console.error(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  },

  async getById(req: Request, res: Response) {
    try {
      const id = req.params.id;
      const transaction = await CertificateService.getCertificateById(
        Number(id)
      );
      res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  },
  async getAllTransaction(_: Request, res: Response) {
    try {
      res.status(200).json(await CertificateService.getAllTransaction());
    } catch (error) {
      console.error(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  },
  async generatePdfCertificate(req: Request, res: Response) {
    try {
      const id = Number(req?.params?.id);
      const ret = await CertificateService.createCertificatePdf(id);
      res.status(200).json(ret);
    } catch (error) {
      console.error(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  }
  // async getCertificateDetail(req: Request, res: Response) {
  //   try {
  //     const id = Number(req?.params?.id);
  //     const ret = await CertificateService.getTrasactionDataByCertificateId(id);
  //     res.status(200).json(ret);
  //   } catch (error) {
  //     console.error(error);
  //     res.setHeader('Content-Type', 'application/json');
  //     res.status(409).json(getErrorMessage(error));
  //   }
  // }
};

function validateFields(certificate: CertificateEth) {
  if (!certificate.student) {
    throw new Error('Debe seleccionar una facultad');
  }
  if (!certificate.universityDegree) {
    throw new Error('Debe seleccionar una facultad');
  }
  if (!certificate.waferNumber) {
    throw new Error('Debe ingresar el numero de oblea');
  }
  if (!certificate.universityDegree.degreeProgramName) {
    throw new Error('Debe ingresar el nombre del titulo');
  }
  if (!certificate.universityDegree.degreeType) {
    throw new Error('No se encuentra el tipo del titulo');
  }
  if (!certificate.universityDegree.universityName) {
    throw new Error('Debe seleccionar una facultad');
  }
  if (!certificate.student) {
    throw new Error('Debe ingresar los datos del estudiante');
  }
  if (!certificate.student.name) {
    throw new Error('Debe seleccionar una institucion');
  }
  if (!certificate.student.docNumber) {
    throw new Error('Debe el numero de documento del estudiante');
  }
  if (!certificate.student.registrationNumber) {
    throw new Error('Debe el numero registro');
  }
}
