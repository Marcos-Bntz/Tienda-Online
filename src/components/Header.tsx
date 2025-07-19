import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, ShoppingCart, Menu, User, Heart, X } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Header: React.FC = () => {
  const { totalItems } = useCart();
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implementar búsqueda (en una versión futura)
    console.log('Buscar:', searchQuery);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-[#131921] text-white sticky top-0 z-50">
      {/* Barra superior */}
      <div className="container mx-auto px-2 sm:px-4 py-2 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <ShoppingCart className="h-8 w-8 text-[#FF9900]" />
          <span className="ml-2 text-xl font-bold hidden sm:inline">Tienda Online</span>
        </Link>

        {/* Barra de búsqueda */}
        <form 
          onSubmit={handleSearchSubmit}
          className="flex-grow mx-2 sm:mx-6 hidden sm:flex"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none"
            />
            <button 
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-[#FF9900] rounded-r-md hover:bg-[#e88a00] transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>

        {/* Iconos de navegación */}
        <div className="flex items-center">
          <Link to="/account" className="hidden sm:flex flex-col items-center mx-2 hover:text-[#FF9900] transition-colors">
            <User className="h-5 w-5" />
            <span className="text-xs">Cuenta</span>
          </Link>
          
          <Link to="/wishlist" className="hidden sm:flex flex-col items-center mx-2 hover:text-[#FF9900] transition-colors">
            <Heart className="h-5 w-5" />
            <span className="text-xs">Favoritos</span>
          </Link>
          
          <Link to="/cart" className="flex flex-col items-center mx-2 hover:text-[#FF9900] transition-colors">
            <div className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#FF9900] text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </div>
            <span className="text-xs">Carrito</span>
          </Link>
          
          <button 
            className="sm:hidden ml-2"
            onClick={toggleMobileMenu}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Barra de búsqueda móvil */}
      <div className="px-4 py-2 sm:hidden">
        <form 
          onSubmit={handleSearchSubmit}
          className="flex"
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar productos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 rounded-l-md text-black focus:outline-none"
            />
            <button 
              type="submit"
              className="absolute right-0 top-0 h-full px-4 bg-[#FF9900] rounded-r-md hover:bg-[#e88a00] transition-colors"
            >
              <Search className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Barra de navegación */}
      <nav className="bg-[#232f3e] py-2 px-2 sm:px-4">
        <div className="container mx-auto flex items-center">
          <div className="hidden sm:flex items-center space-x-6 text-sm">
            <Link 
              to="/category/all" 
              className="hover:text-[#FF9900] transition-colors"
              tabIndex={0}
              aria-label="Ver todos los productos"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/category/all'; } }}
            >Todos los productos</Link>
            <Link 
              to="/category/electronica" 
              className="hover:text-[#FF9900] transition-colors"
              tabIndex={0}
              aria-label="Ver productos de Electrónica"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/category/electronica'; } }}
            >Electrónica</Link>
            <Link 
              to="/category/computacion" 
              className="hover:text-[#FF9900] transition-colors"
              tabIndex={0}
              aria-label="Ver productos de Computación"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/category/computacion'; } }}
            >Computación</Link>
            <Link 
              to="/category/hogar" 
              className="hover:text-[#FF9900] transition-colors"
              tabIndex={0}
              aria-label="Ver productos de Hogar"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/category/hogar'; } }}
            >Hogar</Link>
            <Link 
              to="/category/moda" 
              className="hover:text-[#FF9900] transition-colors"
              tabIndex={0}
              aria-label="Ver productos de Moda"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/category/moda'; } }}
            >Moda</Link>
            <Link 
              to="/category/muebles" 
              className="hover:text-[#FF9900] transition-colors"
              tabIndex={0}
              aria-label="Ver productos de Muebles"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/category/muebles'; } }}
            >Muebles</Link>
            <Link 
              to="/ofertas" 
              className="font-bold text-[#FF9900]"
              tabIndex={0}
              aria-label="Ver ofertas"
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { window.location.href = '/ofertas'; } }}
            >Ofertas</Link>
          </div>
        </div>
      </nav>

      {/* Menú móvil */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 sm:hidden flex">
          <div className="bg-[#131921] h-full w-[80%] max-w-xs p-4 transform transition-transform duration-300">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold">Menú</h2>
              <button onClick={toggleMobileMenu}>
                <X className="h-6 w-6" />
              </button>
            </div>
            
            <div className="space-y-4">
              <Link 
                to="/account" 
                className="block py-2 border-b border-gray-700 hover:text-[#FF9900]"
                onClick={toggleMobileMenu}
              >
                Mi cuenta
              </Link>
              <Link 
                to="/wishlist" 
                className="block py-2 border-b border-gray-700 hover:text-[#FF9900]"
                onClick={toggleMobileMenu}
              >
                Mis favoritos
              </Link>
              <Link 
                to="/category/all" 
                className="block py-2 border-b border-gray-700 hover:text-[#FF9900]"
                onClick={toggleMobileMenu}
              >
                Todos los productos
              </Link>
              <Link 
                to="/category/electronica" 
                className="block py-2 border-b border-gray-700 hover:text-[#FF9900]"
                onClick={toggleMobileMenu}
              >
                Electrónica
              </Link>
              <Link 
                to="/category/computacion" 
                className="block py-2 border-b border-gray-700 hover:text-[#FF9900]"
                onClick={toggleMobileMenu}
              >
                Computación
              </Link>
              <Link 
                to="/category/hogar" 
                className="block py-2 border-b border-gray-700 hover:text-[#FF9900]"
                onClick={toggleMobileMenu}
              >
                Hogar
              </Link>
              <Link 
                to="/category/moda" 
                className="block py-2 border-b border-gray-700 hover:text-[#FF9900]"
                onClick={toggleMobileMenu}
              >
                Moda
              </Link>
              <Link 
                to="/category/muebles" 
                className="block py-2 border-b border-gray-700 hover:text-[#FF9900]"
                onClick={toggleMobileMenu}
              >
                Muebles
              </Link>
              <Link 
                to="/ofertas" 
                className="block py-2 border-b border-gray-700 text-[#FF9900] font-bold"
                onClick={toggleMobileMenu}
              >
                Ofertas
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;