import React from 'react';
import { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

const HomePageCard: React.FC<{
  imageSrc: string;
  title: React.ReactNode;
  onClick: () => void;
}> = ({ imageSrc, title, onClick }) => (
  <div
    className="flex flex-col items-center cursor-pointer group w-40"
    onClick={onClick}
  >
     <div className="bg-white shadow-lg w-full h-40 flex items-center justify-center overflow-hidden">
  <img src={imageSrc} alt="" className="w-full h-full object-cover" />
</div>
    <div className="mt-4 text-center text-sm font-bold text-[#e98842] h-12">
      {title}
    </div>
  </div>
);

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-white h-screen font-sans overflow-hidden flex flex-col">
      {/* Header Section */}
      <header className="relative flex flex-col items-center justify-center text-[#0A192F]" style={{ height: '45vh' }}>
        <img src="/images/logo-maire.png" alt="MAIRE Logo" className="h-8 absolute top-8 left-8" />

        <div className="relative text-center">
           <img src="/images/home-header-graphic.png" alt="This is Maire! Open Day" className="w-auto h-48" />
        </div>
      </header>

      {/* Main Content Section */}
      <div 
        className="relative flex-grow bg-no-repeat bg-cover bg"
        style={{
          backgroundImage: "url('/images/home-background-shape.png')"
        }}
      >

          <div className="relative z-10 flex flex-col items-center justify-start h-full pt-12">
  <div className="w-full max-w-xl px-8">
                <div className="grid grid-cols-2 gap-x-8 gap-y-8 justify-items-center">
                    <HomePageCard
                      imageSrc="/images/card-contest.png"
                      title={
                        <>
                          Barbara Picutti<br/>Creative Contest
                        </>
                      }
                      onClick={() => onNavigate(Page.ContestHome)}
                    />
                    <HomePageCard
                      imageSrc="/images/card-podcast.png"
                      title={<>This is Maire</>}
                      onClick={() => onNavigate(Page.Podcast)}
                    />
                    <HomePageCard
                      imageSrc="/images/card-ingenium.png"
                      title={
                        <>
                          in-Genium raccontato da Jacopo Veneziani
                        </>
                      }
                      onClick={() => onNavigate(Page.Ingenium)}
                    />
                    <HomePageCard
                      imageSrc="/images/card-conversation.png"
                      title={
                        <>
                          In conversazione con<br/>Amalia Ercoli Finzi
                        </>
                      }
                      onClick={() => onNavigate(Page.Conversation)}
                    />
                </div>
            </div>
          </div>
      </div>
    </div>
  );
};

export default HomePage;