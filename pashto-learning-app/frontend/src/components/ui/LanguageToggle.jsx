import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const LanguageToggle = ({ 
  onLanguageChange,
  className = "",
  showLabel = true,
  size = "sm"
}) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Set document direction and language
    document.documentElement.dir = savedLanguage === 'ps' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage === 'ps' ? 'ps' : 'en';
  }, []);

  const languages = [
    { 
      code: 'en', 
      name: 'English', 
      nativeName: 'English',
      flag: '🇺🇸'
    },
    { 
      code: 'ps', 
      name: 'Pashto', 
      nativeName: 'پښتو',
      flag: '🇦🇫'
    }
  ];

  const handleLanguageChange = (languageCode) => {
    setCurrentLanguage(languageCode);
    setIsOpen(false);
    
    // Update document attributes
    document.documentElement.dir = languageCode === 'ps' ? 'rtl' : 'ltr';
    document.documentElement.lang = languageCode === 'ps' ? 'ps' : 'en';
    
    // Save to localStorage
    localStorage.setItem('language', languageCode);
    
    // Notify parent component
    if (onLanguageChange) {
      onLanguageChange(languageCode);
    }

    // Add spring animation to the toggle button
    const toggleButton = document.querySelector('[data-language-toggle]');
    if (toggleButton) {
      toggleButton?.classList?.add('spring-bounce');
      setTimeout(() => {
        toggleButton?.classList?.remove('spring-bounce');
      }, 300);
    }
  };

  const currentLang = languages?.find(lang => lang?.code === currentLanguage);

  return (
    <div className={`relative ${className}`}>
      <Button
        variant="ghost"
        size={size}
        onClick={() => setIsOpen(!isOpen)}
        iconName="Globe"
        iconPosition="left"
        iconSize={16}
        className="text-muted-foreground hover:text-foreground transition-colors duration-200"
        data-language-toggle
      >
        {showLabel && (
          <span className="flex items-center space-x-2">
            <span>{currentLang?.flag}</span>
            <span className="hidden sm:inline">
              {currentLang?.nativeName}
            </span>
            <span className="sm:hidden">
              {currentLang?.code?.toUpperCase()}
            </span>
          </span>
        )}
        {!showLabel && (
          <span className="flex items-center space-x-1">
            <span>{currentLang?.flag}</span>
            <span>{currentLang?.code?.toUpperCase()}</span>
          </span>
        )}
      </Button>
      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Menu */}
          <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-md shadow-elevation-2 py-1 z-50 animate-fade-in">
            <div className="px-3 py-2 border-b border-border">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                {currentLanguage === 'en' ? 'Select Language' : 'ژبه غوره کړئ'}
              </p>
            </div>
            
            {languages?.map((language) => (
              <button
                key={language?.code}
                onClick={() => handleLanguageChange(language?.code)}
                className={`
                  w-full px-3 py-2 text-left hover:bg-muted transition-colors duration-150 
                  flex items-center justify-between group
                  ${currentLanguage === language?.code ? 'bg-primary/5 text-primary' : 'text-foreground'}
                `}
              >
                <div className="flex items-center space-x-3">
                  <span className="text-lg">{language?.flag}</span>
                  <div className="flex flex-col">
                    <span className="text-sm font-medium">{language?.nativeName}</span>
                    <span className="text-xs text-muted-foreground">{language?.name}</span>
                  </div>
                </div>
                
                {currentLanguage === language?.code && (
                  <Icon 
                    name="Check" 
                    size={16} 
                    className="text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-150" 
                  />
                )}
              </button>
            ))}
            
            <div className="px-3 py-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                {currentLanguage === 'en' ?'Interface language will change immediately' :'د انٹرفیس ژبه سمدلاسه بدلیږي'
                }
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default LanguageToggle;