const express = require('express');  // Importar el módulo express
const router = express.Router();     // Crear un router
const db = require('../config/db');          // Importar la conexión a la base de datos

// Ruta para obtener todos los usuarios de la base de datos
router.get('/', async (req, res) => {
    const [usuarios] = await db.query('SELECT id_usuario, nombre, documento, telefono, correo, usuario FROM usuarios');  // Obtener todos los usuarios de la base de datos
    res.json(usuarios);                                          // Enviar los usuarios al cliente    
});

// Ruta para obtener el total de usuarios de la base de datos
router.get('/count', async (req, res) => {

    try {
    const [resultado] = await db.query('SELECT COUNT(*) AS total FROM usuarios');  // Obtener el total de usuarios de la base de datos
    
    res.json({
        total: resultado[0].total  // Enviar el total al cliente
    });   
    } catch (error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al obtener la cantidad de usuarios'
        });
    }                                          
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
    const {
        nombre, 
        documento, 
        telefono, 
        correo, 
        usuario, 
        password} = req.body; // Obtener el usuarios del cuerpo de la solicitud
    
        try {
            // Verificar si el usuario ya existe en la base de datos
            const [usuarios] = await db.query('SELECT id_usuario, usuario, documento, correo FROM usuarios WHERE usuario = ? OR correo = ? or documento = ?', [usuario, correo, documento]);

            // Si el usuario ya existe mostrar mensaje de error
            if (usuarios.some (u => u.usuario === usuario)) {
                return res.status(400).json({
                    mensaje: 'Usuario ya existe'
                });
            }

            if (usuarios.some (u => u.correo === correo)) {
                return res.status(400).json({
                    mensaje: 'Correo ya existe'
                });
            }

            if (usuarios.some (u => u.documento === documento)) {
                return res.status(400).json({
                    mensaje: 'Documento ya existe'
                });
            }

    const [resultado]= await db.query(`INSERT INTO usuarios
        (nombre, documento, telefono, correo, usuario, password, id_rol) VALUES (?, ?, ?, ?, ?, ?, ?)`,
        [nombre, documento, telefono, correo, usuario, password, 2]);  // Insertar el usuarios en la base de datos

        res.status(201).json({
            mensaje: 'Usuario creado exitosamente',
            id_usuario: resultado.insertId
        });
    } catch (error) {
        
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al crear usuario'
        });
    }  // Enviar el usuarios al cliente
});


// Ruta para Iniciar sesión

router.post('/login', async (req, res) => {

    const { usuario, password } = req.body;

    const [usuarios] = await db.query(
        `SELECT id_usuario, nombre, documento, telefono, correo, usuario, id_rol
        FROM usuarios
        WHERE usuario = ? AND password = ?`,
        [usuario, password]
    );

    if (usuarios.length === 0) {
        return res.status(401).json({
            mensaje: 'Usuario o contraseña incorrectos'
        });
    }

    res.json({
        mensaje: 'Login exitoso',
        usuario: usuarios[0]
    });
});

// Ruta para actualizar un usuarios en la base de datos
router.put('/:id', async (req, res) => {
    const id = req.params.id; // Obtener el id del usuarios de los parámetros de la solicitud
    const {nombre, documento, telefono, correo}= req.body; // Obtener el usuarios del cuerpo de la solicitud

    try {

    // 1. Validar que todos los campos estén presentes
        if (!nombre || !documento || !telefono || !correo) {
            return res.status(400).json({
                mensaje: 'Todos los campos son obligatorios'
            });
        }

    // 2. Validar documento
        if (!/^[0-9]+$/.test(documento)) {
            return res.status(400).json({
                mensaje: 'El documento debe contener solo números'
            });
        }

        // 3. Validar teléfono
        if (!/^[0-9]+$/.test(telefono)) {
            return res.status(400).json({
                mensaje: 'El teléfono debe contener solo números'
            });
        }

        // 4. Validar correo
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
            return res.status(400).json({
                mensaje: 'El correo no es válido'
            });
        }

        // 5. Verificar si el documento o correo ya pertenecen a OTRO usuario
        const [usuarios] = await db.query(
            `SELECT id_usuario 
            FROM usuarios 
            WHERE (documento = ? OR correo = ?)
            AND id_usuario != ?`,
            [documento, correo, id]
        );

        if (usuarios.length > 0) {
            return res.status(409).json({
                mensaje: 'El documento o correo ya pertenece a otro usuario'
            });
        }

        await db.query('UPDATE usuarios SET nombre=? , documento=?, telefono=?, correo=? WHERE id_usuario = ?', [nombre, documento, telefono, correo, id]);  // Actualizar el usuarios en la base de datos
        
        res.json({
            mensaje: 'usuario actualiado correctamente'
        }); // Enviar el usuarios al cliente
    } catch(error) {
        console.error(error);
        res.status(500).json({
            mensaje: 'Error al actualizar usuario'
        });
    }
}); 

// Ruta para eliminar un usuarios de la base de datos
router.delete('/:id', async (req, res) => {
    const id = req.params.id; // Obtener el id del usuarios de los parámetros de la solicitud

    try {

        await db.query('DELETE FROM usuarios WHERE id_usuario = ?', [id]); // Eliminar el usuarios de la base de datos
        
        res.json({
            mensaje: 'usuario eliminado'
        }); // Enviar un mensaje al cliente indicando que el usuarios se ha eliminado
    } catch(error){
        console.error(error)
        res.status(500).json({
            mensaje: 'error al eliminar usuario'
        })
    }
});

module.exports = router;  // Exportar el router para leer en el archivo server.js