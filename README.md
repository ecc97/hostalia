
# Hostalia - MVP de Reservas de Alojamientos

> Proyecto MVP para gestión y reservas de alojamientos, desarrollado con Next.js 15, Appwrite y Zustand.

---

## Descripción
Hostalia es una plataforma web que permite a los usuarios explorar alojamientos, ver detalles, buscar, filtrar y realizar reservas. Incluye panel de administración, autenticación, paginación, integración con Appwrite para base de datos y almacenamiento, y un flujo completo de reservas.

---

## Tecnologías principales
- **Next.js 15** (App Router, SSR, CSR)
- **React 19**
- **TypeScript**
- **Appwrite** (Base de datos, autenticación, almacenamiento)
- **Zustand** (state management)
- **Sass** y **TailwindCSS** (estilos)
- **Framer Motion** (animaciones)
- **React Icons**

---

## Estructura del proyecto
```
├── src/
│   ├── actions/           # Lógica de negocio y acceso a Appwrite
│   ├── app/               # Rutas y páginas Next.js (App Router)
│   ├── components/        # Componentes compartidos y de UI
│   ├── interfaces/        # Tipos y contratos TypeScript
│   ├── lib/               # Configuración de Appwrite
│   ├── store/             # Zustand stores
│   ├── styles/            # Estilos globales y parciales
│   └── utils/             # Utilidades varias
├── public/                # Recursos estáticos
├── package.json           # Dependencias y scripts
├── next.config.js         # Configuración Next.js
├── README.md              # Este archivo
```

---

## Funcionalidades principales
- **Autenticación de usuarios** (registro, login, logout)
- **Gestión de alojamientos** (crear, listar, ver detalles, buscar, paginar)
- **Reservas**
  - Crear reservas para un alojamiento
  - Guardar datos del alojamiento en la reserva (nombre, precio, ubicación)
  - Listar reservas del usuario
  - Cancelar reservas
- **Panel de usuario** (dashboard)
- **Búsqueda y filtrado** de alojamientos
- **Paginación** en listados
- **Carga y visualización de imágenes**
- **Permisos personalizados en Appwrite** para seguridad de datos

---

## Instalación y ejecución

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/ecc97/hostalia.git
   cd hostalia
   ```
2. **Instala dependencias:**
   ```bash
   npm install
   # o yarn install
   ```
3. **Configura variables de entorno:**
   Crea un archivo `.env.local` con las siguientes variables:
   ```env
   NEXT_PUBLIC_APPWRITE_HOST_URL=<tu-endpoint-appwrite>
   NEXT_PUBLIC_APPWRITE_PROJECT_ID=<tu-project-id>
   NEXT_PUBLIC_APPWRITE_DATABASE_ID=<tu-database-id>
   NEXT_PUBLIC_APPWRITE_BUCKET_ID=<tu-bucket-id>
   NEXT_PUBLIC_APP_URL=http://localhost:3000
   ```
4. **Ejecuta el proyecto en desarrollo:**
   ```bash
   npm run dev
   ```
5. **Abre en tu navegador:**
   [http://localhost:3000](http://localhost:3000)

---

## Configuración de Appwrite
- **Colecciones:**
  - `accommodations`: alojamientos (campos: name, description, price, location, images, ...)
  - `bookings`: reservas (campos: userId, accommodationId, guests, startDate, endDate, status, accommodationName, accommodationPrice, accommodationLocation)
- **Permisos:**
  - Solo el usuario dueño puede leer, actualizar o eliminar su reserva.
  - Los alojamientos pueden ser públicos o restringidos según el flujo.
- **Bucket de imágenes:**
  - Para almacenar imágenes de alojamientos.

---

## Scripts útiles
- `npm run dev` - Desarrollo
- `npm run build` - Build de producción
- `npm run start` - Servidor de producción
- `npm run lint` - Linter

---

## Notas y recomendaciones
- El proyecto está pensado como MVP, por lo que la lógica de reservas es sencilla y puede ampliarse fácilmente.
- Para producción, revisa los permisos en Appwrite y la gestión de errores.
- Puedes desplegar en Vercel, Netlify o cualquier plataforma compatible con Next.js.


## Licencia
MIT
