
import React from 'react';
import CommandSection from '../CommandSection';
import Command from '../Command';
import { translations } from '../../utils/translations';

interface StartCommandsProps {
  language: 'ru' | 'ua';
}

const StartCommands: React.FC<StartCommandsProps> = ({ language }) => {
  const t = translations[language];

  return (
    <CommandSection id="start" title={t.sections.start}>
      <Command 
        command="git init" 
        description={t.commands['git init']} 
        language={language}
      />
      <Command 
        command="git clone <repository-url>" 
        description={t.commands['git clone <repository-url>']} 
        language={language}
      />
      <Command 
        command={language === 'ua' ? "git config --global user.name 'Ваше Ім'я'" : "git config --global user.name 'Ваше Имя'"}
        description={t.commands[language === 'ua' ? "git config --global user.name 'Ваше Ім'я'" : "git config --global user.name 'Ваше Имя'"]} 
        language={language}
      />
      <Command 
        command="git config --global user.email 'your.email@example.com'" 
        description={t.commands["git config --global user.email 'your.email@example.com'"]} 
        language={language}
      />
    </CommandSection>
  );
};

export default StartCommands;
