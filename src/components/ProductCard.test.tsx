// @vitest-environment jsdom
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProductCard from './ProductCard';
import { Product } from '../types';
import { CartProvider } from '../context/CartContext';
import { FavoritesProvider } from '../context/FavoritesContext';
import { MemoryRouter } from 'react-router-dom';

const product: Product = {
  id: 99,
  name: 'Producto Test',
  price: 100,
  originalPrice: 120,
  discount: 17,
  description: 'Descripción de prueba',
  image: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?auto=compress&w=800&q=80',
  category: 'Electrónica',
  rating: 4.5,
  reviewCount: 10,
  stock: 5,
  featured: false
};

describe('ProductCard', () => {
  it('muestra el nombre y el precio del producto', () => {
    render(
      <MemoryRouter>
        <CartProvider>
          <FavoritesProvider>
            <ProductCard product={product} />
          </FavoritesProvider>
        </CartProvider>
      </MemoryRouter>
    );
    expect(screen.getByText('Producto Test')).toBeInTheDocument();
    expect(screen.getByText('$100.00')).toBeInTheDocument();
  });
}); 