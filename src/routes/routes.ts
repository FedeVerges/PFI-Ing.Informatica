import { Router } from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { authController } from "../controllers/auth.controller";
import { certificateController } from "../controllers/certificateController";

const router = Router();

// Login
router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signin', authController.signin);


// Titulos
const certificateUrlBase= '/certificate';
router.post(`${certificateUrlBase}/new`, certificateController.create,);
router.post(`${certificateUrlBase}/delete`, certificateController.delete);
router.get(`${certificateUrlBase}/all`, certificateController.getAll);
router.get(`${certificateUrlBase}/docNumber/:docNumber`, certificateController.getByDocNumber);

export default router;


