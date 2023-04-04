import { Router } from 'express';
import { authController } from '../controllers/auth.controller';
import { certificateController } from '../controllers/certificateController';
import { studentController } from '../controllers/studentController';

const router = Router();
// Login
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signin', authController.signin);

// Titulos
const certificateUrlBase = '/certificate';
router.post(`${certificateUrlBase}/new`, certificateController.create);
router.post(`${certificateUrlBase}/delete`, certificateController.delete);
router.get(
  `${certificateUrlBase}/studentId/:studentId`,
  certificateController.getByStudentBlockchainId
);
router.get(`${certificateUrlBase}/:id`, certificateController.getById);

// PDF
const pdfUrlBase = '/pdf';
router.get(
  `${pdfUrlBase}/certificate/:id`,
  certificateController.generatePdfCertificate
);

// Estudiantes
const studentUrlBase = '/student';
router.post(`${studentUrlBase}/new`, studentController.create);
router.get(`${studentUrlBase}/all`, studentController.getAll);
router.get(`${studentUrlBase}/:docNumber`, studentController.getByDocNumber);

//Transacciones
const transactionUrlBase = '/transaction';
router.get(
  `${transactionUrlBase}/all`,
  certificateController.getAllTransaction
);

export default router;
