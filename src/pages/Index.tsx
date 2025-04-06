
import React, { useState, useEffect } from 'react';
import LoadingScreen from '../components/LoadingScreen';
import TypewriterText from '../components/TypewriterText';
import GitCommandGuide from '../components/GitCommandGuide';
import GitLogo from '../components/GitLogo';
import LanguageToggle from '../components/LanguageToggle';
import SidebarNav from '../components/SidebarNav';
import { translations } from '../utils/translations';
import { Github, Send, Search } from 'lucide-react';
import { FavoritesProvider } from '../contexts/FavoritesContext';
import SearchDialog from '../components/SearchDialog';
import { Button } from '@/components/ui/button';

interface GitCommand {
  command: string;
  description: string;
}

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [language, setLanguage] = useState<'ru' | 'ua'>(() => {
    const savedLanguage = localStorage.getItem('preferredLanguage');
    return (savedLanguage === 'ru' || savedLanguage === 'ua') ? savedLanguage : 'ru';
  });
  const [restartTypewriter, setRestartTypewriter] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [allCommands, setAllCommands] = useState<GitCommand[]>([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (searchOpen && allCommands.length === 0) {
      collectAllCommands();
    }
  }, [searchOpen]);

  useEffect(() => {
    // Re-collect commands when language changes
    if (language) {
      collectAllCommands();
    }
  }, [language]);

  const collectAllCommands = () => {
    const commandBlocks = document.querySelectorAll('.code-block');
    const commandsData: GitCommand[] = [];
    
    commandBlocks.forEach(block => {
      const codeElement = block.querySelector('code');
      if (codeElement) {
        const text = codeElement.textContent || '';
        const commandMatch = text.match(/\$ (.*?) \/\//);
        const descriptionMatch = text.match(/\/\/ (.*)/);
        
        if (commandMatch && descriptionMatch) {
          commandsData.push({
            command: commandMatch[1].trim(),
            description: descriptionMatch[1].trim()
          });
        }
      }
    });
    
    setAllCommands(commandsData);
  };

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
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              onClick={() => setSearchOpen(true)}
              className="bg-[#161621] hover:bg-[#252535] text-gitOrange transition-colors duration-300 rounded-md flex items-center px-3 py-2"
              variant="ghost"
              aria-label={language === 'ru' ? 'Поиск команд' : 'Пошук команд'}
            >
              <Search size={16} />
            </Button>
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

        <SearchDialog
          open={searchOpen}
          onOpenChange={setSearchOpen}
          language={language}
          commands={allCommands}
        />
      </div>
    </FavoritesProvider>
  );
};

export default Index;
