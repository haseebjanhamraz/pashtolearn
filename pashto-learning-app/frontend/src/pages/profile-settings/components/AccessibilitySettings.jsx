import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AccessibilitySettings = ({ currentLanguage, accessibilitySettings, onUpdateAccessibilitySettings }) => {
  const [localSettings, setLocalSettings] = useState(accessibilitySettings);

  const labels = {
    en: {
      title: 'Accessibility Settings',
      fontSize: 'Font Size',
      highContrast: 'High Contrast Mode',
      reducedMotion: 'Reduce Animations',
      screenReader: 'Screen Reader Support',
      keyboardNav: 'Enhanced Keyboard Navigation',
      save: 'Save Settings',
      small: 'Small',
      medium: 'Medium',
      large: 'Large',
      extraLarge: 'Extra Large',
      preview: 'Preview Text Sample'
    },
    ps: {
      title: 'د لاسرسي تنظیمات',
      fontSize: 'د لیکونو کچه',
      highContrast: 'د لوړ توپیر حالت',
      reducedMotion: 'د حرکاتو کمول',
      screenReader: 'د سکرین لوستونکي ملاتړ',
      keyboardNav: 'د کیبورډ ښه لارښود',
      save: 'تنظیمات خوندي کړئ',
      small: 'کشر',
      medium: 'منځنی',
      large: 'لوی',
      extraLarge: 'ډیر لوی',
      preview: 'د متن بیلګه'
    }
  };

  const fontSizeOptions = [
    { value: 'small', label: labels?.[currentLanguage]?.small, size: 'text-sm' },
    { value: 'medium', label: labels?.[currentLanguage]?.medium, size: 'text-base' },
    { value: 'large', label: labels?.[currentLanguage]?.large, size: 'text-lg' },
    { value: 'extraLarge', label: labels?.[currentLanguage]?.extraLarge, size: 'text-xl' }
  ];

  const handleFontSizeChange = (size) => {
    setLocalSettings(prev => ({ ...prev, fontSize: size }));
    // Apply font size to document root
    document.documentElement.style.fontSize = size === 'small' ? '14px' : 
                                             size === 'medium' ? '16px' : 
                                             size === 'large' ? '18px' : '20px';
  };

  const handleToggle = (field) => {
    const newValue = !localSettings?.[field];
    setLocalSettings(prev => ({ ...prev, [field]: newValue }));
    
    // Apply settings immediately for preview
    if (field === 'highContrast') {
      document.documentElement?.classList?.toggle('high-contrast', newValue);
    } else if (field === 'reducedMotion') {
      document.documentElement?.classList?.toggle('reduce-motion', newValue);
    }
  };

  const handleSave = () => {
    onUpdateAccessibilitySettings(localSettings);
  };

  const currentFontSize = fontSizeOptions?.find(option => option?.value === localSettings?.fontSize);

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-full">
          <Icon name="Accessibility" size={20} className="text-warning" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {labels?.[currentLanguage]?.title}
        </h3>
      </div>
      <div className="space-y-6">
        {/* Font Size */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            {labels?.[currentLanguage]?.fontSize}
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {fontSizeOptions?.map((option) => (
              <Button
                key={option?.value}
                variant={localSettings?.fontSize === option?.value ? "default" : "outline"}
                size="sm"
                onClick={() => handleFontSizeChange(option?.value)}
                className="text-center"
              >
                {option?.label}
              </Button>
            ))}
          </div>
          
          {/* Font Preview */}
          <div className="p-4 bg-muted/50 rounded-lg border border-border">
            <p className={`${currentFontSize?.size} text-foreground`}>
              {labels?.[currentLanguage]?.preview}: سلام وروره - Hello brother
            </p>
          </div>
        </div>

        {/* Accessibility Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Contrast" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {labels?.[currentLanguage]?.highContrast}
              </span>
            </div>
            <button
              onClick={() => handleToggle('highContrast')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${localSettings?.highContrast ? 'bg-primary' : 'bg-muted-foreground/30'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${localSettings?.highContrast ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Zap" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {labels?.[currentLanguage]?.reducedMotion}
              </span>
            </div>
            <button
              onClick={() => handleToggle('reducedMotion')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${localSettings?.reducedMotion ? 'bg-primary' : 'bg-muted-foreground/30'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${localSettings?.reducedMotion ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Volume2" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {labels?.[currentLanguage]?.screenReader}
              </span>
            </div>
            <button
              onClick={() => handleToggle('screenReader')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${localSettings?.screenReader ? 'bg-primary' : 'bg-muted-foreground/30'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${localSettings?.screenReader ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center space-x-3">
              <Icon name="Keyboard" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {labels?.[currentLanguage]?.keyboardNav}
              </span>
            </div>
            <button
              onClick={() => handleToggle('keyboardNav')}
              className={`
                relative inline-flex h-6 w-11 items-center rounded-full transition-colors
                ${localSettings?.keyboardNav ? 'bg-primary' : 'bg-muted-foreground/30'}
              `}
            >
              <span
                className={`
                  inline-block h-4 w-4 transform rounded-full bg-white transition-transform
                  ${localSettings?.keyboardNav ? 'translate-x-6' : 'translate-x-1'}
                `}
              />
            </button>
          </div>
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

export default AccessibilitySettings;