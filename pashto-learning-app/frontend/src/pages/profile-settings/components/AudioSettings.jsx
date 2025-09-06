import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AudioSettings = ({ currentLanguage, audioSettings, onUpdateAudioSettings }) => {
  const [localSettings, setLocalSettings] = useState(audioSettings);

  const labels = {
    en: {
      title: 'Audio & Pronunciation Settings',
      playbackSpeed: 'Playback Speed',
      volume: 'Volume Level',
      autoPlay: 'Auto-play pronunciation',
      repeatMode: 'Repeat mode for practice',
      testAudio: 'Test Audio',
      save: 'Save Settings',
      slow: 'Slow',
      normal: 'Normal',
      fast: 'Fast'
    },
    ps: {
      title: 'د غږ او تلفظ تنظیمات',
      playbackSpeed: 'د غږ چټکتیا',
      volume: 'د غږ کچه',
      autoPlay: 'د تلفظ خپلکاره غږول',
      repeatMode: 'د تمرین لپاره تکرار حالت',
      testAudio: 'د غږ ازموینه',
      save: 'تنظیمات خوندي کړئ',
      slow: 'ورو',
      normal: 'نورمال',
      fast: 'ګړندی'
    }
  };

  const speedOptions = [
    { value: 0.5, label: labels?.[currentLanguage]?.slow },
    { value: 1.0, label: labels?.[currentLanguage]?.normal },
    { value: 1.5, label: labels?.[currentLanguage]?.fast }
  ];

  const handleSpeedChange = (speed) => {
    setLocalSettings(prev => ({ ...prev, playbackSpeed: speed }));
  };

  const handleVolumeChange = (e) => {
    const volume = parseInt(e?.target?.value);
    setLocalSettings(prev => ({ ...prev, volume }));
  };

  const handleToggle = (field) => {
    setLocalSettings(prev => ({ ...prev, [field]: !prev?.[field] }));
  };

  const handleSave = () => {
    onUpdateAudioSettings(localSettings);
  };

  const playTestAudio = () => {
    // Mock audio test - in real app would play actual audio
    const utterance = new SpeechSynthesisUtterance("سلام وروره - Hello brother");
    utterance.rate = localSettings?.playbackSpeed;
    utterance.volume = localSettings?.volume / 100;
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-full">
          <Icon name="Volume2" size={20} className="text-success" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {labels?.[currentLanguage]?.title}
        </h3>
      </div>
      <div className="space-y-6">
        {/* Playback Speed */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            {labels?.[currentLanguage]?.playbackSpeed}
          </label>
          <div className="flex space-x-2">
            {speedOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={localSettings?.playbackSpeed === option?.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleSpeedChange(option?.value)}
                className="flex-1"
              >
                {option?.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Volume Control */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            {labels?.[currentLanguage]?.volume}: {localSettings?.volume}%
          </label>
          <div className="flex items-center space-x-4">
            <Icon name="VolumeX" size={16} className="text-muted-foreground" />
            <input
              type="range"
              min="0"
              max="100"
              value={localSettings?.volume}
              onChange={handleVolumeChange}
              className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer slider"
            />
            <Icon name="Volume2" size={16} className="text-muted-foreground" />
          </div>
        </div>

        {/* Toggle Settings */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Play" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {labels?.[currentLanguage]?.autoPlay}
              </span>
            </div>
            <button
              onClick={() => handleToggle('autoPlay')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${localSettings?.autoPlay ? 'bg-primary' : 'bg-muted-foreground/30'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${localSettings?.autoPlay ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Repeat" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {labels?.[currentLanguage]?.repeatMode}
              </span>
            </div>
            <button
              onClick={() => handleToggle('repeatMode')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${localSettings?.repeatMode ? 'bg-primary' : 'bg-muted-foreground/30'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${localSettings?.repeatMode ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
        </div>

        {/* Test Audio */}
        <div className="flex items-center justify-center pt-4 border-t border-border">
          <Button
            variant="outline"
            onClick={playTestAudio}
            iconName="Play"
            iconPosition="left"
            iconSize={16}
          >
            {labels?.[currentLanguage]?.testAudio}
          </Button>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            {labels?.[currentLanguage]?.save}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AudioSettings;