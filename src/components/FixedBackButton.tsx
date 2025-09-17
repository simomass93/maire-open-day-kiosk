import React from 'react';
import { Page } from '../types';

interface FixedBackButtonProps {
  onNavigate: (page: Page) => void;
  backPage: Page;
}

const FixedBackButton: React.FC<FixedBackButtonProps> = ({ onNavigate, backPage }) => {
  const handleBack = () => {
    onNavigate(backPage);
  };

  return (
    <button
      onClick={handleBack}
      className="fixed bottom-8 right-8 bg-[#4B459B] text-white font-bold py-3 px-6 rounded-full shadow-lg hover:bg-[#3a357a] transition-transform duration-200 ease-in-out hover:scale-105 z-50"
      aria-label="Torna indietro"
    >
      Indietro
    </button>
  );
};

export default FixedBackButton;