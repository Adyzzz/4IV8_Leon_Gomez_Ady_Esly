//obtener cada uno de los parametros del formulario
const formularioUsuario = document.getElementById('form-usuario');
const inputID = document.getElementById('isiario-id');
const inputNombre = document.getElementById('nombre');
const inputNota = document.getElementById('nota');
const formTitulo = document.getElementById('form-titulo');
const btnGuardar = document.getElementById('btn-guardar');
const btnGCancelar = document.getElementById('btn-cancelar');
const tBodyUsuarios = document.getElementById('tbody-usuarios');
const tablaUsuarios = document.getElementById('tabla-usuarios');
const mensajeCarcgar = document.getElementById('mensaje-cargar');
const mensajeVacio = document.getElementById('mensaje-vacio');
const notificacionesDiv = document.getElementById('notificaciones');

//elementos ara errores
const errorNombre = document.getElementById('error-nombre');
const errorFecha = document.getElementById('error-fecha');
const errorNota = Document-getElementById('error-nota');

//vamos a crear una API para atender las peticiones por parte del cliente hacia el servidor
const API_URL = '/api/usuarios';

//por defecto recordemos que el metodo get sirve para obtener los datos de todos los usuariosa
async  function cargarUsuarios() {
    try{
        //vamos a utilixar una function llamada fetch la cual realiza una peticion http por defecto medianye el metodo get, mientras que al ser una fucion asincrona, espera que la peticion complete ates de continuar
        const respuesta = await fetch (API_URL);

            //Si responde ok el ddigo nos da un estado de 200 a 200
        if(!respuesta.ok){
            //hay error
            throw new Error('error al cargar usuarios');
        }
        const usuarios =  await respuesta.json();

        //pintamos los datos
        renderizarTabla(usuarios);

    }catch(error){
        console.log('error: ', error);
        mostrarNotificacion('error al cargar los usuarios, ','error');
    }
}