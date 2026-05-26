/*
Vamos a tener una estructura desde la cual iplementamos el modelo vista-controlador en donde a partie del uso de una API podemos consumir los elementos pot parte del front pra obtener los datos como peticion o como respuesta del back
*/

//panel de utilidades compartidas 
const apiMetodo = document.getElementById('api-metodo');
const appiURL = document.getElementById('api-url');
const apiCodigo = document.getElementById('api-codigo');
const notificacionDiv = document.getElementById('notificacion');

//vamo a crear la apiFetch para podernos conectar

async function fetchAPI(url, opciones = {}) {
    //pruimero vamos a definir el metodo para obtencion de la srutas 
    const method = opciones.method || 'GET';
    apiMetodo.textContent = method;
    apiMetodo.classname = `badge badge-${method.toLowerCase()}`;
    apiURL.textContent = url;
    apiCodigo.textContent = `...`;
    apiCodigo.clasname = `badge badge-natural`;

    try{
        const respuesta = await fetch(url, opciones);
        api.codigo.textContent = `${respuesta.status}`;
        apiCodigo.clasname =`badge ${respuesta.ok? `badge success` : `badge-error` }`;

        const datos = await respuesta.json();
        if(!respuesta.ok){
            throw new Error(datos.message || `Error${respuesta.staus}`);
        }
        return datos;
    }catch(error){
        if(apiCodigo.textContent === `...`){
            apiCodig.textContent =`Error`;
            apiCodigo.clasname = `badge badge-error`;
        }
        throw error;
    }
}

//todos los datos del usuario
const formUsuario = document.getElementById('form.usuario');
const inputUsuario = document.getElementById('usuario-id');
const inputusuarioNombre = document.getElementById('usuario-nombre');
const inputUsuarioEmail = document.getElementById('usuario-email');
const TituloUsuario = doocument.getElementById('form-titulo-usuario');
const btnGuardarUsuario = document.getElementsByName('btn-guardar-usuario');
const btnCancelarusuario = document.getElementById('btn-cancelar-usuario');
const tbodyUsuario = document.getElementById('tbody-usuarios');
const tablaUsuario = document.getElementById('tabla-usuario');
const cargarUsuario = document.getElementById('cargar-usuario');
const contadrUsuarios = document.getElementById('contador-usuarios');
const errorUsuario = document.getElementById('error-usuario-nombre');
const errorUsuarioEmail = document.getElementById('error-usuario-email');

async function cargarUsuarios(){
    try{
        const resp = await fetchAPI('/api/usuarios');
        cargarUsuario.style.display = 'none';

        if(resp.data.length === 0){
            tablaUsuario.style.display ='none';
            cargarUsuario.textContent = 'No hya usuarios solo jugo contigo';
            cargarUsuario.style.displat = 'block';
        }else{
            tablaUsuarios.style.display = 'table';
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${u.id}</td>

            `
        }
    }
}