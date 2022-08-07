import { certificateController } from "controllers/certificateController";
import { Router } from "express";


const router = Router();
const urlBase= '/certificate';

router.post(`${urlBase}/new`, certificateController.create,);
router.post(`${urlBase}/delete`, certificateController.delete);
router.get(`${urlBase}/all`, certificateController.getAll);
router.post(`${urlBase}/docNumber/:docNumber`, certificateController.getByDocNumber);

export default router;


