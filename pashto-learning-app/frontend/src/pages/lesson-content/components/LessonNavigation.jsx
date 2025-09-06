import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LessonNavigation = ({ 
  canGoPrevious = false,
  canGoNext = false,
  onPrevious,
  onNext,
  onHint,
  showHint = true,
  isCompleted = false,
  onContinue
}) => {
  return (
    <div className="bg-card border-t border-border p-4">
      <div className="flex items-center justify-between">
        {/* Previous Button */}
        <Button
          variant="outline"
          onClick={onPrevious}
          disabled={!canGoPrevious}
          iconName="ChevronLeft"
          iconPosition="left"
          className="min-w-[100px]"
        >
          Previous
        </Button>

        {/* Center Actions */}
        <div className="flex items-center space-x-3">
          {showHint && !isCompleted && (
            <Button
              variant="ghost"
              onClick={onHint}
              iconName="Lightbulb"
              iconPosition="left"
              size="sm"
              className="text-warning hover:text-warning"
            >
              Hint
            </Button>
          )}
          
          {isCompleted && (
            <div className="flex items-center space-x-2 text-success">
              <Icon name="CheckCircle" size={20} />
              <span className="text-sm font-medium">Completed!</span>
            </div>
          )}
        </div>

        {/* Next/Continue Button */}
        {isCompleted ? (
          <Button
            variant="default"
            onClick={onContinue}
            iconName="ArrowRight"
            iconPosition="right"
            className="min-w-[100px] bg-success hover:bg-success/90"
          >
            Continue
          </Button>
        ) : (
          <Button
            variant="default"
            onClick={onNext}
            disabled={!canGoNext}
            iconName="ChevronRight"
            iconPosition="right"
            className="min-w-[100px]"
          >
            Next
          </Button>
        )}
      </div>
    </div>
  );
};

export default LessonNavigation;