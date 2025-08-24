import { Router } from "express";
import { renderLogin } from "../controllers/userController.js";

const router = Router();

router.get('/login',renderLogin);

export default router;