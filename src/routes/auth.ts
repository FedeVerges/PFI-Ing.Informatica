import { Router } from "express";
import { authController } from "../controllers/auth.controller";

const router = Router();

router.post('/login', authController.login);
router.post('/logout', authController.logout);
router.post('/signin', authController.signin);

export default router;


