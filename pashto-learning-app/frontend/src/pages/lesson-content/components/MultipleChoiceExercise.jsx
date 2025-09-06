import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import AudioPlayer from './AudioPlayer';

const MultipleChoiceExercise = ({ 
  question = "What does 'سلام' mean?",
  pashtoText = "سلام",
  pronunciation = "Salaam",
  options = [
    { id: 'a', text: 'Hello', isCorrect: true },
    { id: 'b', text: 'Goodbye', isCorrect: false },
    { id: 'c', text: 'Thank you', isCorrect: false },
    { id: 'd', text: 'Please', isCorrect: false }
  ],
  onAnswer,
  showFeedback = false,
  selectedAnswer = null
}) => {
  const [localSelected, setLocalSelected] = useState(selectedAnswer);
  const [showResult, setShowResult] = useState(showFeedback);

  const handleOptionSelect = (optionId) => {
    if (showResult) return;
    
    setLocalSelected(optionId);
    setShowResult(true);
    
    const selectedOption = options?.find(opt => opt?.id === optionId);
    
    if (onAnswer) {
      setTimeout(() => {
        onAnswer(selectedOption?.isCorrect, optionId);
      }, 1500);
    }
  };

  const getOptionStyle = (option) => {
    if (!showResult) {
      return localSelected === option?.id 
        ? 'border-primary bg-primary/5' :'border-border hover:border-primary/50 hover:bg-muted/50';
    }
    
    if (option?.isCorrect) {
      return 'border-success bg-success/10 text-success-foreground';
    }
    
    if (localSelected === option?.id && !option?.isCorrect) {
      return 'border-error bg-error/10 text-error-foreground';
    }
    
    return 'border-border bg-muted/30';
  };

  const getOptionIcon = (option) => {
    if (!showResult) return null;
    
    if (option?.isCorrect) {
      return <Icon name="CheckCircle" size={20} className="text-success" />;
    }
    
    if (localSelected === option?.id && !option?.isCorrect) {
      return <Icon name="XCircle" size={20} className="text-error" />;
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Audio Section */}
      <AudioPlayer 
        audioText={pashtoText}
        pronunciation={pronunciation}
      />
      {/* Question */}
      <div className="text-center">
        <h3 className="text-xl font-medium text-foreground mb-2">
          {question}
        </h3>
        <p className="text-sm text-muted-foreground">
          Choose the correct translation
        </p>
      </div>
      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {options?.map((option) => (
          <button
            key={option?.id}
            onClick={() => handleOptionSelect(option?.id)}
            disabled={showResult}
            className={`
              w-full p-4 rounded-lg border-2 transition-all duration-200 text-left
              flex items-center justify-between group
              ${getOptionStyle(option)}
              ${!showResult ? 'hover:scale-[1.02] active:scale-[0.98]' : ''}
            `}
          >
            <div className="flex items-center space-x-3">
              <div className={`
                w-8 h-8 rounded-full border-2 flex items-center justify-center text-sm font-medium
                ${localSelected === option?.id && !showResult ? 'border-primary bg-primary text-primary-foreground' : 'border-current'}
              `}>
                {option?.id?.toUpperCase()}
              </div>
              <span className="text-lg font-medium">
                {option?.text}
              </span>
            </div>
            
            {getOptionIcon(option)}
          </button>
        ))}
      </div>
      {/* Feedback */}
      {showResult && (
        <div className={`
          p-4 rounded-lg border-l-4 
          ${options?.find(opt => opt?.id === localSelected)?.isCorrect 
            ? 'border-success bg-success/5' :'border-error bg-error/5'
          }
        `}>
          <div className="flex items-start space-x-3">
            <Icon 
              name={options?.find(opt => opt?.id === localSelected)?.isCorrect ? "CheckCircle" : "XCircle"} 
              size={20} 
              className={options?.find(opt => opt?.id === localSelected)?.isCorrect ? "text-success" : "text-error"} 
            />
            <div>
              <p className={`font-medium ${
                options?.find(opt => opt?.id === localSelected)?.isCorrect ? "text-success" : "text-error"
              }`}>
                {options?.find(opt => opt?.id === localSelected)?.isCorrect ? "Correct!" : "Incorrect"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {options?.find(opt => opt?.id === localSelected)?.isCorrect 
                  ? "Great job! You're learning fast." : `The correct answer is"${options?.find(opt => opt?.isCorrect)?.text}".`
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MultipleChoiceExercise;