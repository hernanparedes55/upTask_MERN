//un JWT sirve para almacenar información codificada en un token (no almacenar información relevante)
import jwt from 'jsonwebtoken';

const generarJWT = () => {
    // .sign es para generar el JWT - primer parámetro es el objeto(datos a mostrar), 2º clave secreta desde las variables de entorno .env, 3º un objeto con opciones
    return jwt.sign({nombre:'Hernán'}, process.env.JWT_SECRET, {expiresIn:'30d',})
};

export default generarJWT;