import express from 'express';
import dotenv from 'dotenv';
import { getMongoConnection } from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import session from 'express-session';

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
app.use(express.json()); //Para analizar la solicitud de tipo Json

app.use('/user',userRoutes); //Agregando rutas de user

getMongoConnection();//Conexión con la base de datos;

app.listen(PORT,(req,res)=>{
    console.log(`App run on port:${PORT}`);
});