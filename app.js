import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express(); //Crear app de express
const PORT = process.env.PORT || 3000; //Puerto

app.listen(PORT,(req,res)=>{
    console.log(`App run on port:${PORT}`);
});