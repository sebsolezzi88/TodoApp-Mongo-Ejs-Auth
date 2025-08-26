import { Router } from "express";
import { changeCompleted, deleteTask, editTask, newTask, renderDashboard, renderEditTask, renderNewTask } from "../controllers/taskController.js";

const router = Router();

router.get('/panel',renderDashboard); //Mostrar dashboard, protegida por sessión
router.get('/nueva',renderNewTask); //Mostrar formulario para ingresar tareas
router.get('/editar/:taskId',renderEditTask); //Mostrar formulario para editar tareas


router.post('/nueva',newTask);// Crear nueva tarea
router.put('/editar/:taskId',editTask); //Función para editar la tarea
router.put('/completar/:taskId',changeCompleted); //Función para editar estado de la tarea
router.delete('/borrar/:taskId',deleteTask); //Ruta para borrar tarea




export default router;