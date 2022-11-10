import mongoose from "mongoose";
import bcrypt from 'bcrypt';

// schema es la estructura en la base de datos
const usuarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        require: true,
        trim: true
    },
    password: {
        type: String,
        require: true,
        trime: true
    },
    email: {
        type: String,
        require: true,
        trim: true,
        unique: true
    },
    token: {
        type: String,
    },
    confirmado: {
        type: Boolean,
        default: false,
    }
}, {
    //crea dos columnas más, una de creado y otra de actualizado
    timestamps: true,
});

//Hashear passwords
usuarioSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// .methods es para crear nuestras propias funciones
usuarioSchema.methods.comprobarPassword = async function (passwordFormulario) {
    return await bcrypt.compare(passwordFormulario, this.password);
};

//definimos el model
const Usuario = mongoose.model("Usuario", usuarioSchema);
export default Usuario;