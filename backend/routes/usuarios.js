const express = require('express');  // Importar el módulo express
const router = express.Router();     // Crear un router
const db = require('../config/db');          // Importar la conexión a la base de datos

// Ruta para obtener todos los usuarios de la base de datos
router.get('/', async (req, res) => {
    const [usuarios] = await db.query('SELECT * FROM usuarios');  // Obtener todos los usuarios de la base de datos
    res.send(usuarios);                                          // Enviar los usuarios al cliente    
});

// Ruta para obtener un usuarios específico de la base de datos
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const [usuarios] = await db.query(
        "SELECT * FROM usuarios WHERE id_usuario = ?",
        [id]
    );
    res.send(usuarios);
});

// Ruta para insertar un usuarios en la base de datos
router.post('/', async (req, res) => {
    const usuarios = req.body; // Obtener el usuarios del cuerpo de la solicitud
    
    await db.query('INSERT INTO usuarios SET ?', [usuarios]); // Insertar el usuarios en la base de datos
    
    res.send(usuarios); // Enviar el usuarios al cliente
});

// Ruta para actualizar un usuarios en la base de datos
router.put('/:id', async (req, res) => {
    const id = req.params.id; // Obtener el id del usuarios de los parámetros de la solicitud
    const usuarios = req.body; // Obtener el usuarios del cuerpo de la solicitud

    await db.query('UPDATE usuarios SET ? WHERE id_usuario = ?', [usuarios, id]);  // Actualizar el usuarios en la base de datos
    
    res.send('usuario actualizado'); // Enviar el usuarios al cliente
}); 

// Ruta para eliminar un usuarios de la base de datos
router.delete('/:id', async (req, res) => {
    const id = req.params.id; // Obtener el id del usuarios de los parámetros de la solicitud

    await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]); // Eliminar el usuarios de la base de datos
    
    res.send('usuario eliminado'); // Enviar un mensaje al cliente indicando que el usuarios se ha eliminado
});

module.exports = router;  // Exportar el router para leer en el archivo server.js