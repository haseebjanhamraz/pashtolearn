import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import WelcomeHeader from "./components/WelcomeHeader";
import StreakCounter from "./components/StreakCounter";
import ContinueLearningCard from "./components/ContinueLearningCard";
import ProgressOverview from "./components/ProgressOverview";
import AchievementBadges from "./components/AchievementBadges";
import PracticeRecommendations from "./components/PracticeRecommendations";
import QuickAccessButtons from "./components/QuickAccessButtons";
import Header from "components/ui/Header";

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState("en");

  useEffect(() => {
    // Check localStorage for saved language preference
    const savedLanguage = localStorage.getItem("language") || "en";
    setCurrentLanguage(savedLanguage);
  }, []);

  // Mock user data
  const userData = {
    name: "Ahmad",
    streak: 7,
    currentXP: 1250,
    level: 3,
    nextLevelXP: 2000,
  };

  const nextLesson = {
    title: "Family Members",
    category: "Vocabulary",
    progress: 60,
    estimatedTime: "8 min",
    description: "Learn essential family relationship terms in Pashto",
  };

  const handleContinueLearning = () => {
    navigate("/lesson-content");
  };

  const handleStartPractice = (recommendation) => {
    if (recommendation?.type === "all") {
      navigate("/practice-exercises");
    } else {
      navigate(`/practice-exercises?type=${recommendation?.type}`);
    }
  };

  const handleNavigation = (route) => {
    navigate(route);
  };

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        {/* Main Content */}
        <div className="pt-20 pb-20 md:pb-8 px-4 max-w-7xl mx-auto">
          {/* Welcome Header */}
          <WelcomeHeader
            userName={userData?.name}
            currentLanguage={currentLanguage}
          />

          {/* Top Stats Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            {/* Streak Counter */}
            <StreakCounter
              streak={userData?.streak}
              currentXP={userData?.currentXP}
              level={userData?.level}
              nextLevelXP={userData?.nextLevelXP}
            />

            {/* Continue Learning Card */}
            <div className="lg:col-span-2">
              <ContinueLearningCard
                nextLesson={nextLesson}
                onContinue={handleContinueLearning}
              />
            </div>
          </div>

          {/* Progress Overview */}
          <div className="mb-8">
            <ProgressOverview currentLanguage={currentLanguage} />
          </div>

          {/* Middle Section */}
          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
            {/* Achievement Badges */}
            <div className="xl:col-span-2">
              <AchievementBadges />
            </div>

            {/* Quick Access Buttons */}
            <div>
              <QuickAccessButtons onNavigate={handleNavigation} />
            </div>
          </div>

          {/* Practice Recommendations */}
          <div className="mb-8">
            <PracticeRecommendations onStartPractice={handleStartPractice} />
          </div>

          {/* Bottom Spacing for Mobile Navigation */}
          <div className="h-4 md:hidden" />
        </div>
      </div>
    </>
  );
};

export default Dashboard;
