
import React from 'react';
import CommandSection from '../CommandSection';
import Command from '../Command';
import { translations } from '../../utils/translations';

interface UndoCommandsProps {
  language: 'ru' | 'ua';
}

const UndoCommands: React.FC<UndoCommandsProps> = ({ language }) => {
  const t = translations[language];

  return (
    <CommandSection id="undo" title={t.sections.undo}>
      <Command 
        command="git restore <file>" 
        description={t.commands['git restore <file>']} 
        language={language}
      />
      <Command 
        command="git restore --staged <file>" 
        description={t.commands['git restore --staged <file>']} 
        language={language}
      />
      <Command 
        command="git reset HEAD~1" 
        description={t.commands['git reset HEAD~1']} 
        language={language}
      />
      <Command 
        command="git revert <commit-hash>" 
        description={t.commands['git revert <commit-hash>']} 
        language={language}
      />
    </CommandSection>
  );
};

export default UndoCommands;
