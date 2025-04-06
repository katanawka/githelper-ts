
import React, { useState, useEffect, useRef } from 'react';
import { Copy, Check, Star } from 'lucide-react';
import { useToast } from '../hooks/use-toast';
import { translations } from '../utils/translations';
import { useFavorites } from '../contexts/FavoritesContext';

interface CommandProps {
  command: string;
  description: string;
  language: 'ru' | 'ua';
}

const Command: React.FC<CommandProps> = ({ command, description, language }) => {
  const [copied, setCopied] = useState(false);
  const [isInSearchDialog, setIsInSearchDialog] = useState(false);
  const commandRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();
  const t = translations[language];
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Detect if the command is inside the search dialog
  useEffect(() => {
    if (commandRef.current) {
      const checkIfInDialog = () => {
        let element: HTMLElement | null = commandRef.current;
        while (element) {
          if (element.classList && element.classList.contains('DialogContent')) {
            setIsInSearchDialog(true);
            return;
          }
          element = element.parentElement;
        }
        setIsInSearchDialog(false);
      };
      
      // Check on mount
      checkIfInDialog();
    }
  }, []);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      toast({
        title: t.copied || "Скопировано!",
        description: command,
        duration: 2000,
        className: "bg-[#161621] border border-[#252535] text-white",
      });
      
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({
        title: t.copyFailed || "Ошибка копирования",
        description: err.message,
        variant: "destructive",
        className: "bg-[#161621] border border-[#252535] text-white",
      });
    });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    
    if (isFavorite(command)) {
      removeFavorite(command);
      toast({
        title: t.removedFromFavorites,
        description: command,
        duration: 2000,
        className: "bg-[#161621] border border-[#252535] text-white",
      });
    } else {
      addFavorite(command, description);
      toast({
        title: t.addedToFavorites,
        description: command,
        duration: 2000,
        className: "bg-[#161621] border border-[#252535] text-white",
      });
    }
  };

  const favorite = isFavorite(command);

  const scrollToCommand = () => {
    const commandElements = Array.from(document.querySelectorAll('.code-block'));
    const targetElement = commandElements.find(element => {
      const text = element.textContent || '';
      return text.includes(command);
    });
    
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      targetElement.classList.add('ring-2', 'ring-gitOrange');
      setTimeout(() => {
        targetElement.classList.remove('ring-2', 'ring-gitOrange');
      }, 2000);
    }
  };

  return (
    <div 
      ref={commandRef}
      className={`${
        isInSearchDialog 
          ? "mb-2" // Reduced margin for search dialog
          : "mb-4 transform transition-transform duration-300 hover:scale-105 will-change-transform"
      }`}
    >
      <div 
        className={`code-block cursor-pointer group relative overflow-hidden ${
          isInSearchDialog 
            ? 'py-2 px-3' // Smaller padding for search dialog items
            : !isInSearchDialog ? 'hover:bg-[rgba(249,115,22,0.1)] hover:border-[rgba(249,115,22,0.3)]' : ''
        }`}
        onClick={(e) => {
          if (document.querySelector('.DialogContent')?.contains(e.currentTarget)) {
            scrollToCommand();
          } else {
            copyToClipboard();
          }
        }}
      >
        <pre className={`whitespace-pre-wrap break-words ${isInSearchDialog ? 'text-sm' : ''}`}>
          <code>$ <span className="text-gitOrange">{command}</span> <span className="code-comment">// {description}</span></code>
        </pre>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button 
            className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 rounded-full hover:bg-gray-700 ${favorite ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
            onClick={toggleFavorite}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className={`${isInSearchDialog ? 'h-3 w-3' : 'h-4 w-4'}`} fill={favorite ? "currentColor" : "none"} />
          </button>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {copied ? 
              <Check className={`${isInSearchDialog ? 'h-3 w-3' : 'h-4 w-4'} text-green-500`} /> : 
              <Copy className={`${isInSearchDialog ? 'h-3 w-3' : 'h-4 w-4'} text-gitOrange hover:text-white`} />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Command;
