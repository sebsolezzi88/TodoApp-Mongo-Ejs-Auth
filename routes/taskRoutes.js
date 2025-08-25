import { Router } from "express";
import { deleteTask, newTask, renderDashboard, renderNewTask } from "../controllers/taskController.js";

const router = Router();

router.get('/panel',renderDashboard); //Mostrar dashboard, protegida por sessión
router.get('/nueva',renderNewTask); //Mostrar formulario para ingresar tareas

router.post('/nueva',newTask);// Crear nueva tara
router.delete('/borrar/:taskId',deleteTask); //Ruta para borrar tarea




export default router;