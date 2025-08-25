import Task from '../models/Task.js'


//Función que reenderiza el dashboard y protegida con express-session
export const renderDashboard = async (req, res) => {
    if(!req.session.user){
        return res.redirect('/user/login');
    }

    const {id,username} = req.session.user; //Extraemos las variables

    //Buscar tareas del usuario logueado si las tiene
    const tasks = await Task.find({creator:id})
    const data={
      username,
      tasks
    }

  return res.render('dashboard',data);
};

//Función para reenderizar el formulario de nueva tarea
export const renderNewTask = async (req, res) => {
    if(!req.session.user){
        return res.redirect('/user/login');
    }

  return res.render('newtask');
};

//Función post para ingresar una nueva tarea
export const newTask = async (req, res) => {
    if(!req.session.user){
        return res.redirect('/user/login');
    }

    const {id,username} = req.session.user; //Extraemos las variables
    console.log(req.body);
    const {title, text, priority} = req.body;
    
    //Comprobar titulo
    if(!title || title.trim()===''){
      return res.render("newtask", {
        alert: { status: "error", msg: "El titulo es requerido." },
      });
    }
    //Comprobar descripcion
    if(!text || text.trim()===''){
      return res.render("newtask", {
        alert: { status: "error", msg: "La descripción es requerida" },
      });
    }
    //Comprobar prioridad
    if(!priority || priority.trim()===''){
      return res.render("newtask", {
        alert: { status: "error", msg: "La prioridad es requerida" },
      });
    }
    //Comprobar prioridad valida
    const priorities = ['Baja','Media', 'Alta'];
    if(!priorities.includes(priority)){
      return res.render("newtask", {
        alert: { status: "error", msg: "La prioridad no valida" },
      });
    }
    //Guardamos la tarea
    try {
      await Task.create({
        creator:id,
        title,
        text,
        priority
      });
      return res.redirect('/tarea/panel'); //Redireccionamos al panel
    } catch (error) {
      console.log(error);
      return res.render("newtask", {
        alert: { status: "error", msg: "Error en Servidor" },
      });
    }

  return res.render('newtask');
};