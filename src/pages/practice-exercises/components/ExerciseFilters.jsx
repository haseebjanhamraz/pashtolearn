import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ExerciseFilters = ({ 
  filters, 
  onFilterChange, 
  currentLanguage = 'en' 
}) => {
  const difficultyLevels = [
    { value: 'all', label: { en: 'All Levels', ps: 'ټول کچې' } },
    { value: 'beginner', label: { en: 'Beginner', ps: 'پیل کوونکی' } },
    { value: 'intermediate', label: { en: 'Intermediate', ps: 'منځنی' } },
    { value: 'advanced', label: { en: 'Advanced', ps: 'پرمختللی' } }
  ];

  const exerciseTypes = [
    { value: 'all', label: { en: 'All Types', ps: 'ټول ډولونه' }, icon: 'Grid3X3' },
    { value: 'pronunciation', label: { en: 'Pronunciation', ps: 'تلفظ' }, icon: 'Mic' },
    { value: 'vocabulary', label: { en: 'Vocabulary', ps: 'لغات' }, icon: 'BookOpen' },
    { value: 'grammar', label: { en: 'Grammar', ps: 'ګرامر' }, icon: 'FileText' },
    { value: 'reading', label: { en: 'Reading', ps: 'لوستل' }, icon: 'Eye' },
    { value: 'writing', label: { en: 'Writing', ps: 'لیکل' }, icon: 'PenTool' }
  ];

  const sortOptions = [
    { value: 'recommended', label: { en: 'Recommended', ps: 'وړاندیز شوی' } },
    { value: 'accuracy', label: { en: 'By Accuracy', ps: 'د دقت له مخې' } },
    { value: 'recent', label: { en: 'Recently Practiced', ps: 'وروستی تمرین' } },
    { value: 'difficulty', label: { en: 'By Difficulty', ps: 'د ستونزمنۍ له مخې' } }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-heading font-semibold text-foreground">
          {currentLanguage === 'en' ? 'Filter Exercises' : 'تمرینونه فلټر کړئ'}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onFilterChange({ type: 'all', difficulty: 'all', sort: 'recommended' })}
          iconName="RotateCcw"
          iconSize={16}
        >
          {currentLanguage === 'en' ? 'Reset' : 'بیا تنظیم'}
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Exercise Type Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {currentLanguage === 'en' ? 'Exercise Type' : 'د تمرین ډول'}
          </label>
          <div className="grid grid-cols-2 gap-2">
            {exerciseTypes?.map((type) => (
              <button
                key={type?.value}
                onClick={() => onFilterChange({ ...filters, type: type?.value })}
                className={`
                  flex items-center space-x-2 p-2 rounded-lg border transition-all duration-200 text-sm
                  ${filters?.type === type?.value
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted text-muted-foreground'
                  }
                `}
              >
                <Icon name={type?.icon} size={16} />
                <span className="truncate">{type?.label?.[currentLanguage]}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Difficulty Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {currentLanguage === 'en' ? 'Difficulty Level' : 'د ستونزمنۍ کچه'}
          </label>
          <div className="space-y-2">
            {difficultyLevels?.map((level) => (
              <button
                key={level?.value}
                onClick={() => onFilterChange({ ...filters, difficulty: level?.value })}
                className={`
                  w-full flex items-center justify-between p-2 rounded-lg border transition-all duration-200 text-sm
                  ${filters?.difficulty === level?.value
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted text-muted-foreground'
                  }
                `}
              >
                <span>{level?.label?.[currentLanguage]}</span>
                {filters?.difficulty === level?.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Sort Options */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            {currentLanguage === 'en' ? 'Sort By' : 'د دې له مخې ترتیب'}
          </label>
          <div className="space-y-2">
            {sortOptions?.map((option) => (
              <button
                key={option?.value}
                onClick={() => onFilterChange({ ...filters, sort: option?.value })}
                className={`
                  w-full flex items-center justify-between p-2 rounded-lg border transition-all duration-200 text-sm
                  ${filters?.sort === option?.value
                    ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-muted text-muted-foreground'
                  }
                `}
              >
                <span>{option?.label?.[currentLanguage]}</span>
                {filters?.sort === option?.value && (
                  <Icon name="Check" size={16} className="text-primary" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
      {/* Active Filters Display */}
      {(filters?.type !== 'all' || filters?.difficulty !== 'all' || filters?.sort !== 'recommended') && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 flex-wrap gap-2">
            <span className="text-sm text-muted-foreground">
              {currentLanguage === 'en' ? 'Active filters:' : 'فعال فلټرونه:'}
            </span>
            
            {filters?.type !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                <span>{exerciseTypes?.find(t => t?.value === filters?.type)?.label?.[currentLanguage]}</span>
                <button
                  onClick={() => onFilterChange({ ...filters, type: 'all' })}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.difficulty !== 'all' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                <span>{difficultyLevels?.find(d => d?.value === filters?.difficulty)?.label?.[currentLanguage]}</span>
                <button
                  onClick={() => onFilterChange({ ...filters, difficulty: 'all' })}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
            
            {filters?.sort !== 'recommended' && (
              <span className="inline-flex items-center space-x-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-xs">
                <span>{sortOptions?.find(s => s?.value === filters?.sort)?.label?.[currentLanguage]}</span>
                <button
                  onClick={() => onFilterChange({ ...filters, sort: 'recommended' })}
                  className="hover:bg-primary/20 rounded-full p-0.5"
                >
                  <Icon name="X" size={12} />
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseFilters;