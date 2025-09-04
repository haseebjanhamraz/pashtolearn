import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';


const ImageWordExercise = ({ 
  instruction = "Select the correct Pashto word for the image",
  imageUrl = "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop",
  imageAlt = "Traditional Afghan bread",
  correctAnswer = { pashto: "ډوډۍ", english: "Bread", pronunciation: "Dodai" },
  options = [
    { id: 'a', pashto: "ډوډۍ", english: "Bread", pronunciation: "Dodai", isCorrect: true },
    { id: 'b', pashto: "اوبه", english: "Water", pronunciation: "Oba", isCorrect: false },
    { id: 'c', pashto: "غوښه", english: "Meat", pronunciation: "Ghwakha", isCorrect: false },
    { id: 'd', pashto: "پیاز", english: "Onion", pronunciation: "Piyaz", isCorrect: false }
  ],
  onAnswer
}) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);

  const handleOptionSelect = (optionId) => {
    if (showFeedback) return;
    
    setSelectedOption(optionId);
    setShowFeedback(true);
    
    const selected = options?.find(opt => opt?.id === optionId);
    
    if (onAnswer) {
      setTimeout(() => {
        onAnswer(selected?.isCorrect, optionId);
      }, 1500);
    }
  };

  const getOptionStyle = (option) => {
    if (!showFeedback) {
      return selectedOption === option?.id 
        ? 'border-primary bg-primary/5 scale-105' :'border-border hover:border-primary/50 hover:bg-muted/50 hover:scale-[1.02]';
    }
    
    if (option?.isCorrect) {
      return 'border-success bg-success/10';
    }
    
    if (selectedOption === option?.id && !option?.isCorrect) {
      return 'border-error bg-error/10';
    }
    
    return 'border-border bg-muted/30';
  };

  const getOptionIcon = (option) => {
    if (!showFeedback) return null;
    
    if (option?.isCorrect) {
      return <Icon name="CheckCircle" size={20} className="text-success" />;
    }
    
    if (selectedOption === option?.id && !option?.isCorrect) {
      return <Icon name="XCircle" size={20} className="text-error" />;
    }
    
    return null;
  };

  return (
    <div className="space-y-6">
      {/* Instruction */}
      <div className="text-center">
        <h3 className="text-xl font-medium text-foreground mb-2">
          {instruction}
        </h3>
        <p className="text-sm text-muted-foreground">
          Look at the image and choose the correct Pashto word
        </p>
      </div>
      {/* Image */}
      <div className="flex justify-center">
        <div className="relative w-80 h-60 rounded-lg overflow-hidden border-2 border-border shadow-elevation-2">
          <Image
            src={imageUrl}
            alt={imageAlt}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        </div>
      </div>
      {/* Options */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {options?.map((option) => (
          <button
            key={option?.id}
            onClick={() => handleOptionSelect(option?.id)}
            disabled={showFeedback}
            className={`
              p-4 rounded-lg border-2 transition-all duration-200 text-center
              flex flex-col items-center space-y-2 group
              ${getOptionStyle(option)}
            `}
          >
            <div className="text-2xl font-medium" dir="rtl">
              {option?.pashto}
            </div>
            <div className="text-sm text-muted-foreground">
              {option?.english}
            </div>
            <div className="text-xs text-muted-foreground italic">
              {option?.pronunciation}
            </div>
            
            <div className="mt-2">
              {getOptionIcon(option)}
            </div>
          </button>
        ))}
      </div>
      {/* Feedback */}
      {showFeedback && (
        <div className={`
          p-4 rounded-lg border-l-4 
          ${options?.find(opt => opt?.id === selectedOption)?.isCorrect 
            ? 'border-success bg-success/5' :'border-error bg-error/5'
          }
        `}>
          <div className="flex items-start space-x-3">
            <Icon 
              name={options?.find(opt => opt?.id === selectedOption)?.isCorrect ? "CheckCircle" : "XCircle"} 
              size={20} 
              className={options?.find(opt => opt?.id === selectedOption)?.isCorrect ? "text-success" : "text-error"} 
            />
            <div>
              <p className={`font-medium ${
                options?.find(opt => opt?.id === selectedOption)?.isCorrect ? "text-success" : "text-error"
              }`}>
                {options?.find(opt => opt?.id === selectedOption)?.isCorrect ? "Excellent!" : "Try again next time"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {options?.find(opt => opt?.id === selectedOption)?.isCorrect 
                  ? `Perfect! "${correctAnswer?.pashto}" (${correctAnswer?.pronunciation}) means "${correctAnswer?.english}".` 
                  : `The correct answer is "${correctAnswer?.pashto}" (${correctAnswer?.pronunciation}) which means "${correctAnswer?.english}".`
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageWordExercise;