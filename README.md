Enlace a repositorio gitHub: https://github.com/Didier-202/Invenario_full

# 📦 Sistema de Inventario

Sistema de Inventario desarrollado como proyecto de formación en el programa **Análisis y Desarrollo de Software (ADSO) - SENA**.

El proyecto consiste en una aplicación web para la gestión de productos, categorías, movimientos y usuarios mediante una arquitectura cliente-servidor. El frontend está desarrollado con React y se comunica con un backend mediante una API REST construida con Node.js y Express, utilizando MySQL como sistema de gestión de base de datos.

El proyecto se desarrolla de forma progresiva como parte del proceso de aprendizaje, aplicando conceptos de desarrollo frontend, backend, bases de datos, APIs REST, control de versiones, pruebas de software y organización de proyectos.

---

# 🚀 Tecnologías utilizadas

## Frontend

- React
- Vite
- JavaScript
- HTML5
- CSS3

## Backend

- Node.js
- Express.js

## Base de datos

- MySQL
- mysql2/promise

## Herramientas

- Visual Studio Code
- MySQL Workbench
- Postman
- Cypress (pruebas end-to-end)
- Git
- GitHub

---

# 📁 Estructura del proyecto

```text
Invenario_full/

├── frontend/
│   ├── cypress/
│   │   ├── e2e/
│   │   │   └── 003_login_dashboard_productos.cy.js
│   │   ├── fixtures/
│   │   └── support/
│   ├── src/
│   │   ├── components/
│   │   │   └── navbar.jsx
│   │   │
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── registro.jsx
│   │   │   ├── dashboard.jsx
│   │   │   ├── productos.jsx
│   │   │   └── usuarios.jsx
│   │   │
│   │   ├── styles/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   ├── cypress.config.js
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── config/
│   │   └── db.js
│   ├── routes/
│   │   ├── productos.js
│   │   ├── categorias.js
│   │   ├── usuarios.js
│   │   └── movimientos.js
│   │
│   ├── .env.example
│   ├── server.js
│   ├── package.json
│   └── ...
│
├── database/
│   └── sistema_inventario.sql
│
└── README.md
```

---

# 📌 Funcionalidades

### 🔐 Autenticación

- Inicio de sesión.
- Registro de usuarios.
- Validación de campos.
- Manejo del usuario activo mediante LocalStorage.
- ⚠️ Las contraseñas se almacenan y verifican en texto plano (sin hashing). Pendiente de mejora de seguridad.

### 📊 Dashboard

- Visualización general de información del sistema.
- Interfaz integrada con el resto de módulos.

### 📦 Gestión de Productos

- Consultar, registrar, actualizar y eliminar productos.
- Validación de datos.
- Comunicación con el backend mediante API REST.
- Los productos están relacionados con una categoría en la base de datos, aunque el formulario del frontend aún no permite seleccionar o editar esa categoría.

### 🗂️ Gestión de Categorías

- API REST implementada (consultar, registrar, actualizar, eliminar categorías de productos).
- 🚧 Sin interfaz en el frontend: actualmente solo se gestiona a nivel de base de datos/API.

### 🔄 Movimientos de Inventario

- API REST implementada (registrar y consultar movimientos de entrada/salida de productos, asociados a un producto y a un usuario).
- 🚧 Sin interfaz en el frontend: falta la pantalla para registrar y visualizar movimientos desde la aplicación.

### 👤 Gestión de Usuarios

- Consultar, registrar, actualizar y eliminar usuarios.
- Validación de datos (documento y teléfono numéricos, formato de correo, duplicados de usuario/correo/documento).
- Comunicación con el backend mediante API REST.
- La base de datos contempla una tabla de roles (Administrador, Empleado), pero aún no hay lógica de autorización por rol implementada en el backend ni en el frontend.

### 🧭 Navegación

- Navbar/Sidebar para desplazarse entre los diferentes módulos.
- Menú responsive.
- Menú hamburguesa para dispositivos con pantallas pequeñas.
- Cierre automático del Sidebar al seleccionar un módulo.

---

# 🔌 API REST

El backend proporciona una API REST para la comunicación entre el frontend y la base de datos.

Actualmente se encuentran implementadas operaciones para los módulos de **Productos**, **Categorías**, **Usuarios** y **Movimientos**:

```text
GET     /productos
GET     /productos/:id
POST    /productos
PUT     /productos/:id
DELETE  /productos/:id

GET     /categorias
POST    /categorias
PUT     /categorias/:id
DELETE  /categorias/:id

GET     /usuarios
GET     /usuarios/count
GET     /usuarios/:id
POST    /usuarios
POST    /usuarios/login
PUT     /usuarios/:id
DELETE  /usuarios/:id

GET     /movimientos
GET     /movimientos/:id
POST    /movimientos
```

Las solicitudes y respuestas utilizan datos en formato JSON.

La API fue probada previamente utilizando **Postman** para verificar el funcionamiento de los diferentes endpoints.

---

# 🔒 Seguridad

El backend aplica las siguientes medidas:

- Cabecera `X-Content-Type-Options: nosniff`.
- Política de seguridad de contenido (`Content-Security-Policy`) restrictiva por defecto.
- Cabecera `X-Powered-By` deshabilitada.
- CORS restringido únicamente al origen del frontend en desarrollo (`http://localhost:5173`).
- Manejo explícito de rutas no encontradas (404 en JSON) para evitar respuestas incompletas.

**Pendiente:** las contraseñas de usuario se almacenan y comparan en texto plano; se recomienda migrar a hashing (por ejemplo con `bcrypt`) antes de cualquier uso en producción.

---

# 🗄️ Base de datos

El proyecto utiliza **MySQL** como sistema de gestión de base de datos.

El repositorio incluye el archivo:

```text
database/sistema_inventario.sql
```

Este archivo crea la base de datos `sistema_inventario` y las siguientes tablas: `productos`, `categoria_productos`, `usuarios`, `roles` y `movimientos`, con las relaciones (llaves foráneas) correspondientes.

La conexión con MySQL se configura mediante variables de entorno, siguiendo el ejemplo del archivo:

```text
backend/.env.example
```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone https://github.com/Didier-202/Invenario_full.git
cd Invenario_full
```

## 2. Configurar la base de datos

Abrir **MySQL Workbench** (u otro cliente MySQL) y ejecutar el archivo:

```text
database/sistema_inventario.sql
```

## 3. Configurar variables de entorno del backend

Copiar el archivo de ejemplo y completar los datos de conexión a MySQL:

```bash
cd backend
cp .env.example .env
```

## 4. Instalar las dependencias del backend

```bash
npm install
```

## 5. Instalar las dependencias del frontend

```bash
cd ../frontend
npm install
```

---

# ▶️ Ejecución del proyecto

## Backend

Asegurarse de que el servidor de MySQL esté iniciado. Desde la carpeta `backend`:

```bash
node server.js
```

El servidor estará disponible en:

```text
http://localhost:3000
```

## Frontend

En otra terminal, desde la carpeta `frontend`:

```bash
npm run dev
```

Vite proporcionará la dirección local para acceder a la aplicación desde el navegador (por defecto `http://localhost:5173`).

---

# 🧪 Pruebas

- **Postman**: pruebas manuales de los endpoints GET, GET por ID, POST, PUT y DELETE para productos, categorías, usuarios y movimientos.
- **Cypress**: prueba automatizada end-to-end del flujo login → dashboard → productos (`frontend/cypress/e2e/003_login_dashboard_productos.cy.js`).
- También se realizaron pruebas de interacción desde el frontend para comprobar la comunicación entre React, la API REST y la base de datos MySQL.

---

# 📈 Estado actual del proyecto

✅ Frontend desarrollado con React y Vite.
✅ Backend desarrollado con Node.js y Express.
✅ API REST implementada para productos, categorías, usuarios y movimientos.
✅ Base de datos MySQL implementada, incluyendo tabla de roles.
✅ CRUD de Productos.
✅ CRUD de Categorías (solo API).
✅ CRUD de Usuarios.
✅ Registro y consulta de Movimientos (solo API).
✅ Registro e inicio de sesión.
✅ Validaciones en el frontend y backend.
✅ Dashboard funcional.
✅ Navbar/Sidebar con diseño responsive.
✅ Cabeceras de seguridad y restricción de CORS configuradas.
✅ Pruebas automatizadas end-to-end con Cypress.

🚧 Interfaz de frontend para Categorías (pendiente).
🚧 Interfaz de frontend para Movimientos de Inventario (pendiente).
🚧 Lógica de autorización por roles (pendiente, aunque la tabla de roles ya existe en la base de datos).
🚧 Hashing de contraseñas (actualmente se almacenan en texto plano).

---

# 🔮 Próximas mejoras

- Implementar la interfaz de usuario para el módulo de Movimientos de Inventario.
- Implementar la interfaz de usuario para el módulo de Categorías.
- Integrar los movimientos con el control de stock de productos.
- Implementar lógica de autorización basada en roles (Administrador / Empleado).
- Migrar el almacenamiento de contraseñas a un esquema con hashing (ej. bcrypt).
- Mejorar las funcionalidades del Dashboard.
- Continuar fortaleciendo las validaciones y el manejo de errores.

---

# 🎯 Objetivo del proyecto

Este proyecto tiene como finalidad fortalecer mis conocimientos en desarrollo web Full Stack mediante la construcción progresiva de una aplicación real.

Durante su desarrollo se aplican conceptos relacionados con:

- Desarrollo de interfaces con React.
- JavaScript.
- APIs REST.
- Node.js y Express.
- Bases de datos relacionales.
- Consultas SQL.
- Comunicación entre frontend y backend.
- Validación de datos.
- Pruebas de software (manuales y automatizadas).
- Control de versiones con Git y GitHub.
- Organización y estructuración de proyectos.

Además de cumplir con las evidencias del programa **ADSO del SENA**, el proyecto continuará evolucionando como parte de mi proceso de aprendizaje y como proyecto para mi portafolio personal.

---

# 👨‍💻 Autor

**Didier Fernando Imbachi Herrera**

Proyecto desarrollado como parte del programa de formación **Análisis y Desarrollo de Software (ADSO) - SENA**.
