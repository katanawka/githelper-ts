
import React from 'react';
import CommandSection from '../CommandSection';
import Command from '../Command';
import { translations } from '../../utils/translations';

interface BranchCommandsProps {
  language: 'ru' | 'ua';
}

const BranchCommands: React.FC<BranchCommandsProps> = ({ language }) => {
  const t = translations[language];

  return (
    <CommandSection id="branches" title={t.sections.branches}>
      <Command 
        command="git branch" 
        description={t.commands['git branch']} 
        language={language}
      />
      <Command 
        command="git branch <branch-name>" 
        description={t.commands['git branch <branch-name>']} 
        language={language}
      />
      <Command 
        command="git checkout <branch-name>" 
        description={t.commands['git checkout <branch-name>']} 
        language={language}
      />
      <Command 
        command="git checkout -b <branch-name>" 
        description={t.commands['git checkout -b <branch-name>']} 
        language={language}
      />
      <Command 
        command="git merge <branch-name>" 
        description={t.commands['git merge <branch-name>']} 
        language={language}
      />
      <Command 
        command="git branch -d <branch-name>" 
        description={t.commands['git branch -d <branch-name>']} 
        language={language}
      />
    </CommandSection>
  );
};

export default BranchCommands;
