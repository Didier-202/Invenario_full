import { useState } from 'react' 
import '../styles/Login.css'

function Login({irRegistro, irDashboard}) {
    
    const [usuario, setUsuario] = useState('') 
    const [password, setPassword] = useState('')
    const [error, setError] = useState('') 

    async function login() {
        
        const respuesta = await fetch('http://localhost:3000/usuarios/login', {
            method: "POST", 
            headers: {
                "Content-Type": "application/json"
            }, 
            body: JSON.stringify({
                usuario: usuario,
                password: password
            })
        })

        const datos = await respuesta.json();

        if (!respuesta.ok) {
            setError(datos.mensaje);
            return;
        }
        
    setError('')

    localStorage.setItem("usuarioActivo", JSON.stringify(datos.usuario));
    
    irDashboard()
    
    
    }   
    return (
        <div className="loginContainer">  
            <div className="card">
                {/* icono ususario */}
                <div className="icon-container">
                    <svg xmlns="http://www.w3.org/2000/svg"
            width="48"
            height="48"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#1e293b"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round">
            <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
            <circle cx="12" cy="7" r="4"></circle> </svg>
                </div>
                <h2>Iniciar Sesión</h2> 
                {/* Formulario de login */}
                <input className="input-login"value = {usuario} onChange={e=>setUsuario(e.target.value)} type="text" placeholder="Usuario"/>
                {/*campo contraseña*/}
                <input className="input-login"value = {password} onChange={e=>setPassword(e.target.value)} type="password" placeholder="contraseña" />
                {/* Boton de login */}
                {error && <p className="error">{error}</p>}
                <button type="button" className="btn-acceder" onClick={login}>Acceder</button>
                <button type = "button" className="secondary" onClick={irRegistro}>Registrarse</button>

            </div>
    </div>
    )
}

export default Login
