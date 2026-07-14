const express = require('express');  // Importar el módulo express
const router = express.Router();     // Crear un router
const db = require('../config/db');          // Importar la conexión a la base de datos

// Ruta para obtener todos los movimientos de la base de datos
router.get('/', async (req, res) => {
    const [movimientos] = await db.query('SELECT * FROM movimientos');  // Obtener todos los movimientos de la base de datos
    res.send(movimientos);                                          // Enviar los movimientos al cliente    
});

// Ruta para obtener un movimientos específico de la base de datos
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const [movimientos] = await db.query(
        "SELECT * FROM movimientos WHERE id_movimiento = ?",
        [id]
    );
    res.send(movimientos);
});

// Ruta para insertar un movimientos en la base de datos
router.post('/', async (req, res) => {
    const movimientos = req.body; // Obtener el movimientos del cuerpo de la solicitud
    
    await db.query('INSERT INTO movimientos SET ?', [movimientos]); // Insertar el movimientos en la base de datos
    
    res.send(movimientos); // Enviar el movimientos al cliente
});


module.exports = router;  // Exportar el router para leer en el archivo server.js