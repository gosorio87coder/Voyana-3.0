import React, { Suspense, lazy, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

import Header from './components/Header';
import Footer from './components/Footer';
import QuoteFormModal from './components/QuoteModal';
import InsuranceFormModal from './components/InsuranceFormModal';
import LoadingSpinner from './components/LoadingSpinner';

// Lazy load page components
const HomePage = lazy(() => import('./pages/HomePage'));
const PuntaSalPage = lazy(() => import('./pages/PuntaSalPage'));
const IquitosLodgePage = lazy(() => import('./pages/IquitosLodgePage'));
const CuscoPage = lazy(() => import('./pages/CuscoPage'));
const CubaPage = lazy(() => import('./pages/CubaPage'));
const CartagenaPage = lazy(() => import('./pages/CartagenaPage'));
const EuropaPage = lazy(() => import('./pages/EuropaPage'));

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = React.useState(false);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = React.useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  // === Modales ===
  const openQuoteModal = useCallback(() => setIsQuoteModalOpen(true), []);
  const closeQuoteModal = useCallback(() => setIsQuoteModalOpen(false), []);

  const openInsuranceModal = useCallback(() => setIsInsuranceModalOpen(true), []);
  const closeInsuranceModal = useCallback(() => setIsInsuranceModalOpen(false), []);

  // === Navegación desde Home por ID (mantiene tu contrato con HomePage) ===
  const handlePackageSelect = useCallback((id: number) => {
    switch (id) {
      case 1: navigate('/punta-sal'); break;
      case 2: navigate('/iquitos'); break;
      case 3: navigate('/cusco'); break;
      case 7: navigate('/cuba'); break;
      case 8: navigate('/cartagena'); break;
      case 9: navigate('/europa'); break;
      default:
        openQuoteModal(); // comportamiento original
        return;
    }
    window.scrollTo(0, 0);
  }, [navigate, openQuoteModal]);

  // === Back ===
  const handleGoBack = useCallback(() => {
    // Si no hay history para atrás o vienes directo por URL,
    // llévate a Home para que no quede "en el aire".
    if (window.history.length <= 2) {
      navigate('/', { replace: true });
    } else {
      navigate(-1);
    }
    window.scrollTo(0, 0);
  }, [navigate]);

  const showBack = location.pathname !== '/';

  return (
    <div className="bg-white text-[#0D2B5B]">
      <Header onOpenQuote={openQuoteModal} showBack={showBack} onBack={handleGoBack} />

      <main className={showBack ? 'pt-10' : ''}>
        <Suspense fallback={<LoadingSpinner />}>
          <Routes>
            {/* Home conserva tus props originales */}
            <Route
              path="/"
              element={
                <HomePage
                  onPackageSelect={handlePackageSelect}
                  onOpenQuote={openQuoteModal}
                  onOpenInsurance={openInsuranceModal}
                />
              }
            />

            {/* Landings con sus props */}
            <Route path="/punta-sal" element={<PuntaSalPage onOpenQuote={openQuoteModal} />} />
            <Route path="/iquitos" element={<IquitosLodgePage onOpenQuote={openQuoteModal} />} />
            <Route path="/cusco" element={<CuscoPage onOpenQuote={openQuoteModal} />} />
            <Route path="/cuba" element={<CubaPage onOpenQuote={openQuoteModal} />} />
            <Route path="/cartagena" element={<CartagenaPage onOpenQuote={openQuoteModal} />} />
            <Route path="/europa" element={<EuropaPage onOpenQuote={openQuoteModal} />} />

            {/* Redirección opcional si tenías /home */}
            <Route path="/home" element={<Navigate to="/" replace />} />

            {/* 404 simple */}
            <Route path="*" element={<div className="p-8">Página no encontrada.</div>} />
          </Routes>
        </Suspense>
      </main>

      <Footer />

      <QuoteFormModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
      <InsuranceFormModal isOpen={isInsuranceModalOpen} onClose={closeInsuranceModal} />
    </div>
  );
};

export default App;
