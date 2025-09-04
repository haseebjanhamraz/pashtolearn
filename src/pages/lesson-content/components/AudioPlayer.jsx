import React, { useState, useRef } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioPlayer = ({ 
  audioText = "سلام وروره", 
  pronunciation = "Salaam wrora",
  autoPlay = false,
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasPlayed, setHasPlayed] = useState(false);
  const audioRef = useRef(null);

  const handlePlayAudio = () => {
    // Mock audio playback since we don't have actual audio files
    setIsPlaying(true);
    setHasPlayed(true);
    
    // Simulate audio duration
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  return (
    <div className={`bg-surface rounded-lg border border-border p-4 ${className}`}>
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="text-2xl font-medium text-foreground mb-1 text-right" dir="rtl">
            {audioText}
          </div>
          <div className="text-sm text-muted-foreground italic">
            {pronunciation}
          </div>
        </div>
        
        <div className="ml-4">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePlayAudio}
            disabled={isPlaying}
            className={`
              w-12 h-12 rounded-full transition-all duration-200
              ${isPlaying ? 'bg-primary text-primary-foreground' : ''}
              ${hasPlayed ? 'border-success' : ''}
            `}
          >
            {isPlaying ? (
              <div className="flex space-x-1">
                <div className="w-1 h-4 bg-current animate-pulse"></div>
                <div className="w-1 h-4 bg-current animate-pulse" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-1 h-4 bg-current animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              </div>
            ) : (
              <Icon name="Volume2" size={20} />
            )}
          </Button>
        </div>
      </div>
      {isPlaying && (
        <div className="mt-3">
          <div className="flex items-center space-x-1">
            {[...Array(20)]?.map((_, i) => (
              <div
                key={i}
                className="w-1 bg-primary rounded-full animate-pulse"
                style={{ 
                  height: `${Math.random() * 16 + 8}px`,
                  animationDelay: `${i * 0.1}s`
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AudioPlayer;