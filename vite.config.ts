import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: '/Tienda-Online/',
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

// Configuración de test para Vitest (solo si usas Vitest)
// Si usas Vitest, crea un archivo vite.config.test.ts o usa la opción test en un bloque separado
