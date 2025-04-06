import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Bookmark } from 'lucide-react';
import { translations } from '../utils/translations';
import DownloadButton from './DownloadButton';
import FavoriteCommands from './FavoriteCommands';
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger
} from '@/components/ui/collapsible';
import { Button } from '@/components/ui/button';
import { useFavorites } from '../contexts/FavoritesContext';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

interface SidebarNavProps {
  language: 'ru' | 'ua';
}

const SidebarNav: React.FC<SidebarNavProps> = ({ language }) => {
  const t = translations[language];
  const [isOpen, setIsOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<string>('');
  const { favorites } = useFavorites();
  
  const sections = [
    { id: 'start', title: t.sections.start },
    { id: 'basic', title: t.sections.basic },
    { id: 'branches', title: t.sections.branches },
    { id: 'remote', title: t.sections.remote },
    { id: 'undo', title: t.sections.undo },
    { id: 'diff', title: t.sections.diff },
    { id: 'config', title: t.sections.config },
    { id: 'advanced', title: t.sections.advanced }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => 
        document.getElementById(section.id)
      ).filter(Boolean);
      
      const currentPosition = window.scrollY + 200; // Adding offset to improve detection
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const element = sectionElements[i];
        if (element && element.offsetTop <= currentPosition) {
          setActiveSection(element.id);
          break;
        }
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sections]);

  return (
    <div className="md:block sticky top-24">
      <Collapsible
        open={isOpen}
        onOpenChange={setIsOpen}
        className="bg-[#161621] rounded-lg border border-[#252535] transition-all duration-500 ease-in-out hover:border-gitOrange/30"
      >
        <div className="flex items-center justify-between p-4">
          <h3 className="text-lg font-bold text-gitOrange">{t.sections.title || 'Разделы'}</h3>
          <CollapsibleTrigger asChild>
            <button 
              className="text-gray-300 hover:text-gitOrange transition-colors p-2 rounded-full hover:bg-[#252535] transform transition-transform duration-300"
              aria-label={isOpen ? "Скрыть разделы" : "Показать разделы"}
            >
              {isOpen ? 
                <ChevronLeft className="h-5 w-5 transition-transform hover:scale-110" /> : 
                <ChevronRight className="h-5 w-5 transition-transform hover:scale-110" />
              }
            </button>
          </CollapsibleTrigger>
        </div>
        
        <CollapsibleContent 
          className={`transition-all duration-300 ease-in-out data-[state=open]:animate-accordion-down data-[state=closed]:animate-accordion-up overflow-hidden
          ${isOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'}`}
        >
          <div className={`p-4 pt-0 transition-all duration-300 ${isOpen ? 'transform-none' : 'transform -translate-x-4'}`}>
            <ul className="space-y-2">
              {sections.map((section) => (
                <li key={section.id} className="transform transition-transform duration-300">
                  <button 
                    onClick={() => {
                      const element = document.getElementById(section.id);
                      if (element) {
                        element.scrollIntoView({ behavior: 'smooth' });
                        setActiveSection(section.id);
                      }
                    }}
                    className={`
                      text-left py-2 px-3 w-full rounded-md transition-all duration-300
                      ${activeSection === section.id 
                        ? 'bg-gitOrange/40 text-white font-medium translate-x-2' 
                        : 'text-gray-300 hover:text-gitOrange hover:bg-[#252535] hover:translate-x-2'}
                    `}
                  >
                    {section.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </CollapsibleContent>
      </Collapsible>

      <div className="px-4 mt-4 space-y-4">
        <DownloadButton language={language} />
        
        <Dialog>
          <DialogTrigger asChild>
            <Button 
              className="bg-[#252535] hover:bg-[#30304d] text-white flex items-center gap-2 py-2 px-4 rounded-md transition-all duration-300 w-full hover:scale-105 active:scale-95"
            >
              <Bookmark size={20} className={favorites.length > 0 ? "text-yellow-400" : ""} />
              {language === 'ru' ? 'Избранные команды' : 'Обрані команди'}
              {favorites.length > 0 && <span className="ml-1 bg-gitOrange/80 text-white text-xs px-1.5 py-0.5 rounded-full">{favorites.length}</span>}
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-[#161621] border border-[#252535] text-white max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle className="text-gitOrange text-xl">
                {language === 'ru' ? 'Избранные команды' : 'Обрані команди'}
              </DialogTitle>
            </DialogHeader>
            <FavoriteCommands language={language} />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default SidebarNav;
