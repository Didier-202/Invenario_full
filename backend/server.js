// IMPORTAR DEPENDENCIAS
const express = require('express');                 // Importar el módulo express
const cors = require('cors');

const productos = require('./routes/productos');    // Importar el router de productos
const categorias = require('./routes/categorias');
const usuarios = require('./routes/usuarios');
const movimientos = require('./routes/movimientos');

const app = express();                       // Crear un objeto de la clase express

// CONFIGURACION Cabeceras
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'none'; frame-ancestors 'none'; form-action 'none'"
    );
    next();
});
app.disable('x-powered-by');                          // Deshabilitar la cabecera x-powered-by para mayor seguridad
app.use(cors({origin: 'http://localhost:5173'}));     // Middleware para permitir solicitudes de origen en el dominio


// RUTAS
app.use(express.json());                              // Middleware para parsear el cuerpo de las solicitudes como JSON
app.use('/productos', productos);                   // Agregar el router de productos a la ruta /productos
app.use('/categorias', categorias);
app.use('/usuarios', usuarios);
app.use('/movimientos', movimientos);

// ERROR 404 para evitar que express envie cabeceras incompletas.
app.use((req, res) => {
    res.status(404).json({ mensaje: 'Ruta no encontrada' });
});

// LISTEN SERVER  
app.listen(3000 , () => {
    console.log("Servidor iniciado en el puerto 3000");
});