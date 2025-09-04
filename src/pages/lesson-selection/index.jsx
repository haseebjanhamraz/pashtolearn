import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import ProgressOverview from './components/ProgressOverview';
import FilterControls from './components/FilterControls';
import CategoryCard from './components/CategoryCard';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const LessonSelection = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [selectedDifficulty, setSelectedDifficulty] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Mock lesson categories data
  const lessonCategories = [
    {
      id: 'greetings',
      title: {
        en: 'Greetings & Basics',
        ps: 'سلامونه او بنسټونه'
      },
      description: {
        en: 'Learn essential greetings and basic phrases',
        ps: 'اړین سلامونه او بنسټیز جملې زده کړئ'
      },
      icon: 'Hand',
      totalLessons: 8,
      completedLessons: 8,
      difficulty: 'beginner',
      isLocked: false,
      estimatedHours: 3,
      xpReward: 240,
      previewVocabulary: [
        { pashto: 'سلام وروره', english: 'Hello brother' },
        { pashto: 'ښه راغلاست', english: 'Welcome' },
        { pashto: 'ستاسو څنګه یاست؟', english: 'How are you?' }
      ]
    },
    {
      id: 'numbers',
      title: {
        en: 'Numbers & Counting',
        ps: 'شمیرې او شمیرنه'
      },
      description: {
        en: 'Master numbers from 1 to 100 and counting',
        ps: 'له ۱ څخه تر ۱۰۰ پورې شمیرې او شمیرنه زده کړئ'
      },
      icon: 'Hash',
      totalLessons: 6,
      completedLessons: 4,
      difficulty: 'beginner',
      isLocked: false,
      estimatedHours: 2,
      xpReward: 180,
      previewVocabulary: [
        { pashto: 'یو', english: 'One' },
        { pashto: 'دوه', english: 'Two' },
        { pashto: 'درې', english: 'Three' }
      ]
    },
    {
      id: 'colors',
      title: {
        en: 'Colors & Descriptions',
        ps: 'رنګونه او تشریحات'
      },
      description: {
        en: 'Identify colors and describe objects',
        ps: 'رنګونه وپیژنئ او شیان تشریح کړئ'
      },
      icon: 'Palette',
      totalLessons: 5,
      completedLessons: 0,
      difficulty: 'beginner',
      isLocked: false,
      estimatedHours: 2,
      xpReward: 150,
      previewVocabulary: [
        { pashto: 'سور', english: 'Red' },
        { pashto: 'شین', english: 'Blue' },
        { pashto: 'زیړ', english: 'Yellow' }
      ]
    },
    {
      id: 'family',
      title: {
        en: 'Family & Relationships',
        ps: 'کورنۍ او اړیکې'
      },
      description: {
        en: 'Learn family terms and relationship words',
        ps: 'د کورنۍ اصطلاحات او د اړیکو کلمې زده کړئ'
      },
      icon: 'Users',
      totalLessons: 10,
      completedLessons: 0,
      difficulty: 'intermediate',
      isLocked: true,
      unlockRequirement: {
        en: 'Complete Colors & Descriptions to unlock',
        ps: 'د رنګونو او تشریحاتو بشپړول ته اړتیا'
      },
      estimatedHours: 4,
      xpReward: 300,
      previewVocabulary: [
        { pashto: 'پلار', english: 'Father' },
        { pashto: 'مور', english: 'Mother' },
        { pashto: 'ورور', english: 'Brother' }
      ]
    },
    {
      id: 'food',
      title: {
        en: 'Food & Dining',
        ps: 'خواړه او ډوډۍ'
      },
      description: {
        en: 'Explore food vocabulary and dining phrases',
        ps: 'د خواړو لغات او د ډوډۍ جملې وپیژنئ'
      },
      icon: 'UtensilsCrossed',
      totalLessons: 12,
      completedLessons: 0,
      difficulty: 'intermediate',
      isLocked: true,
      unlockRequirement: {
        en: 'Complete Family & Relationships to unlock',
        ps: 'د کورنۍ او اړیکو بشپړول ته اړتیا'
      },
      estimatedHours: 5,
      xpReward: 360,
      previewVocabulary: [
        { pashto: 'ډوډۍ', english: 'Bread' },
        { pashto: 'اوبه', english: 'Water' },
        { pashto: 'غوښه', english: 'Meat' }
      ]
    }
  ];

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    
    // Set document direction and language
    document.documentElement.dir = savedLanguage === 'ps' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage === 'ps' ? 'ps' : 'en';
  }, []);

  // Filter categories based on selected filters
  const filteredCategories = lessonCategories?.filter(category => {
    const difficultyMatch = selectedDifficulty === 'all' || category?.difficulty === selectedDifficulty;
    
    let statusMatch = true;
    if (selectedStatus === 'new') {
      statusMatch = category?.completedLessons === 0 && !category?.isLocked;
    } else if (selectedStatus === 'in-progress') {
      statusMatch = category?.completedLessons > 0 && category?.completedLessons < category?.totalLessons;
    } else if (selectedStatus === 'completed') {
      statusMatch = category?.completedLessons === category?.totalLessons;
    }
    
    return difficultyMatch && statusMatch;
  });

  const handleCategorySelect = (category) => {
    // Navigate to lesson content with category data
    navigate('/lesson-content', { 
      state: { 
        categoryId: category?.id,
        categoryTitle: category?.title?.[currentLanguage]
      }
    });
  };

  const handleResetFilters = () => {
    setSelectedDifficulty('all');
    setSelectedStatus('all');
  };

  const handleLanguageChange = (newLanguage) => {
    setCurrentLanguage(newLanguage);
  };

  // Calculate progress stats
  const totalCategories = lessonCategories?.length;
  const completedCategories = lessonCategories?.filter(cat => cat?.completedLessons === cat?.totalLessons)?.length;
  const totalLessons = lessonCategories?.reduce((sum, cat) => sum + cat?.totalLessons, 0);
  const completedLessons = lessonCategories?.reduce((sum, cat) => sum + cat?.completedLessons, 0);
  const totalXP = lessonCategories?.reduce((sum, cat) => sum + (cat?.completedLessons / cat?.totalLessons * cat?.xpReward), 0);

  return (
    <div className="min-h-screen bg-background">
      <Header onLanguageChange={handleLanguageChange} />
      {/* Main Content */}
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page Header */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground mb-2">
                {currentLanguage === 'en' ? 'Choose Your Lesson' : 'خپله زده کړه غوره کړئ'}
              </h1>
              <p className="text-muted-foreground">
                {currentLanguage === 'en' ?'Select a category to continue your Pashto learning journey' :'د پښتو زده کړې سفر ته دوام ورکولو لپاره یوه کټګورۍ غوره کړئ'
                }
              </p>
            </div>
            
            <Button
              variant="outline"
              onClick={() => navigate('/dashboard')}
              iconName="ArrowLeft"
              iconPosition="left"
              iconSize={16}
              className="mt-4 sm:mt-0"
            >
              {currentLanguage === 'en' ? 'Back to Dashboard' : 'ډشبورډ ته بیرته'}
            </Button>
          </div>

          {/* Progress Overview */}
          <ProgressOverview
            currentLanguage={currentLanguage}
            totalCategories={totalCategories}
            completedCategories={completedCategories}
            totalLessons={totalLessons}
            completedLessons={completedLessons}
            totalXP={Math.round(totalXP)}
            estimatedTimeRemaining={24}
            className="mb-8"
          />

          {/* Filter Controls */}
          <FilterControls
            currentLanguage={currentLanguage}
            selectedDifficulty={selectedDifficulty}
            selectedStatus={selectedStatus}
            onDifficultyChange={setSelectedDifficulty}
            onStatusChange={setSelectedStatus}
            onResetFilters={handleResetFilters}
            className="mb-8"
          />

          {/* Categories Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {filteredCategories?.map((category) => (
              <CategoryCard
                key={category?.id}
                category={category}
                currentLanguage={currentLanguage}
                onCategorySelect={handleCategorySelect}
              />
            ))}
          </div>

          {/* Empty State */}
          {filteredCategories?.length === 0 && (
            <div className="text-center py-12">
              <div className="flex items-center justify-center w-16 h-16 bg-muted rounded-full mx-auto mb-4">
                <Icon name="Search" size={24} className="text-muted-foreground" />
              </div>
              <h3 className="font-heading font-semibold text-foreground text-lg mb-2">
                {currentLanguage === 'en' ? 'No lessons found' : 'هیڅ زده کړه ونه موندل شوه'}
              </h3>
              <p className="text-muted-foreground mb-4">
                {currentLanguage === 'en' ?'Try adjusting your filters to see more lessons' :'د نورو زده کړو لیدلو لپاره خپل فلټرونه تنظیم کړئ'
                }
              </p>
              <Button
                variant="outline"
                onClick={handleResetFilters}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={16}
              >
                {currentLanguage === 'en' ? 'Reset Filters' : 'فلټرونه بیا تنظیم کړئ'}
              </Button>
            </div>
          )}

          {/* Quick Stats Footer */}
          <div className="bg-card border border-border rounded-lg p-6 mt-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center">
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-xl mx-auto mb-3">
                  <Icon name="BookOpen" size={24} className="text-primary" />
                </div>
                <p className="text-2xl font-mono font-bold text-foreground mb-1">
                  {totalLessons}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'en' ? 'Total Lessons' : 'ټولې زده کړې'}
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-success/10 rounded-xl mx-auto mb-3">
                  <Icon name="CheckCircle" size={24} className="text-success" />
                </div>
                <p className="text-2xl font-mono font-bold text-foreground mb-1">
                  {completedLessons}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'en' ? 'Completed' : 'بشپړ شوي'}
                </p>
              </div>
              
              <div>
                <div className="flex items-center justify-center w-12 h-12 bg-accent/10 rounded-xl mx-auto mb-3">
                  <Icon name="Star" size={24} className="text-accent" />
                </div>
                <p className="text-2xl font-mono font-bold text-foreground mb-1">
                  {Math.round(totalXP)}
                </p>
                <p className="text-sm text-muted-foreground">
                  {currentLanguage === 'en' ? 'XP Earned' : 'ترلاسه شوی XP'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LessonSelection;