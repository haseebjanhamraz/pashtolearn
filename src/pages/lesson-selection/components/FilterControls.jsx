import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const FilterControls = ({ 
  currentLanguage,
  selectedDifficulty,
  selectedStatus,
  onDifficultyChange,
  onStatusChange,
  onResetFilters,
  className = ""
}) => {
  const difficultyOptions = [
    { 
      value: 'all', 
      label: currentLanguage === 'en' ? 'All Levels' : 'ټول کچې' 
    },
    { 
      value: 'beginner', 
      label: currentLanguage === 'en' ? 'Beginner' : 'پیل کوونکی' 
    },
    { 
      value: 'intermediate', 
      label: currentLanguage === 'en' ? 'Intermediate' : 'منځنی' 
    },
    { 
      value: 'advanced', 
      label: currentLanguage === 'en' ? 'Advanced' : 'پرمختللی' 
    }
  ];

  const statusOptions = [
    { 
      value: 'all', 
      label: currentLanguage === 'en' ? 'All Lessons' : 'ټولې زده کړې' 
    },
    { 
      value: 'new', 
      label: currentLanguage === 'en' ? 'New' : 'نوی' 
    },
    { 
      value: 'in-progress', 
      label: currentLanguage === 'en' ? 'In Progress' : 'روان' 
    },
    { 
      value: 'completed', 
      label: currentLanguage === 'en' ? 'Completed' : 'بشپړ شوی' 
    }
  ];

  const hasActiveFilters = selectedDifficulty !== 'all' || selectedStatus !== 'all';

  return (
    <div className={`bg-card border border-border rounded-lg p-4 ${className}`}>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        {/* Filter Title */}
        <div className="flex items-center space-x-2">
          <h3 className="font-heading font-medium text-foreground">
            {currentLanguage === 'en' ? 'Filter Lessons' : 'زده کړې فلټر کړئ'}
          </h3>
          {hasActiveFilters && (
            <div className="flex items-center justify-center w-5 h-5 bg-primary/10 rounded-full">
              <span className="text-xs font-mono font-medium text-primary">
                {[selectedDifficulty, selectedStatus]?.filter(f => f !== 'all')?.length}
              </span>
            </div>
          )}
        </div>

        {/* Filter Controls */}
        <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
          {/* Difficulty Filter */}
          <div className="min-w-[140px]">
            <Select
              options={difficultyOptions}
              value={selectedDifficulty}
              onChange={onDifficultyChange}
              placeholder={currentLanguage === 'en' ? 'Difficulty' : 'کچه'}
            />
          </div>

          {/* Status Filter */}
          <div className="min-w-[140px]">
            <Select
              options={statusOptions}
              value={selectedStatus}
              onChange={onStatusChange}
              placeholder={currentLanguage === 'en' ? 'Status' : 'حالت'}
            />
          </div>

          {/* Reset Button */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onResetFilters}
              iconName="X"
              iconPosition="left"
              iconSize={14}
              className="text-muted-foreground hover:text-foreground"
            >
              {currentLanguage === 'en' ? 'Reset' : 'بیا تنظیم'}
            </Button>
          )}
        </div>
      </div>
      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2 mt-3 pt-3 border-t border-border">
          <span className="text-xs text-muted-foreground">
            {currentLanguage === 'en' ? 'Active filters:' : 'فعال فلټرونه:'}
          </span>
          {selectedDifficulty !== 'all' && (
            <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded-full text-xs">
              <span>{difficultyOptions?.find(opt => opt?.value === selectedDifficulty)?.label}</span>
              <button
                onClick={() => onDifficultyChange('all')}
                className="hover:bg-primary/20 rounded-full p-0.5 transition-colors duration-150"
              >
                <span className="sr-only">Remove filter</span>
                ×
              </button>
            </div>
          )}
          {selectedStatus !== 'all' && (
            <div className="flex items-center space-x-1 bg-accent/10 text-accent px-2 py-1 rounded-full text-xs">
              <span>{statusOptions?.find(opt => opt?.value === selectedStatus)?.label}</span>
              <button
                onClick={() => onStatusChange('all')}
                className="hover:bg-accent/20 rounded-full p-0.5 transition-colors duration-150"
              >
                <span className="sr-only">Remove filter</span>
                ×
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterControls;