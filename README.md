# Tienda Online

Tienda Online es una aplicación web de e-commerce construida con React, TypeScript, Vite y TailwindCSS. Permite explorar productos, filtrar por categorías, añadir al carrito, gestionar favoritos y realizar compras de manera sencilla y responsiva.

## 🚀 Tecnologías principales
- React + TypeScript
- Vite
- TailwindCSS
- React Router
- Context API (Carrito y Favoritos)
- ESLint
- Vitest + Testing Library (tests)
- GitHub Actions (CI)

## 📦 Instalación

1. Clona el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/tu-repo.git
   cd tu-repo
   ```
2. Instala las dependencias:
   ```bash
   npm install
   ```
3. Inicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abre [http://localhost:5173](http://localhost:5173) en tu navegador.

## 🛠️ Scripts útiles
- `npm run dev` — Inicia el servidor de desarrollo
- `npm run build` — Compila la app para producción
- `npm run preview` — Previsualiza la build de producción
- `npm run lint` — Linting del código con ESLint
- `npm test` — Ejecuta los tests con Vitest

## 🧪 Testing
- Los tests están en la carpeta `src/components/*.test.tsx`.
- Usa [Vitest](https://vitest.dev/) y [Testing Library](https://testing-library.com/).
- Puedes agregar más tests para componentes y lógica de negocio.

## ⚙️ CI/CD
- El proyecto incluye un workflow de GitHub Actions (`.github/workflows/ci.yml`) que ejecuta lint, build y tests en cada push o pull request a `main`.

## 📱 Responsivo y Accesible
- El diseño es completamente responsive y accesible.
- Navegación por teclado y atributos ARIA incluidos.

## 📸 Créditos de imágenes
- Imágenes de productos: [Pexels](https://pexels.com) y [Unsplash](https://unsplash.com)

## 🙌 Agradecimientos
- Inspirado en las mejores prácticas de e-commerce y UI/UX.

---

¿Dudas o sugerencias? ¡Abre un issue o un pull request!
