//aqui necesitanmos crear el orden para que el controlador obtenga la petición, sepa la ruta para poderla ateneder y de ahí se concete a la base de datos y hacer la accion correspondiente
//Ahora que ya se conceto poder generar la respuesta a partir del controlador a la vista

const express  = require('express');
const router = express.Router();  //este router es el que se encarga de organixar a cada ruta de forma interna

const bd = require('../DB/database');

// por cad aaccion del usuario debo programar los elementos correspondientes del usuario
// una funcion para validar user y pass
function validarUsuario(datos){
    const errores = [];

    if(!datos.nombre || typeof datos.nombre !== 'string' || datos.nombre.trim().length < 2){
        errores.push('El nombre es obligatorio y debe tener al menos dos caracteres');
    }
    if(!datos.email || typeof datos.email !== 'string'){
        errores.push('El email es obligatorio, verificalo');
    }else{
        //expresion regular para validar
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if(!emailRegex.text(datos.email)){
            errores.push('Elformato del email no es valido');
        }
    }
    return errores;
}

//vamos a mostrar todos los usuarios
router.get('/', async (req, res) =>{
    try{
        const [usuarios] = await bd.excute(
            //necesitamos la querry
            'select id, nombre, email create_at, update_at FROM usuarios order by id ASC'
        );

        //debo convertirlo a JSON
        res,json({
            status : 'success',
            data : usuarios,
            count : usuarios.length
        });
    }catch(error){
        console.log('Error a l listar los usuarios: ', error.message);
        res.status(500).json({
            status : 'error',
            message : 'Error interno del servidor'
        });
    }
});