import React from 'react';
import { Link } from 'react-router-dom';
import { Trash2, ShoppingCart, ArrowRight, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, updateQuantity, removeFromCart, clearCart, totalItems, totalPrice } = useCart();
  
  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-100 py-12">
        <div className="container mx-auto px-4">
          <div className="bg-white rounded-lg shadow-md p-8 text-center max-w-3xl mx-auto">
            <div className="flex justify-center mb-4">
              <ShoppingCart className="h-16 w-16 text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-gray-600 mb-6">Parece que aún no has añadido ningún producto a tu carrito.</p>
            <Link 
              to="/" 
              className="inline-block bg-[#FF9900] hover:bg-[#e88a00] text-white font-medium py-3 px-6 rounded-md transition-colors"
            >
              Continuar comprando
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Tu carrito de compra</h1>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Productos en el carrito */}
          <div className="lg:w-2/3">
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              {/* Cabecera */}
              <div className="bg-gray-50 p-4 border-b border-gray-200 hidden sm:grid sm:grid-cols-6 gap-4 text-sm font-medium text-gray-600">
                <div className="sm:col-span-3">Producto</div>
                <div className="text-center">Precio</div>
                <div className="text-center">Cantidad</div>
                <div className="text-center">Subtotal</div>
              </div>

              {/* Lista de productos */}
              <div className="divide-y divide-gray-200">
                {cart.map((item) => (
                  <div key={item.product.id} className="p-4 sm:grid sm:grid-cols-6 gap-4 items-center">
                    {/* Producto */}
                    <div className="sm:col-span-3 flex items-center mb-3 sm:mb-0">
                      <div className="w-20 h-20 flex-shrink-0 bg-gray-50 rounded overflow-hidden">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <div className="ml-4 flex-grow">
                        <Link to={`/product/${item.product.id}`} className="text-gray-900 font-medium hover:text-[#FF9900] transition-colors">
                          {item.product.name}
                        </Link>
                        <div className="flex justify-between items-center mt-1 sm:hidden">
                          <span className="text-sm text-gray-700">€{item.product.price.toFixed(2)}</span>
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Precio */}
                    <div className="hidden sm:block text-center">
                      <span className="text-gray-900">€{item.product.price.toFixed(2)}</span>
                    </div>

                    {/* Cantidad */}
                    <div className="flex justify-center">
                      <div className="flex items-center border border-gray-300 rounded">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="px-3 py-1 border-r border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                          -
                        </button>
                        <span className="px-3 py-1">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="px-3 py-1 border-l border-gray-300 hover:bg-gray-100 transition-colors"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <div className="text-center flex items-center justify-between sm:justify-center mt-3 sm:mt-0">
                      <span className="sm:hidden">Subtotal:</span>
                      <span className="font-medium text-gray-900">
                        €{(item.product.price * item.quantity).toFixed(2)}
                      </span>
                      <button
                        onClick={() => removeFromCart(item.product.id)}
                        className="text-red-500 hover:text-red-700 transition-colors ml-4 hidden sm:block"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Acciones del carrito */}
              <div className="p-4 border-t border-gray-200 bg-gray-50 flex justify-between items-center">
                <button
                  onClick={clearCart}
                  className="text-red-600 hover:text-red-800 text-sm font-medium transition-colors"
                >
                  Vaciar carrito
                </button>
                <Link 
                  to="/" 
                  className="text-[#FF9900] hover:text-[#e88a00] text-sm font-medium transition-colors"
                >
                  Seguir comprando
                </Link>
              </div>
            </div>
          </div>
          
          {/* Resumen del pedido */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-lg font-bold mb-6">Resumen del pedido</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Subtotal ({totalItems} productos)</span>
                  <span className="font-medium">€{totalPrice.toFixed(2)}</span>
                </div>
                
                <div className="flex justify-between">
                  <span className="text-gray-600">Gastos de envío</span>
                  <span className="font-medium text-green-600">Gratis</span>
                </div>
                
                <div className="pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="font-bold text-lg">Total</span>
                    <span className="font-bold text-xl">€{totalPrice.toFixed(2)}</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">IVA incluido</p>
                </div>
                
                {/* Código promocional */}
                <div className="pt-4">
                  <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                    Código de descuento
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      id="coupon"
                      placeholder="Ingresa tu código"
                      className="flex-grow px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-[#FF9900] focus:border-[#FF9900]"
                    />
                    <button className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-r-md transition-colors">
                      Aplicar
                    </button>
                  </div>
                </div>
                
                <div className="bg-blue-50 p-3 rounded-md border border-blue-100 flex items-start">
                  <AlertCircle className="h-5 w-5 text-blue-600 mt-0.5 mr-2 flex-shrink-0" />
                  <p className="text-sm text-blue-800">
                    Al finalizar la compra, se te pedirá la información de envío y pago.
                  </p>
                </div>
                
                <button className="w-full bg-[#FF9900] hover:bg-[#e88a00] text-white font-medium py-3 px-6 rounded-md transition-colors flex items-center justify-center">
                  Finalizar compra
                  <ArrowRight className="h-4 w-4 ml-2" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;