import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import LanguageToggle from '../../components/ui/LanguageToggle';
import AccountSection from './components/AccountSection';
import LearningPreferences from './components/LearningPreferences';
import AudioSettings from './components/AudioSettings';
import AccessibilitySettings from './components/AccessibilitySettings';
import ProgressStats from './components/ProgressStats';
import PrivacyControls from './components/PrivacyControls';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ProfileSettings = () => {
  const navigate = useNavigate();
  const [currentLanguage, setCurrentLanguage] = useState('en');
  const [activeTab, setActiveTab] = useState('account');

  // Mock user data
  const [userProfile, setUserProfile] = useState({
    name: "Ahmad Khan",
    email: "ahmad.khan@example.com",
    memberSince: "August 2025",
    lastLogin: "Today, 2:30 PM"
  });

  const [learningPreferences, setLearningPreferences] = useState({
    dailyGoalMinutes: 30,
    difficulty: 'medium',
    reminderTime: '19:00',
    notifications: {
      streakReminder: true,
      achievementAlert: true,
      lessonComplete: false,
      weeklyReport: true
    }
  });

  const [audioSettings, setAudioSettings] = useState({
    playbackSpeed: 1.0,
    volume: 75,
    autoPlay: true,
    repeatMode: false
  });

  const [accessibilitySettings, setAccessibilitySettings] = useState({
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    keyboardNav: true
  });

  const [privacySettings, setPrivacySettings] = useState({
    shareProgress: true,
    shareAchievements: true,
    analyticsData: true,
    marketingEmails: false,
    publicProfile: false,
    showStreak: false,
    showLevel: false
  });

  const progressData = {
    totalLessons: 45,
    currentStreak: 12,
    longestStreak: 18,
    totalXP: 2850,
    averageDailyMinutes: 28
  };

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'en';
    setCurrentLanguage(savedLanguage);
    document.documentElement.dir = savedLanguage === 'ps' ? 'rtl' : 'ltr';
    document.documentElement.lang = savedLanguage === 'ps' ? 'ps' : 'en';
  }, []);

  const labels = {
    en: {
      title: 'Profile Settings',
      subtitle: 'Manage your account and learning preferences',
      tabs: {
        account: 'Account',
        learning: 'Learning',
        audio: 'Audio',
        accessibility: 'Accessibility',
        progress: 'Progress',
        privacy: 'Privacy'
      },
      backToDashboard: 'Back to Dashboard'
    },
    ps: {
      title: 'د پروفایل تنظیمات',
      subtitle: 'خپل حساب او د زده کړې غوراوي اداره کړئ',
      tabs: {
        account: 'حساب',
        learning: 'زده کړه',
        audio: 'غږ',
        accessibility: 'لاسرسی',
        progress: 'پرمختګ',
        privacy: 'محرمیت'
      },
      backToDashboard: 'ډشبورډ ته بیرته'
    }
  };

  const tabs = [
    { id: 'account', label: labels?.[currentLanguage]?.tabs?.account, icon: 'User' },
    { id: 'learning', label: labels?.[currentLanguage]?.tabs?.learning, icon: 'Target' },
    { id: 'audio', label: labels?.[currentLanguage]?.tabs?.audio, icon: 'Volume2' },
    { id: 'accessibility', label: labels?.[currentLanguage]?.tabs?.accessibility, icon: 'Accessibility' },
    { id: 'progress', label: labels?.[currentLanguage]?.tabs?.progress, icon: 'TrendingUp' },
    { id: 'privacy', label: labels?.[currentLanguage]?.tabs?.privacy, icon: 'Shield' }
  ];

  const handleLanguageChange = (language) => {
    setCurrentLanguage(language);
  };

  const handleUpdateProfile = (updatedProfile) => {
    setUserProfile(prev => ({ ...prev, ...updatedProfile }));
    // Show success message
    console.log('Profile updated successfully');
  };

  const handleUpdatePreferences = (updatedPreferences) => {
    setLearningPreferences(updatedPreferences);
    console.log('Learning preferences updated successfully');
  };

  const handleUpdateAudioSettings = (updatedSettings) => {
    setAudioSettings(updatedSettings);
    console.log('Audio settings updated successfully');
  };

  const handleUpdateAccessibilitySettings = (updatedSettings) => {
    setAccessibilitySettings(updatedSettings);
    console.log('Accessibility settings updated successfully');
  };

  const handleUpdatePrivacySettings = (updatedSettings) => {
    setPrivacySettings(updatedSettings);
    console.log('Privacy settings updated successfully');
  };

  const handleExportData = () => {
    const exportData = {
      profile: userProfile,
      preferences: learningPreferences,
      audioSettings,
      accessibilitySettings,
      privacySettings,
      progress: progressData,
      exportDate: new Date()?.toISOString()
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'pashtolearn-settings-export.json';
    link?.click();
    URL.revokeObjectURL(url);
  };

  const handleDeleteAccount = () => {
    // In real app, this would call an API to delete the account
    console.log('Account deletion requested');
    alert(currentLanguage === 'en' ? 'Account deleted successfully' : 'حساب په بریالیتوب سره ړنګ شو');
    navigate('/');
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'account':
        return (
          <AccountSection
            currentLanguage={currentLanguage}
            userProfile={userProfile}
            onUpdateProfile={handleUpdateProfile}
          />
        );
      case 'learning':
        return (
          <LearningPreferences
            currentLanguage={currentLanguage}
            preferences={learningPreferences}
            onUpdatePreferences={handleUpdatePreferences}
          />
        );
      case 'audio':
        return (
          <AudioSettings
            currentLanguage={currentLanguage}
            audioSettings={audioSettings}
            onUpdateAudioSettings={handleUpdateAudioSettings}
          />
        );
      case 'accessibility':
        return (
          <AccessibilitySettings
            currentLanguage={currentLanguage}
            accessibilitySettings={accessibilitySettings}
            onUpdateAccessibilitySettings={handleUpdateAccessibilitySettings}
          />
        );
      case 'progress':
        return (
          <ProgressStats
            currentLanguage={currentLanguage}
            progressData={progressData}
            onExportData={handleExportData}
          />
        );
      case 'privacy':
        return (
          <PrivacyControls
            currentLanguage={currentLanguage}
            privacySettings={privacySettings}
            onUpdatePrivacySettings={handleUpdatePrivacySettings}
            onDeleteAccount={handleDeleteAccount}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16 pb-20 md:pb-8">
        <div className="max-w-6xl mx-auto px-4 py-8">
          {/* Header Section */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-heading font-bold text-foreground mb-2">
                {labels?.[currentLanguage]?.title}
              </h1>
              <p className="text-muted-foreground">
                {labels?.[currentLanguage]?.subtitle}
              </p>
            </div>
            
            <div className="flex items-center space-x-3">
              <LanguageToggle
                onLanguageChange={handleLanguageChange}
                className="hidden md:block"
              />
              <Button
                variant="outline"
                onClick={() => navigate('/dashboard')}
                iconName="ArrowLeft"
                iconPosition="left"
                iconSize={16}
              >
                {labels?.[currentLanguage]?.backToDashboard}
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
            {/* Sidebar Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-card rounded-lg border border-border p-4 sticky top-24">
                <nav className="space-y-2">
                  {tabs?.map((tab) => (
                    <button
                      key={tab?.id}
                      onClick={() => setActiveTab(tab?.id)}
                      className={`
                        w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors duration-200
                        ${activeTab === tab?.id
                          ? 'bg-primary text-primary-foreground'
                          : 'hover:bg-muted text-muted-foreground hover:text-foreground'
                        }
                      `}
                    >
                      <Icon 
                        name={tab?.icon} 
                        size={18} 
                        className={activeTab === tab?.id ? 'text-primary-foreground' : 'text-current'}
                      />
                      <span className="text-sm font-medium">{tab?.label}</span>
                    </button>
                  ))}
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {renderTabContent()}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProfileSettings;