import React from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface InsuranceFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InsuranceFormModal: React.FC<InsuranceFormModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias! Un asesor te enviará la cotización de tu seguro de viaje a la brevedad.');
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-[60] flex sm:items-center sm:justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
      onClick={onClose}
    >
      <div 
        className="bg-white h-full w-full sm:h-auto sm:rounded-lg sm:shadow-xl sm:max-w-lg relative flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Mobile Header */}
        <div className="sticky top-0 z-10 flex sm:hidden items-center justify-between p-4 border-b bg-white">
          <h2 className="text-lg font-bold text-[#0D2B5B]">Seguro de Viaje</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-800"
            aria-label="Cerrar modal"
          >
            <CloseIcon className="h-6 w-6" />
          </button>
        </div>
        
        {/* Desktop Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors hidden sm:block"
          aria-label="Cerrar modal"
        >
          <CloseIcon className="h-6 w-6" />
        </button>
        
        {/* Form Content */}
        <div className="p-8 overflow-y-auto">
          <h2 className="text-2xl font-bold text-[#0D2B5B] mb-1" style={{ fontFamily: "'Montserrat', sans-serif" }}>
            Cotiza tu Seguro de Viaje
          </h2>
          <p className="text-gray-600 mb-6">Viaja con tranquilidad. Completa tus datos para recibir una cotización personalizada.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="insurance-fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
              <input type="text" id="insurance-fullName" placeholder="Ej: Ana Rodríguez" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
            </div>
            <div>
              <label htmlFor="insurance-phone" className="block text-sm font-medium text-gray-700">WhatsApp o Teléfono</label>
              <input type="tel" id="insurance-phone" placeholder="+51 987 654 321" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
            </div>
            <div>
              <label htmlFor="insurance-destination" className="block text-sm font-medium text-gray-700">Destino(s)</label>
              <input type="text" id="insurance-destination" placeholder="Ej: Europa, Estados Unidos" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="insurance-startDate" className="block text-sm font-medium text-gray-700">Fecha de Salida</label>
                <input type="date" id="insurance-startDate" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
              </div>
              <div>
                <label htmlFor="insurance-endDate" className="block text-sm font-medium text-gray-700">Fecha de Retorno</label>
                <input type="date" id="insurance-endDate" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
              </div>
            </div>
            <div>
              <label htmlFor="insurance-passengers" className="block text-sm font-medium text-gray-700">N° de Pasajeros</label>
              <input type="number" id="insurance-passengers" min="1" placeholder="2" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-emerald-600 hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors mt-6">
                Solicitar Cotización
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default InsuranceFormModal;