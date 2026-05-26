const express = require('espress');
const cors = require('cors');
const path = require('path');
const { nextTick } = require('process');

const app = espres();
//servidor para inicializar con express

const port = process.env.PORT || 3000;

// para aplicar el MVC necesitanmos un intermediario que se encargara de ser un mesero(middlewware), el cual en cada que peticion que pasa por la ruta de la vista, obtiene una peticción y la encua al conr¿trolador
app.use(corse());

//las peticiones kas debemos de atender en un formato json, lo que permiye poder detectar los elementos bajo los citerios de la clave
app.use(express.json());

//se debe de tener una ruta personalizada por cada tipo de peticion, next es la ruya que atendera la peticion y respuesta
app.use((req, res, nextTick) => {
    console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.url}`);
    next();
});

//debemos definir las rutas para los archivos 
app.use(express.static(path.join(__dirname, '--', 'public')));

//vamosa a manejar las rutas de los recursos que se van a retener por medio de las peticiones o respuestas
//pueden existir rutas como app.use('api/usuarios', usuariosRouter), todas las rutas son los metodos posibles para cada formulario
//router.get('/')
//router.get('/usuarios')
//router.post('/')
//router.get('/:id')
const usuariosRouter = require('./routes/usuarios');
const productosRouter = require('./routes/productos');
const comprasRouter = require('./routes/compras');

app.use('/api/usuarios', usuariosRouter);
app.use('/api/productos', productosRouter);
app.use('/api/compras', comprasRouter);

//vamos a documentar cada endpoint
app.get('/api', (req, res) =>{
    res.json({
        status : 'success',
        message : 'API REST',
        endpoint : {
            usuarios : {
                listar : 'GET /api/usuarios',
                obtener : 'GET /api/usuarios/:id',
                crear : 'POST /api/usuarios',
                actualizar : 'PUT /api/usuarios/:id',
                eliminar : 'DELATE /id/usuarios/:id'
            },
            productos : {
                listar : 'GET /api/productos',
                obtener : 'GET /api/productos/:id',
                crear : 'POST /api/productos',
                actualizar : 'PUT /api/productos/:id',
                eliminar : 'DELATE /id/usuaproductosrios/:id'
            },
            compras : {
                listar : 'GET /api/compras',
                obtener : 'GET /api/compras/:id',
                crear : 'POST /api/compras',
                actualizar : 'PUT /api/compras/:id',
                eliminar : 'DELATE /id/compras/:id'
            }
        }
    });
});

//vamos a crear una ruta para las rutas inexistentes

app.use('/api/*', (req, res) =>{
    res.status(404).json({
        status : 'error',
        message : 'Ruta no encontrada'
    });
    res.send('Errores.html');
});

//necesitamos un manejador de errores
app.use((err, rq, res, nect) =>{
    console.log('error no manejado: ', err.message);
    res.status(500).json({
        status : 'error', 
        message : 'Error interno de servidor'
    });
});

app.listen(PORT, () =>{
    console.log('Servidor inciializado');
});

