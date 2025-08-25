import { Router } from "express";
import { renderDashboard } from "../controllers/taskController";

const router = Router();

router.get('/panel',renderDashboard); //Mostrar dashboard, protegida por sessión





export default router;