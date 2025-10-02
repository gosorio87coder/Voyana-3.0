import React from 'react';
import { VoyanaLogoColor } from './icons/VoyanaLogoColor';

interface HeaderProps {
  onOpenQuote: () => void;
  showBack?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenQuote, showBack, onBack }) => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-10">
          <button 
            onClick={onBack} 
            aria-label="Volver a la página de inicio" 
            disabled={!showBack}
            className={showBack ? 'cursor-pointer' : 'cursor-default'}
          >
            <VoyanaLogoColor className="h-10 w-auto" />
          </button>
          
          <button 
            onClick={onOpenQuote}
            className="bg-[#1856C5] text-white font-semibold py-2 px-6 rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Cotiza ahora
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;