import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContinueLearningCard = ({ 
  nextLesson = {
    title: "Family Members",
    category: "Vocabulary",
    progress: 60,
    estimatedTime: "8 min",
    description: "Learn essential family relationship terms in Pashto"
  },
  onContinue 
}) => {
  return (
    <div className="bg-gradient-to-br from-primary/5 to-accent/5 rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
            <Icon name="BookOpen" size={20} className="text-primary" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground mb-1">Continue Learning</h3>
            <p className="text-sm text-muted-foreground">{nextLesson?.category}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 bg-warning/10 px-2 py-1 rounded-full">
          <Icon name="Clock" size={14} className="text-warning" />
          <span className="text-xs font-mono text-warning">{nextLesson?.estimatedTime}</span>
        </div>
      </div>
      <div className="mb-4">
        <h4 className="text-lg font-heading font-medium text-foreground mb-2">
          {nextLesson?.title}
        </h4>
        <p className="text-sm text-muted-foreground mb-3">
          {nextLesson?.description}
        </p>
        
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Lesson Progress</span>
            <span className="font-mono text-foreground">{nextLesson?.progress}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
            <div 
              className="bg-success h-full transition-all duration-500 ease-out rounded-full"
              style={{ width: `${nextLesson?.progress}%` }}
            />
          </div>
        </div>
      </div>
      <Button 
        variant="default" 
        fullWidth 
        iconName="Play" 
        iconPosition="left"
        onClick={onContinue}
        className="spring-bounce"
      >
        Continue Lesson
      </Button>
    </div>
  );
};

export default ContinueLearningCard;