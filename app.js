import express from 'express';
import dotenv from 'dotenv';
import session from 'express-session';
import methodOverride from "method-override";
import { getMongoConnection } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import taskRoutes from './routes/taskRoutes.js';

dotenv.config();

const app = express(); //Crear app de express
const PORT = process.env.PORT || 3000; //Puerto

app.set("view engine", "ejs"); //Motor de plantillas
app.use(session({ //Uso de express session
  secret: process.env.SECRET_WORD, 
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false } 
}));
app.use(express.urlencoded({ extended: true })); // Para formularios (x-www-form-urlencoded)
app.use(methodOverride("_method")); //Para cambiar metodo de post de los formulario por delete
app.use(express.json()); //Para analizar la solicitud de tipo Json

/* 
  Middleware global para tener acceso a user en todas los archivos .ejs
  Esto servirá para mostrar de manera condicional el boton de login o logout
*/
app.use((req, res, next) => { 
  res.locals.user = req.session.user || null;
  next();
});

//Ruta de página de Bienvenida
app.get('/',(req,res)=>{
  return res.render('main');
});

app.use('/user',userRoutes); //Agregando rutas de user
app.use('/tarea',taskRoutes); //Agregando rutas para las tareas

//Ruta para las páginas inexistentes
app.use((req, res) => {
  res.status(404).render("404");
})


getMongoConnection();//Conexión con la base de datos;

app.listen(PORT,(req,res)=>{
    console.log(`App run on port:${PORT}`);
});