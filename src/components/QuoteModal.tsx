import React, { useState } from 'react';
import { CloseIcon } from './icons/CloseIcon';

interface QuoteFormModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const QuoteFormModal: React.FC<QuoteFormModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const [selectedDestination, setSelectedDestination] = useState('Otro');
  const [contactPreference, setContactPreference] = useState<'whatsapp' | 'call'>('whatsapp');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Gracias por tu interés! Un asesor se pondrá en contacto contigo a la brevedad.');
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
          <h2 className="text-lg font-bold text-[#0D2B5B]">Cotiza tu Viaje</h2>
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
            Cotiza tu Viaje Soñado
          </h2>
          <p className="text-gray-600 mb-6">Completa tus datos y un asesor se pondrá en contacto contigo a la brevedad.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">Nombre Completo</label>
              <input type="text" id="fullName" placeholder="Ej: Juan Pérez" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">WhatsApp o Teléfono</label>
              <input type="tel" id="phone" placeholder="+51 987 654 321" required className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Preferencia de Contacto</label>
              <div className="flex rounded-md shadow-sm">
                <button
                  type="button"
                  onClick={() => setContactPreference('whatsapp')}
                  className={`relative inline-flex items-center justify-center w-1/2 px-4 py-2 rounded-l-md border border-gray-300 text-sm font-medium transition-colors ${
                    contactPreference === 'whatsapp'
                      ? 'bg-[#1856C5] text-white z-10'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } focus:z-10 focus:outline-none focus:ring-1 focus:ring-[#1856C5] focus:border-[#1856C5]`}
                >
                  Que me escriban por WhatsApp
                </button>
                <button
                  type="button"
                  onClick={() => setContactPreference('call')}
                  className={`-ml-px relative inline-flex items-center justify-center w-1/2 px-4 py-2 rounded-r-md border border-gray-300 text-sm font-medium transition-colors ${
                    contactPreference === 'call'
                      ? 'bg-[#1856C5] text-white z-10'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                  } focus:z-10 focus:outline-none focus:ring-1 focus:ring-[#1856C5] focus:border-[#1856C5]`}
                >
                  Que me llamen
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="destination" className="block text-sm font-medium text-gray-700">Destino de Interés</label>
              <select 
                id="destination" 
                required 
                value={selectedDestination}
                onChange={(e) => setSelectedDestination(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]"
              >
                <option value="Punta Sal">Decameron Punta Sal</option>
                <option value="Iquitos">Iquitos Lodge</option>
                <option value="Cusco">Cusco Mágico</option>
                <option value="Varadero & Habana">Varadero & Habana</option>
                <option value="Cartagena">Cartagena</option>
                <option value="Europa">Europa Inolvidable</option>
                <option value="Otro">Otro destino</option>
              </select>
            </div>
            
            {selectedDestination === 'Otro' && (
              <div>
                <label htmlFor="otherDestination" className="block text-sm font-medium text-gray-700">Especificar Destino</label>
                <input 
                  type="text" 
                  id="otherDestination" 
                  placeholder="Ej: Riviera Maya, Tailandia..." 
                  className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" 
                />
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700">Fecha Aproximada</label>
                <input type="date" id="travelDate" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
              </div>
              <div>
                <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">N° de Pasajeros</label>
                <input type="number" id="passengers" min="1" placeholder="2" className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]" />
              </div>
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">Mensaje Adicional</label>
              <textarea id="message" rows={3} placeholder="Cuéntanos más sobre tu viaje ideal..." className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-[#1856C5] focus:border-[#1856C5]"></textarea>
            </div>
            <div>
              <button type="submit" className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-lg font-bold text-white bg-[#1856C5] hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#1856C5] transition-colors mt-6">
                Enviar solicitud
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default QuoteFormModal;