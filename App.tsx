import React, { useState, useCallback, useEffect } from 'react';
import HomePage from './components/HomePage';
import ContestHomePage from './components/ContestHomePage';
import ListPage from './components/ListPage';
import AudioPlayer from './components/AudioPlayer';
import { Page, type AudioTrack, type ContentSection } from './types';

const App: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>(Page.Home);
    const [currentTrackInfo, setCurrentTrackInfo] = useState<{ track: AudioTrack; layout: ContentSection['layout'] } | null>(null);
    const [content, setContent] = useState<Record<string, ContentSection> | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        fetch('/content.json')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setContent(data);
                setIsLoading(false);
            })
            .catch(error => {
                console.error('Failed to load content:', error);
                setIsLoading(false);
            });
    }, []);

    const handleNavigate = useCallback((page: Page) => {
        setCurrentPage(page);
    }, []);

    const handlePlayTrack = useCallback((track: AudioTrack, layout: ContentSection['layout']) => {
        setCurrentTrackInfo({ track, layout });
    }, []);

    const handleClosePlayer = useCallback(() => {
        setCurrentTrackInfo(null);
    }, []);

    const renderPage = () => {
        if (isLoading) {
            return <div className="flex items-center justify-center text-xl">Loading content...</div>;
        }

        if (!content) {
            return <div className="flex items-center justify-center text-xl text-red-500">Failed to load content. Please check the console.</div>;
        }

        switch (currentPage) {
            case Page.Home:
                return <HomePage onNavigate={handleNavigate} />;
            case Page.ContestHome:
                return <ContestHomePage 
                    onNavigate={handleNavigate} 
                />;
            case Page.ToolTales:
                return <ListPage 
                    content={content.toolTales} 
                    onNavigate={handleNavigate} 
                    onPlayTrack={handlePlayTrack} 
                    backPage={Page.ContestHome} 
                />;
            case Page.RouteTales:
                 return <ListPage 
                    content={content.routeTales} 
                    onNavigate={handleNavigate} 
                    onPlayTrack={handlePlayTrack} 
                    backPage={Page.ContestHome} 
                />;
            case Page.Podcast: {
                return <ListPage content={content.podcast} onNavigate={handleNavigate} onPlayTrack={handlePlayTrack} backPage={Page.Home} />;
            }
            case Page.Ingenium: {
                return <ListPage content={content.ingenium} onNavigate={handleNavigate} onPlayTrack={handlePlayTrack} backPage={Page.Home} />;
            }
            case Page.Conversation: {
                return <ListPage content={content.conversation} onNavigate={handleNavigate} onPlayTrack={handlePlayTrack} backPage={Page.Home} />;
            }
            default:
                return <HomePage onNavigate={handleNavigate} />;
        }
    };
    
    const isHomePage = currentPage === Page.Home;
    const themeClasses = isHomePage ? 'bg-[#0A192F] text-white' : 'bg-white text-gray-800';

    return (
        <div className={`${themeClasses} min-h-screen`}>
           {renderPage()}
           {currentTrackInfo && <AudioPlayer track={currentTrackInfo.track} layout={currentTrackInfo.layout} onClose={handleClosePlayer} />}
        </div>
    );
};

export default App;