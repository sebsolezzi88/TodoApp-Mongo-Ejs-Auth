import { Router } from "express";
import { renderLogin } from "../controllers/userController";

const router = Router();

router.get('/login',renderLogin);

export default router;