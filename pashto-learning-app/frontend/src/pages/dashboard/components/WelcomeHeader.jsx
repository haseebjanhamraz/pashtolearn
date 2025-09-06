import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';

const WelcomeHeader = ({ 
  userName = "Ahmad",
  currentLanguage = 'en'
}) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000); // Update every minute

    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime?.getHours();
    
    if (currentLanguage === 'ps') {
      if (hour < 12) return 'سهار مو پخیر';
      if (hour < 17) return 'ماسپښین مو پخیر';
      return 'ماښام مو پخیر';
    } else {
      if (hour < 12) return 'Good morning';
      if (hour < 17) return 'Good afternoon';
      return 'Good evening';
    }
  };

  const getMotivationalMessage = () => {
    const messages = {
      en: [
        "Ready to continue your Pashto journey?",
        "Every lesson brings you closer to fluency!",
        "Your dedication is paying off!",
        "Keep up the excellent progress!"
      ],
      ps: [
        "ستاسو د پښتو زده کړې ته چمتوب لرئ؟",
        "هره زده کړه تاسو د روانۍ ته نږدې کوي!",
        "ستاسو هڅې ګټورې دي!",
        "دا ښه پرمختګ ته دوام ورکړئ!"
      ]
    };
    
    const messageList = messages?.[currentLanguage];
    const randomIndex = Math.floor(Math.random() * messageList?.length);
    return messageList?.[randomIndex];
  };

  const formatDate = () => {
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
    
    if (currentLanguage === 'ps') {
      // For Pashto, we'll use English formatting but could be enhanced with proper Pashto calendar
      return currentTime?.toLocaleDateString('en-US', options);
    }
    
    return currentTime?.toLocaleDateString('en-US', options);
  };

  return (
    <div className="bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 rounded-lg border border-border p-6 mb-6">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-2">
            <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
              <Icon name="Sun" size={24} className="text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-heading font-bold text-foreground">
                {getGreeting()}, {userName}!
              </h1>
              <p className="text-sm text-muted-foreground">
                {formatDate()}
              </p>
            </div>
          </div>
          
          <p className="text-muted-foreground mb-4 max-w-md">
            {getMotivationalMessage()}
          </p>
          
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground">
                {currentLanguage === 'en' ? 'Today' : 'نن'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-muted-foreground" />
              <span className="text-muted-foreground font-mono">
                {currentTime?.toLocaleTimeString('en-US', { 
                  hour: '2-digit', 
                  minute: '2-digit',
                  hour12: true 
                })}
              </span>
            </div>
          </div>
        </div>
        
        <div className="hidden sm:flex items-center space-x-2 bg-background/50 backdrop-blur-sm rounded-lg px-4 py-2 border border-border/50">
          <Icon name="Sparkles" size={16} className="text-accent" />
          <span className="text-sm font-medium text-foreground">
            {currentLanguage === 'en' ? 'Learning Mode' : 'د زده کړې حالت'}
          </span>
        </div>
      </div>
    </div>
  );
};

export default WelcomeHeader;