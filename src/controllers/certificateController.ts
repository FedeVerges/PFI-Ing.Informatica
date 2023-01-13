import { Request, Response } from 'express';
import { getErrorMessage } from '../utils/manageError';
import { CertificateDto } from '../dto/certificateDto';
import { CertificateService } from '../services/certificates/certificatesService';
import { BlockchainTransactionDto } from 'dto/blockchainTransactionDto';

export const certificateController = {
  async create(req: Request, res: Response) {
    try {
      // todo: Funcion para validar permisos.
      validateFields(req.body);
      // Todo: Crear Dto a partir del req.body y ahi verificar los datos.
      const transactionRes = await CertificateService.createCertificate(
        req.body as CertificateDto
      );
      // const newCertificate = await CertificateService.createCertificate(req.body as CertificateDto);
      res.status(200).json(transactionRes);
    } catch (error) {
      console.log(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  },
  async delete(req: Request, res: Response) {
    try {
      //todo: implementar.
    } catch (error) {
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
      const transaction = await CertificateService.getCertificatesById(
        Number(id)
      );
      res.status(200).json(transaction);
    } catch (error) {
      console.error(error);
      res.setHeader('Content-Type', 'application/json');
      res.status(409).json(getErrorMessage(error));
    }
  }
};

function validateFields(certificate: CertificateDto) {
  if (!certificate.student) {
    throw new Error('Debe seleccionar una facultad');
  }
  if (!certificate.degreeName) {
    throw new Error('Debe ingresar el nombre del titulo');
  }
  if (!certificate.student.universityName) {
    throw new Error('Debe seleccionar una facultad');
  }
  if (!certificate.degreeName) {
    throw new Error('Debe seleccionar una facultad');
  }
  if (!certificate.student.degreeProgramCurriculum) {
    throw new Error('Debe seleccionar una facultad');
  }
  if (!certificate.student.ministerialOrdinance) {
    throw new Error('Debe ingresar el numero de ordenanza ministerial');
  }
  if (!certificate.student.superiorCouncilOrdinance) {
    throw new Error(
      'Debe ingresar el numero de ordenanza del consejo superior'
    );
  }
  if (!certificate.student.directiveCouncilOrdinance) {
    throw new Error(
      'Debe ingresar el numero de ordenanza del consejo directivo'
    );
  }
  if (!certificate.student) {
    throw new Error('Debe ingresar los datos del estudiante');
  }
  if (!certificate.student.person.name) {
    throw new Error('Debe seleccionar una institucion');
  }
  if (!certificate.student.person.docNumber) {
    throw new Error('Debe el numero de documento del estudiante');
  }
  if (!certificate.student.registrationNumber) {
    throw new Error('Debe el numero registro');
  }
}
