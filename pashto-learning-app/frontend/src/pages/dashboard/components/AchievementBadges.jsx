import React from 'react';
import Icon from '../../../components/AppIcon';

const AchievementBadges = ({ 
  achievements = [
    {
      id: 1,
      title: "First Steps",
      titlePs: "لومړي ګامونه",
      description: "Complete your first lesson",
      icon: "Award",
      earned: true,
      earnedDate: "2025-01-15",
      color: "text-success",
      bgColor: "bg-success/10"
    },
    {
      id: 2,
      title: "Week Warrior",
      titlePs: "د اونۍ جنګیالی",
      description: "Maintain a 7-day streak",
      icon: "Flame",
      earned: true,
      earnedDate: "2025-01-20",
      color: "text-accent",
      bgColor: "bg-accent/10"
    },
    {
      id: 3,
      title: "Vocabulary Master",
      titlePs: "د لغاتو ماهر",
      description: "Learn 100 new words",
      icon: "BookOpen",
      earned: true,
      earnedDate: "2025-01-25",
      color: "text-primary",
      bgColor: "bg-primary/10"
    },
    {
      id: 4,
      title: "Grammar Guru",
      titlePs: "د ګرامر ګرو",
      description: "Complete all grammar exercises",
      icon: "GraduationCap",
      earned: false,
      progress: 75,
      color: "text-warning",
      bgColor: "bg-warning/10"
    },
    {
      id: 5,
      title: "Perfect Score",
      titlePs: "بشپړ نمرې",
      description: "Get 100% on 5 lessons",
      icon: "Target",
      earned: false,
      progress: 40,
      color: "text-error",
      bgColor: "bg-error/10"
    }
  ]
}) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date?.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
            <Icon name="Trophy" size={20} className="text-accent" />
          </div>
          <div>
            <h3 className="font-heading font-semibold text-foreground">Achievements</h3>
            <p className="text-sm text-muted-foreground">Your learning milestones</p>
          </div>
        </div>
        
        <div className="text-right">
          <p className="text-lg font-mono font-semibold text-foreground">
            {achievements?.filter(a => a?.earned)?.length}/{achievements?.length}
          </p>
          <p className="text-xs text-muted-foreground">Earned</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements?.map((achievement) => (
          <div 
            key={achievement?.id}
            className={`
              relative p-4 rounded-lg border transition-all duration-300 hover:shadow-md
              ${achievement?.earned 
                ? 'border-border bg-gradient-to-br from-background to-muted/20' :'border-dashed border-muted bg-muted/5'
              }
            `}
          >
            <div className="flex items-start space-x-3">
              <div className={`
                flex items-center justify-center w-10 h-10 rounded-full transition-all duration-300
                ${achievement?.earned ? achievement?.bgColor : 'bg-muted'}
              `}>
                <Icon 
                  name={achievement?.icon} 
                  size={20} 
                  className={achievement?.earned ? achievement?.color : 'text-muted-foreground'} 
                />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className={`
                    font-heading font-medium text-sm truncate
                    ${achievement?.earned ? 'text-foreground' : 'text-muted-foreground'}
                  `}>
                    {achievement?.title}
                  </h4>
                  {achievement?.earned && (
                    <Icon name="CheckCircle" size={14} className="text-success flex-shrink-0" />
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">
                  {achievement?.description}
                </p>
                
                {achievement?.earned ? (
                  <div className="flex items-center space-x-1">
                    <Icon name="Calendar" size={12} className="text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {formatDate(achievement?.earnedDate)}
                    </span>
                  </div>
                ) : achievement?.progress && (
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground">Progress</span>
                      <span className="text-xs font-mono text-muted-foreground">
                        {achievement?.progress}%
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                      <div 
                        className={`h-full transition-all duration-500 ease-out rounded-full ${achievement?.color?.replace('text-', 'bg-')}`}
                        style={{ width: `${achievement?.progress}%` }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AchievementBadges;