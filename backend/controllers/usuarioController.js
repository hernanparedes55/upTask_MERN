//se importa el modelo para poder insertar los datos en la base
import Usuario from "../models/Usuario.js";
import generarId from "../models/helpers/generarId.js";
import generarJWT from "../models/helpers/generarJWT.js";

// el controlador comunica routing con modelos

const registrar = async  (req,res) =>{
    // Evitar registros duplicados
    const {email} = req.body; // Extraigo el email del body, "destructuring"
    const existeUsuario = await Usuario.findOne({email}) //métodos que ofrece mongo para interactuar con la base. FindOne va a buscar el primer registro que coincida

    if (existeUsuario){
        const error = new Error("Usuario ya registrado");
        return res.status(400).json({msg: error.message});
    }

    //para leer los datos que me envían de postman o del formulario, uso "req" de los parámetros
    try {
        const usuario = new Usuario(req.body) // Se crea una nueva instancia del objeto Usuario y le paso la estructura del body de postman
        usuario.token = generarId();
        const usuarioAlmacenado = await usuario.save() //para guardar los datos en la base
        res.json(usuarioAlmacenado);
    } catch (error) {
        console.log(error);
    }
};

const autenticar = async (req, res) => {

    const {email, password} = req.body;

    //comprobar si el usuario existe
    const usuario = await Usuario.findOne({email});
    if(!usuario) {
        const error = new Error('El usuario no existe');
        return res.status(404).json({msg: error.message});
    }

    //comprobar si el usuario está confirmado
    if(!usuario.confirmado) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        return res.status(403).json({msg: error.message});
    }

    //comprobar su password
    if(await usuario.comprobarPassword(password)){
        //retorno solamente lo que quiero mostrar del objeto
        res.json({
            _id: usuario._id,
            nombre: usuario.nombre,
            email: usuario.email,
            token: generarJWT(),
        })
    } else {
        const error = new Error('El password es incorrecto');
        return res.status(403).json({msg: error.message});
    }
};

export {
    registrar,
    autenticar
};