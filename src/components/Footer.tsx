import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Facebook, Instagram, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-[#131921] text-white pt-10 pb-6">
      <div className="container mx-auto px-4">
        {/* Botón volver arriba */}
        <div className="flex justify-center mb-6">
          <button 
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#232f3e] hover:bg-[#37475A] text-white text-sm py-2 px-4 w-full"
          >
            Volver arriba
          </button>
        </div>

        {/* Secciones principales */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Conócenos</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/about" className="hover:text-[#FF9900] transition-colors">Sobre nosotros</Link></li>
              <li><Link to="/careers" className="hover:text-[#FF9900] transition-colors">Trabaja con nosotros</Link></li>
              <li><Link to="/sustainability" className="hover:text-[#FF9900] transition-colors">Sostenibilidad</Link></li>
              <li><Link to="/blog" className="hover:text-[#FF9900] transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Gana dinero con nosotros</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/sell" className="hover:text-[#FF9900] transition-colors">Vender en AmazonTienda</Link></li>
              <li><Link to="/affiliate" className="hover:text-[#FF9900] transition-colors">Programa de afiliados</Link></li>
              <li><Link to="/logistics" className="hover:text-[#FF9900] transition-colors">Logística</Link></li>
              <li><Link to="/advertise" className="hover:text-[#FF9900] transition-colors">Anunciar tus productos</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Métodos de pago</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/payment-cards" className="hover:text-[#FF9900] transition-colors">Tarjetas de crédito/débito</Link></li>
              <li><Link to="/payment-monthly" className="hover:text-[#FF9900] transition-colors">Meses sin intereses</Link></li>
              <li><Link to="/payment-gift" className="hover:text-[#FF9900] transition-colors">Tarjetas de regalo</Link></li>
              <li><Link to="/payment-options" className="hover:text-[#FF9900] transition-colors">Más opciones de pago</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">¿Necesitas ayuda?</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/help/covid" className="hover:text-[#FF9900] transition-colors">COVID-19</Link></li>
              <li><Link to="/help/track" className="hover:text-[#FF9900] transition-colors">Seguimiento de pedidos</Link></li>
              <li><Link to="/help/shipping" className="hover:text-[#FF9900] transition-colors">Envíos y entregas</Link></li>
              <li><Link to="/help/returns" className="hover:text-[#FF9900] transition-colors">Devoluciones y reembolsos</Link></li>
              <li><Link to="/help/contact" className="hover:text-[#FF9900] transition-colors">Contacto y ayuda</Link></li>
            </ul>
          </div>
        </div>

        {/* Separador */}
        <div className="border-t border-gray-700 my-6"></div>

        {/* Sección inferior */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <ShoppingCart className="h-8 w-8 text-[#FF9900]" />
            <span className="ml-2 text-xl font-bold">Tienda Online</span>
          </div>
          
          <div className="flex items-center space-x-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9900] transition-colors">
              <Facebook className="h-5 w-5" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9900] transition-colors">
              <Instagram className="h-5 w-5" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF9900] transition-colors">
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center text-sm text-gray-400 mt-6">
          <p>© 2025 AmazonTienda. Todos los derechos reservados.</p>
          <div className="flex justify-center space-x-4 mt-2">
            <Link to="/privacy" className="hover:text-[#FF9900] transition-colors">Privacidad</Link>
            <Link to="/terms" className="hover:text-[#FF9900] transition-colors">Condiciones de uso</Link>
            <Link to="/cookies" className="hover:text-[#FF9900] transition-colors">Cookies</Link>
            <Link to="/legal" className="hover:text-[#FF9900] transition-colors">Aviso legal</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;