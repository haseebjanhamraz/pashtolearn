import React from 'react';
import Icon from '../AppIcon';

const ProgressIndicator = ({ 
  currentXP = 0, 
  targetXP = 1000, 
  streak = 0, 
  level = 1,
  completedLessons = 0,
  totalLessons = 20,
  showDetails = true,
  className = ""
}) => {
  const progressPercentage = Math.min((currentXP / targetXP) * 100, 100);
  const lessonProgress = Math.min((completedLessons / totalLessons) * 100, 100);

  return (
    <div className={`bg-card rounded-lg border border-border p-4 ${className}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
            <Icon name="Trophy" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              Level {level}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentXP} / {targetXP} XP
            </p>
          </div>
        </div>

        {/* Streak Counter */}
        <div className="flex items-center space-x-2 bg-accent/10 px-3 py-1 rounded-full">
          <Icon name="Flame" size={16} className="text-accent" />
          <span className="text-sm font-mono font-medium text-accent">
            {streak} day{streak !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      {/* XP Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Experience Points</span>
          <span className="text-sm text-muted-foreground">{Math.round(progressPercentage)}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
          <div 
            className="progress-indicator h-full transition-all duration-500 ease-out"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>

      {/* Lesson Progress */}
      {showDetails && (
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Lessons Completed</span>
            <span className="text-sm text-muted-foreground">
              {completedLessons} / {totalLessons}
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="bg-success h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${lessonProgress}%` }}
            />
          </div>
        </div>
      )}

      {/* Achievement Stats */}
      {showDetails && (
        <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full mx-auto mb-1">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
            <p className="text-lg font-mono font-semibold text-foreground">{completedLessons}</p>
            <p className="text-xs text-muted-foreground">Completed</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-warning/10 rounded-full mx-auto mb-1">
              <Icon name="Clock" size={16} className="text-warning" />
            </div>
            <p className="text-lg font-mono font-semibold text-foreground">{totalLessons - completedLessons}</p>
            <p className="text-xs text-muted-foreground">Remaining</p>
          </div>
          
          <div className="text-center">
            <div className="flex items-center justify-center w-8 h-8 bg-accent/10 rounded-full mx-auto mb-1">
              <Icon name="Star" size={16} className="text-accent" />
            </div>
            <p className="text-lg font-mono font-semibold text-foreground">{level}</p>
            <p className="text-xs text-muted-foreground">Level</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProgressIndicator;