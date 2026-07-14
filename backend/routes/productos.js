const express = require('express');  // Importar el módulo express
const router = express.Router();     // Crear un router
const db = require('../config/db');          // Importar la conexión a la base de datos

// Ruta para obtener todos los productos de la base de datos
router.get('/', async (req, res) => {
    const [productos] = await db.query('SELECT * FROM productos');  // Obtener todos los productos de la base de datos
    res.send(productos);                                          // Enviar los productos al cliente    
});

// Ruta para obtener un producto específico de la base de datos
router.get("/:id", async (req, res) => {
    const id = req.params.id;

    const [productos] = await db.query(
        "SELECT * FROM productos WHERE id_producto = ?",
        [id]
    );
    res.send(productos);
});

// Ruta para insertar un producto en la base de datos
router.post('/', async (req, res) => {
    const producto = req.body; // Obtener el producto del cuerpo de la solicitud
    
    await db.query('INSERT INTO productos SET ?', [producto]); // Insertar el producto en la base de datos
    
    res.send(producto); // Enviar el producto al cliente
});

// Ruta para actualizar un producto en la base de datos
router.put('/:id', async (req, res) => {
    const id = req.params.id; // Obtener el id del producto de los parámetros de la solicitud
    const producto = req.body; // Obtener el producto del cuerpo de la solicitud

    await db.query('UPDATE productos SET ? WHERE id_producto = ?', [producto, id]);  // Actualizar el producto en la base de datos
    
    res.send('Producto actualizado'); // Enviar el producto al cliente
}); 

// Ruta para eliminar un producto de la base de datos
router.delete('/:id', async (req, res) => {
    const id = req.params.id; // Obtener el id del producto de los parámetros de la solicitud

    await db.query('DELETE FROM productos WHERE id_producto = ?', [id]); // Eliminar el producto de la base de datos
    
    res.send('Producto eliminado'); // Enviar un mensaje al cliente indicando que el producto se ha eliminado
});

module.exports = router;  // Exportar el router para leer en el archivo server.js