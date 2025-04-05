import React, { useState } from 'react';
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
  const { toast } = useToast();
  const t = translations[language];
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  const copyToClipboard = () => {
    navigator.clipboard.writeText(command).then(() => {
      setCopied(true);
      toast({
        title: t.copied || "Скопировано!",
        description: command,
        duration: 2000,
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
      });
    });
  };

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering the copy action
    
    if (isFavorite(command)) {
      removeFavorite(command);
      toast({
        title: t.removedFromFavorites,
        description: command,
        duration: 2000,
      });
    } else {
      addFavorite(command, description);
      toast({
        title: t.addedToFavorites,
        description: command,
        duration: 2000,
      });
    }
  };

  const favorite = isFavorite(command);

  return (
    <div className="mb-6 transform transition-all duration-300 hover:scale-[1.02]">
      <div 
        className="code-block cursor-pointer group relative"
        onClick={copyToClipboard}
      >
        <pre>
          <code>$ <span className="text-gitOrange">{command}</span> <span className="code-comment">// {description}</span></code>
        </pre>
        <div className="absolute top-3 right-3 flex items-center gap-2">
          <button 
            className={`opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-1 rounded-full hover:bg-gray-700 ${favorite ? 'text-yellow-400' : 'text-gray-400 hover:text-yellow-400'}`}
            onClick={toggleFavorite}
            aria-label={favorite ? "Remove from favorites" : "Add to favorites"}
          >
            <Star className="h-5 w-5" fill={favorite ? "currentColor" : "none"} />
          </button>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {copied ? 
              <Check className="h-5 w-5 text-green-500" /> : 
              <Copy className="h-5 w-5 text-gitOrange hover:text-white" />
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default Command;
