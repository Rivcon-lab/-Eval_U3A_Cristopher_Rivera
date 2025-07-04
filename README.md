# Tejelanas Vivi - Landing Page

Landing page informativa para el emprendimiento "Tejelanas Vivi", dedicado a la venta de insumos para tejido y la organización de talleres de crochet en Laguna de Zapallar, Chile.

## 🚀 Características

- Diseño moderno, pastel y responsivo
- Componentes reutilizables
- Carrusel de imágenes adaptativo y visualmente armonioso (imágenes centradas, fondo pastel, bordes redondeados y sombra)
- Formulario de contacto seguro con botón directo a WhatsApp
- Testimonios de clientes
- Footer con acceso a Instagram
- Accesibilidad y buen contraste

## 🛠️ Tecnologías

- React (JavaScript)
- Material-UI
- React Router
- Framer Motion
- Formik + Yup
- React Slick
- Axios
- Vite

## 🎨 Paleta de Colores

Utiliza una paleta pastel armónica:

- `#f191ac` (rosa fuerte)
- `#f6a6bb` (rosa medio)
- `#f4bbc9` (rosa claro)
- `#fae6e7` (rosa muy claro)
- `#f7eeed` (casi blanco)
- Textos: negro profundo (`#111`)

## 🧑‍💻 Buenas Prácticas

- Usa nombres descriptivos y en inglés para componentes y variables.
- Componentes en PascalCase, funciones y variables en camelCase.
- Mantén los componentes pequeños y reutilizables.
- Usa carpetas por feature o dominio si el proyecto crece.
- Usa hooks para lógica reutilizable.
- Valida siempre los formularios en el cliente y, si es posible, en el servidor.
- Usa la paleta de colores y tipografía definida en el theme.
- Asegura contraste suficiente en los textos y botones.
- Usa `alt` descriptivo en todas las imágenes.
- Usa `loading="lazy"` en imágenes grandes para optimizar la carga.
- Documenta tus componentes y funciones principales.
- Haz commits claros y concisos, y usa ramas para cada feature.

## 📦 Instalación

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/tejelanas-vivi.git
```

2. Instala las dependencias:
```bash
cd tejelanas-vivi
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

4.Habilitar  cors anywhere a fin de que carguen los llamados a la api externa.
```

https://cors-anywhere.herokuapp.com/corsdemo
```

## 🏗️ Estructura del Proyecto

```
src/
├── components/         # Componentes reutilizables
├── pages/              # Páginas principales
├── layouts/            # Layouts y templates
├── services/           # Servicios y APIs
├── styles/             # Estilos globales
```

## 📝 Build y Exportación

Para generar la versión de producción:
```bash
npm run build
```
El sitio exportado estará en la carpeta `dist/` y puedes subirlo a Netlify, Vercel, Firebase Hosting, etc.

Para previsualizar el build localmente:
```bash
npm run preview
```

## 🎨 Ejemplo de Componentes

### ServiceCard
```jsx
<ServiceCard
  image="url"
  title="Título"
  description="Descripción"
  productId="id-del-producto"
/>
```

### ImageCarousel
Carrusel de imágenes que muestra las imágenes completas, centradas, con fondo pastel, bordes redondeados y sombra para mejor visualización y armonía visual:
```jsx
<ImageCarousel
  images={images}
  autoplay={true}
  interval={5000}
/>
```
