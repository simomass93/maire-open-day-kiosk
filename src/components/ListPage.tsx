import React from 'react';
import Header from './Header';
import type { Page, AudioTrack, ContentSection } from '../types';
import FixedBackButton from './FixedBackButton';


interface LayoutProps {
    content: ContentSection;
    onPlayTrack: (track: AudioTrack, layout: ContentSection['layout']) => void;
}


const ContestLayout: React.FC<LayoutProps> = ({ content, onPlayTrack }) => (
  <main className="relative flex-grow flex flex-col p-8">
    <div className="text-center">
      <img src={content.headerImageSrc} alt={content.title} className="max-w-md mx-auto" />
    </div>
    <div className="flex-grow max-w-7xl w-full mx-auto grid grid-cols-2 gap-x-16 gap-y-6 mt-12">
      {content.tracks.map((track) => (
        <div 
          key={track.id} 
          className="flex items-start p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
          onClick={() => onPlayTrack(track, content.layout)}
        >
          <img 
            src={track.coverImageSrc} 
            alt={`Cover for ${track.title}`}
            className="w-20 h-20 object-cover rounded-md mr-4 flex-shrink-0"
          />
          <div className="flex-grow">
            <p className="font-bold text-sm text-gray-800">
              <span className="text-gray-400">{track.id}.</span> {track.title.toUpperCase()}
            </p>
            <p className="text-xs text-orange-500">{track.title_en.toUpperCase()}</p>
            <p className="text-xs text-gray-500 mt-1">{track.author}</p>
          </div>
        </div>
      ))}
    </div>
  </main>
);

const PodcastLayout: React.FC<LayoutProps> = ({ content, onPlayTrack }) => (
  <main className="flex-grow flex flex-col items-center p-8">
    <div className="text-center">
        <img src={content.headerImageSrc} alt={content.title} className="max-w-lg mx-auto" />
    </div>
    <div className="flex-grow max-w-5xl w-full mx-auto grid grid-cols-2 gap-x-24 gap-y-8 mt-16">
      {content.tracks.map((track) => (
        <div 
          key={track.id} 
          className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
          onClick={() => onPlayTrack(track, content.layout)}
        >
          <img 
            src={track.coverImageSrc} 
            alt={`Cover for ${track.title}`}
            className="w-16 h-16 object-contain rounded-full mr-4 flex-shrink-0"
          />
          <div className="flex-grow">
            <p className="font-bold text-sm text-gray-800">
                <span className="text-gray-400">{track.id}.</span> {track.title.toUpperCase()}
            </p>
            <p className="text-xs text-orange-500">{track.title_en.toUpperCase()}</p>
          </div>
        </div>
      ))}
    </div>
  </main>
);

const SingleColumnLayout: React.FC<LayoutProps> = ({ content, onPlayTrack }) => (
    <main className="relative flex-grow flex flex-col items-center p-8">
        <div className="text-center mb-12">
            <img src={content.headerImageSrc} alt={content.title} className="max-w-2xl mx-auto" />
        </div>
        <div className="flex-grow max-w-xl w-full mx-auto flex flex-col gap-y-6">
            {content.tracks.map((track) => (
                <div 
                  key={track.id} 
                  className="flex items-center p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer group"
                  onClick={() => onPlayTrack(track, content.layout)}
                >
                  <img 
                    src={track.coverImageSrc} 
                    alt={`Cover for ${track.title}`}
                    className="w-20 h-20 object-cover rounded-md mr-6 flex-shrink-0"
                  />
                  <div className="flex-grow">
                    <p className="font-bold text-sm text-gray-800">
                        <span className="text-gray-400">{track.id}.</span> {track.title.toUpperCase()}
                    </p>
                    <p className="text-xs text-orange-500">{track.title_en.toUpperCase()}</p>
                     <p className="text-xs text-gray-500 mt-1">{track.author}</p>
                  </div>
                </div>
            ))}
        </div>
    </main>
);


interface ListPageProps {
  content: ContentSection;
  onNavigate: (page: Page) => void;
  onPlayTrack: (track: AudioTrack, layout: ContentSection['layout']) => void;
  backPage: Page;
}

const ListPage: React.FC<ListPageProps> = ({ content, onNavigate, onPlayTrack, backPage }) => {
  const getLayout = () => {
      switch(content.layout) {
          case 'contest':
              return <ContestLayout content={content} onPlayTrack={onPlayTrack} />;
          case 'podcast':
              return <PodcastLayout content={content} onPlayTrack={onPlayTrack} />;
          case 'single-column':
              return <SingleColumnLayout content={content} onPlayTrack={onPlayTrack} />;
          default:
              return null;
      }
  }
  
  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-800">
      <Header logoVariant={content.logoVariant} theme="light" />
      {getLayout()}
      <FixedBackButton onNavigate={onNavigate} backPage={backPage} />
    </div>
  );
};

export default ListPage;