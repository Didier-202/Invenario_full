// mostrar total de usuarios registrados. 

    document.getElementById("cantidadUsuarios").textContent =  
    usuarios.length;  // agrega cantidad de usuarios registrados del array "usuarios" conel id "cantidadUsuarios", usamos .length para saber cuantos elementos tiene el array

// mostrar cantidad de productos. 
    document.getElementById("cantidadProductos").textContent =  
    productos.length;  // agrega cantidad de productos registrados del array "productos" conel id "cantidadProductos", usamos .length para saber cuantos elementos tiene el array

// mostrar cantidad de unidades de todos los productos. 
    
    let totalUnidades = 0;  // variable para almacenar la cantidad total de unidades

    productos.forEach( (elemento) => {   // recorre el array de productos 
        let {cantidad} = elemento;       // obtiene la cantidad de cada producto
        totalUnidades += Number(cantidad);  // suma la cantidad a la variable total (number convierte a numero los datos que extraemos del array)
    });

    document.getElementById("cantidadUnidades").textContent = totalUnidades;  // agrega cantidad de unidades registrados del array "productos" conel id "cantidadUnidades" 

// Mostrar el valor del inventario. 

    let totalInventario = 0;  // variable para almacenar el valor total del inventario

    productos.forEach( (elemento) => {   // recorre el array de productos 
        let {precio, cantidad} = elemento;       // obtiene el precio y la cantidad de cada producto
        totalInventario += Number(precio) * Number(cantidad);  // multiplica el precio por la cantidad y lo suma a la variable total (number convierte a numero los datos que extraemos del array)
    });

    document.getElementById("valorInventario").textContent = "$ "+ totalInventario;  // agrega el valor del inventario con el id "totalInventario"