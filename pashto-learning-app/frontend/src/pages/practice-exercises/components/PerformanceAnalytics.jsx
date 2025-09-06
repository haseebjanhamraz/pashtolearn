import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import Icon from '../../../components/AppIcon';

const PerformanceAnalytics = ({ currentLanguage = 'en' }) => {
  // Mock analytics data
  const weeklyProgress = [
    { day: currentLanguage === 'en' ? 'Mon' : 'دوشنبه', accuracy: 75, sessions: 3 },
    { day: currentLanguage === 'en' ? 'Tue' : 'سه‌شنبه', accuracy: 82, sessions: 4 },
    { day: currentLanguage === 'en' ? 'Wed' : 'چهارشنبه', accuracy: 78, sessions: 2 },
    { day: currentLanguage === 'en' ? 'Thu' : 'پنج‌شنبه', accuracy: 85, sessions: 5 },
    { day: currentLanguage === 'en' ? 'Fri' : 'جمعه', accuracy: 88, sessions: 3 },
    { day: currentLanguage === 'en' ? 'Sat' : 'شنبه', accuracy: 92, sessions: 4 },
    { day: currentLanguage === 'en' ? 'Sun' : 'یکشنبه', accuracy: 89, sessions: 3 }
  ];

  const skillBreakdown = [
    { name: currentLanguage === 'en' ? 'Pronunciation' : 'تلفظ', value: 85, color: '#2D5A87' },
    { name: currentLanguage === 'en' ? 'Vocabulary' : 'لغات', value: 78, color: '#E67E22' },
    { name: currentLanguage === 'en' ? 'Grammar' : 'ګرامر', value: 82, color: '#27AE60' },
    { name: currentLanguage === 'en' ? 'Reading' : 'لوستل', value: 75, color: '#8B4513' },
    { name: currentLanguage === 'en' ? 'Writing' : 'لیکل', value: 70, color: '#E74C3C' }
  ];

  const responseTimeData = [
    { exercise: currentLanguage === 'en' ? 'Vocab' : 'لغات', avgTime: 4.2, target: 5.0 },
    { exercise: currentLanguage === 'en' ? 'Grammar' : 'ګرامر', avgTime: 6.8, target: 7.0 },
    { exercise: currentLanguage === 'en' ? 'Pronunciation' : 'تلفظ', avgTime: 8.5, target: 10.0 },
    { exercise: currentLanguage === 'en' ? 'Reading' : 'لوستل', avgTime: 12.3, target: 15.0 },
    { exercise: currentLanguage === 'en' ? 'Writing' : 'لیکل', avgTime: 18.7, target: 20.0 }
  ];

  const overallStats = {
    totalSessions: 156,
    averageAccuracy: 83,
    totalTimeSpent: 2340, // minutes
    currentStreak: 12,
    bestStreak: 28,
    weakestSkill: currentLanguage === 'en' ? 'Writing' : 'لیکل',
    strongestSkill: currentLanguage === 'en' ? 'Pronunciation' : 'تلفظ'
  };

  return (
    <div className="space-y-6">
      {/* Overall Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
              <Icon name="Target" size={20} className="text-primary" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-foreground">{overallStats?.averageAccuracy}%</p>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'en' ? 'Avg Accuracy' : 'اوسط دقت'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-full">
              <Icon name="PlayCircle" size={20} className="text-success" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-foreground">{overallStats?.totalSessions}</p>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'en' ? 'Total Sessions' : 'ټولې غونډې'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
              <Icon name="Clock" size={20} className="text-accent" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-foreground">{Math.round(overallStats?.totalTimeSpent / 60)}h</p>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'en' ? 'Time Spent' : 'تیر شوی وخت'}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-4">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-full">
              <Icon name="Flame" size={20} className="text-warning" />
            </div>
            <div>
              <p className="text-2xl font-mono font-bold text-foreground">{overallStats?.currentStreak}</p>
              <p className="text-sm text-muted-foreground">
                {currentLanguage === 'en' ? 'Day Streak' : 'ورځنۍ سلسله'}
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Progress Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">
              {currentLanguage === 'en' ? 'Weekly Progress' : 'اونیز پرمختګ'}
            </h3>
            <Icon name="TrendingUp" size={20} className="text-success" />
          </div>
          
          <div className="w-full h-64" aria-label="Weekly Progress Chart">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyProgress}>
                <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
                <XAxis 
                  dataKey="day" 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <YAxis 
                  stroke="var(--color-muted-foreground)"
                  fontSize={12}
                />
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
                <Bar dataKey="accuracy" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Skill Breakdown Pie Chart */}
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-heading font-semibold text-foreground">
              {currentLanguage === 'en' ? 'Skill Performance' : 'د مهارتونو فعالیت'}
            </h3>
            <Icon name="PieChart" size={20} className="text-primary" />
          </div>
          
          <div className="w-full h-64" aria-label="Skill Performance Chart">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={skillBreakdown}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {skillBreakdown?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry?.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{
                    backgroundColor: 'var(--color-popover)',
                    border: '1px solid var(--color-border)',
                    borderRadius: '8px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          {/* Legend */}
          <div className="grid grid-cols-2 gap-2 mt-4">
            {skillBreakdown?.map((skill, index) => (
              <div key={index} className="flex items-center space-x-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: skill?.color }}
                />
                <span className="text-sm text-muted-foreground">{skill?.name}</span>
                <span className="text-sm font-mono font-medium text-foreground">{skill?.value}%</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Response Time Analysis */}
      <div className="bg-card rounded-lg border border-border p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-semibold text-foreground">
            {currentLanguage === 'en' ? 'Response Time Analysis' : 'د ځواب ورکولو وخت تحلیل'}
          </h3>
          <Icon name="Timer" size={20} className="text-accent" />
        </div>
        
        <div className="w-full h-64" aria-label="Response Time Chart">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={responseTimeData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" />
              <XAxis 
                type="number" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
              />
              <YAxis 
                type="category" 
                dataKey="exercise" 
                stroke="var(--color-muted-foreground)"
                fontSize={12}
                width={80}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'var(--color-popover)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
              <Bar dataKey="avgTime" fill="var(--color-accent)" radius={[0, 4, 4, 0]} />
              <Bar dataKey="target" fill="var(--color-muted)" radius={[0, 4, 4, 0]} opacity={0.3} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
      {/* Insights and Recommendations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-full">
              <Icon name="TrendingUp" size={20} className="text-success" />
            </div>
            <h3 className="font-heading font-semibold text-foreground">
              {currentLanguage === 'en' ? 'Strengths' : 'ځواکمن ټکي'}
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">{overallStats?.strongestSkill}</span>
              <span className="text-sm font-mono text-success">92% accuracy</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">
                {currentLanguage === 'en' ? 'Consistent Practice' : 'دوامداره تمرین'}
              </span>
              <span className="text-sm font-mono text-success">{overallStats?.currentStreak} days</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-success/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">
                {currentLanguage === 'en' ? 'Quick Response' : 'ګړندی ځواب'}
              </span>
              <span className="text-sm font-mono text-success">4.2s avg</span>
            </div>
          </div>
        </div>

        <div className="bg-card rounded-lg border border-border p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-full">
              <Icon name="Target" size={20} className="text-warning" />
            </div>
            <h3 className="font-heading font-semibold text-foreground">
              {currentLanguage === 'en' ? 'Areas for Improvement' : 'د پرمختګ ساحې'}
            </h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">{overallStats?.weakestSkill}</span>
              <span className="text-sm font-mono text-warning">70% accuracy</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">
                {currentLanguage === 'en' ? 'Reading Speed' : 'د لوستلو سرعت'}
              </span>
              <span className="text-sm font-mono text-warning">12.3s avg</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg">
              <span className="text-sm font-medium text-foreground">
                {currentLanguage === 'en' ? 'Grammar Rules' : 'د ګرامر قواعد'}
              </span>
              <span className="text-sm font-mono text-warning">75% accuracy</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceAnalytics;