import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ProgressStats = ({ currentLanguage, progressData, onExportData }) => {
  const labels = {
    en: {
      title: 'Learning Progress & Statistics',
      totalLessons: 'Total Lessons Completed',
      currentStreak: 'Current Streak',
      longestStreak: 'Longest Streak',
      totalXP: 'Total XP Earned',
      averageDaily: 'Average Daily Practice',
      achievements: 'Achievements Unlocked',
      exportData: 'Export Progress Data',
      viewAchievements: 'View All Achievements',
      days: 'days',
      minutes: 'minutes',
      thisWeek: 'This Week',
      thisMonth: 'This Month',
      allTime: 'All Time'
    },
    ps: {
      title: 'د زده کړې پرمختګ او احصایې',
      totalLessons: 'ټول بشپړ شوي درسونه',
      currentStreak: 'اوسنۍ پرله پسې ورځې',
      longestStreak: 'تر ټولو اوږده پرله پسې ورځې',
      totalXP: 'ټول ترلاسه شوي XP',
      averageDaily: 'د ورځني تمرین اوسط',
      achievements: 'ترلاسه شوي لاسته راوړنې',
      exportData: 'د پرمختګ ډیټا صادرول',
      viewAchievements: 'ټول لاسته راوړنې وګورئ',
      days: 'ورځې',
      minutes: 'دقیقې',
      thisWeek: 'دا اونۍ',
      thisMonth: 'دا میاشت',
      allTime: 'ټول وخت'
    }
  };

  const achievements = [
    {
      id: 1,
      name: currentLanguage === 'en' ? 'First Steps' : 'لومړي ګامونه',
      description: currentLanguage === 'en' ? 'Complete your first lesson' : 'خپل لومړی درس بشپړ کړئ',
      icon: 'Award',
      earned: true,
      earnedDate: '2025-08-15'
    },
    {
      id: 2,
      name: currentLanguage === 'en' ? 'Week Warrior' : 'د اونۍ جنګیالی',
      description: currentLanguage === 'en' ? 'Maintain a 7-day streak' : '۷ ورځنۍ پرله پسې ورځې وساتئ',
      icon: 'Flame',
      earned: true,
      earnedDate: '2025-08-22'
    },
    {
      id: 3,
      name: currentLanguage === 'en' ? 'Vocabulary Master' : 'د لغاتو ماهر',
      description: currentLanguage === 'en' ? 'Learn 100 new words' : '۱۰۰ نوي کلمې زده کړئ',
      icon: 'BookOpen',
      earned: true,
      earnedDate: '2025-09-01'
    },
    {
      id: 4,
      name: currentLanguage === 'en' ? 'Grammar Guru' : 'د ګرامر ماهر',
      description: currentLanguage === 'en' ? 'Complete all grammar lessons' : 'ټول ګرامر درسونه بشپړ کړئ',
      icon: 'GraduationCap',
      earned: false,
      earnedDate: null
    }
  ];

  const stats = [
    {
      label: labels?.[currentLanguage]?.totalLessons,
      value: progressData?.totalLessons,
      icon: 'BookOpen',
      color: 'text-primary'
    },
    {
      label: labels?.[currentLanguage]?.currentStreak,
      value: `${progressData?.currentStreak} ${labels?.[currentLanguage]?.days}`,
      icon: 'Flame',
      color: 'text-accent'
    },
    {
      label: labels?.[currentLanguage]?.longestStreak,
      value: `${progressData?.longestStreak} ${labels?.[currentLanguage]?.days}`,
      icon: 'Trophy',
      color: 'text-warning'
    },
    {
      label: labels?.[currentLanguage]?.totalXP,
      value: progressData?.totalXP?.toLocaleString(),
      icon: 'Star',
      color: 'text-success'
    },
    {
      label: labels?.[currentLanguage]?.averageDaily,
      value: `${progressData?.averageDailyMinutes} ${labels?.[currentLanguage]?.minutes}`,
      icon: 'Clock',
      color: 'text-secondary'
    },
    {
      label: labels?.[currentLanguage]?.achievements,
      value: `${achievements?.filter(a => a?.earned)?.length}/${achievements?.length}`,
      icon: 'Award',
      color: 'text-primary'
    }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-full">
            <Icon name="TrendingUp" size={20} className="text-success" />
          </div>
          <h3 className="text-lg font-heading font-semibold text-foreground">
            {labels?.[currentLanguage]?.title}
          </h3>
        </div>
        
        <Button
          variant="outline"
          size="sm"
          onClick={onExportData}
          iconName="Download"
          iconPosition="left"
          iconSize={16}
        >
          {labels?.[currentLanguage]?.exportData}
        </Button>
      </div>
      {/* Statistics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {stats?.map((stat, index) => (
          <div key={index} className="bg-muted/50 rounded-lg p-4 border border-border">
            <div className="flex items-center space-x-3 mb-2">
              <Icon name={stat?.icon} size={20} className={stat?.color} />
              <span className="text-sm font-medium text-muted-foreground">
                {stat?.label}
              </span>
            </div>
            <p className="text-2xl font-mono font-bold text-foreground">
              {stat?.value}
            </p>
          </div>
        ))}
      </div>
      {/* Recent Achievements */}
      <div className="border-t border-border pt-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-md font-medium text-foreground">
            {labels?.[currentLanguage]?.achievements}
          </h4>
          <Button
            variant="ghost"
            size="sm"
            iconName="ExternalLink"
            iconPosition="right"
            iconSize={14}
          >
            {labels?.[currentLanguage]?.viewAchievements}
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {achievements?.slice(0, 4)?.map((achievement) => (
            <div
              key={achievement?.id}
              className={`
                flex items-center space-x-3 p-3 rounded-lg border transition-colors
                ${achievement?.earned 
                  ? 'bg-success/5 border-success/20' :'bg-muted/30 border-border opacity-60'
                }
              `}
            >
              <div className={`
                flex items-center justify-center w-8 h-8 rounded-full
                ${achievement?.earned ? 'bg-success/10' : 'bg-muted'}
              `}>
                <Icon 
                  name={achievement?.icon} 
                  size={16} 
                  className={achievement?.earned ? 'text-success' : 'text-muted-foreground'} 
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  {achievement?.name}
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  {achievement?.description}
                </p>
                {achievement?.earned && achievement?.earnedDate && (
                  <p className="text-xs text-success mt-1">
                    {new Date(achievement.earnedDate)?.toLocaleDateString()}
                  </p>
                )}
              </div>
              {achievement?.earned && (
                <Icon name="Check" size={16} className="text-success" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProgressStats;