import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LessonProgress from './components/LessonProgress';
import MultipleChoiceExercise from './components/MultipleChoiceExercise';
import DragDropExercise from './components/DragDropExercise';
import FillInBlankExercise from './components/FillInBlankExercise';
import ImageWordExercise from './components/ImageWordExercise';
import LessonNavigation from './components/LessonNavigation';
import FloatingAudioButton from './components/FloatingAudioButton';

const LessonContent = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [currentExercise, setCurrentExercise] = useState(0);
  const [completedExercises, setCompletedExercises] = useState(new Set());
  const [showHint, setShowHint] = useState(false);

  // Mock lesson data
  const lessonData = {
    id: 1,
    title: { en: "Basic Greetings", ps: "لومړني ښه راغلاست" },
    category: "greetings",
    totalExercises: 4,
    exercises: [
      {
        id: 1,
        type: "multiple-choice",
        question: "What does 'سلام' mean?",
        pashtoText: "سلام",
        pronunciation: "Salaam",
        options: [
          { id: 'a', text: 'Hello', isCorrect: true },
          { id: 'b', text: 'Goodbye', isCorrect: false },
          { id: 'c', text: 'Thank you', isCorrect: false },
          { id: 'd', text: 'Please', isCorrect: false }
        ]
      },
      {
        id: 2,
        type: "drag-drop",
        instruction: "Match the Pashto words with their English meanings",
        pairs: [
          { id: 1, pashto: "سلام", english: "Hello", pronunciation: "Salaam" },
          { id: 2, pashto: "ښه راغلاست", english: "Welcome", pronunciation: "Kha raghlaast" },
          { id: 3, pashto: "ډېر ښه", english: "Very good", pronunciation: "Der kha" }
        ]
      },
      {
        id: 3,
        type: "fill-blank",
        sentence: "Hello, my name is Ahmad. _____ to meet you!",
        pashtoSentence: "سلام، زموږ نوم احمد دی. _____ چې تاسو سره وګورم!",
        correctAnswer: "Nice",
        pashtoAnswer: "ښه",
        hints: ["It\'s a positive word", "Used when meeting someone new", "Rhymes with \'ice'"]
      },
      {
        id: 4,
        type: "image-word",
        instruction: "Select the correct Pashto word for greeting",
        imageUrl: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop",
        imageAlt: "People greeting each other",
        correctAnswer: { pashto: "سلام", english: "Hello", pronunciation: "Salaam" },
        options: [
          { id: 'a', pashto: "سلام", english: "Hello", pronunciation: "Salaam", isCorrect: true },
          { id: 'b', pashto: "ښه راتلاست", english: "Goodbye", pronunciation: "Kha ratlast", isCorrect: false },
          { id: 'c', pashto: "ډېر مننه", english: "Thank you", pronunciation: "Der manana", isCorrect: false },
          { id: 'd', pashto: "بخښنه غواړم", english: "Excuse me", pronunciation: "Bakhshana ghwaram", isCorrect: false }
        ]
      }
    ]
  };

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  const handleExerciseComplete = (isCorrect, answer) => {
    if (isCorrect) {
      setCompletedExercises(prev => new Set([...prev, currentExercise]));
    }
  };

  const handleNext = () => {
    if (currentExercise < lessonData?.totalExercises - 1) {
      setCurrentExercise(prev => prev + 1);
      setShowHint(false);
    } else {
      // Lesson completed - navigate to dashboard with success
      navigate('/dashboard', { 
        state: { 
          lessonCompleted: true, 
          lessonTitle: lessonData?.title?.[currentLanguage],
          xpEarned: 50 
        } 
      });
    }
  };

  const handlePrevious = () => {
    if (currentExercise > 0) {
      setCurrentExercise(prev => prev - 1);
      setShowHint(false);
    }
  };

  const handleHint = () => {
    setShowHint(true);
  };

  const handleExit = () => {
    navigate('/lesson-selection');
  };

  const handleContinue = () => {
    handleNext();
  };

  const currentExerciseData = lessonData?.exercises?.[currentExercise];
  const isCurrentCompleted = completedExercises?.has(currentExercise);
  const canGoNext = isCurrentCompleted || currentExercise < lessonData?.totalExercises - 1;
  const canGoPrevious = currentExercise > 0;

  const renderExercise = () => {
    switch (currentExerciseData?.type) {
      case 'multiple-choice':
        return (
          <MultipleChoiceExercise
            question={currentExerciseData?.question}
            pashtoText={currentExerciseData?.pashtoText}
            pronunciation={currentExerciseData?.pronunciation}
            options={currentExerciseData?.options}
            onAnswer={handleExerciseComplete}
            showFeedback={isCurrentCompleted}
          />
        );
      case 'drag-drop':
        return (
          <DragDropExercise
            instruction={currentExerciseData?.instruction}
            pairs={currentExerciseData?.pairs}
            onComplete={handleExerciseComplete}
          />
        );
      case 'fill-blank':
        return (
          <FillInBlankExercise
            sentence={currentExerciseData?.sentence}
            pashtoSentence={currentExerciseData?.pashtoSentence}
            correctAnswer={currentExerciseData?.correctAnswer}
            pashtoAnswer={currentExerciseData?.pashtoAnswer}
            hints={currentExerciseData?.hints}
            onAnswer={handleExerciseComplete}
          />
        );
      case 'image-word':
        return (
          <ImageWordExercise
            instruction={currentExerciseData?.instruction}
            imageUrl={currentExerciseData?.imageUrl}
            imageAlt={currentExerciseData?.imageAlt}
            correctAnswer={currentExerciseData?.correctAnswer}
            options={currentExerciseData?.options}
            onAnswer={handleExerciseComplete}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      {/* Main Content */}
      <div className="pt-16 pb-20 md:pb-4">
        {/* Progress Header */}
        <LessonProgress
          currentQuestion={currentExercise + 1}
          totalQuestions={lessonData?.totalExercises}
          lessonTitle={lessonData?.title?.[currentLanguage]}
          onExit={handleExit}
        />

        {/* Exercise Content */}
        <div className="max-w-4xl mx-auto px-4 py-6">
          <div className="bg-card rounded-lg border border-border shadow-elevation-1 p-6">
            {renderExercise()}
          </div>
        </div>

        {/* Navigation */}
        <LessonNavigation
          canGoPrevious={canGoPrevious}
          canGoNext={canGoNext}
          onPrevious={handlePrevious}
          onNext={handleNext}
          onHint={handleHint}
          showHint={!isCurrentCompleted}
          isCompleted={isCurrentCompleted}
          onContinue={handleContinue}
        />

        {/* Floating Audio Button */}
        {(currentExerciseData?.pashtoText || currentExerciseData?.pairs) && (
          <FloatingAudioButton
            audioText={
              currentExerciseData?.pashtoText || 
              (currentExerciseData?.pairs && currentExerciseData?.pairs?.[0]?.pashto) ||
              "سلام"
            }
            pronunciation={
              currentExerciseData?.pronunciation || 
              (currentExerciseData?.pairs && currentExerciseData?.pairs?.[0]?.pronunciation) ||
              "Salaam"
            }
          />
        )}
      </div>
      {/* Achievement Modal - shown when lesson is completed */}
      {completedExercises?.size === lessonData?.totalExercises && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-lg border border-border p-6 max-w-md w-full text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-success"
              >
                <path
                  d="M12 2L15.09 8.26L22 9L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9L8.91 8.26L12 2Z"
                  fill="currentColor"
                />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold text-foreground mb-2">
              {currentLanguage === 'en' ? 'Lesson Completed!' : 'درس بشپړ شو!'}
            </h3>
            <p className="text-muted-foreground mb-4">
              {currentLanguage === 'en' ?'Congratulations! You have successfully completed this lesson and earned 50 XP.' :'مبارک وي! تاسو دا درس په بریالیتوب سره بشپړ کړ او ۵۰ XP یې ترلاسه کړل.'
              }
            </p>
            <button
              onClick={() => navigate('/dashboard')}
              className="w-full bg-primary text-primary-foreground px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors duration-200"
            >
              {currentLanguage === 'en' ? 'Continue to Dashboard' : 'ډشبورډ ته دوام ورکړئ'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default LessonContent;