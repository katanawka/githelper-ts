
import React from 'react';
import CommandSection from '../CommandSection';
import Command from '../Command';
import { translations } from '../../utils/translations';

interface BasicCommandsProps {
  language: 'ru' | 'ua';
}

const BasicCommands: React.FC<BasicCommandsProps> = ({ language }) => {
  const t = translations[language];

  return (
    <CommandSection id="basic" title={t.sections.basic}>
      <Command 
        command="git status" 
        description={t.commands['git status']} 
        language={language}
      />
      <Command 
        command="git add <file>" 
        description={t.commands['git add <file>']} 
        language={language}
      />
      <Command 
        command="git add ." 
        description={t.commands['git add .']} 
        language={language}
      />
      <Command 
        command={language === 'ua' ? "git commit -m 'Повідомлення коміту'" : "git commit -m 'Сообщение коммита'"}
        description={t.commands[language === 'ua' ? "git commit -m 'Повідомлення коміту'" : "git commit -m 'Сообщение коммита'"]} 
        language={language}
      />
      <Command 
        command="git log" 
        description={t.commands['git log']} 
        language={language}
      />
    </CommandSection>
  );
};

export default BasicCommands;
