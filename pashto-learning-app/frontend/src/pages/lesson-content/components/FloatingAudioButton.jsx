import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const FloatingAudioButton = ({ 
  audioText = "سلام وروره",
  pronunciation = "Salaam wrora",
  className = ""
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handlePlayAudio = () => {
    setIsPlaying(true);
    
    // Mock audio playback
    setTimeout(() => {
      setIsPlaying(false);
    }, 2000);
  };

  return (
    <div className={`fixed bottom-20 right-4 z-40 ${className}`}>
      <Button
        variant="default"
        size="icon"
        onClick={handlePlayAudio}
        disabled={isPlaying}
        className={`
          w-14 h-14 rounded-full shadow-elevation-3 bg-primary hover:bg-primary/90
          transition-all duration-200 hover:scale-110 active:scale-95
          ${isPlaying ? 'animate-pulse' : ''}
        `}
      >
        {isPlaying ? (
          <div className="flex space-x-1">
            <div className="w-1 h-4 bg-current animate-pulse"></div>
            <div className="w-1 h-4 bg-current animate-pulse" style={{ animationDelay: '0.1s' }}></div>
            <div className="w-1 h-4 bg-current animate-pulse" style={{ animationDelay: '0.2s' }}></div>
          </div>
        ) : (
          <Icon name="Volume2" size={24} className="text-primary-foreground" />
        )}
      </Button>
      
      {/* Tooltip */}
      <div className="absolute bottom-full right-0 mb-2 opacity-0 hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-popover border border-border rounded-lg p-2 shadow-elevation-2 min-w-[120px]">
          <div className="text-sm font-medium text-foreground text-right" dir="rtl">
            {audioText}
          </div>
          <div className="text-xs text-muted-foreground italic">
            {pronunciation}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingAudioButton;