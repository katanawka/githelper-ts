
import React from 'react';
import CommandSection from '../CommandSection';
import Command from '../Command';
import { translations } from '../../utils/translations';

interface ConfigCommandsProps {
  language: 'ru' | 'ua';
}

const ConfigCommands: React.FC<ConfigCommandsProps> = ({ language }) => {
  const t = translations[language];

  return (
    <CommandSection id="config" title={t.sections.config}>
      <Command 
        command="git config --list" 
        description={t.commands['git config --list']} 
        language={language}
      />
      <Command 
        command="git config --global core.editor <editor>" 
        description={t.commands['git config --global core.editor <editor>']} 
        language={language}
      />
      <Command 
        command="git config --global alias.<shortcut> <command>" 
        description={t.commands['git config --global alias.<shortcut> <command>']} 
        language={language}
      />
      <Command 
        command="git config --global core.autocrlf <input|true|false>" 
        description={t.commands['git config --global core.autocrlf <input|true|false>']} 
        language={language}
      />
    </CommandSection>
  );
};

export default ConfigCommands;
