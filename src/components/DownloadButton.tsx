
import React from 'react';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';

interface DownloadButtonProps {
  language: 'ru' | 'ua';
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ language }) => {
  const buttonText = language === 'ru' ? 'Скачать Git' : 'Завантажити Git';
  
  const handleDownload = () => {
    window.open('https://git-scm.com/downloads', '_blank');
  };

  return (
    <Button 
      onClick={handleDownload}
      className="bg-gitOrange hover:bg-orange-600 text-white flex items-center gap-2 py-2 px-4 rounded-md transition-all duration-300 w-full hover:scale-105 active:scale-95"
    >
      <Download size={20} />
      {buttonText}
    </Button>
  );
};

export default DownloadButton;
