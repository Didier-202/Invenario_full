import { useState, useEffect } from 'react'
import '../styles/usuarios.css'

function Usuarios() {

    // estados del usuarios

    const [errores, setErrores] = useState({})

    const [usuarios, setUsuarios] = useState([])
    const [mostrarFormularioEditar, setMostrarFormularioEditar] = useState(false)
    const [usuarioSeleccionado, setUsuarioSeleccionado] = useState(null)
    const [formularioEditar, setFormularioEditar] = useState({
        nombre: '',
        documento: '',
        telefono: '',
        correo: '',
    })

    // Cargar usuarios

    async function cargarUsuarios() {
        const respuesta = await fetch(
            'http://localhost:3000/usuarios'
        )
        
        const datos = await respuesta.json()
        
        setUsuarios(datos)
    }
    useEffect(() => {
        async function Iniciar(){
            await cargarUsuarios()
        }
    Iniciar()
    },[])

    // Abrir formulario de edición

    function abrirEditar(usuario) {


        setUsuarioSeleccionado(usuario) 
        setFormularioEditar({
            nombre: usuario.nombre,
            documento: usuario.documento,
            telefono: usuario.telefono,
            correo: usuario.correo,
        }) 
        setMostrarFormularioEditar(true)

    }

    // funcion para guardar los cambios en el usuario

    async function guardarCambios() {

        const { nombre, documento, telefono, correo } = formularioEditar

    // VALIDACIÓN DE CORREO
        function validarEmail(correo) {  // Expresión para validar formato de correo
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo); // Retorna true si el correo es válido, false si no
        }

        setErrores({})

        // validaciones de campos 

        if (!nombre) {   // Validar que el nombre no este vacio... y así con los demás campos
                setErrores(prev => ({
                ...prev,
                nombre: 'Ingrese su nombre'
                }));  
                    return;
                
                
            }

        if (!documento) {
                setErrores(prev => ({
                ...prev,
                documento: 'Ingrese su documento'
                })); 
                    return;
                
        } 

        if (!telefono) {
                setErrores(prev => ({
                ...prev,
                telefono: 'Ingrese su telefono'
                })); 
                    return;                
        }

        if (!correo || !validarEmail(correo)) {
                setErrores(prev => ({
                ...prev,
                correo: 'Ingrese su correo'
                })); 
                    return;                
        }
        
        // enviamos el formulario editado al backend - PUT
        const respuesta = await fetch(
            `http://localhost:3000/usuarios/ ${usuarioSeleccionado.id_usuario}`,
            {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify(formularioEditar)
        }
    )

        const datos = await respuesta.json()

        if (!respuesta.ok) {
            console.log(datos.mensaje)
            return
        }

        console.log (datos.mensaje)

        await cargarUsuarios()
        setMostrarFormularioEditar(false)  // cerramos el formulario de edición 
    }

    // DELETE — eliminar usuario
    async function eliminarUsuario(usuario) {

        const confirmar = window.confirm(
        `¿Seguro que deseas eliminar a ${usuario.nombre}?`
    )

    if (!confirmar) {
        return
    }
        const respuesta = await fetch(
        `http://localhost:3000/usuarios/ ${usuario.id_usuario}`,
        {
            method: "DELETE",
        }        
    )

            const datos = await respuesta.json()

        if (!respuesta.ok) {
            console.log(datos.mensaje)
            return
        }

        console.log (datos.mensaje)

        await cargarUsuarios()  // actualizamos el usuario en el backend y recargamos la tabla de usuarios
    }

    return (
        <>       
        <section className="usuarios" id="modUsuarios">  
            <header className="header"> 
                <h2 className="titulo">Usuarios</h2>     
            </header>

        <div className="tableContainer">      
            <table className="tableUsuarios">    
                <thead>               
                <tr>
                    <th className="colName">Nombre</th>                
                    <th className="colDocumento">Documento</th>
                    <th className="colTelefono">Teléfono</th>
                    <th className="colCorreo">Correo</th>
                    <th className="colUsuario">Usuario</th>
                    <th className="colAcciones">Acciones</th>
                </tr>
            </thead>
                <tbody id="tablaUsuarios">
                    {usuarios.map((usuario) => (
                        <tr key={usuario.id_usuario}>
                            <td className="celdaName">{usuario.nombre}</td>
                            <td className="celdaDocumento">{usuario.documento}</td>
                            <td className="celdaTelefono">{usuario.telefono}</td>
                            <td className="celdaCorreo">{usuario.correo}</td>
                            <td className="celdaUsuario">{usuario.usuario}</td>
                            <td className="celdaAcciones">
                                <button className="btn btn-editar" onClick = {()=>abrirEditar(usuario)}>📝 Editar</button>
                                <button className="btn btn-eliminar" onClick={()=>eliminarUsuario(usuario)}>🗑️ Eliminar</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {mostrarFormularioEditar && (
        <div className="formCard" id="formEditar">
            <h3 className="formTitulo">Editar Usuario</h3>           
            <div className="inputs">             
                <input type="text" id="editNombre" className="formInput" 
                value={formularioEditar.nombre} 
                onChange={(e)=> setFormularioEditar({
                    ...formularioEditar, nombre: e.target.value})} />
                    {errores.nombre && (<small className="error">{errores.nombre} </small>)}           
                <input type="text" id="editDocumento" className="formInput" 
                value={formularioEditar.documento}
                onChange={(e)=> setFormularioEditar({
                    ...formularioEditar, documento: e.target.value})} />
                    {errores.documento && (<small className="error">{errores.documento} </small>)}
                <input type="text" id="editTelefono" className="formInput"  
                value={formularioEditar.telefono}
                onChange={(e)=> setFormularioEditar({
                    ...formularioEditar, telefono: e.target.value})}/>
                    {errores.telefono && (<small className="error" >{errores.telefono}</small>)}
                <input type="email" id="editCorreo" className="formInput" 
                value={formularioEditar.correo}
                onChange={(e)=> setFormularioEditar({
                    ...formularioEditar, correo: e.target.value})} />
                    {errores.correo && (<small className="error" >{errores.correo}</small>)}
                <button type="button" className="btn btn-save" onClick={()=>guardarCambios()} > + guardar cambios </button> 
            </div>
        </div>
        )}
        </section>
        </>
    )
}

export default Usuarios