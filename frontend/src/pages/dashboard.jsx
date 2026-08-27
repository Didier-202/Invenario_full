import { useState, useEffect } from 'react'

import '../styles/dashboard.css'

function Dashboard() {

const [cantidadUsuarios, setCantidadUsuarios] = useState(0)
const [cantidadReferencias, setCantidadReferencias] = useState(0)
const [cantidadUnidades, setCantidadUnidades] = useState(0)
const [valorInventario, setValorInventario] = useState(0)

    useEffect(() => {

        async function cargarUsuarios() {

            const respuesta = await fetch(
                'http://localhost:3000/usuarios/count'
            )

            const datos = await respuesta.json()

            setCantidadUsuarios(datos.total)
        }
        cargarUsuarios()

    }, [])

    useEffect(() => {
        async function cargarReferencias() {
            const respuesta = await fetch(
                'http://localhost:3000/productos/count/referencias'
            )
            const datos = await respuesta.json()
            setCantidadReferencias(datos.total)
        }
        cargarReferencias()
    }, [])

        useEffect(() => {
        async function cargarUnidades() {
            const respuesta = await fetch(
                'http://localhost:3000/productos/count'
            )
            const datos = await respuesta.json()
            setCantidadUnidades(datos.total)
        }
        cargarUnidades()
    }, [])

    useEffect(() => {
        async function cargarValorInventario() {
            const respuesta = await fetch(
                'http://localhost:3000/productos/valor'
            )
            const datos = await respuesta.json()
            setValorInventario(datos.total)
        }
        cargarValorInventario()
    },[])

    return (
        <section className="inicio" id="modDashboard">  {/*seccion de dasboard (resumen de la pagina)*/}
            <header className="header">
                <h2 className="titulo">Dashboard</h2>
            </header>

            <div className="cardDashboard">
                <div className="cardD">
                    <h3 className="title">Usuarios</h3>
                    <p id="cantidadUsuarios" className="cantUsuarios">{cantidadUsuarios}</p>
                </div>
                <div className="cardD">
                    <h3 className="title">referencias</h3>
                    <p id="cantidadProductos" className="cantProductos">{cantidadReferencias}</p>
                </div>
                <div className="cardD">
                    <h3 className="title">Unidades</h3>
                    <p id="cantidadUnidades" className="cantUnidades">{cantidadUnidades}</p>
                </div>
                <div className="cardD">
                    <h3 className="title">Valor Inventario</h3>
                    <p id="valorInventario" className="valor"> {valorInventario}</p>
            </div>
            </div>
        </section> 
    )
}

export default Dashboard