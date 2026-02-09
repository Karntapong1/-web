import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Topic from './pages/Topic';
import Innovations from './pages/Innovations';
import CaseStudies from './pages/CaseStudies';
import Future from './pages/Future';
import References from './pages/References';
import Tracking from './pages/Tracking';
import Dashboard from './pages/Dashboard';

// ScrollToTop component to reset scroll position on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const App: React.FC = () => {
  // Check local storage or system preference for dark mode
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return true;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-slate-900 transition-colors duration-300">
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/topic" element={<Topic />} />
            <Route path="/innovations" element={<Innovations />} />
            <Route path="/cases" element={<CaseStudies />} />
            <Route path="/tracking" element={<Tracking />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/future" element={<Future />} />
            <Route path="/references" element={<References />} />
          </Routes>
        </main>
        
        <Footer />
      </div>
    </Router>
  );
};

export default App;