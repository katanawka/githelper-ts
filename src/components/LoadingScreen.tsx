
import React, { useEffect, useState } from 'react';
import GitLogo from './GitLogo';
import { translations } from '../utils/translations';

interface LoadingScreenProps {
  onLoadingComplete: () => void;
  language: 'ru' | 'ua';
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ onLoadingComplete, language }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (progress < 100) {
        setProgress(prev => {
          const newProgress = prev + 1;
          if (newProgress >= 100) {
            onLoadingComplete();
          }
          return newProgress;
        });
      }
    }, 30);

    return () => clearTimeout(timer);
  }, [progress, onLoadingComplete]);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#0e0e12]">
      <GitLogo className="text-gitOrange mb-8 w-24 h-24 animate-bounce" />
      <div className="w-64 h-2 bg-gray-800 rounded-full overflow-hidden">
        <div 
          className="h-full bg-gitOrange transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <p className="text-white mt-4">{translations[language].loading}</p>
    </div>
  );
};

export default LoadingScreen;
