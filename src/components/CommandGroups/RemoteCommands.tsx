
import React from 'react';
import CommandSection from '../CommandSection';
import Command from '../Command';
import { translations } from '../../utils/translations';

interface RemoteCommandsProps {
  language: 'ru' | 'ua';
}

const RemoteCommands: React.FC<RemoteCommandsProps> = ({ language }) => {
  const t = translations[language];

  return (
    <CommandSection id="remote" title={t.sections.remote}>
      <Command 
        command="git remote add origin <repository-url>" 
        description={t.commands['git remote add origin <repository-url>']} 
        language={language}
      />
      <Command 
        command="git push origin <branch-name>" 
        description={t.commands['git push origin <branch-name>']} 
        language={language}
      />
      <Command 
        command="git pull origin <branch-name>" 
        description={t.commands['git pull origin <branch-name>']} 
        language={language}
      />
      <Command 
        command="git fetch" 
        description={t.commands['git fetch']} 
        language={language}
      />
    </CommandSection>
  );
};

export default RemoteCommands;
