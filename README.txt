Enlace a repositorio gitHub:   https://github.com/Didier-202/Invenario_full

# 📦 Sistema de Inventario

Sistema de Inventario desarrollado como proyecto de formación en el programa **Análisis y Desarrollo de Software (ADSO) - SENA**.

El proyecto consiste en una aplicación web para la gestión de productos y usuarios mediante una arquitectura cliente-servidor. Actualmente, el frontend está desarrollado con React y se comunica con un backend mediante una API REST construida con Node.js y Express, utilizando MySQL como sistema de gestión de base de datos.

El proyecto se desarrolla de forma progresiva como parte del proceso de aprendizaje, aplicando conceptos de desarrollo frontend, backend, bases de datos, APIs REST, control de versiones y organización de proyectos.

---

# 🚀 Tecnologías utilizadas

## Frontend

* React
* Vite
* JavaScript
* HTML5
* CSS3

## Backend

* Node.js
* Express.js

## Base de datos

* MySQL
* mysql2/promise

## Herramientas

* Visual Studio Code
* MySQL Workbench
* Postman
* Git
* GitHub

---

# 📁 Estructura del proyecto

```text
Sistema-Inventario/

├── frontend/
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
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── config/
│   ├── routes/
│   │   ├── productos.js
│   │   └── usuarios.js
│   │
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

Actualmente el sistema cuenta con los siguientes módulos:

### 🔐 Autenticación

* Inicio de sesión.
* Registro de usuarios.
* Validación de campos.
* Manejo del usuario activo mediante LocalStorage.

### 📊 Dashboard

* Visualización general de información del sistema.
* Interfaz integrada con el resto de módulos.

### 📦 Gestión de Productos

* Consultar productos.
* Registrar productos.
* Actualizar productos.
* Eliminar productos.
* Validación de datos.
* Comunicación con el backend mediante API REST.

### 👤 Gestión de Usuarios

* Consultar usuarios.
* Registrar usuarios.
* Actualizar usuarios.
* Eliminar usuarios.
* Validación de datos.
* Comunicación con el backend mediante API REST.

### 🧭 Navegación

* Navbar/Sidebar para desplazarse entre los diferentes módulos.
* Menú responsive.
* Menú hamburguesa para dispositivos con pantallas pequeñas.
* Cierre automático del Sidebar al seleccionar un módulo.

---

# 🔌 API REST

El backend proporciona una API REST para la comunicación entre el frontend y la base de datos.

Actualmente se encuentran implementadas operaciones para los módulos de **Productos** y **Usuarios**:

```text
GET     /productos
GET     /productos/:id
POST    /productos
PUT     /productos/:id
DELETE  /productos/:id

GET     /usuarios
GET     /usuarios/:id
POST    /usuarios
PUT     /usuarios/:id
DELETE  /usuarios/:id
```

Las solicitudes y respuestas utilizan datos en formato JSON.

La API fue probada previamente utilizando **Postman** para verificar el funcionamiento de los diferentes endpoints.

---

# 🗄️ Base de datos

El proyecto utiliza **MySQL** como sistema de gestión de base de datos.

El repositorio incluye el archivo:

```text
database/sistema_inventario.sql
```

Este archivo permite crear la base de datos y las tablas necesarias para ejecutar el proyecto.

La conexión con MySQL se encuentra configurada en:

```text
backend/config/db.js
```

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

Entrar al proyecto:

```bash
cd Sistema-Inventario
```

---

## 2. Configurar la base de datos

Abrir **MySQL Workbench** y ejecutar el archivo:

```text
database/sistema_inventario.sql
```

Esto creará la estructura de la base de datos necesaria para el funcionamiento del sistema.

Posteriormente, configurar los datos de conexión a MySQL en:

```text
backend/config/db.js
```

---

## 3. Instalar las dependencias del backend

Entrar a la carpeta del backend:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

---

## 4. Instalar las dependencias del frontend

Desde la carpeta principal del proyecto:

```bash
cd frontend
```

Instalar las dependencias:

```bash
npm install
```

---

# ▶️ Ejecución del proyecto

El proyecto está dividido en dos partes: **backend** y **frontend**.

## Backend

Primero asegurarse de que el servidor de MySQL esté iniciado.

Desde la carpeta `backend` ejecutar:

```bash
node server.js
```

El servidor estará disponible en:

```text
http://localhost:3000
```

## Frontend

En otra terminal, entrar a la carpeta `frontend`:

```bash
cd frontend
```

Ejecutar:

```bash
npm run dev
```

Vite proporcionará la dirección local para acceder a la aplicación desde el navegador.

---

# 🧪 Pruebas

La API REST fue probada utilizando **Postman**.

Se verificó el funcionamiento de operaciones:

* GET
* GET por ID
* POST
* PUT
* DELETE

para los endpoints correspondientes de usuarios y productos.

También se realizaron pruebas de interacción desde el frontend para comprobar la comunicación entre React, la API REST y la base de datos MySQL.

---

# 📈 Estado actual del proyecto

✅ Migración del frontend de HTML, CSS y JavaScript a React.

✅ Frontend desarrollado con React y Vite.

✅ Backend desarrollado con Node.js y Express.

✅ API REST implementada para usuarios y productos.

✅ Base de datos MySQL implementada.

✅ CRUD de Productos.

✅ CRUD de Usuarios.

✅ Registro e inicio de sesión.

✅ Validaciones en el frontend y backend.

✅ Dashboard funcional.

✅ Navbar/Sidebar con diseño responsive.

✅ Integración entre frontend, backend y base de datos.

🚧 El módulo de Movimientos de Inventario está pendiente de implementación.

---

# 🔮 Próximas mejoras

Entre las próximas etapas del proyecto se contempla:

* Implementar el módulo de Movimientos de Inventario.
* Integrar los movimientos con el control de stock.
* Mejorar las funcionalidades del Dashboard.
* Continuar fortaleciendo las validaciones y manejo de errores.
* Implementar nuevas funcionalidades según las necesidades del proyecto y las evidencias del programa ADSO.

---

# 🎯 Objetivo del proyecto

Este proyecto tiene como finalidad fortalecer mis conocimientos en desarrollo web Full Stack mediante la construcción progresiva de una aplicación real.

Durante su desarrollo se aplican conceptos relacionados con:

* Desarrollo de interfaces con React.
* JavaScript.
* APIs REST.
* Node.js y Express.
* Bases de datos relacionales.
* Consultas SQL.
* Comunicación entre frontend y backend.
* Validación de datos.
* Control de versiones con Git y GitHub.
* Organización y estructuración de proyectos.

Además de cumplir con las evidencias del programa **ADSO del SENA**, el proyecto continuará evolucionando como parte de mi proceso de aprendizaje y como proyecto para mi portafolio personal.

---

# 👨‍💻 Autor

**Didier Fernando Imbachi Herrera**

Proyecto desarrollado como parte del programa de formación **Análisis y Desarrollo de Software (ADSO) - SENA**.
