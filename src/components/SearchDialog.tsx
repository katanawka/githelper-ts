
import React, { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { translations } from '../utils/translations';
import Command from './Command';

// This interface represents a Git command with its description
interface GitCommand {
  command: string;
  description: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'ru' | 'ua';
  commands: GitCommand[];
}

const SearchDialog: React.FC<SearchDialogProps> = ({ 
  open, 
  onOpenChange, 
  language,
  commands 
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<GitCommand[]>([]);
  const t = translations[language];

  // Translate commands based on selected language
  const translatedCommands = commands.map(cmd => {
    if (language === 'ua') {
      // Find the Ukrainian translation for this command's description
      const ukrainianDescription = t.commands[cmd.command] || cmd.description;
      return {
        ...cmd,
        description: ukrainianDescription
      };
    }
    return cmd;
  });

  // Filter commands based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = translatedCommands.filter(
      cmd => 
        cmd.command.toLowerCase().includes(query) || 
        cmd.description.toLowerCase().includes(query)
    );
    
    setSearchResults(filtered);
  }, [searchQuery, translatedCommands, language]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-[#161621] border border-[#252535] text-white max-w-4xl w-[90vw] max-h-[80vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <DialogTitle className="text-gitOrange text-xl flex items-center gap-2">
            <Search size={20} />
            {language === 'ru' ? 'Поиск команд' : 'Пошук команд'}
          </DialogTitle>
        </DialogHeader>
        
        <div className="relative mb-4">
          <Input
            className="bg-[#0e0e12] border-[#252535] focus:border-gitOrange text-white placeholder:text-gray-500"
            placeholder={language === 'ru' ? 'Введите команду или описание...' : 'Введіть команду або опис...'}
            value={searchQuery}
            onChange={handleSearch}
            autoFocus
          />
          {searchQuery && (
            <Button
              variant="ghost" 
              size="sm"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white p-1"
              onClick={() => setSearchQuery('')}
            >
              ×
            </Button>
          )}
        </div>
        
        <div className="overflow-y-auto custom-scrollbar flex-1 px-2">
          {searchResults.length > 0 ? (
            <div className="space-y-1 py-1">
              {searchResults.map((cmd, index) => (
                <Command 
                  key={index} 
                  command={cmd.command} 
                  description={cmd.description}
                  language={language}
                />
              ))}
            </div>
          ) : searchQuery ? (
            <div className="text-center py-8 text-gray-400">
              {language === 'ru' ? 'Команды не найдены' : 'Команди не знайдені'}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              {language === 'ru' ? 'Начните вводить для поиска' : 'Почніть вводити для пошуку'}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchDialog;
