import React from 'react';
import HeroSlider from '../components/HeroSlider';
import Bestsellers from '../components/Bestsellers';
import Newsletter from '../components/NewsletterCTA';
import AdditionalOptions from '../components/AdditionalOptions';
import WhyChooseUs from '../components/WhyChooseUs';

interface HomePageProps {
  onPackageSelect: (id: number) => void;
  onOpenQuote: () => void;
  onOpenInsurance: () => void;
}

const HomePage: React.FC<HomePageProps> = ({ onPackageSelect, onOpenQuote, onOpenInsurance }) => {
  return (
    <>
      <HeroSlider onPackageSelect={onPackageSelect} />
      <div className="container mx-auto px-4">
        <Bestsellers onPackageSelect={onPackageSelect} />
        <AdditionalOptions onOpenQuote={onOpenQuote} onOpenInsurance={onOpenInsurance} />
        <Newsletter />
      </div>
      <WhyChooseUs />
    </>
  );
};

export default HomePage;