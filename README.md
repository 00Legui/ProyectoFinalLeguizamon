# E-commerce React App

## Descripción
Este proyecto es un e-commerce desarrollado con React, Firebase y otras tecnologías modernas. Permite a los usuarios navegar por diferentes categorías de productos, agregarlos al carrito y realizar compras. Incluye autenticación de usuarios y gestión de órdenes.

## Características
- Navegación por categorías de productos
- Carrito de compras
- Autenticación de usuarios
- Gestión de órdenes
- Integración con Firebase
- Diseño responsive
- Control de stock en tiempo real

## Tecnologías Utilizadas
- React
- React Router DOM
- Firebase (Firestore & Auth)
- CSS Modules
- Context API

## Instalación

1. Clona el repositorio
```bash
git clone https://github.com/00Legui/ProyectoFinalLeguizamon.git
```

2. Instala las dependencias
```bash
npm install
```

3. Crea un archivo `.env` en la raíz del proyecto y agrega tus credenciales de Firebase:
```plaintext
REACT_APP_FIREBASE_API_KEY=tu-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=tu-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=tu-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-sender-id
REACT_APP_FIREBASE_APP_ID=tu-app-id
```

4. Inicia el servidor de desarrollo
```bash
npm start
```

## Estructura del Proyecto

src/
├── components/
│ ├── Auth/
│ │ ├── Login.jsx
│ │ └── Register.jsx
│ ├── Cart/
│ │ └── Cart.jsx
│ ├── Checkout/
│ │ └── Checkout.jsx
│ ├── ItemDetail/
│ │ └── ItemDetail.jsx
│ └── Navbar/
│ └── NavBar.jsx
├── context/
│ ├── AuthContext.jsx
│ └── CartContext.jsx
├── firebase/
│ └── config.js
└── services/
└── firebase.js


## Configuración de Firebase

1. Crea un proyecto en Firebase
2. Habilita Authentication y Firestore
3. Configura las reglas de Firestore:
```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /productos/{productId} {
      allow read: true;
      allow write: true;
    }
    match /ordenes/{orderId} {
      allow read: true;
      allow write: true;
    }
  }
}
```

## Uso
- Los usuarios pueden navegar por los productos sin necesidad de autenticarse
- Para agregar productos al carrito y realizar compras, es necesario iniciar sesión
- Los administradores pueden gestionar productos y órdenes desde la consola de Firebase

## Estructura de la Base de Datos

### Colección: productos
```javascript
{
  title: String,
  price: Number,
  stock: Number,
  categoria: String,
  description: String,
  imageUrl: String
}
```

### Colección: ordenes
```javascript
{
  buyer: {
    name: String,
    phone: String,
    email: String
  },
  items: Array,
  total: Number,
  date: Timestamp
}
```

## Funcionalidades Principales
- Listado de productos con filtrado por categorías
- Detalle de producto con selección de cantidad
- Carrito de compras con gestión de productos
- Proceso de checkout
- Autenticación de usuarios
- Historial de órdenes
- Control de stock

## Contribución
Si deseas contribuir al proyecto:
1. Haz un Fork del repositorio
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`)
3. Realiza tus cambios
4. Haz commit de tus cambios (`git commit -m 'Agrega nueva característica'`)
5. Haz push a la rama (`git push origin feature/nueva-caracteristica`)
6. Abre un Pull Request


## Contacto
Luciano Leguizamon - luciano.leguiz@gmail.com

Link del proyecto: https://github.com/00Legui/ProyectoFinalLeguizamon.git
