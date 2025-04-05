
import React from 'react';
import { Button } from '@/components/ui/button';

interface LanguageToggleProps {
  currentLanguage: 'ru' | 'ua';
  onLanguageChange: (language: 'ru' | 'ua') => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ currentLanguage, onLanguageChange }) => {
  return (
    <div className="flex rounded-md overflow-hidden border border-[#252535] bg-[#161621] relative">
      {/* Animated background slider */}
      <div 
        className={`absolute h-full bg-gitOrange transition-all duration-300 ease-in-out z-0 top-0 w-1/2 ${
          currentLanguage === 'ru' ? 'left-0' : 'left-1/2'
        }`}
      />
      
      <Button
        variant="ghost"
        size="sm"
        className={`px-4 py-2 z-10 transition-all duration-300 transform hover:scale-110 ${
          currentLanguage === 'ru' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'
        } hover:bg-transparent focus:bg-transparent focus:text-white`}
        onClick={() => onLanguageChange('ru')}
      >
        RU
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className={`px-4 py-2 z-10 transition-all duration-300 transform hover:scale-110 ${
          currentLanguage === 'ua' ? 'text-white font-medium' : 'text-gray-400 hover:text-white'
        } hover:bg-transparent focus:bg-transparent focus:text-white`}
        onClick={() => onLanguageChange('ua')}
      >
        UA
      </Button>
    </div>
  );
};

export default LanguageToggle;
