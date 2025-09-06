import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import Dashboard from './pages/dashboard';
import PracticeExercises from './pages/practice-exercises';
import LessonContent from './pages/lesson-content';
import LessonSelection from './pages/lesson-selection';
import ProfileSettings from './pages/profile-settings';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/practice-exercises" element={<PracticeExercises />} />
        <Route path="/lesson-content" element={<LessonContent />} />
        <Route path="/lesson-selection" element={<LessonSelection />} />
        <Route path="/profile-settings" element={<ProfileSettings />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
