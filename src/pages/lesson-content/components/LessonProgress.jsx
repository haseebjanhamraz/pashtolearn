import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LessonProgress = ({ 
  currentQuestion = 1, 
  totalQuestions = 10, 
  lessonTitle = "Basic Greetings",
  onExit 
}) => {
  const navigate = useNavigate();
  const progressPercentage = (currentQuestion / totalQuestions) * 100;

  const handleBackToSelection = () => {
    navigate('/lesson-selection');
  };

  return (
    <div className="bg-card border-b border-border px-4 py-3">
      <div className="flex items-center justify-between mb-3">
        <button
          onClick={onExit || handleBackToSelection}
          className="flex items-center justify-center w-8 h-8 rounded-full hover:bg-muted transition-colors duration-200"
          aria-label="Exit lesson"
        >
          <Icon name="X" size={20} className="text-muted-foreground" />
        </button>
        
        <div className="flex-1 mx-4">
          <h2 className="text-sm font-medium text-foreground text-center mb-1">
            {lessonTitle}
          </h2>
          <p className="text-xs text-muted-foreground text-center">
            Question {currentQuestion} of {totalQuestions}
          </p>
        </div>
        
        <div className="flex items-center space-x-2">
          <Icon name="Heart" size={16} className="text-error fill-current" />
          <span className="text-sm font-mono text-foreground">5</span>
        </div>
      </div>
      
      <div className="w-full bg-muted rounded-full h-2 overflow-hidden">
        <div 
          className="progress-indicator h-full transition-all duration-500 ease-out"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>
    </div>
  );
};

export default LessonProgress;