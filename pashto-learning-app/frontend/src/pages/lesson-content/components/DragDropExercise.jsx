import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';


const DragDropExercise = ({ 
  instruction = "Match the Pashto words with their English meanings",
  pairs = [
    { id: 1, pashto: "سلام", english: "Hello", pronunciation: "Salaam" },
    { id: 2, pashto: "ښه راغلاست", english: "Welcome", pronunciation: "Kha raghlaast" },
    { id: 3, pashto: "ډېر ښه", english: "Very good", pronunciation: "Der kha" },
    { id: 4, pashto: "ستاسو څنګه یاست؟", english: "How are you?", pronunciation: "Staaso tsanga yaast?" }
  ],
  onComplete
}) => {
  const [matches, setMatches] = useState({});
  const [selectedPashto, setSelectedPashto] = useState(null);
  const [completedPairs, setCompletedPairs] = useState(new Set());
  const [showFeedback, setShowFeedback] = useState(false);

  const handlePashtoSelect = (pashtoItem) => {
    if (completedPairs?.has(pashtoItem?.id)) return;
    setSelectedPashto(pashtoItem);
  };

  const handleEnglishSelect = (englishItem) => {
    if (!selectedPashto || completedPairs?.has(englishItem?.id)) return;
    
    const isCorrect = selectedPashto?.id === englishItem?.id;
    
    if (isCorrect) {
      setMatches(prev => ({
        ...prev,
        [selectedPashto?.id]: englishItem?.id
      }));
      setCompletedPairs(prev => new Set([...prev, selectedPashto.id]));
    }
    
    setSelectedPashto(null);
    
    // Check if all pairs are matched
    if (completedPairs?.size + 1 === pairs?.length) {
      setShowFeedback(true);
      if (onComplete) {
        setTimeout(() => onComplete(true), 1500);
      }
    }
  };

  const isMatched = (id) => completedPairs?.has(id);
  const isSelected = (item) => selectedPashto?.id === item?.id;

  return (
    <div className="space-y-6">
      {/* Instruction */}
      <div className="text-center">
        <h3 className="text-xl font-medium text-foreground mb-2">
          {instruction}
        </h3>
        <p className="text-sm text-muted-foreground">
          Tap a Pashto word, then tap its English meaning
        </p>
      </div>
      {/* Progress */}
      <div className="flex items-center justify-center space-x-2">
        <Icon name="Target" size={16} className="text-primary" />
        <span className="text-sm font-medium text-foreground">
          {completedPairs?.size} / {pairs?.length} matched
        </span>
      </div>
      {/* Matching Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Pashto Words */}
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-foreground text-center mb-4">
            Pashto Words
          </h4>
          {pairs?.map((pair) => (
            <button
              key={`pashto-${pair?.id}`}
              onClick={() => handlePashtoSelect(pair)}
              disabled={isMatched(pair?.id)}
              className={`
                w-full p-4 rounded-lg border-2 transition-all duration-200 text-center
                ${isMatched(pair?.id) 
                  ? 'border-success bg-success/10 text-success cursor-default' 
                  : isSelected(pair)
                    ? 'border-primary bg-primary/10 text-primary scale-105' :'border-border hover:border-primary/50 hover:bg-muted/50 hover:scale-[1.02]'
                }
              `}
            >
              <div className="text-2xl font-medium mb-1" dir="rtl">
                {pair?.pashto}
              </div>
              <div className="text-xs text-muted-foreground italic">
                {pair?.pronunciation}
              </div>
              {isMatched(pair?.id) && (
                <Icon name="CheckCircle" size={16} className="text-success mx-auto mt-2" />
              )}
            </button>
          ))}
        </div>

        {/* English Words */}
        <div className="space-y-3">
          <h4 className="text-lg font-medium text-foreground text-center mb-4">
            English Meanings
          </h4>
          {pairs?.map((pair) => (
            <button
              key={`english-${pair?.id}`}
              onClick={() => handleEnglishSelect(pair)}
              disabled={isMatched(pair?.id)}
              className={`
                w-full p-4 rounded-lg border-2 transition-all duration-200 text-center
                ${isMatched(pair?.id) 
                  ? 'border-success bg-success/10 text-success cursor-default' 
                  : selectedPashto
                    ? 'border-border hover:border-primary/50 hover:bg-muted/50 hover:scale-[1.02]'
                    : 'border-border bg-muted/30 cursor-not-allowed'
                }
              `}
            >
              <div className="text-lg font-medium">
                {pair?.english}
              </div>
              {isMatched(pair?.id) && (
                <Icon name="CheckCircle" size={16} className="text-success mx-auto mt-2" />
              )}
            </button>
          ))}
        </div>
      </div>
      {/* Feedback */}
      {showFeedback && (
        <div className="p-4 rounded-lg border-l-4 border-success bg-success/5">
          <div className="flex items-start space-x-3">
            <Icon name="Trophy" size={20} className="text-success" />
            <div>
              <p className="font-medium text-success">
                Excellent work!
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                You've successfully matched all the words. Keep up the great progress!
              </p>
            </div>
          </div>
        </div>
      )}
      {/* Hint */}
      {selectedPashto && (
        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <p className="text-sm text-accent font-medium">
            Selected: <span className="font-bold" dir="rtl">{selectedPashto?.pashto}</span>
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            Now tap its English meaning
          </p>
        </div>
      )}
    </div>
  );
};

export default DragDropExercise;