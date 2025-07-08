import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowUpDown, Filter, X } from 'lucide-react';
import ProductGrid from '../components/ProductGrid';
import { products, categories } from '../data/products';
import { Product } from '../types';

const CategoryPage: React.FC = () => {
  const { category } = useParams<{ category: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [sortOption, setSortOption] = useState<string>('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [showFilters, setShowFilters] = useState(false);
  
  const allCategories = categories.map(c => c.name.toLowerCase());
  
  const getCategoryName = () => {
    if (category === 'all') return 'Todos los productos';
    return categories.find(c => c.name.toLowerCase() === category)?.name || 'Categoría';
  };

  // Aplicar filtros y ordenación
  useEffect(() => {
    let filtered = [...products];
    
    // Filtrar por categoría
    if (category && category !== 'all') {
      filtered = filtered.filter(p => p.category.toLowerCase() === category);
    }
    
    // Filtrar por rango de precio
    filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    
    // Ordenar resultados
    if (sortOption === 'price_asc') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === 'price_desc') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (sortOption === 'discount') {
      filtered.sort((a, b) => b.discount - a.discount);
    }
    
    setFilteredProducts(filtered);
  }, [category, sortOption, priceRange]);

  // Si la categoría no existe, mostrar mensaje
  if (category !== 'all' && !allCategories.includes(category || '')) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Categoría no encontrada</h2>
          <p className="mb-6">Lo sentimos, la categoría que buscas no existe.</p>
          <Link 
            to="/" 
            className="inline-block bg-[#FF9900] hover:bg-[#e88a00] text-white font-medium py-2 px-6 rounded-md transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        {/* Cabecera de la categoría */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold mb-2">{getCategoryName()}</h1>
          <p className="text-gray-600">{filteredProducts.length} productos encontrados</p>
        </div>
        
        {/* Controles de filtrado y ordenación */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex items-center mb-4 md:mb-0">
              <button 
                onClick={() => setShowFilters(!showFilters)} 
                className="flex items-center text-gray-700 hover:text-[#FF9900] mr-4 transition-colors"
              >
                <Filter className="h-5 w-5 mr-1" />
                <span className="font-medium">Filtros</span>
              </button>
              
              {/* Mostrar filtros activos */}
              {(priceRange[0] > 0 || priceRange[1] < 2000) && (
                <div className="flex items-center bg-gray-100 px-3 py-1 rounded text-sm">
                  <span>Precio: €{priceRange[0]} - €{priceRange[1]}</span>
                  <button 
                    onClick={() => setPriceRange([0, 2000])}
                    className="ml-2 text-gray-500 hover:text-gray-700"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex items-center">
              <ArrowUpDown className="h-5 w-5 text-gray-500 mr-2" />
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border-gray-300 rounded-md focus:ring-[#FF9900] focus:border-[#FF9900]"
              >
                <option value="featured">Destacados</option>
                <option value="price_asc">Precio: menor a mayor</option>
                <option value="price_desc">Precio: mayor a menor</option>
                <option value="rating">Mejor valorados</option>
                <option value="discount">Mayores descuentos</option>
              </select>
            </div>
          </div>
          
          {/* Panel de filtros */}
          {showFilters && (
            <div className="mt-4 pt-4 border-t border-gray-200">
              <div>
                <h3 className="font-medium mb-3">Rango de precio</h3>
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={priceRange[0]}
                    onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])}
                    className="w-full"
                  />
                  <input
                    type="range"
                    min="0"
                    max="2000"
                    step="50"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600 mt-1">
                  <span>€{priceRange[0]}</span>
                  <span>€{priceRange[1]}</span>
                </div>
              </div>
              
              {/* Categorías */}
              {category === 'all' && (
                <div className="mt-4">
                  <h3 className="font-medium mb-3">Categorías</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((cat) => (
                      <Link 
                        key={cat.id}
                        to={`/category/${cat.name.toLowerCase()}`}
                        className="flex items-center justify-between px-3 py-2 bg-gray-50 hover:bg-gray-100 rounded transition-colors"
                      >
                        <span>{cat.name}</span>
                        <span className="text-sm text-gray-500">({cat.count})</span>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
        
        {/* Rejilla de productos */}
        {filteredProducts.length > 0 ? (
          <ProductGrid products={filteredProducts} />
        ) : (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-bold mb-4">No se encontraron productos</h2>
            <p className="text-gray-600 mb-6">Intenta con otros filtros o categorías.</p>
            <Link 
              to="/" 
              className="inline-block bg-[#FF9900] hover:bg-[#e88a00] text-white font-medium py-2 px-6 rounded-md transition-colors"
            >
              Ver todos los productos
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryPage;