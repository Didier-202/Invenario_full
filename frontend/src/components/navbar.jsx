import { useState } from 'react'
import '../styles/navbar.css'    // estilos del navbar

function Navbar({irUsuarios, irDashboard, irProductos, volverLogin}) {

    const [mostrarSidebar, setMostrarSidebar] = useState(false)  // estados del sidebar


    // abrir/cerrar el sidebar
    function abrirSidebar() {
    setMostrarSidebar(prev => !prev)
    }

    // mostrar usuario activo en el sidebar
    function mostrarUsuarioActivo() {
        const usuario = localStorage.getItem("usuarioActivo")
        const datos= JSON.parse(usuario)                            // obtiene el objeto JSON
        return datos ? datos.usuario : "Usuario no registrado"      // si el usuario existe mostrar su nombre, si no mostrar mensaje de usuario no registrado
    }
    

    return (

        <>
        <nav className={mostrarSidebar? "sidebar open" : "sidebar"} > 
            <div className="sidebar-brand">  
                <h2 className="sidebar-title">Inventario</h2>   
            </div>
            <div className="cont-sidebar">
                <button className="btn btn-dashboard" onClick={()=>{irDashboard()
                    setMostrarSidebar(false)}}>dashboard</button>         
                <button className="btn btn-productos" onClick={()=>{irProductos()
                    setMostrarSidebar(false)}}>productos</button>                     
                <button className="btn btn-usuarios" onClick={()=>{irUsuarios() 
                    setMostrarSidebar(false)}}>usuarios</button>         
            </div>

            <div className="usuarioActivo">         
                <svg className="icono" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle> 
                </svg>         
                <p id="usuarioActivo" className="user">{mostrarUsuarioActivo()}</p>        
                <button className="btn btn-cerrarSesion" onClick={volverLogin}>  🚪 Cerrar Sesión </button> {/* Botón para cerrar sesión */}
            </div>
        </nav>
            <button type="button" className="hamburger" id="hamburger" onClick={abrirSidebar}>  ☰ </button>  {/* Botón para abrir/cerrar el sidebar */}
        {/*Overlay oscuro para cerrar el sidebar*/}
        <div className={mostrarSidebar? "sidebar-overlay active" : "sidebar-overlay"} id="sidebarOverlay" onClick={abrirSidebar}></div> 
        

        </>
    )
}

export default Navbar