import React from 'react';
import { useFavorites } from '../context/FavoritesContext';
import ProductGrid from '../components/ProductGrid';
import { Link } from 'react-router-dom';

const WishlistPage: React.FC = () => {
  const { favorites } = useFavorites();

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-2 sm:px-4">
        <h1 className="text-2xl font-bold mb-6">Mis favoritos</h1>
        {favorites.length > 0 ? (
          <ProductGrid products={favorites} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-4 sm:p-8 text-center max-w-full sm:max-w-xl mx-auto">
            <h2 className="text-xl font-bold mb-4">No tienes productos favoritos</h2>
            <p className="text-gray-600 mb-6">Agrega productos a tu lista de favoritos haciendo clic en el corazón.</p>
            <Link 
              to="/" 
              className="inline-block w-full sm:w-auto bg-[#FF9900] hover:bg-[#e88a00] text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Volver a la tienda
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default WishlistPage; 