import { Router } from "express";
import { renderDashboard, renderNewTask } from "../controllers/taskController.js";

const router = Router();

router.get('/panel',renderDashboard); //Mostrar dashboard, protegida por sessión
router.get('/nueva',renderNewTask); //Mostrar formulario para ingresar tareas






export default router;