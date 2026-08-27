import {useState} from 'react'

import Login from './pages/Login.jsx'
import Registro  from './pages/registro.jsx'
import Dashboard from "./pages/dashboard.jsx";
import Usuarios from './pages/usuarios.jsx'
import Navbar from './components/navbar.jsx'
import Productos from './pages/productos.jsx'

import './styles/global.css'
import './styles/layout.css'


function App() {

  const [vista, setVista] = useState('login') // Estado para controlar la vista actual

  return(
    <>
        {vista !== 'login' && vista !== 'registro' && (
            <div className="dashboard">
                <Navbar 
                irUsuarios={() => setVista('usuarios')}
                irDashboard={()=> setVista('dashboard')}
                irProductos={()=> setVista('productos')}
                volverLogin={()=> setVista('login')}/>
                <main className="container">
                    {vista === 'dashboard' && <Dashboard />}
                    {vista === 'usuarios' && <Usuarios />}
                    {vista === 'productos' && <Productos />}
                </main>
            </div>
        )}

      {vista === 'login' && ( 
        <Login 
        irRegistro={() => setVista('registro')}
        irDashboard={() => setVista('dashboard')}
        />
      )}
      
      {vista === 'registro' && (
        <Registro  volverLogin={()=> setVista('login')}
        />
      )}
    </>
  )
}

export default App

