
import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import TypewriterText from '../components/TypewriterText';
import GitCommandGuide from '../components/GitCommandGuide';
import GitLogo from '../components/GitLogo';
import LanguageToggle from '../components/LanguageToggle';
import SidebarNav from '../components/SidebarNav';
import { translations } from '../utils/translations';
import { Github, Send } from 'lucide-react';
import { FavoritesProvider } from '../contexts/FavoritesContext';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<'ru' | 'ua'>(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return (savedLanguage === 'ru' || savedLanguage === 'ua') ? savedLanguage : 'ru';
  });
  const [restartTypewriter, setRestartTypewriter] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const handleLanguageChange = (newLanguage: 'ru' | 'ua') => {
    setLanguage(newLanguage);
    localStorage.setItem('preferredLanguage', newLanguage);
    setRestartTypewriter(prev => prev + 1);
  };

  if (isLoading) {
    return <LoadingScreen onLoadingComplete={() => setIsLoading(false)} language={language} />;
  }

  return (
    <FavoritesProvider language={language}>
      <div className="min-h-screen bg-[#0e0e12] text-white">
        <header className="pt-20 pb-12 px-4 text-center relative">
          <div className="absolute top-4 right-4">
            <LanguageToggle 
              currentLanguage={language} 
              onLanguageChange={handleLanguageChange} 
            />
          </div>
          <div className="flex items-center justify-center mb-6 hover:scale-105 transition-transform duration-300">
            <GitLogo className="text-gitOrange mr-3 w-16 h-16" />
            <h1 className="text-5xl font-bold no-scale-hover">
              <span className="text-gitOrange">Git</span>
              <span className="text-white">Helper</span>
            </h1>
          </div>
          <div className="max-w-2xl mx-auto mt-8">
            <TypewriterText 
              key={restartTypewriter}
              text={translations[language].title}
              className="text-xl text-gray-300"
            />
          </div>
        </header>

        <main className="container mx-auto px-4 pb-20 animate-fade-in">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="md:w-1/4">
              <SidebarNav language={language} />
            </div>
            <div className="md:w-3/4">
              <GitCommandGuide language={language} />
            </div>
          </div>
        </main>

        <footer className="bg-[#161621] py-6 text-center text-gray-400">
          <p className="mb-4">{translations[language].footer}</p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://github.com/katanawka" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gitOrange transition-colors duration-300"
              aria-label="GitHub"
            >
              <Github size={24} />
            </a>
            <a 
              href="https://t.me/katanawkatg" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-gitOrange transition-colors duration-300"
              aria-label="Telegram"
            >
              <Send size={24} />
            </a>
          </div>
        </footer>
      </div>
    </FavoritesProvider>
  );
};

export default Index;
