import React from 'react';
import Header from './Header';
import { Page } from '../types';
import FixedBackButton from './FixedBackButton';

interface ContestHomePageProps {
  onNavigate: (page: Page) => void;
}

const ContestHomePage: React.FC<ContestHomePageProps> = ({ onNavigate }) => {
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
<Header logoVariant="fondazione-mare" theme="light" logoSize="h-12" />
      <main className="flex-grow flex flex-col items-center justify-center p-8">
        <div className="flex items-center justify-center gap-16">
          <div
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => onNavigate(Page.ToolTales)}
          >
            <img src="/images/select-tales-2024.png" alt="Tool Tales 2024" className="h-[400px]" />
          </div>
          <div
            className="cursor-pointer transition-transform duration-300 hover:scale-105"
            onClick={() => onNavigate(Page.RouteTales)}
          >
            <img src="/images/select-tales-2025.png" alt="Route Tales 2025" className="h-[400px]" />
          </div>
        </div>
      </main>
      <FixedBackButton onNavigate={onNavigate} backPage={Page.Home} />
    </div>
  );
};

export default ContestHomePage;