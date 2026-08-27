import { useState } from 'react'   // Importar useState para manejar el estado de los campos del formulario
import '../styles/Login.css'        // Importar estilos para el formulario de registro

function Registro({volverLogin}) {

    // Registro de usuario

    const [nombre, setNombre] = useState('')
    const [documento, setDocumento] = useState('')
    const [telefono, setTelefono] = useState('')
    const [correo, setCorreo] = useState('')
    const [usuario, setUsuario] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [errores, setErrores] = useState({})
    const [mensajeError, setMensajeError] = useState('')  // Estado para el mensaje de éxito
    

    const [mensajeExito, setMensajeExito] = useState('')  // Estado para el mensaje de éxito

    // VALIDACIÓN DE CORREO
        function validarEmail(correo) {  // Expresión para validar formato de correo
            return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo); // Retorna true si el correo es válido, false si no
        }


    async function registrar() {

        setErrores({})  // Limpiar mensajes de error

    // Validacion de campos

        let valido = true

        if (!nombre) {   // Validar que el nombre no este vacio... y así con los demás campos
                setErrores(prev => ({
                ...prev,
                nombre: 'Ingrese su nombre'
                }));  
                valido = false;
            }

        if (!documento || isNaN(documento)) {
                setErrores(prev => ({
                ...prev,
                documento: 'Ingrese su documento'
                }));
                valido = false;
        }

        if (!telefono || isNaN(telefono)) {
                setErrores(prev => ({
                ...prev,
                telefono: 'Teléfono inválido'
                }));
                valido = false;
        }

        if (!correo || !validarEmail(correo)) {
                setErrores(prev => ({
                ...prev,
                correo: 'Correo inválido'
                }));
                valido = false;
        }

        if (!usuario || usuario.length < 4) {   // Validar que el usuario tenga al menos 4 caracteres
                setErrores(prev => ({
                ...prev,
                usuario: 'Usuario mínimo 4 caracteres'
                }));
                valido = false;
        }

        if (!password || password.length < 6) {    // Validar que la contraseña tenga al menos 6 caracteres
                setErrores(prev => ({
                ...prev,
                password: 'Contraseña mínimo 6 caracteres'
                }));
                valido = false;
        }

        if (password !== confirmPassword) {   // Validar que las contraseñas coincidan
                setErrores(prev => ({
                ...prev,
                confirmPassword: 'Las contraseñas no coinciden'
                }));
                valido = false;
        }

        if (!valido) {return} 

        const respuesta = await fetch('http://localhost:3000/usuarios', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                nombre: nombre,
                documento: documento,
                telefono: telefono,
                correo: correo,
                usuario: usuario,
                password: password
            })
        }) // Crear nuevo usuario con los datos del formulario

        const datos = await respuesta.json();          // Verificar si el usuario ya existe en el array de usuarios
        if (!respuesta.ok) {                                         // Si el usuario ya existe mostrar mensaje de error
            setMensajeError(datos.mensaje);
            return;
        }

        setMensajeExito("✅ Usuario registrado correctamente");  // Establecer el mensaje de éxito

        setTimeout(() => {
        setMensajeExito('')
        volverLogin() // Limpiar el mensaje de éxito
        }, 1500)
    }



    return(
        
        <div id="registro" className="registroContainer">  {/* Contenedor principal del formulario de registro */}
            <div className="card">
            {/* TÍTULO PRINCIPAL */}
            <h2>Registro</h2>       

            {/* CAMPO DE NOMBRE  y MENSAJE DE ERROR PARA NOMBRE*/}
            <input  className="input-registro" type="text" 
            placeholder="Nombre completo" 
            value={nombre} onChange={e=>setNombre(e.target.value)}/> 
            {errores.nombre && (<small className="error">{errores.nombre} </small>)}         

            {/* CAMPO DE DOCUMENTO y MENSAJE DE ERROR PARA DOCUMENTO */}
            <input className="input-registro" type="text"
            placeholder="Documento de identidad" 
            value={documento} onChange={e=>setDocumento(e.target.value)} />  
            {errores.documento && (<small className="error">{errores.documento} </small>)}     

            {/* CAMPO DE TELÉFONO y MENSAJE DE ERROR PARA TELÉFONO */}
            <input className="input-registro" type="text"  
            placeholder="Teléfono" 
            value={telefono} onChange={e=>setTelefono(e.target.value)} />         
            {errores.telefono&& (<small className="error" >{errores.telefono}</small>)}          

            {/* CAMPO DE CORREO y MENSAJE DE ERROR PARA CORREO */}
            <input className="input-registro" type="email"  
            placeholder="Correo electrónico" 
            value={correo} onChange={e=>setCorreo(e.target.value)} />         
            {errores.correo && (<small className="error">{errores.correo}</small>)} 

            {/* CAMPO DE USUARIO y MENSAJE DE ERROR PARA USUARIO */}
            <input className="input-registro" type="text"  
            placeholder="Usuario" 
            value={usuario} onChange={e=>setUsuario(e.target.value)} />       
            {errores.usuario && (<small className="error" >{errores.usuario}</small>)}    

            {/* CAMPO DE CONTRASEÑA PARA REGISTRO y MENSAJE DE ERROR PARA CONTRASEÑA */}
            <input className="input-registro" type="password"  
            placeholder="Contraseña"  
            value={password} onChange={e=>setPassword(e.target.value)} />         
            {errores.password && (<small className="error" >{errores.password}</small>)}         

            {/* CAMPO DE CONFIRMAR CONTRASEÑA PARA REGISTRO y MENSAJE DE ERROR PARA CONFIRMAR CONTRASEÑA */}
            <input className="input-registro" type="password"  
            placeholder="Confirmar contraseña" 
            value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)} />         
            {errores.confirmPassword && (<small className="error" >{errores.confirmPassword}</small>)}        

            {mensajeExito && (<p className="success">{mensajeExito}</p>)}
            {mensajeError && (<p className="error">{mensajeError}</p>)}

            <button className="btn-registrarse" onClick={registrar}>Crear Cuenta</button>        
            <button className="secondary" onClick={volverLogin}>Volver</button>     
            </div>    
        </div>
    )
}

export default Registro