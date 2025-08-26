import mongoose from "mongoose";
import Task from "../models/Task.js";

//Función que reenderiza el dashboard y protegida con express-session
export const renderDashboard = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/user/login");
  }
  const alert = req.session.alert; //Obtenemos la alerta
  req.session.alert = null; // limpiar para que no se muestre siempre

  const { id, username } = req.session.user; //Extraemos las variables

  //Buscar tareas del usuario logueado si las tiene
  const tasks = await Task.find({ creator: id });
  const data = {
    alert,
    username,
    tasks,
  };

  return res.render("dashboard", data);
};

//Función para reenderizar el formulario de nueva tarea
export const renderNewTask = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/user/login");
  }

  return res.render("newtask");
};

//Función post para ingresar una nueva tarea
export const newTask = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/user/login");
  }

  const { id, username } = req.session.user; //Extraemos las variables
  console.log(req.body);
  const { title, text, priority } = req.body;

  //Comprobar titulo
  if (!title || title.trim() === "") {
    return res.render("newtask", {
      alert: { status: "error", msg: "El titulo es requerido." },
    });
  }
  //Comprobar descripcion
  if (!text || text.trim() === "") {
    return res.render("newtask", {
      alert: { status: "error", msg: "La descripción es requerida" },
    });
  }
  //Comprobar prioridad
  if (!priority || priority.trim() === "") {
    return res.render("newtask", {
      alert: { status: "error", msg: "La prioridad es requerida" },
    });
  }
  //Comprobar prioridad valida
  const priorities = ["Baja", "Media", "Alta"];
  if (!priorities.includes(priority)) {
    return res.render("newtask", {
      alert: { status: "error", msg: "La prioridad no valida" },
    });
  }
  //Guardamos la tarea
  try {
    await Task.create({
      creator: id,
      title,
      text,
      priority,
    });
    return res.redirect("/tarea/panel"); //Redireccionamos al panel
  } catch (error) {
    console.log(error);
    return res.render("newtask", {
      alert: { status: "error", msg: "Error en Servidor" },
    });
  }

  return res.render("newtask");
};

//Funcion para borrar tarea
export const deleteTask = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/user/login");
  }
  const { taskId } = req.params; //Obtenemos el id

  //Comprobar si la tarea es valida
  if (!taskId || !mongoose.isValidObjectId(taskId)) {
    return res.render("dashboard", {
      alert: {
        status: "error",
        msg: "Id no valido.",
      },
    });
  }

  //Buscar si existe la tarea
  const taskExist = await Task.findById(taskId);
  if (!taskExist) {
    return res.render("dashboard", {
      alert: {
        status: "error",
        msg: "Tarea no encontrada",
      },
    });
  }
  //Verificar si la tarea pertenece al usuario que la creo
  if (taskExist.creator.toString() !== req.session.user.id.toString()) {
    return res.render("dashboard", {
      alert: {
        status: "error",
        msg: "Acción no valida",
      },
    });
  }
  //Borramos la tarea
  await taskExist.deleteOne();
  req.session.alert = {
    status: "success",
    msg: "Tarea borrada",
  };
  return res.redirect("/tarea/panel");
};

//Funcion para mostrar el formulario como de editar tarea
export const renderEditTask = async (req, res) => {
  if (!req.session.user) {
    return res.redirect("/user/login");
  }
  const { taskId } = req.params;

  //Comprobar si el id de la tarea es valido
  if (!taskId || !mongoose.isValidObjectId(taskId)) {
    req.session.alert = {
      status: "error",
      msg: "Id no valido",
    };
    return res.redirect("/tarea/panel");
  }

  //Comprobar si la tarea existe
  const task = await Task.findById(taskId);
  if (!task) {
    req.session.alert = {
      status: "error",
      msg: "Id no valido",
    };
    return res.redirect("/tarea/panel");
  }

  return res.render("edittask", {task});
};

export const editTask = async (req,res)=>{
  //Funcion para editar la tarea
if (!req.session.user) {
    return res.redirect("/user/login");
  }

  const { id, username } = req.session.user; //Extraemos las variables
  const {taskId} = req.params; //Id de la tarea a editar

  const { title, text, priority } = req.body;

  //Comprobar titulo
  if (!title || title.trim() === "") {
    return res.render("edittask", {
      alert: { status: "error", msg: "El titulo es requerido." },
    });
  }
  //Comprobar descripcion
  if (!text || text.trim() === "") {
    return res.render("edittask", {
      alert: { status: "error", msg: "La descripción es requerida" },
    });
  }
  //Comprobar prioridad
  if (!priority || priority.trim() === "") {
    return res.render("edittask", {
      alert: { status: "error", msg: "La prioridad es requerida" },
    });
  }
  //Comprobar prioridad valida
  const priorities = ["Baja", "Media", "Alta"];
  if (!priorities.includes(priority)) {
    return res.render("edittask", {
      alert: { status: "error", msg: "La prioridad no es valida" },
    });
  }

   //Comprobar si la tarea existe
  const task = await Task.findById(taskId);
  if (!task) {
    req.session.alert = {
      status: "error",
      msg: "Id no valido",
    };
    return res.redirect("/tarea/panel");
  }
  //Verificar si la tarea pertenece al usuario que la creo
  if (task.creator.toString() !== req.session.user.id.toString()) {
    req.session.alert = {
      status: "error",
      msg: "Acción no permitida",
    };
    return res.redirect("/tarea/panel");
  }
  //Editar la tarea
  task.title = title;
  task.priority = priority;
  task.text= text;
  await task.save(); // Guardar cambios

  req.session.alert = {
      status: "success",
      msg: "Tarea actualizada",
    };
    return res.redirect("/tarea/panel");
}
