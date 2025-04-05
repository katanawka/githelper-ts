
import React from 'react';
import CommandSection from '../CommandSection';
import Command from '../Command';
import { translations } from '../../utils/translations';

interface AdvancedCommandsProps {
  language: 'ru' | 'ua';
}

const AdvancedCommands: React.FC<AdvancedCommandsProps> = ({ language }) => {
  const t = translations[language];

  return (
    <CommandSection id="advanced" title={t.sections.advanced}>
      <Command 
        command="git stash" 
        description={t.commands['git stash']} 
        language={language}
      />
      <Command 
        command="git stash pop" 
        description={t.commands['git stash pop']} 
        language={language}
      />
      <Command 
        command="git rebase <branch-name>" 
        description={t.commands['git rebase <branch-name>']} 
        language={language}
      />
      <Command 
        command="git tag <tag-name>" 
        description={t.commands['git tag <tag-name>']} 
        language={language}
      />
      <Command 
        command="git cherry-pick <commit-hash>" 
        description={t.commands['git cherry-pick <commit-hash>']} 
        language={language}
      />
      <Command 
        command="git clean -n" 
        description={t.commands['git clean -n']} 
        language={language}
      />
      <Command 
        command="git clean -f" 
        description={t.commands['git clean -f']} 
        language={language}
      />
      <Command 
        command="git bisect start" 
        description={t.commands['git bisect start']} 
        language={language}
      />
    </CommandSection>
  );
};

export default AdvancedCommands;
