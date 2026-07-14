// MOSTRAR Y OCULTAR SECCIONES
function mostrarRegistro() {
  document.getElementById("login").classList.add("hidden");  // Ocultar sección de login
  document.getElementById("registro").classList.remove("hidden");  // Mostrar sección de registro
}

function mostrarLogin() {
  document.getElementById("registro").classList.add("hidden"); // Ocultar sección de registro
  document.getElementById("login").classList.remove("hidden");  // Mostrar sección de login
}

// LIMPIAR ERRORES

function limpiarErrores() {
  document.querySelectorAll(".error").forEach(e => e.textContent = "");  // Limpiar mensajes de error
  document.querySelectorAll("input").forEach(i => i.classList.remove("errorInput")); 
}

// MOSTRAR MENSAJE DE ERROR
function setError(id, mensaje, inputId) {  // Mostrar mensaje de error y resaltar campo
  document.getElementById(id).textContent = mensaje;  
  document.getElementById(inputId).classList.add("errorInput"); // Resaltar campo con error
}

// VALIDACIÓN DE CORREO
function validarEmail(correo) {  // Expresión para validar formato de correo
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo); // Retorna true si el correo es válido, false si no
}

// REGISTRAR USUARIO
function registrar() {
  limpiarErrores();  // Limpiar mensajes de error

  const nombre = document.getElementById("nombre").value.trim();  // Obtener y limpiar espacios del nombre.. y así con los demás campos
  const documento = document.getElementById("documento").value.trim();
  const telefono = document.getElementById("telefono").value.trim();
  const correo = document.getElementById("correo").value.trim();
  const user = document.getElementById("regUser").value.trim();  
  const pass = document.getElementById("regPass").value; 
  const confirmPass = document.getElementById("confirmPass").value; 

  let valido = true;

  // VALIDACIONES
  if (!nombre) {   // Validar que el nombre no este vacio... y así con los demás campos
    setError("errorNombre", "Ingrese su nombre", "nombre");  
    valido = false;
  }

  if (!documento) {
    setError("errorDocumento", "Ingrese su documento", "documento");
    valido = false;
  }

  if (!telefono || isNaN(telefono)) {
    setError("errorTelefono", "Teléfono inválido", "telefono");
    valido = false;
  }

  if (!correo || !validarEmail(correo)) {
    setError("errorCorreo", "Correo inválido", "correo");
    valido = false;
  }

  if (!user || user.length < 4) {   // Validar que el usuario tenga al menos 4 caracteres
    setError("errorUser", "Usuario mínimo 4 caracteres", "regUser");
    valido = false;
  }

  if (!pass || pass.length < 6) {    // Validar que la contraseña tenga al menos 6 caracteres
    setError("errorPass", "Contraseña mínimo 6 caracteres", "regPass");
    valido = false;
  }

  if (pass !== confirmPass) {   // Validar que las contraseñas coincidan
    setError("errorConfirmPass", "Las contraseñas no coinciden", "confirmPass");
    valido = false;
  }

  if (!valido) return;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  // Obtener datos del local Storage o iniciar array vacío si no hay datos

  const existe = usuarios.find(u => u.user === user);  // Verificar si el usuario ya existe en el array de usuarios
  if (existe) {                                         // Si el usuario ya existe mostrar mensaje de error
    setError("errorUser", "Usuario ya existe", "regUser");
    return;
  }

  const nuevoUsuario = {  // Crear nuevo usuario con los datos del formulario
    nombre,
    documento,
    telefono,
    correo,
    user,
    pass
  };

  usuarios.push(nuevoUsuario);  // Agregar nuevo usuario al array de usuarios
  localStorage.setItem("usuarios", JSON.stringify(usuarios));  // Guardar el array actualizado en el local Storage

  // MENSAJE BONITO
  const card = document.getElementById("registro");  // Obtener referencia a la tarjeta de registro
  card.innerHTML += `<p class="success">✅ Usuario registrado correctamente</p>`;

  setTimeout(() => {  // Después de 1.5 segundos mostrar la sección de login
    mostrarLogin();
  }, 1500);
}
// LOGIN
function login() {
  const user = document.getElementById("loginUser").value;  // Obtener valor del campo de usuario
  const pass = document.getElementById("loginPass").value;

  let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];  // Obtener datos del local Storage o iniciar array vacío si no hay datos

  const validUser = usuarios.find(u => u.user === user && u.pass === pass);  // Verificar si existe un usuario con el mismo nombre de usuario y contraseña en el array de usuarios

  if (validUser) {  // Si el usuario y contraseña son correctos guardar el usuario activo en el local Storage y redirigir al dashboard
    localStorage.setItem("usuarioActivo", user);
    window.location.href = "../pages/dashboard.html";
    
    // Aquí luego rediriges al sistema de inventario
    // window.location.href = "dashboard.html";
    
  } else {
    alert("Usuario o contraseña incorrectos");  // Si el usuario y contraseña no son correctos mostrar mensaje de error
  }
}

// LIMPIAR FORMULARIO DE REGISTRO

function limpiarFormularioRegistro() {  // Limpiar campos del formulario de registro 
  document.getElementById("nombre").value = ""; // Limpiar campo de nombre... y así con los demás campos
  document.getElementById("documento").value = "";
  document.getElementById("telefono").value = "";
  document.getElementById("correo").value = "";
  document.getElementById("regUser").value = "";
  document.getElementById("regPass").value = "";
  document.getElementById("confirmPass").value = "";
}