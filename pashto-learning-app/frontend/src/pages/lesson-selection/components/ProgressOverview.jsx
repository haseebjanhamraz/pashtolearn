import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverview = ({ 
  currentLanguage,
  totalCategories = 5,
  completedCategories = 2,
  totalLessons = 45,
  completedLessons = 18,
  totalXP = 1250,
  estimatedTimeRemaining = 24,
  className = ""
}) => {
  const categoryProgress = Math.round((completedCategories / totalCategories) * 100);
  const lessonProgress = Math.round((completedLessons / totalLessons) * 100);
  const overallProgress = Math.round(((completedCategories * 0.4) + (completedLessons / totalLessons * 0.6)) * 100);

  const stats = [
    {
      icon: 'BookOpen',
      value: `${completedCategories}/${totalCategories}`,
      label: currentLanguage === 'en' ? 'Categories' : 'کټګورۍ',
      color: 'text-primary',
      bgColor: 'bg-primary/10'
    },
    {
      icon: 'Target',
      value: `${completedLessons}/${totalLessons}`,
      label: currentLanguage === 'en' ? 'Lessons' : 'زده کړې',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      icon: 'Star',
      value: totalXP?.toLocaleString(),
      label: currentLanguage === 'en' ? 'Total XP' : 'ټول XP',
      color: 'text-accent',
      bgColor: 'bg-accent/10'
    },
    {
      icon: 'Clock',
      value: `${estimatedTimeRemaining}h`,
      label: currentLanguage === 'en' ? 'Remaining' : 'پاتې',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    }
  ];

  return (
    <div className={`bg-card border border-border rounded-lg ${className}`}>
      <div className="card-padding">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="font-heading font-semibold text-foreground text-xl">
              {currentLanguage === 'en' ? 'Your Progress' : 'ستاسو پرمختګ'}
            </h2>
            <p className="text-sm text-muted-foreground mt-1">
              {currentLanguage === 'en' ?'Track your learning journey' :'د خپلې زده کړې سفر تعقیب کړئ'
              }
            </p>
          </div>
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl">
            <Icon name="TrendingUp" size={24} className="text-primary" />
          </div>
        </div>

        {/* Overall Progress */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-3">
            <span className="font-medium text-foreground">
              {currentLanguage === 'en' ? 'Overall Progress' : 'ټولیز پرمختګ'}
            </span>
            <span className="text-2xl font-mono font-bold text-primary">
              {overallProgress}%
            </span>
          </div>
          <div className="w-full bg-muted rounded-full h-3 overflow-hidden">
            <div 
              className="progress-indicator h-full transition-all duration-700 ease-out"
              style={{ width: `${overallProgress}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            {currentLanguage === 'en' ? `You're ${overallProgress}% through your Pashto learning journey!`
              : `تاسو د پښتو زده کړې په سفر کې ${overallProgress}% یاست!`
            }
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {stats?.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`flex items-center justify-center w-10 h-10 ${stat?.bgColor} rounded-lg mx-auto mb-2`}>
                <Icon name={stat?.icon} size={18} className={stat?.color} />
              </div>
              <p className="text-lg font-mono font-semibold text-foreground">
                {stat?.value}
              </p>
              <p className="text-xs text-muted-foreground">
                {stat?.label}
              </p>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-border">
          <div className="flex-1 bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">
                {currentLanguage === 'en' ? 'Study Goal' : 'د زده کړې موخه'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ?'30 minutes daily practice' :'ورځنۍ ۳۰ دقیقې تمرین'
              }
            </p>
          </div>
          
          <div className="flex-1 bg-muted/50 rounded-lg p-3">
            <div className="flex items-center space-x-2 mb-1">
              <Icon name="Flame" size={16} className="text-accent" />
              <span className="text-sm font-medium text-foreground">
                {currentLanguage === 'en' ? 'Current Streak' : 'اوسنی لړۍ'}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              {currentLanguage === 'en' ? '7 days strong!' : '۷ ورځې قوي!'}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressOverview;