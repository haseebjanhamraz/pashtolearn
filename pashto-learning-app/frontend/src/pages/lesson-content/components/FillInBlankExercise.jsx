import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';

const FillInBlankExercise = ({ 
  sentence = "Hello, my name is Ahmad. _____ to meet you!",
  pashtoSentence = "سلام، زموږ نوم احمد دی. _____ چې تاسو سره وګورم!",
  correctAnswer = "Nice",
  pashtoAnswer = "ښه",
  hints = ["It's a positive word", "Used when meeting someone new", "Rhymes with 'ice'"],
  onAnswer
}) => {
  const [userAnswer, setUserAnswer] = useState('');
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [currentHint, setCurrentHint] = useState(0);
  const [showHint, setShowHint] = useState(false);

  const handleSubmit = () => {
    if (!userAnswer?.trim()) return;
    
    const correct = userAnswer?.toLowerCase()?.trim() === correctAnswer?.toLowerCase();
    setIsCorrect(correct);
    setShowFeedback(true);
    
    if (onAnswer) {
      setTimeout(() => {
        onAnswer(correct, userAnswer);
      }, 1500);
    }
  };

  const handleKeyPress = (e) => {
    if (e?.key === 'Enter') {
      handleSubmit();
    }
  };

  const getNextHint = () => {
    if (currentHint < hints?.length - 1) {
      setCurrentHint(prev => prev + 1);
    }
    setShowHint(true);
  };

  const renderSentenceWithBlank = (sentence, isEnglish = true) => {
    const parts = sentence?.split('_____');
    return (
      <div className={`text-xl font-medium ${isEnglish ? 'text-left' : 'text-right'}`} dir={isEnglish ? 'ltr' : 'rtl'}>
        {parts?.[0]}
        <span className="inline-block mx-2">
          {showFeedback ? (
            <span className={`px-3 py-1 rounded-md font-semibold ${
              isCorrect ? 'bg-success/20 text-success' : 'bg-error/20 text-error'
            }`}>
              {isCorrect ? correctAnswer : userAnswer}
            </span>
          ) : (
            <span className="border-b-2 border-dashed border-primary px-3 py-1 min-w-[100px] inline-block text-center">
              {userAnswer || '___'}
            </span>
          )}
        </span>
        {parts?.[1]}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Instruction */}
      <div className="text-center">
        <h3 className="text-xl font-medium text-foreground mb-2">
          Fill in the blank
        </h3>
        <p className="text-sm text-muted-foreground">
          Complete the sentence with the correct word
        </p>
      </div>
      {/* Sentences */}
      <div className="space-y-4">
        {/* English Sentence */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="MessageCircle" size={16} className="text-primary" />
            <span className="text-sm font-medium text-primary">English</span>
          </div>
          {renderSentenceWithBlank(sentence, true)}
        </div>

        {/* Pashto Sentence */}
        <div className="bg-surface rounded-lg border border-border p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="MessageCircle" size={16} className="text-accent" />
            <span className="text-sm font-medium text-accent">پښتو</span>
          </div>
          {renderSentenceWithBlank(pashtoSentence, false)}
        </div>
      </div>
      {/* Input Section */}
      {!showFeedback && (
        <div className="space-y-4">
          <Input
            type="text"
            placeholder="Type your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e?.target?.value)}
            onKeyPress={handleKeyPress}
            className="text-center text-lg"
            autoFocus
          />
          
          <div className="flex items-center justify-center space-x-3">
            <Button
              variant="outline"
              onClick={getNextHint}
              iconName="Lightbulb"
              iconPosition="left"
              disabled={currentHint >= hints?.length - 1 && showHint}
            >
              {showHint ? 'Next Hint' : 'Get Hint'}
            </Button>
            
            <Button
              variant="default"
              onClick={handleSubmit}
              disabled={!userAnswer?.trim()}
              iconName="Send"
              iconPosition="right"
            >
              Submit
            </Button>
          </div>
        </div>
      )}
      {/* Hint */}
      {showHint && !showFeedback && (
        <div className="p-4 rounded-lg border-l-4 border-warning bg-warning/5">
          <div className="flex items-start space-x-3">
            <Icon name="Lightbulb" size={20} className="text-warning" />
            <div>
              <p className="font-medium text-warning">
                Hint {currentHint + 1}:
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {hints?.[currentHint]}
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Feedback */}
      {showFeedback && (
        <div className={`
          p-4 rounded-lg border-l-4 
          ${isCorrect ? 'border-success bg-success/5' : 'border-error bg-error/5'}
        `}>
          <div className="flex items-start space-x-3">
            <Icon 
              name={isCorrect ? "CheckCircle" : "XCircle"} 
              size={20} 
              className={isCorrect ? "text-success" : "text-error"} 
            />
            <div>
              <p className={`font-medium ${isCorrect ? "text-success" : "text-error"}`}>
                {isCorrect ? "Perfect!" : "Not quite right"}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {isCorrect 
                  ? "You've got it! The word fits perfectly in both languages." : `The correct answer is"${correctAnswer}" (${pashtoAnswer} in Pashto).`
                }
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FillInBlankExercise;