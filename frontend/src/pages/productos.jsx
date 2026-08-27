import {useState, useEffect} from 'react'

import '../styles/productos.css'

function Productos() {

    const [producto, setProductos] = useState([])
    const [productoSeleccionado, setProductoSeleccionado] = useState(null)
    const [modoFormulario, setModoformulario] = useState('agregar')
    const [formularioEditar, setFormularioEditar] = useState({
        nombre: '',
        precio: '',
        cantidad: '',
    })
    
    // Cargar productos
    async function cargarProductos() {
        const respuesta = await fetch(
            'http://localhost:3000/productos'
        )

        const datos = await respuesta.json()

        setProductos(datos)
    }
    
    useEffect(() => {
        async function Iniciar(){
            await cargarProductos()
        }
    Iniciar()
    },[])

    // Preparar formulario para editar producto

        function abrirEditar(producto) {

        setModoformulario('editar')
        setProductoSeleccionado(producto) 
        setFormularioEditar({
            nombre: producto.nombre,
            precio: producto.precio,
            cantidad: producto.cantidad,
        })    
    }

    
    
    // Actualizar producto 

    async function guardarCambios() {

        const respuesta = await fetch(
            `http://localhost:3000/productos/${productoSeleccionado.id_producto}`,
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
            await cargarProductos()

            // volver a modulo agregar 
            setModoformulario('agregar')
            setProductoSeleccionado(null)

            // resetear formulario
            setFormularioEditar({
                nombre: '',
                precio: '',
                cantidad: '',
            })
    }


    // Agregar producto 
    async function agregarProducto() {
        const respuesta = await fetch(
            'http://localhost:3000/productos',
            {
                method: "POST",
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
        console.log(datos.mensaje)

        await cargarProductos()

        // resetear formulario
        setFormularioEditar({
            nombre: '',
            precio: '',
            cantidad: '',
        })
    }

    // DELETE — eliminar producto

async function eliminarProducto(producto) {

    const confirmar = window.confirm(
        `¿Seguro que deseas eliminar ${producto.nombre}?`
    )

    if (!confirmar) {
        return
    }

    const respuesta = await fetch(
        `http://localhost:3000/productos/${producto.id_producto}`,
        {
            method: 'DELETE'
        }
    )

    const datos = await respuesta.json()

    if (!respuesta.ok) {

        console.log(datos.mensaje)

        return
    }

    console.log(datos.mensaje)

    await cargarProductos()
}

    // controla el submit del formulario

    async function guardarProducto(e){

        e.preventDefault()

        
        if (modoFormulario === 'agregar'){
            await agregarProducto()
        } else {
            await guardarCambios()
        }
    }

    return (


        <section className="productos" id="modProductos">  
            <header className="app-header">
                <h2 className="app-title">📦 Productos </h2>    
            </header>
        {/*Formulario para agregar productos al inventario */}
        
            <form className="form-card" id="formProducto" onSubmit={guardarProducto}>  
                <h2 className="form-title">Agregar producto</h2> 
            <div className="form-row">             
                <input type="text" id="nombre" placeholder="Nombre producto" className="form-input" value={formularioEditar.nombre} onChange={(e)=>setFormularioEditar({ ... formularioEditar, nombre: e.target.value})} />             
                <input type="number" id="precio" placeholder="Precio ($)" step="0.01" className="form-input" value={formularioEditar.precio} onChange={(e)=>setFormularioEditar({...formularioEditar, precio: e.target.value})} />
                <input type="number" id="cantidad" placeholder="Cantidad" className="form-input" value={formularioEditar.cantidad} onChange={(e)=>setFormularioEditar({
                    ...formularioEditar, cantidad: e.target.value})} />
                <button type="submit" className="btn btn-primary" > {modoFormulario=== 'editar'
                    ? 'Guardar'
                : '+ Agregar'}</button>          
            </div>
            </form>

            {/*<!-- Tabla para mostrar los productos del inventario -->*/}

            <div className="table-container">
                <table className="inventory-table" id="tablaProductos">
                    <thead> 
                        <tr> 
                        <th className="col-name">Nombre</th> 
                        <th className="col-price">Precio</th>
                        <th className="col-cantidad">cantidad</th>
                        <th className="col-actions">Acciones</th>
                    </tr>
                    </thead>
                <tbody> 
                    {producto.map((producto)=>(
                        <tr key={producto.id_producto}>
                        <td className="celdaNombre">{producto.nombre}</td>        
                        <td className="celdaPrecio">{producto.precio}</td>
                        <td className="celdaCantidad">{producto.cantidad}</td>
                        <td className="celdaAcciones">
                            <button className="btn btn-editar" onClick={()=> abrirEditar(producto)}>✏️ Editar</button>
                                <button className="btn btn-eliminar" onClick={()=>eliminarProducto(producto)}>🗑️ Eliminar</button>
                        </td>


                        </tr>
                    ))}
                    
                </tbody>
                </table>
            </div>
        </section>
    )
}

export default Productos