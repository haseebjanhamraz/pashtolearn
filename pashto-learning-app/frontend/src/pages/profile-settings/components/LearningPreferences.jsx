import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const LearningPreferences = ({ currentLanguage, preferences, onUpdatePreferences }) => {
  const [localPreferences, setLocalPreferences] = useState(preferences);

  const labels = {
    en: {
      title: 'Learning Preferences',
      dailyGoal: 'Daily Learning Goal',
      difficulty: 'Preferred Difficulty',
      reminders: 'Practice Reminders',
      notifications: 'Notifications',
      streakReminder: 'Streak reminder notifications',
      achievementAlert: 'Achievement celebration alerts',
      lessonComplete: 'Lesson completion notifications',
      weeklyReport: 'Weekly progress reports',
      save: 'Save Preferences',
      minutes: 'minutes',
      easy: 'Easy',
      medium: 'Medium',
      hard: 'Hard',
      expert: 'Expert'
    },
    ps: {
      title: 'د زده کړې غوراوي',
      dailyGoal: 'ورځنۍ د زده کړې موخه',
      difficulty: 'د غوره ستونزې کچه',
      reminders: 'د تمرین یادونې',
      notifications: 'خبرتیاوې',
      streakReminder: 'د پرله پسې ورځو یادونې',
      achievementAlert: 'د لاسته راوړنو لمانځنې',
      lessonComplete: 'د درس بشپړیدو خبرتیاوې',
      weeklyReport: 'اونیز پرمختګ راپور',
      save: 'غوراوي خوندي کړئ',
      minutes: 'دقیقې',
      easy: 'اسانه',
      medium: 'منځنۍ',
      hard: 'سخته',
      expert: 'ماهر'
    }
  };

  const difficultyOptions = [
    { value: 'easy', label: labels?.[currentLanguage]?.easy },
    { value: 'medium', label: labels?.[currentLanguage]?.medium },
    { value: 'hard', label: labels?.[currentLanguage]?.hard },
    { value: 'expert', label: labels?.[currentLanguage]?.expert }
  ];

  const handleInputChange = (field, value) => {
    setLocalPreferences(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (field, checked) => {
    setLocalPreferences(prev => ({
      ...prev,
      notifications: {
        ...prev?.notifications,
        [field]: checked
      }
    }));
  };

  const handleSave = () => {
    onUpdatePreferences(localPreferences);
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
          <Icon name="Target" size={20} className="text-accent" />
        </div>
        <h3 className="text-lg font-heading font-semibold text-foreground">
          {labels?.[currentLanguage]?.title}
        </h3>
      </div>
      <div className="space-y-6">
        {/* Daily Goal */}
        <div>
          <Input
            label={labels?.[currentLanguage]?.dailyGoal}
            type="number"
            value={localPreferences?.dailyGoalMinutes}
            onChange={(e) => handleInputChange('dailyGoalMinutes', parseInt(e?.target?.value))}
            min="5"
            max="120"
            description={`${labels?.[currentLanguage]?.minutes} (5-120)`}
          />
        </div>

        {/* Difficulty Level */}
        <div>
          <Select
            label={labels?.[currentLanguage]?.difficulty}
            options={difficultyOptions}
            value={localPreferences?.difficulty}
            onChange={(value) => handleInputChange('difficulty', value)}
          />
        </div>

        {/* Reminder Time */}
        <div>
          <Input
            label={labels?.[currentLanguage]?.reminders}
            type="time"
            value={localPreferences?.reminderTime}
            onChange={(e) => handleInputChange('reminderTime', e?.target?.value)}
            description="Set your preferred practice reminder time"
          />
        </div>

        {/* Notifications */}
        <div className="space-y-4">
          <h4 className="text-md font-medium text-foreground flex items-center space-x-2">
            <Icon name="Bell" size={16} />
            <span>{labels?.[currentLanguage]?.notifications}</span>
          </h4>
          
          <div className="space-y-3 pl-6">
            <Checkbox
              label={labels?.[currentLanguage]?.streakReminder}
              checked={localPreferences?.notifications?.streakReminder}
              onChange={(e) => handleCheckboxChange('streakReminder', e?.target?.checked)}
            />
            
            <Checkbox
              label={labels?.[currentLanguage]?.achievementAlert}
              checked={localPreferences?.notifications?.achievementAlert}
              onChange={(e) => handleCheckboxChange('achievementAlert', e?.target?.checked)}
            />
            
            <Checkbox
              label={labels?.[currentLanguage]?.lessonComplete}
              checked={localPreferences?.notifications?.lessonComplete}
              onChange={(e) => handleCheckboxChange('lessonComplete', e?.target?.checked)}
            />
            
            <Checkbox
              label={labels?.[currentLanguage]?.weeklyReport}
              checked={localPreferences?.notifications?.weeklyReport}
              onChange={(e) => handleCheckboxChange('weeklyReport', e?.target?.checked)}
            />
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end pt-4 border-t border-border">
          <Button
            variant="default"
            onClick={handleSave}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
          >
            {labels?.[currentLanguage]?.save}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default LearningPreferences;