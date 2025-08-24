import { Router } from "express";
import { loginUser, registerUser, renderLogin, renderRegistro } from "../controllers/userController.js";

const router = Router();

router.get('/login',renderLogin); //Mostrar página login
router.get('/registro',renderRegistro); //Mostrar página registro

router.post('/login',loginUser); //Login de usuario
router.post('/registro',registerUser); //Registrarse en la página




export default router;