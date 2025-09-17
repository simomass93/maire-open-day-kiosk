import React, { useState, useRef, useEffect } from 'react';
import type { AudioTrack, ContentSection } from '../types';
import PlayIcon from './icons/PlayIcon';
import PauseIcon from './icons/PauseIcon';
import CloseIcon from './icons/CloseIcon';

interface AudioPlayerProps {
  track: AudioTrack;
  layout: ContentSection['layout'];
  onClose: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ track, layout, onClose }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.play().then(() => setIsPlaying(true)).catch(e => console.error("Audio play failed", e));
      
      const handleTimeUpdate = () => {
        setProgress(audio.currentTime);
      };
      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };
      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
      };

      audio.addEventListener('timeupdate', handleTimeUpdate);
      audio.addEventListener('loadedmetadata', handleLoadedMetadata);
      audio.addEventListener('ended', handleEnded);
      
      return () => {
        audio.removeEventListener('timeupdate', handleTimeUpdate);
        audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [track]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio) {
      if (isPlaying) {
        audio.pause();
      } else {
        audio.play();
      }
      setIsPlaying(!isPlaying);
    }
  };
  
  const formatTime = (time: number) => {
      const minutes = Math.floor(time / 60);
      const seconds = Math.floor(time % 60);
      return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 backdrop-blur-sm">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md relative text-center text-gray-800">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition-colors z-10">
            <CloseIcon className="w-6 h-6" />
        </button>
        <div className="flex justify-center mb-6">
  <img 
    src={track.coverImageSrc} 
    alt={`Cover for ${track.title}`} 
    className="max-w-full max-h-64 h-auto rounded-lg"
  />
</div>



        <div className="mb-6">
            <h2 className="text-2xl font-bold text-blue-800">{track.title}</h2>
            <p className="text-lg text-orange-500 mt-1">{track.title_en}</p>
            {layout !== 'podcast' && (
                <p className="text-md text-gray-600 mt-2">{track.author}</p>
            )}
        </div>
        <audio ref={audioRef} src={track.audioSrc} />
        <div className="flex items-center justify-center space-x-6">
            <button onClick={togglePlayPause} className="bg-blue-600 text-white rounded-full p-4 hover:bg-blue-700 transition-colors">
                {isPlaying ? <PauseIcon className="w-8 h-8"/> : <PlayIcon className="w-8 h-8"/>}
            </button>
        </div>
        <div className="mt-6">
            <input 
                type="range" 
                value={progress}
                max={duration || 0}
                onChange={(e) => {
                    if (audioRef.current) {
                        audioRef.current.currentTime = Number(e.target.value);
                    }
                }}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-1">
                <span>{formatTime(progress)}</span>
                <span>{formatTime(duration)}</span>
            </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;