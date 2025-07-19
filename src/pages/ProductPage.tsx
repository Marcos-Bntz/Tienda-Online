import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Star, Truck, ShieldCheck, RotateCcw, Minus, Plus, ArrowLeft, Heart } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import ProductGrid from '../components/ProductGrid';

const ProductPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();
  const [quantity, setQuantity] = useState(1);
  const navigate = useNavigate();
  
  const product = products.find(p => p.id === Number(id));
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl font-bold">Producto no encontrado</h2>
        <Link to="/" className="text-blue-600 hover:underline mt-4 inline-block">Volver al inicio</Link>
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  const handleBuyNow = () => {
    addToCart(product, quantity);
    navigate('/cart');
  };

  const renderStars = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={i} className="w-5 h-5 fill-[#FF9900] text-[#FF9900]" />);
    }

    if (hasHalfStar) {
      stars.push(
        <div key="half\" className="relative">
          <Star className="w-5 h-5 text-[#FF9900]" />
          <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
            <Star className="w-5 h-5 fill-[#FF9900] text-[#FF9900]" />
          </div>
        </div>
      );
    }

    const emptyStars = 5 - stars.length;
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<Star key={`empty-${i}`} className="w-5 h-5 text-[#FF9900]" />);
    }

    return stars;
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs y navegación */}
        <div className="mb-6">
          <Link to="/" className="text-gray-600 hover:text-[#FF9900] transition-colors flex items-center">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Volver a la tienda
          </Link>
          <div className="text-sm text-gray-500 mt-2">
            <Link to="/" className="hover:text-[#FF9900] transition-colors">Inicio</Link>
            {' > '}
            <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-[#FF9900] transition-colors">
              {product.category}
            </Link>
            {' > '}
            <span className="text-gray-700">{product.name}</span>
          </div>
        </div>

        {/* Contenido principal del producto */}
        <div className="bg-white rounded-lg shadow-md p-4 md:p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Imagen del producto */}
            <div className="bg-gray-50 rounded-lg p-4 flex items-center justify-center">
              <img 
                src={product.image} 
                alt={product.name} 
                className="max-h-[400px] object-contain"
              />
            </div>

            {/* Información del producto */}
            <div>
              <div className="flex items-center mb-2">
                <h1 className="text-2xl font-bold text-gray-900 mr-2">{product.name}</h1>
                <button
                  aria-label={isFavorite(product.id) ? 'Quitar de favoritos' : 'Agregar a favoritos'}
                  tabIndex={0}
                  onClick={() => isFavorite(product.id) ? removeFavorite(product.id) : addFavorite(product)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      isFavorite(product.id) ? removeFavorite(product.id) : addFavorite(product);
                    }
                  }}
                  className="ml-1 p-1 rounded-full bg-white hover:bg-gray-100 border border-gray-200 transition-colors"
                >
                  <Heart className={`w-6 h-6 transition-colors ${isFavorite(product.id) ? 'fill-red-500 text-red-500' : 'text-gray-400 hover:text-red-500'}`} />
                </button>
              </div>
              
              {/* Valoraciones */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {renderStars(product.rating)}
                </div>
                <span className="text-sm text-gray-600">{product.reviewCount} valoraciones</span>
              </div>
              
              {/* Precio */}
              <div className="mb-4">
                {product.discount > 0 ? (
                  <>
                    <div className="flex items-center">
                      <span className="text-sm bg-red-600 text-white px-2 py-0.5 rounded-md mr-2">
                        -{product.discount}%
                      </span>
                      <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                    </div>
                    <div className="mt-1 flex items-center">
                      <span className="text-gray-500 line-through mr-2">${product.originalPrice.toFixed(2)}</span>
                      <span className="text-green-600">
                        Ahorras: ${ (product.originalPrice - product.price).toFixed(2) }
                      </span>
                    </div>
                  </>
                ) : (
                  <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                )}
              </div>
              
              {/* Descripción */}
              <p className="text-gray-700 mb-6">{product.description}</p>
              
              {/* Disponibilidad */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <p className="text-green-600 font-medium">
                    {product.stock > 10 ? 'En stock' : `¡Solo quedan ${product.stock} unidades!`}
                  </p>
                ) : (
                  <p className="text-red-600 font-medium">Agotado</p>
                )}
              </div>
              
              {/* Selector de cantidad */}
              <div className="mb-6">
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
                  Cantidad
                </label>
                <div className="flex items-center">
                  <button 
                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                    className="bg-gray-200 hover:bg-gray-300 rounded-l-md p-2 transition-colors"
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <input
                    type="number"
                    id="quantity"
                    min="1"
                    max={product.stock}
                    value={quantity}
                    onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                    className="w-16 text-center border-gray-200 border-y py-2 focus:outline-none"
                  />
                  <button 
                    onClick={() => setQuantity(prev => Math.min(product.stock, prev + 1))}
                    className="bg-gray-200 hover:bg-gray-300 rounded-r-md p-2 transition-colors"
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>
              
              {/* Botón de compra */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <button
                  onClick={handleAddToCart}
                  className="bg-[#FF9900] hover:bg-[#e88a00] text-white py-3 px-6 rounded-md transition-colors font-medium"
                  disabled={product.stock <= 0}
                >
                  Añadir al carrito
                </button>
                <button
                  onClick={handleBuyNow}
                  className="bg-[#131921] hover:bg-[#232f3e] text-white py-3 px-6 rounded-md transition-colors font-medium"
                  disabled={product.stock <= 0}
                >
                  Comprar ahora
                </button>
              </div>
              
              {/* Características adicionales */}
              <div className="border-t border-gray-200 pt-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-center">
                    <Truck className="h-5 w-5 text-[#FF9900] mr-2" />
                    <span className="text-sm text-gray-700">Envío gratuito</span>
                  </div>
                  <div className="flex items-center">
                    <ShieldCheck className="h-5 w-5 text-[#FF9900] mr-2" />
                    <span className="text-sm text-gray-700">Garantía 2 años</span>
                  </div>
                  <div className="flex items-center">
                    <RotateCcw className="h-5 w-5 text-[#FF9900] mr-2" />
                    <span className="text-sm text-gray-700">30 días devolución</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Productos relacionados */}
        {relatedProducts.length > 0 && (
          <ProductGrid products={relatedProducts} title="Productos relacionados" />
        )}
      </div>
    </div>
  );
};

export default ProductPage;