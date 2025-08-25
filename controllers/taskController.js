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

  return res.render('newtask');
};