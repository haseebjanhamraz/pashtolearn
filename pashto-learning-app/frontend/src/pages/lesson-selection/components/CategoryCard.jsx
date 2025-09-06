import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const CategoryCard = ({ 
  category, 
  currentLanguage, 
  onCategorySelect,
  className = "" 
}) => {
  const {
    id,
    title,
    description,
    icon,
    totalLessons,
    completedLessons,
    difficulty,
    isLocked,
    unlockRequirement,
    previewVocabulary,
    estimatedHours,
    xpReward
  } = category;

  const completionPercentage = totalLessons > 0 ? Math.round((completedLessons / totalLessons) * 100) : 0;
  const isCompleted = completedLessons === totalLessons;

  const difficultyColors = {
    beginner: 'bg-success/10 text-success border-success/20',
    intermediate: 'bg-warning/10 text-warning border-warning/20',
    advanced: 'bg-error/10 text-error border-error/20'
  };

  const difficultyLabels = {
    en: {
      beginner: 'Beginner',
      intermediate: 'Intermediate', 
      advanced: 'Advanced'
    },
    ps: {
      beginner: 'پیل کوونکی',
      intermediate: 'منځنی',
      advanced: 'پرمختللی'
    }
  };

  return (
    <div className={`lesson-card hover:shadow-elevation-2 transition-all duration-300 ${isLocked ? 'opacity-60' : ''} ${className}`}>
      <div className="card-padding">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-12 h-12 rounded-xl ${isLocked ? 'bg-muted' : 'bg-primary/10'}`}>
              <Icon 
                name={isLocked ? 'Lock' : icon} 
                size={24} 
                className={isLocked ? 'text-muted-foreground' : 'text-primary'} 
              />
            </div>
            <div className="flex-1">
              <h3 className="font-heading font-semibold text-foreground text-lg">
                {title?.[currentLanguage]}
              </h3>
              <p className="text-sm text-muted-foreground mt-1">
                {description?.[currentLanguage]}
              </p>
            </div>
          </div>

          {/* Completion Status */}
          {isCompleted && !isLocked && (
            <div className="flex items-center justify-center w-8 h-8 bg-success/10 rounded-full">
              <Icon name="CheckCircle" size={16} className="text-success" />
            </div>
          )}
        </div>

        {/* Progress Bar */}
        {!isLocked && (
          <div className="mb-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-foreground">
                {currentLanguage === 'en' ? 'Progress' : 'پرمختګ'}
              </span>
              <span className="text-sm text-muted-foreground">
                {completedLessons}/{totalLessons} • {completionPercentage}%
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
              <div 
                className="progress-indicator h-full transition-all duration-500 ease-out"
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>
        )}

        {/* Difficulty Badge */}
        <div className="flex items-center justify-between mb-4">
          <div className={`px-3 py-1 rounded-full text-xs font-medium border ${difficultyColors?.[difficulty]}`}>
            {difficultyLabels?.[currentLanguage]?.[difficulty]}
          </div>
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-1">
              <Icon name="Clock" size={14} />
              <span>{estimatedHours}h</span>
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={14} />
              <span>{xpReward} XP</span>
            </div>
          </div>
        </div>

        {/* Preview Vocabulary */}
        {!isLocked && previewVocabulary && (
          <div className="mb-4 p-3 bg-muted/50 rounded-lg">
            <p className="text-xs font-medium text-muted-foreground mb-2 uppercase tracking-wide">
              {currentLanguage === 'en' ? 'Preview' : 'مخکتنه'}
            </p>
            <div className="space-y-1">
              {previewVocabulary?.slice(0, 2)?.map((vocab, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <span className="text-foreground font-medium">{vocab?.pashto}</span>
                  <span className="text-muted-foreground">{vocab?.english}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lock Requirements */}
        {isLocked && (
          <div className="mb-4 p-3 bg-warning/5 border border-warning/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Lock" size={16} className="text-warning" />
              <span className="text-sm font-medium text-warning">
                {currentLanguage === 'en' ? 'Locked' : 'بند'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {unlockRequirement?.[currentLanguage]}
            </p>
          </div>
        )}

        {/* Action Button */}
        <Button
          variant={isLocked ? "ghost" : "default"}
          fullWidth
          disabled={isLocked}
          onClick={() => !isLocked && onCategorySelect(category)}
          iconName={isLocked ? "Lock" : isCompleted ? "RotateCcw" : "Play"}
          iconPosition="left"
          iconSize={16}
          className="mt-2"
        >
          {isLocked 
            ? (currentLanguage === 'en' ? 'Locked' : 'بند')
            : isCompleted 
              ? (currentLanguage === 'en' ? 'Review' : 'بیاکتنه')
              : (currentLanguage === 'en' ? 'Start Learning' : 'زده کړه پیل کړئ')
          }
        </Button>
      </div>
    </div>
  );
};

export default CategoryCard;