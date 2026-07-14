const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', async (req, res) => {
    const [categorias] = await db.query('SELECT * FROM categoria_productos');
    
    res.send(categorias);
});

// Ruta para insertar una categoria en la base de datos
router.post('/', async (req, res) => {
    const categoria = req.body; // Obtener la categoria del cuerpo de la solicitud
    
    await db.query('INSERT INTO categoria_productos SET ?', [categoria]); // Insertar la categoria en la base de datos
    
    res.send(categoria); // Enviar la categoria al cliente
});

// Ruta para actualizar una categoria en la base de datos
router.put('/:id', async (req, res) => {
    const id = req.params.id; // Obtener el id del categoria de los parámetros de la solicitud
    const categoria = req.body; // Obtener el categoria del cuerpo de la solicitud

    await db.query('UPDATE categoria_productos SET ? WHERE id_categoria = ?', [categoria, id]);  // Actualizar el categoria en la base de datos
    
    res.send('categoria actualizado'); // Enviar el categoria al cliente
}); 

// Ruta para eliminar una categoria de la base de datos
router.delete('/:id', async (req, res) => {
    const id = req.params.id; // Obtener el id del categoria de los parámetros de la solicitud

    await db.query('DELETE FROM categoria_productos WHERE id_categoria = ?', [id]); // Eliminar el categoria de la base de datos
    
    res.send('categoria eliminado'); // Enviar un mensaje al cliente indicando que el categoria se ha eliminado
});


module.exports = router;