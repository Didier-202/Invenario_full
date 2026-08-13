Enlace a repositorio gitHub:   https://github.com/Didier-202/Invenario_full

# 📦 Sistema de Inventario

Sistema de Inventario desarrollado como proyecto de formación en el programa **Análisis y Desarrollo de Software (ADSO) - SENA**.

El objetivo del proyecto es gestionar productos, categorías, usuarios y movimientos de inventario mediante una aplicación web con arquitectura cliente-servidor.

Este proyecto hace parte de mi proceso de aprendizaje y está siendo desarrollado de forma progresiva, aplicando buenas prácticas de programación y organización del código.

---

# 🚀 Tecnologías utilizadas

## Frontend

* HTML5
* CSS3
* JavaScript

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
│   ├── css/
│   ├── js/
│   ├── pages/
│   └── ...
│
├── backend/
│   ├── config/
│   ├── routes/
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

* Gestión de Productos
* Gestión de Categorías
* Gestión de Usuarios
* Registro de Movimientos de Inventario

Los módulos implementan operaciones CRUD (Crear, Consultar, Actualizar y Eliminar), según corresponda a la lógica del sistema.

---

# ⚙️ Instalación

## 1. Clonar el repositorio

```bash
git clone <URL_DEL_REPOSITORIO>
```

---

## 2. Importar la base de datos

Abrir **MySQL Workbench** y ejecutar el archivo:

```text
database/sistema_inventario.sql
```

Esto creará las tablas y cargará los datos de ejemplo necesarios para probar el sistema.

---

## 3. Configurar el backend

Entrar a la carpeta:

```bash
cd backend
```

Instalar las dependencias:

```bash
npm install
```

Configurar los datos de conexión a MySQL en:

```text
backend/config/db.js
```

---

## 4. Ejecutar el servidor

```bash
node server.js
```

El servidor iniciará en:

```text
http://localhost:3000
```

---

# 🧪 Pruebas

La API fue probada utilizando **Postman**.

Se verificó el funcionamiento de los siguientes endpoints:

* GET
* GET por ID
* POST
* PUT
* DELETE

para los módulos correspondientes.

---

# 📈 Estado actual del proyecto

✅ Backend funcional desarrollado con Node.js, Express y MySQL.

✅ Base de datos relacional completamente implementada.

✅ CRUD de Productos.

✅ CRUD de Categorías.

✅ CRUD de Usuarios.

✅ Registro de Movimientos de Inventario.

Actualmente el frontend continúa utilizando LocalStorage. En una siguiente etapa será conectado a la API REST desarrollada en este proyecto para reemplazar completamente el almacenamiento local.

---

# 🎯 Objetivo del proyecto

Este proyecto tiene como finalidad fortalecer mis conocimientos en desarrollo web Full Stack, aplicando conceptos de bases de datos relacionales, APIs REST, control de versiones y buenas prácticas de desarrollo de software.

Además de cumplir con las evidencias del programa ADSO del SENA, el proyecto continuará evolucionando como parte de mi portafolio personal.
