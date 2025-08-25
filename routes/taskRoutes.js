import { Router } from "express";
import { newTask, renderDashboard, renderNewTask } from "../controllers/taskController.js";

const router = Router();

router.get('/panel',renderDashboard); //Mostrar dashboard, protegida por sessión
router.get('/nueva',renderNewTask); //Mostrar formulario para ingresar tareas

router.post('/nueva',newTask);// Crear nueva tara




export default router;