import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExerciseTypeCard = ({ 
  exercise, 
  onStartExercise, 
  currentLanguage = 'en' 
}) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'beginner': return 'text-success bg-success/10';
      case 'intermediate': return 'text-warning bg-warning/10';
      case 'advanced': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPerformanceColor = (accuracy) => {
    if (accuracy >= 80) return 'text-success';
    if (accuracy >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="lesson-card hover:shadow-elevation-2 transition-all duration-200 group">
      <div className="card-padding">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className={`flex items-center justify-center w-12 h-12 rounded-lg ${exercise?.iconBg}`}>
              <Icon name={exercise?.icon} size={24} className={exercise?.iconColor} />
            </div>
            <div>
              <h3 className="font-heading font-semibold text-foreground group-hover:text-primary transition-colors duration-200">
                {exercise?.title?.[currentLanguage]}
              </h3>
              <p className="text-sm text-muted-foreground">
                {exercise?.subtitle?.[currentLanguage]}
              </p>
            </div>
          </div>
          
          <div className={`px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise?.difficulty)}`}>
            {exercise?.difficulty}
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
          {exercise?.description?.[currentLanguage]}
        </p>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
          <div className="text-center">
            <p className="text-lg font-mono font-semibold text-foreground">
              {exercise?.completedSessions}
            </p>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ? 'Sessions' : 'غونډې'}
            </p>
          </div>
          <div className="text-center">
            <p className={`text-lg font-mono font-semibold ${getPerformanceColor(exercise?.accuracy)}`}>
              {exercise?.accuracy}%
            </p>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ? 'Accuracy' : 'دقت'}
            </p>
          </div>
          <div className="text-center">
            <p className="text-lg font-mono font-semibold text-foreground">
              {exercise?.avgTime}s
            </p>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ? 'Avg Time' : 'اوسط وخت'}
            </p>
          </div>
        </div>

        {/* Recommended Frequency */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">
              {currentLanguage === 'en' ? 'Recommended:' : 'وړاندیز:'} {exercise?.recommendedFrequency?.[currentLanguage]}
            </span>
          </div>
          {exercise?.lastPracticed && (
            <span className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ? 'Last:' : 'وروستی:'} {exercise?.lastPracticed}
            </span>
          )}
        </div>

        {/* Action Button */}
        <Button
          variant="default"
          fullWidth
          onClick={() => onStartExercise(exercise)}
          iconName="Play"
          iconPosition="left"
          iconSize={16}
          className="group-hover:shadow-sm transition-all duration-200"
        >
          {currentLanguage === 'en' ? 'Start Practice' : 'تمرین پیل کړئ'}
        </Button>
      </div>
    </div>
  );
};

export default ExerciseTypeCard;