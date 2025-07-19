import React from 'react';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const OffersPage: React.FC = () => {
  const discountedProducts = products
    .filter(product => product.discount > 0)
    .sort((a, b) => b.discount - a.discount);

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-2 sm:px-4">
        <h1 className="text-2xl font-bold mb-6 text-[#FF9900]">Ofertas del día</h1>
        {discountedProducts.length > 0 ? (
          <ProductGrid products={discountedProducts} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">No hay ofertas disponibles</h2>
            <p className="text-gray-600 mb-6">Vuelve más tarde para ver nuevas promociones.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default OffersPage; 