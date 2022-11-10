// codigo NODE
// Va a node_modules, busca el paquete de express y lo asigna a la variable
import express from "express";
import dotenv from 'dotenv';
import conectarDB from "./config/db.js";
import usuarioRoutes from './routes/UsuarioRoutes.js'

const app = express();
// Habilitamos que pueda leer la información que viene como JSON para poder procesarla. Está integrado en Express
app.use(express.json());


dotenv.config(); // va a buscar un archivo con el nombre .env , por eso lo creo

conectarDB();

//Routing
app.use("/api/usuarios", usuarioRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT , () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
} );