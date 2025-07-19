import React from 'react';

const AccountPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold mb-4">Mi cuenta</h1>
        <p className="mb-6 text-gray-600">Bienvenido a tu área personal. Aquí podrás ver y editar tu información de cuenta próximamente.</p>
        <button
          className="bg-[#FF9900] hover:bg-[#e88a00] text-white font-medium py-2 px-6 rounded-md transition-colors"
          tabIndex={0}
          aria-label="Cerrar sesión"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  );
};

export default AccountPage; 