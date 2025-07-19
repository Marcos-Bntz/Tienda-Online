import React from 'react';
import { Link } from 'react-router-dom';
import { Star, ShoppingCart, Heart } from 'lucide-react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-4 h-4 fill-[#FF9900] text-[#FF9900]" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half\" className="relative">
          <Star className="w-4 h-4 text-[#FF9900]" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="w-4 h-4 fill-[#FF9900] text-[#FF9900]" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-4 h-4 text-[#FF9900]" />);
    }

    return stars;
  };

  const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <Link 
      to={`/product/${product.id}`}
      className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 flex flex-col h-full"
    >
      <div className="relative pt-[75%] bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="absolute top-0 left-0 w-full h-full object-contain p-4"
        />
        {product.discount > 0 && (
          <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
            -{product.discount}%
          </span>
        )}
        <button 
          className="absolute top-2 left-2 bg-white p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          aria-label={isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          tabIndex={0}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            isFavorite(product.id) ? removeFavorite(product.id) : addFavorite(product);
          }}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              e.stopPropagation();
              isFavorite(product.id) ? removeFavorite(product.id) : addFavorite(product);
            }
          }}
        >
          <Heart className={`w-4 h-4 transition-colors ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-500 hover:text-red-500'}`} />
        </button>
      </div>

      <div className="p-4 flex-grow flex flex-col">
        <div className="flex-grow">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 h-12 text-base sm:text-lg">{product.name}</h3>
          
          <div className="flex items-center mb-1">
            <div className="flex">{renderStars(product.rating)}</div>
            <span className="text-xs text-gray-500 ml-1">({product.reviewCount})</span>
          </div>
          
          <div className="mb-2">
            {product.discount > 0 ? (
              <div>
                <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <span className="text-sm text-gray-500 line-through ml-2">
                  ${product.originalPrice.toFixed(2)}
                </span>
              </div>
            ) : (
              <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
            )}
          </div>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="w-full mt-2 bg-[#FF9900] hover:bg-[#e88a00] text-white py-2 px-4 rounded-md transition-colors flex items-center justify-center text-sm sm:text-base"
        >
          <ShoppingCart className="w-4 h-4 mr-2" />
          Añadir al carrito
        </button>
      </div>
    </Link>
  );
};

export default ProductCard;