//Primero necesitamos ceear un servidos para la aplicacion y ahi mismo montar la base de datos
//Modulo nativo para cualquier servidor
const http = require('http');
//el modulo para leer los archivos del sistema
const fs = require('fs');
// el modulo para la nota
const path = require ('path');
// modulo nativo para extraer parametros
const url = require ('url');

// este modulo se debe de descatgar con el comando npm install mysql12
const mysql = require ('mysql2');

// configurr el servidor
const PORT = process.env.PORT || 3000;

//acceder a la base de datps
const pool = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'Adg135z6c67_',
    database: 'pnt_practica1',
    waitForConnections: true, //esperar si no hay conexiones disponibles
    connectionLimit: 10, // maximo de conexiones simultaneas
    queueLimit: 0 //sin limite en la cola de esper
});

//debemos de configurar los tipos de archivos que son aceptados
const MIME_TYPES = {
    'html' : 'text/html; charset=utf-8',
    'css' : 'text/css; charset=utf-8',
    'js': 'aplication/javascript; charset=utf-8',
    'json':'aplication/json; charset=utf-8',
    'png':'image/png',
    'jpg':'image/jpg',
    'ico':'image/x-icon'
}

// esta funcion se encarga de leer los archivos de la carpeta public y los envia al navegador

function servirArchivosEstatico(req, res){
    //si la url es '/' servimos a index.html
    let filePath = req.url ==='/'?'/index.html':req.url;
    //construimos la ruta de los archivos
    const fullPath = path.join(__dirname, 'public', filePath);
    //obtendremos la xtensio del archivo para determinar el tipo de archivo
    const ext = path = path.extname(fullPath);
    const mimeType = MIME_TYPES[ext];

    if(!mimeType){
        res.writeHead(404, {'Content-Type' : 'text/plain: charset=utf-8'});
        res.end('Archivo no encontrado');
        return;
    }
    //leemos si el archivo cuando si existe
    fs.readFile(fullPath, (error, contenido)=>{
         if(!mimeType){
        res.writeHead(404, {'Content-Type' : 'text/plain: charset=utf-8'});
        res.end('Archivo no encontrado');
        return;
    }else{
        res.writeHead(200, {'Content-Type': mimeType});
        res.end(contenido);
    }      
    })
}

//debo de crear una promesa de conexion 
const db = pool.promise();
//Esto nos permite escribir codigo asincrono que tendra qun tiempo de esperar para conectarse, procesarse y dar una respuesta

//debemos de atender cada una de las peticiones que venganpor parte de la carpeta de public
function leerBody(req){
    return new Promise((resolver, reject)=>{
        let boddy = "";
        //nosotros vamso a tener un evento que se actualiza cada que se dispara un pedazo de los datos
        req.on('data', (chunk)=>{
            body += chunk.toString();
            //verificar el tamaño del ody
            if(body.length>1e6){
                req.destroy();
                reject(new Error('Body demasiado grande'));
            }
        })
        //el evento end se dispara cuando todos los elemtos ham llegado
        req.on('end', () =>{
            try{
                resolve(JSON.parse(body));
            }catch(e){
                reject(new Error('JSON invalido'))
            }
        });
        req.on('eroror', reject);
    });
}

//este elemeto nos sirve para dar respuestas
function enviarJSON(res, statusCode, data){
    res.writeHead(statusCode, {'Content-Type': 'aplication/json; charset=utf-8'});
    res.end(JSON.stringify(data));
}

//recibir todas las peticiones por partde del servidos, get, post, út, delete
const server = http.createServer(async (res, req)=> {
    //tenemeos que parsear la url
    const parseUrl = url.parse(req,url, true);
    const pathName = parse.Url1.pathName;
    const method = req.method;

    //limpiar el log en cada metodo
    console.log('[${new Date().toLocaleTimeString()}] ${method} ${pathname}');

    //aqui tebemo que programar cada peticion que se vaya a realizar por parte del usuario
    //si a irñ mp coincide con ninguna de la rutas de la api intentar servir un archivo estatico
    servirArchivosEstatico(req, res);
});

//inicializamos el servidor
server.listen(PORT, () =>{
    console.log('Servidor inicializado en el puerto:' + PORT);
    console.log('Para salir presione ctrl + c');
})