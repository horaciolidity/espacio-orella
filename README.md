# Espacio Orellana — Sitio (Vite + React)

Este repositorio contiene una versión inicial del sitio para Espacio Orellana, ahora estructurada como una aplicación con Vite + React.

Archivos y carpetas clave:

- [index.html](index.html) — plantilla Vite que monta la app React.
- [package.json](package.json) — scripts y dependencias.
- [vite.config.js](vite.config.js) — configuración de Vite.
- [src/App.jsx](src/App.jsx) — componente principal con secciones.
- [src/main.jsx](src/main.jsx) — entrada React.
- [src/index.css](src/index.css) — estilos globales (paleta: verde oscuro y blanco).
- [public/assets/photos](public/assets/photos) — carpeta para subir tus fotos de galería.

Cómo ejecutar (local):

1. Instala dependencias:

```bash
npm install
```

2. Inicia el servidor de desarrollo:

```bash
npm run dev
```

3. Abre la URL que muestre Vite (por defecto http://localhost:5173).

Dónde poner las fotos:

Coloca las imágenes de la galería en `public/assets/photos`. En `src/App.jsx` hay referencias de ejemplo a `/assets/photos/photo1.jpg` etc. Nombres sugeridos:

- `public/assets/photos/hero.jpg` — imagen hero (opcional)
- `public/assets/photos/photo1.jpg`, `photo2.jpg`, ... — imágenes de galería

Estilo y paleta:

- Color principal: verde oscuro (`#114033`)
- Fondos/textos claros: blanco

Siguientes pasos sugeridos:

- Reemplazar o ajustar el contenido en `src/App.jsx` con textos y fotos definitivas.
- Conectar el formulario a un servicio (Formspree, Netlify Forms) o añadir un backend.
- Personalizar tipografías y optimizar accesibilidad.

