let productos = JSON.parse(localStorage.getItem("productos")) || [];

const form= document.getElementById("formProducto");
const tabla = document.getElementById("tablaProductos").getElementsByTagName('tbody')[0];


// Función para mostrar los productos en la tabla

function mostrarProductos() {
    tabla.innerHTML = "";        // Limpiar la tabla antes de mostrar los productos
    productos.forEach((producto, index) => {      // recorre el array de productos y crea una fila para cada uno     
        tabla.innerHTML += `
        <tr>
            <td class="celda-nombre">${producto.nombre}</td> 
            <td class="celda-precio">${producto.precio}</td>
            <td class="celda-cantidad">${producto.cantidad}</td>
            <td class="celda-acciones">
            <button class="btn btn-editar" onclick="editarProducto(${index})">Editar</button>
            <button class="btn btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button></td>
        </tr>`; // Agrega una nueva fila a la tabla con el nombre, precio, botón para eliminar el producto y editar el producto
    });
}

// Función para guardar un producto

form.addEventListener("submit", function (e) {
    e.preventDefault();  
    const nombre = document.getElementById("nombre").value;  // Obtener el valor del campo de nombre
    const precio = document.getElementById("precio").value;
    const cantidad = document.getElementById("cantidad").value;  // Obtener el valor del campo de cantidad
    productos.push({nombre, precio, cantidad});                      // Agregar el producto al array
    localStorage.setItem("productos", JSON.stringify(productos));  // Guardar el array de productos en el almacenamiento local
    form.reset();  // Reiniciar el formulario después de agregar el producto
    mostrarProductos();  // Mostrar los productos actualizados en la tabla
});

// Función para eliminar un producto

function eliminarProducto(index) {
    productos.splice(index, 1);  // Eliminar el producto del array
    localStorage.setItem("productos", JSON.stringify(productos));  // Guardar el array de productos en el almacenamiento local
    mostrarProductos();  // Mostrar los productos actualizados en la tabla
}


// Función para editar un producto

function editarProducto(index) {   
    const producto = productos[index];  // Obtener el producto a editar 

    document.getElementById("nombre").value = producto.nombre;  // Rellenar el campo de nombre con el valor del producto
    document.getElementById("precio").value = producto.precio;// Rellenar el campo de precio con el valor del producto 
    eliminarProducto(index); // Eliminar el producto del array para que se actualice al guardar los cambios 
    mostrarProductos(); 
}

mostrarProductos();  // Mostrar los productos al cargar la página







        //const fila = document.createElement('tr');              // Crear una nueva fila para cada producto   
        //const celdaNombre = document.createElement('td');       
        //celdaNombre.textContent = producto.nombre;
        //const celdaPrecio = document.createElement('td');
        //celdaPrecio.textContent = producto.precio;
        //const celdaAcciones = document.createElement('td');
        //const botonEliminar = document.createElement('button');
        //botonEliminar.textContent = 'Eliminar';
        //botonEliminar.addEventListener('click', () => {
        //    eliminarProducto(index);
        //});
        //celdaAcciones.appendChild(botonEliminar);
        //fila.appendChild(celdaNombre);
        //fila.appendChild(celdaPrecio);
        //fila.appendChild(celdaAcciones);
        //tabla.appendChild(fila);
    