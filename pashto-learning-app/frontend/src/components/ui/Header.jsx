import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const navigationItems = [
    { 
      label: { en: 'Dashboard', ps: 'ډشبورډ' }, 
      path: '/dashboard', 
      icon: 'LayoutDashboard' 
    },
    { 
      label: { en: 'Lessons', ps: 'زده کړې' }, 
      path: '/lesson-selection', 
      icon: 'BookOpen' 
    },
    { 
      label: { en: 'Practice', ps: 'تمرین' }, 
      path: '/practice-exercises', 
      icon: 'Target' 
    },
    { 
      label: { en: 'Profile', ps: 'پروفایل' }, 
      path: '/profile-settings', 
      icon: 'User' 
    }
  ];

  const handleNavigation = (path) => {
    navigate(path);
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'ps' : 'en';
    setCurrentLanguage(newLanguage);
    document.documentElement.dir = newLanguage === 'ps' ? 'rtl' : 'ltr';
    document.documentElement.lang = newLanguage === 'ps' ? 'ps' : 'en';
    localStorage.setItem('language', newLanguage);
    setIsLanguageMenuOpen(false);
  };

  const isActivePath = (path) => {
    if (path === '/lesson-selection' && location?.pathname === '/lesson-content') {
      return true;
    }
    return location?.pathname === path;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Logo Section */}
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary rounded-lg">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="text-primary-foreground"
            >
              <path
                d="M12 2L2 7L12 12L22 7L12 2Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 17L12 22L22 17"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M2 12L12 17L22 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>
          <div className="flex flex-col">
            <h1 className="text-lg font-heading font-semibold text-foreground">
              PashtoLearn
            </h1>
            <span className="text-xs font-caption text-muted-foreground">
              {currentLanguage === 'en' ? 'Language Learning' : 'د ژبې زده کړه'}
            </span>
          </div>
        </div>

        {/* Navigation Items - Desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          {navigationItems?.map((item) => (
            <Button
              key={item?.path}
              variant={isActivePath(item?.path) ? "default" : "ghost"}
              size="sm"
              onClick={() => handleNavigation(item?.path)}
              iconName={item?.icon}
              iconPosition="left"
              iconSize={16}
              className={`
                transition-all duration-200 
                ${isActivePath(item?.path) 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                }
              `}
            >
              {item?.label?.[currentLanguage]}
            </Button>
          ))}
        </nav>

        {/* Language Toggle */}
        <div className="relative">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            iconName="Globe"
            iconPosition="left"
            iconSize={16}
            className="text-muted-foreground hover:text-foreground"
          >
            {currentLanguage === 'en' ? 'EN' : 'پښتو'}
          </Button>

          {isLanguageMenuOpen && (
            <div className="absolute right-0 top-full mt-2 w-32 bg-popover border border-border rounded-md shadow-elevation-2 py-1 z-50">
              <button
                onClick={toggleLanguage}
                className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors duration-150 flex items-center space-x-2"
              >
                <Icon name="Languages" size={14} />
                <span>{currentLanguage === 'en' ? 'پښتو' : 'English'}</span>
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-background border-t border-border z-50">
        <nav className="flex items-center justify-around py-2">
          {navigationItems?.map((item) => (
            <button
              key={item?.path}
              onClick={() => handleNavigation(item?.path)}
              className={`
                flex flex-col items-center space-y-1 px-3 py-2 rounded-lg transition-all duration-200
                ${isActivePath(item?.path)
                  ? 'text-primary bg-primary/10' :'text-muted-foreground hover:text-foreground hover:bg-muted'
                }
              `}
            >
              <Icon 
                name={item?.icon} 
                size={20} 
                className={isActivePath(item?.path) ? 'text-primary' : 'text-current'}
              />
              <span className="text-xs font-caption">
                {item?.label?.[currentLanguage]}
              </span>
            </button>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;