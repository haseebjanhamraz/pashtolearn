import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickAccessButtons = ({ 
  onNavigate,
  quickActions = [
    {
      id: 'pronunciation',
      title: 'Pronunciation',
      titlePs: 'تلفظ',
      description: 'Practice speaking',
      icon: 'Mic',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      route: '/practice-exercises?type=pronunciation'
    },
    {
      id: 'vocabulary',
      title: 'Vocabulary',
      titlePs: 'لغات',
      description: 'Review words',
      icon: 'BookOpen',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      route: '/practice-exercises?type=vocabulary'
    },
    {
      id: 'grammar',
      title: 'Grammar',
      titlePs: 'ګرامر',
      description: 'Study rules',
      icon: 'FileText',
      color: 'text-success',
      bgColor: 'bg-success/10',
      route: '/practice-exercises?type=grammar'
    },
    {
      id: 'writing',
      title: 'Writing',
      titlePs: 'لیکنه',
      description: 'Practice script',
      icon: 'PenTool',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      route: '/practice-exercises?type=writing'
    }
  ]
}) => {
  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-secondary/10 rounded-full">
          <Icon name="Zap" size={20} className="text-secondary" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">Quick Practice</h3>
          <p className="text-sm text-muted-foreground">Jump into focused exercises</p>
        </div>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {quickActions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => onNavigate && onNavigate(action?.route)}
            className="group p-4 rounded-lg border border-border bg-background hover:bg-muted/50 transition-all duration-200 hover:shadow-md hover:scale-105 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
          >
            <div className="flex flex-col items-center space-y-3">
              <div className={`
                flex items-center justify-center w-12 h-12 rounded-full transition-all duration-200 group-hover:scale-110
                ${action?.bgColor}
              `}>
                <Icon name={action?.icon} size={24} className={action?.color} />
              </div>
              
              <div className="text-center space-y-1">
                <h4 className="font-heading font-medium text-foreground text-sm group-hover:text-primary transition-colors duration-200">
                  {action?.title}
                </h4>
                <p className="text-xs text-muted-foreground font-mono">
                  {action?.titlePs}
                </p>
                <p className="text-xs text-muted-foreground">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <Button
            variant="outline"
            fullWidth
            iconName="Target"
            iconPosition="left"
            onClick={() => onNavigate && onNavigate('/lesson-selection')}
          >
            Browse Lessons
          </Button>
          
          <Button
            variant="outline"
            fullWidth
            iconName="Settings"
            iconPosition="left"
            onClick={() => onNavigate && onNavigate('/profile-settings')}
          >
            Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuickAccessButtons;