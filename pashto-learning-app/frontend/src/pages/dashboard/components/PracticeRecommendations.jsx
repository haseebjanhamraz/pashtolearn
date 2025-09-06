import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PracticeRecommendations = ({ 
  recommendations = [
    {
      id: 1,
      type: "review",
      title: "Review Greetings",
      titlePs: "د ښه راغلاست بیاکتنه",
      description: "Strengthen your greeting vocabulary",
      icon: "RotateCcw",
      difficulty: "Easy",
      estimatedTime: "5 min",
      priority: "high",
      color: "text-success"
    },
    {
      id: 2,
      type: "weak_area",
      title: "Numbers Practice",
      titlePs: "د شمیرو تمرین",
      description: "Focus on numbers 20-100",
      icon: "Hash",
      difficulty: "Medium",
      estimatedTime: "8 min",
      priority: "medium",
      color: "text-warning"
    },
    {
      id: 3,
      type: "pronunciation",
      title: "Pronunciation Drill",
      titlePs: "د تلفظ تمرین",
      description: "Practice difficult sounds",
      icon: "Volume2",
      difficulty: "Hard",
      estimatedTime: "10 min",
      priority: "low",
      color: "text-error"
    }
  ],
  onStartPractice 
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'border-l-error bg-error/5';
      case 'medium': return 'border-l-warning bg-warning/5';
      case 'low': return 'border-l-primary bg-primary/5';
      default: return 'border-l-muted bg-muted/5';
    }
  };

  const getDifficultyIcon = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'Circle';
      case 'Medium': return 'CircleDot';
      case 'Hard': return 'Target';
      default: return 'Circle';
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
          <Icon name="Lightbulb" size={20} className="text-primary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">Practice Recommendations</h3>
          <p className="text-sm text-muted-foreground">Personalized for your progress</p>
        </div>
      </div>
      <div className="space-y-4">
        {recommendations?.map((rec) => (
          <div 
            key={rec?.id}
            className={`
              border-l-4 rounded-r-lg p-4 transition-all duration-200 hover:shadow-sm
              ${getPriorityColor(rec?.priority)}
            `}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1">
                <div className="flex items-center justify-center w-8 h-8 bg-background rounded-full">
                  <Icon name={rec?.icon} size={16} className={rec?.color} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-heading font-medium text-foreground text-sm">
                      {rec?.title}
                    </h4>
                    <div className="flex items-center space-x-1">
                      <Icon name={getDifficultyIcon(rec?.difficulty)} size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{rec?.difficulty}</span>
                    </div>
                  </div>
                  
                  <p className="text-xs text-muted-foreground mb-2">
                    {rec?.description}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center space-x-1">
                      <Icon name="Clock" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">{rec?.estimatedTime}</span>
                    </div>
                    
                    <div className="flex items-center space-x-1">
                      <Icon name="Flag" size={12} className="text-muted-foreground" />
                      <span className="text-xs text-muted-foreground capitalize">{rec?.priority} priority</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <Button
                variant="outline"
                size="sm"
                iconName="Play"
                iconPosition="left"
                onClick={() => onStartPractice && onStartPractice(rec)}
                className="ml-3 flex-shrink-0"
              >
                Start
              </Button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <Button
          variant="ghost"
          fullWidth
          iconName="ArrowRight"
          iconPosition="right"
          onClick={() => onStartPractice && onStartPractice({ type: 'all' })}
        >
          View All Practice Exercises
        </Button>
      </div>
    </div>
  );
};

export default PracticeRecommendations;