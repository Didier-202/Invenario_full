const express = require('express');  // Importar el módulo express
const router = express.Router();     // Crear un router
const db = require('../config/db');          // Importar la conexión a la base de datos

// Ruta para obtener todos los productos de la base de datos
router.get('/', async (req, res) => {
    const [productos] = await db.query('SELECT id_producto, nombre, precio, cantidad FROM productos');  // Obtener todos los productos de la base de datos
    res.json(productos);                                          // Enviar los productos al cliente    
});

// Ruta para obtener el total de las referencias de productos de la base de datos
router.get('/count/referencias', async (req, res) => {

    try {
    const [resultado] = await db.query('SELECT COUNT(DISTINCT id_categoria) AS total FROM productos WHERE cantidad > 0');
    
    res.json({
        total: resultado[0].total  
    });                                            
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener la cantidad de productos'
        });
    }
});


// Ruta para obtener el total de productos de la base de datos
router.get('/count', async (req, res) => {

    try {
    const [resultado] = await db.query('SELECT COALESCE(SUM(cantidad), 0) AS total FROM productos')
    
    res.json({
        total: resultado[0].total  
    });                                            
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener la cantidad de productos'
        });
    }
});

// Ruta para obtener el valor total del inventario

router.get("/valor", async (req, res) => {

    try {
    const [resultado] = await db.query('SELECT COALESCE(SUM(precio * cantidad), 0) AS total FROM productos');
    
    res.json({
        total: resultado[0].total  
    });                                            
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener el valor del inventario'
        });
    }
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
    const {nombre, precio, cantidad} = req.body; // Obtener el producto del cuerpo de la solicitud

    try { 

        const [producto] = await db.query(`SELECT id_producto, nombre, precio, cantidad FROM productos WHERE nombre = ?`, [nombre]); // Insertar el producto en la base de datos
        
        if (producto.some(p => p.nombre )) {
            return res.status(400).json({
                mensaje: 'Producto ya existente'
            });
        }
    
        const [resultado]=await db.query('INSERT INTO productos (nombre, precio, cantidad, id_categoria) VALUES (?, ?, ?, ?)', [nombre, precio, cantidad, 3]); // Insertar el producto en la base de datos
        
        res.status(201).json({
            mensaje: 'Producto creado exitosamente',
            id_producto: resultado.insertId
        }); // Enviar el producto al cliente
    } catch (error){
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al crear producto'
    });
}
})

// Ruta para actualizar un producto en la base de datos
router.put('/:id', async (req, res) => {
    const id = req.params.id; // Obtener el id del producto de los parámetros de la solicitud
    const {nombre, precio, cantidad} = req.body; // Obtener el producto del cuerpo de la solicitud

    try {

    await db.query('UPDATE productos SET nombre=?, precio=?, cantidad=? WHERE id_producto = ?', [nombre, precio, cantidad, id]);  // Actualizar el producto en la base de datos
        
        res.json({
            mensaje: 'Producto actualizado'
        }); // Enviar el producto al cliente
    } catch(error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al actualizar producto'
        });
    }
}); 

// Ruta para eliminar un producto de la base de datos
router.delete('/:id', async (req, res) => {
    const id = req.params.id; // Obtener el id del producto de los parámetros de la solicitud

    try {

        await db.query('DELETE FROM productos WHERE id_producto = ?', [id]); // Eliminar el producto de la base de datos
        
        res.json({
            mensaje: 'Producto eliminado'
    }); // Enviar un mensaje al cliente indicando que el producto se ha eliminado
    } catch(error){
        console.error(error)
        res.status(500).json({
            mensaje: 'error al eliminar producto'
        })
    }

});

module.exports = router;  // Exportar el router para leer en el archivo server.js