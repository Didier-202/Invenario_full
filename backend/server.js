// IMPORTAR DEPENDENCIAS
const express = require('express');                 // Importar el módulo express
const cors = require('cors');

const productos = require('./routes/productos');    // Importar el router de productos
const categorias = require('./routes/categorias');
const usuarios = require('./routes/usuarios');
const movimientos = require('./routes/movimientos');

const app = express();                       // Crear un objeto de la clase express
app.disable('x-powered-by');                          // Deshabilitar la cabecera x-powered-by para mayor seguridad
app.use(cors({origin: 'http://localhost:5173'}));     // Middleware para permitir solicitudes de origen en el dominio


// RUTAS
app.use(express.json());                              // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use('/productos', productos);                   // Agregar el router de productos a la ruta /productos
app.use('/categorias', categorias);
app.use('/usuarios', usuarios);
app.use('/movimientos', movimientos);

// LISTEN SERVER  
app.listen(3000 , () => {
    console.log("Servidor iniciado en el puerto 3000");
});