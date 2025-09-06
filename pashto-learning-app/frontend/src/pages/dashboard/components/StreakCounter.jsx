import React from 'react';
import Icon from '../../../components/AppIcon';

const StreakCounter = ({ streak = 7, currentXP = 1250, level = 3, nextLevelXP = 2000 }) => {
  const progressPercentage = Math.min((currentXP / nextLevelXP) * 100, 100);

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-full">
            <Icon name="Flame" size={24} className="text-accent" />
          </div>
          <div>
            <h3 className="text-2xl font-heading font-bold text-foreground">{streak}</h3>
            <p className="text-sm text-muted-foreground">Day Streak</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="flex items-center space-x-2 mb-1">
            <Icon name="Star" size={16} className="text-primary" />
            <span className="text-lg font-mono font-semibold text-foreground">{currentXP} XP</span>
          </div>
          <p className="text-xs text-muted-foreground">Level {level}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Progress to Level {level + 1}</span>
          <span className="font-mono text-foreground">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="progress-indicator h-full transition-all duration-700 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          {nextLevelXP - currentXP} XP to next level
        </p>
      </div>
    </div>
  );
};

export default StreakCounter;