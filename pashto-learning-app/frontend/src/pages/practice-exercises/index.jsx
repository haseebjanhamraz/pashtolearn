import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressIndicator from '../../components/ui/ProgressIndicator';
import ExerciseTypeCard from './components/ExerciseTypeCard';
import ActiveExerciseSession from './components/ActiveExerciseSession';
import PerformanceAnalytics from './components/PerformanceAnalytics';
import ExerciseFilters from './components/ExerciseFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PracticeExercises = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeView, setActiveView] = useState('exercises'); // 'exercises', 'session', 'analytics'
  const [activeExercise, setActiveExercise] = useState(null);
  const [filters, setFilters] = useState({
    type: 'all',
    difficulty: 'all',
    sort: 'recommended'
  });

  // Check for saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock exercise data
  const exerciseTypes = [
    {
      id: 'pronunciation',
      type: 'pronunciation',
      title: { en: 'Pronunciation Practice', ps: 'د تلفظ تمرین' },
      subtitle: { en: 'Perfect your Pashto pronunciation', ps: 'خپل پښتو تلفظ بشپړ کړئ' },
      description: { 
        en: 'Practice speaking Pashto words and phrases with audio feedback and pronunciation scoring.',
        ps: 'د غږیز بیاخبرونو او د تلفظ نمرو سره د پښتو کلمو او جملو ویل تمرین وکړئ.'
      },
      icon: 'Mic',
      iconColor: 'text-accent',
      iconBg: 'bg-accent/10',
      difficulty: 'beginner',
      completedSessions: 24,
      accuracy: 85,
      avgTime: 8.5,
      recommendedFrequency: { en: '3x per week', ps: 'اونۍ کې ۳ ځله' },
      lastPracticed: '2 days ago'
    },
    {
      id: 'vocabulary',
      type: 'vocabulary',
      title: { en: 'Vocabulary Review', ps: 'د لغاتو بیاکتنه' },
      subtitle: { en: 'Expand your Pashto word knowledge', ps: 'د پښتو کلمو پوهه پراخه کړئ' },
      description: { 
        en: 'Learn new words and review previously studied vocabulary through interactive matching and multiple choice exercises.',
        ps: 'د متقابل میچ کولو او څانګو ټاکنې تمرینونو له لارې نوي کلمې زده کړئ او پخوانۍ لغات بیاکتنه وکړئ.'
      },
      icon: 'BookOpen',
      iconColor: 'text-primary',
      iconBg: 'bg-primary/10',
      difficulty: 'intermediate',
      completedSessions: 31,
      accuracy: 78,
      avgTime: 4.2,
      recommendedFrequency: { en: 'Daily', ps: 'ورځنی' },
      lastPracticed: '1 day ago'
    },
    {
      id: 'grammar',
      type: 'grammar',
      title: { en: 'Grammar Drills', ps: 'د ګرامر تمرینونه' },
      subtitle: { en: 'Master Pashto sentence structure', ps: 'د پښتو جملې جوړښت ماهر شئ' },
      description: { 
        en: 'Practice verb conjugations, sentence construction, and grammatical rules through drag-and-drop and fill-in-the-blank exercises.',
        ps: 'د فعل تصریف، د جملې جوړښت، او د ګرامر قواعد د کشولو او پریښودلو او ډکولو تمرینونو له لارې تمرین وکړئ.'
      },
      icon: 'FileText',
      iconColor: 'text-success',
      iconBg: 'bg-success/10',
      difficulty: 'advanced',
      completedSessions: 18,
      accuracy: 82,
      avgTime: 6.8,
      recommendedFrequency: { en: '4x per week', ps: 'اونۍ کې ۴ ځله' },
      lastPracticed: '3 days ago'
    },
    {
      id: 'reading',
      type: 'reading',
      title: { en: 'Reading Comprehension', ps: 'د لوستلو پوهاوی' },
      subtitle: { en: 'Improve Pashto reading skills', ps: 'د پښتو لوستلو مهارتونه ښه کړئ' },
      description: { 
        en: 'Read Pashto texts and answer comprehension questions to improve your understanding of written Pashto.',
        ps: 'د پښتو متنونه ولولئ او د پوهاوي پوښتنو ته ځواب ورکړئ ترڅو د لیکل شوي پښتو ستاسو پوهاوی ښه شي.'
      },
      icon: 'Eye',
      iconColor: 'text-secondary',
      iconBg: 'bg-secondary/10',
      difficulty: 'intermediate',
      completedSessions: 15,
      accuracy: 75,
      avgTime: 12.3,
      recommendedFrequency: { en: '2x per week', ps: 'اونۍ کې ۲ ځله' },
      lastPracticed: '5 days ago'
    },
    {
      id: 'writing',
      type: 'writing',
      title: { en: 'Writing Practice', ps: 'د لیکلو تمرین' },
      subtitle: { en: 'Learn Pashto script writing', ps: 'د پښتو لیک لیکل زده کړئ' },
      description: { 
        en: 'Practice writing Pashto letters and words with guided stroke order and character formation exercises.',
        ps: 'د لارښود د لیکلو ترتیب او د کرکټر جوړولو تمرینونو سره د پښتو توري او کلمې لیکل تمرین وکړئ.'
      },
      icon: 'PenTool',
      iconColor: 'text-warning',
      iconBg: 'bg-warning/10',
      difficulty: 'beginner',
      completedSessions: 12,
      accuracy: 70,
      avgTime: 18.7,
      recommendedFrequency: { en: '3x per week', ps: 'اونۍ کې ۳ ځله' },
      lastPracticed: '1 week ago'
    }
  ];

  // Filter exercises based on current filters
  const getFilteredExercises = () => {
    let filtered = exerciseTypes;

    if (filters?.type !== 'all') {
      filtered = filtered?.filter(exercise => exercise?.type === filters?.type);
    }

    if (filters?.difficulty !== 'all') {
      filtered = filtered?.filter(exercise => exercise?.difficulty === filters?.difficulty);
    }

    // Sort exercises
    switch (filters?.sort) {
      case 'accuracy':
        filtered = filtered?.sort((a, b) => b?.accuracy - a?.accuracy);
        break;
      case 'recent':
        filtered = filtered?.sort((a, b) => {
          const aTime = a?.lastPracticed === '1 day ago' ? 1 : a?.lastPracticed === '2 days ago' ? 2 : 7;
          const bTime = b?.lastPracticed === '1 day ago' ? 1 : b?.lastPracticed === '2 days ago' ? 2 : 7;
          return aTime - bTime;
        });
        break;
      case 'difficulty':
        const difficultyOrder = { 'beginner': 1, 'intermediate': 2, 'advanced': 3 };
        filtered = filtered?.sort((a, b) => difficultyOrder?.[a?.difficulty] - difficultyOrder?.[b?.difficulty]);
        break;
      default: // recommended
        filtered = filtered?.sort((a, b) => b?.completedSessions - a?.completedSessions);
    }

    return filtered;
  };

  const handleStartExercise = (exercise) => {
    setActiveExercise(exercise);
    setActiveView('session');
  };

  const handleCompleteExercise = (results) => {
    // Mock updating exercise stats
    console.log('Exercise completed:', results);
    setActiveView('exercises');
    setActiveExercise(null);
  };

  const handleExitExercise = () => {
    setActiveView('exercises');
    setActiveExercise(null);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
  };

  const filteredExercises = getFilteredExercises();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Page Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                {currentLanguage === 'en' ? 'Practice Exercises' : 'د تمرین تمرینونه'}
              </h1>
              <p className="text-muted-foreground">
                {currentLanguage === 'en' ?'Reinforce your skills with targeted practice sessions' :'د هدفمندو تمرینی غونډو سره خپل مهارتونه پیاوړي کړئ'
                }
              </p>
            </div>

            {/* View Toggle */}
            <div className="flex items-center space-x-2 bg-muted rounded-lg p-1">
              <Button
                variant={activeView === 'exercises' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('exercises')}
                iconName="Grid3X3"
                iconSize={16}
              >
                {currentLanguage === 'en' ? 'Exercises' : 'تمرینونه'}
              </Button>
              <Button
                variant={activeView === 'analytics' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveView('analytics')}
                iconName="BarChart3"
                iconSize={16}
              >
                {currentLanguage === 'en' ? 'Analytics' : 'تحلیلات'}
              </Button>
            </div>
          </div>

          {/* Progress Overview */}
          {activeView !== 'session' && (
            <div className="mb-8">
              <ProgressIndicator
                currentXP={2340}
                targetXP={3000}
                streak={12}
                level={8}
                completedLessons={156}
                totalLessons={200}
                showDetails={true}
              />
            </div>
          )}

          {/* Content based on active view */}
          {activeView === 'session' && activeExercise ? (
            <ActiveExerciseSession
              exercise={activeExercise}
              onComplete={handleCompleteExercise}
              onExit={handleExitExercise}
              currentLanguage={currentLanguage}
            />
          ) : activeView === 'analytics' ? (
            <PerformanceAnalytics currentLanguage={currentLanguage} />
          ) : (
            <>
              {/* Exercise Filters */}
              <ExerciseFilters
                filters={filters}
                onFilterChange={handleFilterChange}
                currentLanguage={currentLanguage}
              />

              {/* Quick Stats */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                      <Icon name="PlayCircle" size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-2xl font-mono font-bold text-foreground">156</p>
                      <p className="text-sm text-muted-foreground">
                        {currentLanguage === 'en' ? 'Total Sessions' : 'ټولې غونډې'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-success/10 rounded-full">
                      <Icon name="Target" size={20} className="text-success" />
                    </div>
                    <div>
                      <p className="text-2xl font-mono font-bold text-foreground">83%</p>
                      <p className="text-sm text-muted-foreground">
                        {currentLanguage === 'en' ? 'Avg Accuracy' : 'اوسط دقت'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-accent/10 rounded-full">
                      <Icon name="Clock" size={20} className="text-accent" />
                    </div>
                    <div>
                      <p className="text-2xl font-mono font-bold text-foreground">39h</p>
                      <p className="text-sm text-muted-foreground">
                        {currentLanguage === 'en' ? 'Time Spent' : 'تیر شوی وخت'}
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-card rounded-lg border border-border p-4">
                  <div className="flex items-center space-x-3">
                    <div className="flex items-center justify-center w-10 h-10 bg-warning/10 rounded-full">
                      <Icon name="Flame" size={20} className="text-warning" />
                    </div>
                    <div>
                      <p className="text-2xl font-mono font-bold text-foreground">12</p>
                      <p className="text-sm text-muted-foreground">
                        {currentLanguage === 'en' ? 'Day Streak' : 'ورځنۍ سلسله'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exercise Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredExercises?.map((exercise) => (
                  <ExerciseTypeCard
                    key={exercise?.id}
                    exercise={exercise}
                    onStartExercise={handleStartExercise}
                    currentLanguage={currentLanguage}
                  />
                ))}
              </div>

              {/* Empty State */}
              {filteredExercises?.length === 0 && (
                <div className="text-center py-12">
                  <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
                    <Icon name="Search" size={24} className="text-muted-foreground" />
                  </div>
                  <h3 className="text-lg font-heading font-semibold text-foreground mb-2">
                    {currentLanguage === 'en' ? 'No exercises found' : 'هیڅ تمرین ونه موندل شو'}
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    {currentLanguage === 'en' ?'Try adjusting your filters to see more exercises' :'د ډیرو تمرینونو لیدلو لپاره خپل فلټرونه سمون ورکړئ'
                    }
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setFilters({ type: 'all', difficulty: 'all', sort: 'recommended' })}
                    iconName="RotateCcw"
                    iconPosition="left"
                    iconSize={16}
                  >
                    {currentLanguage === 'en' ? 'Reset Filters' : 'فلټرونه بیا تنظیم کړئ'}
                  </Button>
                </div>
              )}

              {/* Recommended Practice Section */}
              {activeView === 'exercises' && filteredExercises?.length > 0 && (
                <div className="mt-12 bg-gradient-to-r from-primary/5 to-accent/5 rounded-lg p-6 border border-primary/20">
                  <div className="flex items-center space-x-3 mb-4">
                    <div className="flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                      <Icon name="Lightbulb" size={20} className="text-primary" />
                    </div>
                    <h3 className="font-heading font-semibold text-foreground">
                      {currentLanguage === 'en' ? 'Recommended for You' : 'ستاسو لپاره وړاندیز شوی'}
                    </h3>
                  </div>
                  
                  <p className="text-muted-foreground mb-4">
                    {currentLanguage === 'en' ?'Based on your performance, we recommend focusing on writing practice and grammar drills to improve your overall accuracy.' :'ستاسو د فعالیت پر بنسټ، موږ وړاندیز کوو چې د ستاسو ټولیز دقت د ښه کولو لپاره د لیکلو تمرین او د ګرامر تمرینونو باندې تمرکز وکړئ.'
                    }
                  </p>
                  
                  <div className="flex flex-wrap gap-2">
                    <Button
                      variant="default"
                      size="sm"
                      onClick={() => handleStartExercise(exerciseTypes?.find(e => e?.type === 'writing'))}
                      iconName="PenTool"
                      iconPosition="left"
                      iconSize={16}
                    >
                      {currentLanguage === 'en' ? 'Start Writing Practice' : 'د لیکلو تمرین پیل کړئ'}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleStartExercise(exerciseTypes?.find(e => e?.type === 'grammar'))}
                      iconName="FileText"
                      iconPosition="left"
                      iconSize={16}
                    >
                      {currentLanguage === 'en' ? 'Grammar Drills' : 'د ګرامر تمرینونه'}
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default PracticeExercises;