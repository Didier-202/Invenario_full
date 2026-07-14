let indiceEditar = null;



// USUARIO ACTIVO
document.getElementById("usuarioActivo").textContent =  
localStorage.getItem("usuarioActivo"); // Nombre de usuario que inicia sesion mostrado en el sidebar

//cambio de modulo // 

function mostrarModulo(modulo) {
  document.getElementById("modUsuarios").style.display = "none";   // 
  document.getElementById("modProductos").style.display = "none";
  document.getElementById("modDashboard").style.display = "none";

  if (modulo === "usuarios") {
    document.getElementById("modUsuarios").style.display = "block";
  } else if (modulo === "productos") {
    document.getElementById("modProductos").style.display = "block";
  }
  else if (modulo === "dashboard") {
    document.getElementById("modDashboard").style.display = "block";
  }


  // cerrar el sidebar en movil
  if (window.innerWidth <= 768) {
    document.querySelector('.sidebar').classList.toggle('open');
    document.getElementById('sidebarOverlay').classList.toggle('active');
  }
}

// =====================
// CARGAR USUARIOS
// =====================

function cargarUsuarios() {
  const tabla = document.getElementById("tablaUsuarios");  // Obtener referencia a la tabla
  tabla.innerHTML = "";

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  //Obtener datos del local Storage y los convierte en array ([vacio] si no hay datos)
// Recorrer usuarios y mostrar en tabla
  usuarios.forEach((u, index) => {
    // Agregar fila a la tabla por cada usuario
    tabla.innerHTML += `
      <tr>
        <td class="celdaName">${u.nombre}</td>  
        <td>${u.documento}</td>
        <td>${u.telefono}</td>
        <td>${u.correo}</td>
        <td>${u.user}</td>
        <td class="celdaAcciones">
          <button class="btn btn-edit" title="Editar" onclick="editarUsuario(${index})">✏️Editar</button>
          <button class="btn btn-delete" title="Eliminar" onclick="eliminarUsuario(${index})">🗑️ Eliminar</button> 
        </td>
      </tr>
    `;
  });
}

// ELIMINAR USUARIO
function eliminarUsuario(index) {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  // Obtener datos del local Storage ([] si no hay datos )

  if (confirm("¿Eliminar usuario?")) {
    usuarios.splice(index, 1);  // Eliminar usuario del array
    localStorage.setItem("usuarios", JSON.stringify(usuarios));  // Guardar cambios en local Storage
    cargarUsuarios();
  }
}

// EDITAR USUARIO
function editarUsuario(index) {  // Obtener datos del usuario a editar
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  // Obtener datos del local Storage ([] si no hay datos)
  const usuario = usuarios[index];

  indiceEditar = index;   

  document.getElementById("editNombre").value = usuario.nombre;  // Rellenar o cambiar formulario con datos del usuario .. y asi con los demás
  document.getElementById("editDocumento").value = usuario.documento;
  document.getElementById("editTelefono").value = usuario.telefono;
  document.getElementById("editCorreo").value = usuario.correo;

  document.getElementById("formEditar").style.display = "block";  // Mostrar formulario de edición
}

// GUARDAR CAMBIOS DE USUARIO EDITADO

function guardarCambios() {
  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  // Obtener datos del local Storage

  usuarios[indiceEditar].nombre = document.getElementById("editNombre").value;  // Actualizar datos del usuario con valores del formulario
  usuarios[indiceEditar].documento = document.getElementById("editDocumento").value;
  usuarios[indiceEditar].telefono = document.getElementById("editTelefono").value;
  usuarios[indiceEditar].correo = document.getElementById("editCorreo").value;

  localStorage.setItem("usuarios", JSON.stringify(usuarios));
  document.getElementById("formEditar").style.display = "none";   // Ocultar formulario de edición
  cargarUsuarios();
}


// =====================
// SESIÓN
// =====================

function cerrarSesion() {
  localStorage.removeItem("usuarioActivo");
  window.location.href = "login.html";
}

// INICIO
cargarUsuarios();

// Toggle sidebar
function toggleSidebar() {
  document.querySelector('.sidebar').classList.toggle('open');
  document.getElementById('sidebarOverlay').classList.toggle('active');
}


// mostrar productos al cargar la pagina// 
window.onload = function() {
  mostrarModulo("dashboard");  
}




let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

console.log(usuarios);

console.log(typeof usuarios);

console.log(Array.isArray(usuarios));
