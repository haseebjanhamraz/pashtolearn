import React from 'react';
import Icon from '../../../components/AppIcon';

const ProgressOverview = ({ 
  categories = [
    { name: "Greetings", namePs: "ښه راغلاست", progress: 85, completed: 17, total: 20, icon: "Hand", color: "text-success" },
    { name: "Numbers", namePs: "شمیرې", progress: 70, completed: 14, total: 20, icon: "Hash", color: "text-primary" },
    { name: "Colors", namePs: "رنګونه", progress: 45, completed: 9, total: 20, icon: "Palette", color: "text-accent" },
    { name: "Family", namePs: "کورنۍ", progress: 60, completed: 12, total: 20, icon: "Users", color: "text-warning" },
    { name: "Food", namePs: "خواړه", progress: 30, completed: 6, total: 20, icon: "Utensils", color: "text-error" }
  ]
}) => {
  const CircularProgress = ({ progress, size = 60, strokeWidth = 4, color = "text-primary" }) => {
    const radius = (size - strokeWidth) / 2;
    const circumference = radius * 2 * Math.PI;
    const strokeDasharray = `${(progress / 100) * circumference} ${circumference}`;

    return (
      <div className="relative" style={{ width: size, height: size }}>
        <svg width={size} height={size} className="transform -rotate-90">
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            className="text-muted opacity-20"
          />
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="currentColor"
            strokeWidth={strokeWidth}
            fill="none"
            strokeDasharray={strokeDasharray}
            strokeLinecap="round"
            className={`${color} transition-all duration-700 ease-out`}
          />
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-sm font-mono font-semibold text-foreground">
            {progress}%
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6 shadow-sm">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-full">
          <Icon name="TrendingUp" size={20} className="text-success" />
        </div>
        <div>
          <h3 className="font-heading font-semibold text-foreground">Progress Overview</h3>
          <p className="text-sm text-muted-foreground">Your learning journey</p>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
        {categories?.map((category, index) => (
          <div key={index} className="text-center space-y-3">
            <div className="flex flex-col items-center space-y-2">
              <CircularProgress 
                progress={category?.progress} 
                color={category?.color}
              />
              <div className="flex items-center justify-center w-8 h-8 bg-muted rounded-full">
                <Icon name={category?.icon} size={16} className={category?.color} />
              </div>
            </div>
            
            <div className="space-y-1">
              <h4 className="font-heading font-medium text-foreground text-sm">
                {category?.name}
              </h4>
              <p className="text-xs text-muted-foreground font-mono">
                {category?.namePs}
              </p>
              <p className="text-xs text-muted-foreground">
                {category?.completed}/{category?.total} lessons
              </p>
            </div>
            
            {category?.progress === 100 && (
              <div className="flex items-center justify-center">
                <div className="achievement-badge text-xs">
                  <Icon name="CheckCircle" size={12} className="mr-1" />
                  Complete
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressOverview;