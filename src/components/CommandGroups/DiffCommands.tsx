
import React from 'react';
import CommandSection from '../CommandSection';
import Command from '../Command';
import { translations } from '../../utils/translations';

interface DiffCommandsProps {
  language: 'ru' | 'ua';
}

const DiffCommands: React.FC<DiffCommandsProps> = ({ language }) => {
  const t = translations[language];

  return (
    <CommandSection id="diff" title={t.sections.diff}>
      <Command 
        command="git diff" 
        description={t.commands['git diff']} 
        language={language}
      />
      <Command 
        command="git diff --staged" 
        description={t.commands['git diff --staged']} 
        language={language}
      />
      <Command 
        command="git diff HEAD" 
        description={t.commands['git diff HEAD']} 
        language={language}
      />
      <Command 
        command="git diff <commit1> <commit2>" 
        description={t.commands['git diff <commit1> <commit2>']} 
        language={language}
      />
    </CommandSection>
  );
};

export default DiffCommands;
