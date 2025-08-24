import { Router } from "express";
import { renderLogin, renderRegistro } from "../controllers/userController.js";

const router = Router();

router.get('/login',renderLogin);
router.get('/registro',renderRegistro);


export default router;