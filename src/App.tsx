import React, { useState, Suspense, lazy } from 'react';
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

type Page = 'home' | 'punta-sal' | 'iquitos' | 'cusco' | 'cuba' | 'cartagena' | 'europa';

const App: React.FC = () => {
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isInsuranceModalOpen, setIsInsuranceModalOpen] = useState(false);
  const [activePage, setActivePage] = useState<Page>('home');

  const openQuoteModal = () => setIsQuoteModalOpen(true);
  const closeQuoteModal = () => setIsQuoteModalOpen(false);

  const openInsuranceModal = () => setIsInsuranceModalOpen(true);
  const closeInsuranceModal = () => setIsInsuranceModalOpen(false);
  
  const handleGoBack = () => {
    setActivePage('home');
    window.scrollTo(0, 0);
  };

  const handlePackageSelect = (id: number) => {
    let page: Page = 'home';
    switch (id) {
      case 1: page = 'punta-sal'; break;
      case 2: page = 'iquitos'; break;
      case 3: page = 'cusco'; break;
      case 7: page = 'cuba'; break;
      case 8: page = 'cartagena'; break;
      case 9: page = 'europa'; break;
      default:
        openQuoteModal();
        return;
    }
    setActivePage(page);
    window.scrollTo(0, 0);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'punta-sal': return <PuntaSalPage onOpenQuote={openQuoteModal} />;
      case 'iquitos': return <IquitosLodgePage onOpenQuote={openQuoteModal} />;
      case 'cusco': return <CuscoPage onOpenQuote={openQuoteModal} />;
      case 'cuba': return <CubaPage onOpenQuote={openQuoteModal} />;
      case 'cartagena': return <CartagenaPage onOpenQuote={openQuoteModal} />;
      case 'europa': return <EuropaPage onOpenQuote={openQuoteModal} />;
      case 'home':
      default:
        return <HomePage onPackageSelect={handlePackageSelect} onOpenQuote={openQuoteModal} onOpenInsurance={openInsuranceModal} />;
    }
  };

  return (
    <div className="bg-white text-[#0D2B5B]">
      <Header onOpenQuote={openQuoteModal} showBack={activePage !== 'home'} onBack={handleGoBack} />
      <main className={activePage !== 'home' ? 'pt-10' : ''}>
        <Suspense fallback={<LoadingSpinner />}>
          {renderPage()}
        </Suspense>
      </main>
      <Footer />
      <QuoteFormModal isOpen={isQuoteModalOpen} onClose={closeQuoteModal} />
      <InsuranceFormModal isOpen={isInsuranceModalOpen} onClose={closeInsuranceModal} />
    </div>
  );
};

export default App;