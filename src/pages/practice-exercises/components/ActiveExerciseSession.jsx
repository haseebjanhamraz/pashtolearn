import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveExerciseSession = ({ 
  exercise, 
  onComplete, 
  onExit, 
  currentLanguage = 'en' 
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isRecording, setIsRecording] = useState(false);

  // Mock questions based on exercise type
  const getQuestions = () => {
    switch (exercise?.type) {
      case 'pronunciation':
        return [
          {
            id: 1,
            type: 'audio',
            question: { en: 'Pronounce the following word:', ps: 'دا کلمه ووایاست:' },
            word: { en: 'Hello', ps: 'سلام' },
            audioUrl: '/audio/salam.mp3',
            correctAnswer: 'salam'
          },
          {
            id: 2,
            type: 'audio',
            question: { en: 'Pronounce the following word:', ps: 'دا کلمه ووایاست:' },
            word: { en: 'Thank you', ps: 'ډېر مننه' },
            audioUrl: '/audio/manana.mp3',
            correctAnswer: 'der manana'
          }
        ];
      case 'vocabulary':
        return [
          {
            id: 1,
            type: 'multiple-choice',
            question: { en: 'What does "کور" mean in English?', ps: 'په انګلیسي کې "کور" څه معنی لري؟' },
            options: [
              { id: 'a', text: 'House', correct: true },
              { id: 'b', text: 'Car', correct: false },
              { id: 'c', text: 'Tree', correct: false },
              { id: 'd', text: 'Water', correct: false }
            ]
          },
          {
            id: 2,
            type: 'multiple-choice',
            question: { en: 'What does "اوبه" mean in English?', ps: 'په انګلیسي کې "اوبه" څه معنی لري؟' },
            options: [
              { id: 'a', text: 'Fire', correct: false },
              { id: 'b', text: 'Water', correct: true },
              { id: 'c', text: 'Air', correct: false },
              { id: 'd', text: 'Earth', correct: false }
            ]
          }
        ];
      case 'grammar':
        return [
          {
            id: 1,
            type: 'drag-drop',
            question: { en: 'Arrange the words to form a correct sentence:', ps: 'کلمې سمه کړئ چې سمه جمله جوړه شي:' },
            words: ['زه', 'ښه', 'یم'],
            correctOrder: ['زه', 'ښه', 'یم'],
            translation: { en: 'I am good', ps: 'زه ښه یم' }
          }
        ];
      default:
        return [];
    }
  };

  const [questions] = useState(getQuestions());

  useEffect(() => {
    if (timeLeft > 0 && !showFeedback) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showFeedback]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
    setShowFeedback(true);
    
    const currentQ = questions?.[currentQuestion];
    if (currentQ?.type === 'multiple-choice') {
      const isCorrect = currentQ?.options?.find(opt => opt?.id === answer)?.correct;
      if (isCorrect) {
        setScore(score + 1);
      }
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions?.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowFeedback(false);
      setTimeLeft(30);
    } else {
      onComplete({
        score,
        totalQuestions: questions?.length,
        accuracy: Math.round((score / questions?.length) * 100),
        timeSpent: (questions?.length * 30) - timeLeft
      });
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
    // Mock recording functionality
    if (!isRecording) {
      setTimeout(() => {
        setIsRecording(false);
        setShowFeedback(true);
      }, 3000);
    }
  };

  const currentQ = questions?.[currentQuestion];
  if (!currentQ) return null;

  return (
    <div className="bg-card rounded-lg border border-border overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
        <div className="flex items-center space-x-3">
          <Button
            variant="ghost"
            size="sm"
            onClick={onExit}
            iconName="X"
            iconSize={16}
          />
          <div>
            <h3 className="font-heading font-semibold text-foreground">
              {exercise?.title?.[currentLanguage]}
            </h3>
            <p className="text-sm text-muted-foreground">
              {currentLanguage === 'en' ? 'Question' : 'پوښتنه'} {currentQuestion + 1} {currentLanguage === 'en' ? 'of' : 'د'} {questions?.length}
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Timer */}
          <div className="flex items-center space-x-2">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className={`font-mono text-sm ${timeLeft <= 10 ? 'text-error' : 'text-foreground'}`}>
              {timeLeft}s
            </span>
          </div>

          {/* Score */}
          <div className="flex items-center space-x-2">
            <Icon name="Star" size={16} className="text-accent" />
            <span className="font-mono text-sm text-foreground">
              {score}/{questions?.length}
            </span>
          </div>
        </div>
      </div>
      {/* Progress Bar */}
      <div className="h-2 bg-muted">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${((currentQuestion + 1) / questions?.length) * 100}%` }}
        />
      </div>
      {/* Question Content */}
      <div className="p-6">
        <div className="mb-6">
          <h4 className="text-lg font-heading font-semibold text-foreground mb-2">
            {currentQ?.question?.[currentLanguage]}
          </h4>
          
          {currentQ?.type === 'audio' && (
            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <div className="text-center">
                <p className="text-2xl font-heading font-bold text-primary mb-2">
                  {currentQ?.word?.ps}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  ({currentQ?.word?.en})
                </p>
                
                <div className="flex items-center justify-center space-x-4">
                  <Button
                    variant="outline"
                    iconName="Volume2"
                    iconPosition="left"
                    iconSize={16}
                  >
                    {currentLanguage === 'en' ? 'Play Audio' : 'غږ واورئ'}
                  </Button>
                  
                  <Button
                    variant={isRecording ? "destructive" : "default"}
                    onClick={toggleRecording}
                    iconName={isRecording ? "Square" : "Mic"}
                    iconPosition="left"
                    iconSize={16}
                  >
                    {isRecording 
                      ? (currentLanguage === 'en' ? 'Stop' : 'ودرول') 
                      : (currentLanguage === 'en' ? 'Record' : 'ثبتول')
                    }
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Answer Options */}
        {currentQ?.type === 'multiple-choice' && (
          <div className="space-y-3 mb-6">
            {currentQ?.options?.map((option) => (
              <button
                key={option?.id}
                onClick={() => !showFeedback && handleAnswerSelect(option?.id)}
                disabled={showFeedback}
                className={`
                  w-full p-4 text-left rounded-lg border-2 transition-all duration-200
                  ${!showFeedback 
                    ? 'border-border hover:border-primary hover:bg-primary/5' 
                    : option?.correct 
                      ? 'border-success bg-success/10 text-success' 
                      : selectedAnswer === option?.id 
                        ? 'border-error bg-error/10 text-error' :'border-border bg-muted/30'
                  }
                  ${selectedAnswer === option?.id && !showFeedback ? 'border-primary bg-primary/5' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{option?.text}</span>
                  {showFeedback && option?.correct && (
                    <Icon name="CheckCircle" size={20} className="text-success" />
                  )}
                  {showFeedback && selectedAnswer === option?.id && !option?.correct && (
                    <Icon name="XCircle" size={20} className="text-error" />
                  )}
                </div>
              </button>
            ))}
          </div>
        )}

        {/* Feedback */}
        {showFeedback && (
          <div className={`p-4 rounded-lg mb-6 ${
            currentQ?.type === 'multiple-choice' 
              ? (currentQ?.options?.find(opt => opt?.id === selectedAnswer)?.correct ? 'feedback-success' : 'feedback-error')
              : 'feedback-success'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <Icon 
                name={currentQ?.type === 'multiple-choice' 
                  ? (currentQ?.options?.find(opt => opt?.id === selectedAnswer)?.correct ? "CheckCircle" : "XCircle")
                  : "CheckCircle"
                } 
                size={20} 
              />
              <span className="font-medium">
                {currentQ?.type === 'multiple-choice' 
                  ? (currentQ?.options?.find(opt => opt?.id === selectedAnswer)?.correct 
                      ? (currentLanguage === 'en' ? 'Correct!' : 'سمه!')
                      : (currentLanguage === 'en' ? 'Incorrect' : 'غلطه'))
                  : (currentLanguage === 'en' ? 'Good pronunciation!' : 'ښه تلفظ!')
                }
              </span>
            </div>
            {currentQ?.translation && (
              <p className="text-sm opacity-80">
                {currentLanguage === 'en' ? 'Translation:' : 'ژباړه:'} {currentQ?.translation?.[currentLanguage]}
              </p>
            )}
          </div>
        )}

        {/* Navigation */}
        <div className="flex justify-between">
          <Button
            variant="outline"
            onClick={onExit}
            iconName="ArrowLeft"
            iconPosition="left"
            iconSize={16}
          >
            {currentLanguage === 'en' ? 'Exit' : 'وتل'}
          </Button>

          {showFeedback && (
            <Button
              variant="default"
              onClick={handleNext}
              iconName={currentQuestion < questions?.length - 1 ? "ArrowRight" : "CheckCircle"}
              iconPosition="right"
              iconSize={16}
            >
              {currentQuestion < questions?.length - 1 
                ? (currentLanguage === 'en' ? 'Next' : 'راتلونکی')
                : (currentLanguage === 'en' ? 'Complete' : 'بشپړول')
              }
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveExerciseSession;