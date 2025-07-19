import React from 'react';
import { Link } from 'react-router-dom';
import FeaturedCarousel from '../components/FeaturedCarousel';
import ProductGrid from '../components/ProductGrid';
import { products } from '../data/products';

const bannerImages = [
  "https://images.pexels.com/photos/5632402/pexels-photo-5632402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/4482900/pexels-photo-4482900.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/6214477/pexels-photo-6214477.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

const categories = [
  {
    name: "Electrónica",
    image: "https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "electronica"
  },
  {
    name: "Computación",
    image: "https://images.pexels.com/photos/129208/pexels-photo-129208.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "computacion"
  },
  {
    name: "Hogar",
    image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "hogar"
  },
  {
    name: "Moda",
    image: "https://images.pexels.com/photos/934070/pexels-photo-934070.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    slug: "moda"
  }
];

const HomePage: React.FC = () => {
  const featuredProducts = products.filter(product => product.featured);
  const discountedProducts = products
    .filter(product => product.discount > 0)
    .sort((a, b) => b.discount - a.discount)
    .slice(0, 4);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Carousel */}
      <FeaturedCarousel images={bannerImages} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Categorías destacadas */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Categorías populares</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <Link 
                key={category.slug}
                to={`/category/${category.slug}`}
                className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow group h-40"
              >
                <img 
                  src={category.image} 
                  alt={category.name} 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-bold text-lg">{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Productos destacados */}
        <ProductGrid products={featuredProducts} title="Productos destacados" />
        
        {/* Banner promocional */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg shadow-md p-6 my-12 text-white">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl md:text-2xl font-bold mb-2">¡Envío gratuito en tu primer pedido!</h3>
              <p className="mb-4">Usa el código <span className="font-bold">PRIMERPEDIDO</span> durante el pago</p>
              <Link 
                to="/category/all" 
                className="inline-block bg-white text-blue-600 font-bold py-2 px-6 rounded-md hover:bg-gray-100 transition-colors"
              >
                Comprar ahora
              </Link>
            </div>
            <img 
              src="https://images.pexels.com/photos/7319307/pexels-photo-7319307.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Promoción" 
              className="w-full md:w-1/3 rounded-lg object-cover h-40"
            />
          </div>
        </div>
        
        {/* Productos con descuento */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Ofertas del día</h2>
            <Link 
              to="/ofertas" 
              className="text-[#FF9900] hover:underline font-medium"
            >
              Ver todas
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
            {discountedProducts.map(product => (
              <Link 
                key={product.id}
                to={`/product/${product.id}`}
                className="bg-white rounded-md shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full"
              >
                <div className="relative pt-[75%]">
                  <img 
                    src={product.image} 
                    alt={product.name}
                    className="absolute top-0 left-0 w-full h-full object-contain p-4"
                  />
                  <span className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                </div>

                <div className="p-4 flex-grow">
                  <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-lg font-bold text-gray-900">${product.price.toFixed(2)}</span>
                      <span className="text-sm text-gray-500 line-through ml-2">
                        ${product.originalPrice.toFixed(2)}
                      </span>
                    </div>
                    <span className="text-green-600 text-sm">
                      Ahorra ${ (product.originalPrice - product.price).toFixed(2) }
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;