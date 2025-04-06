
import React from 'react';
import GitHubSignupGuide from './GitHubSignupGuide';
import GitInstallGuide from './GitInstallGuide';
import StartCommands from './CommandGroups/StartCommands';
import BasicCommands from './CommandGroups/BasicCommands';
import BranchCommands from './CommandGroups/BranchCommands';
import RemoteCommands from './CommandGroups/RemoteCommands';
import UndoCommands from './CommandGroups/UndoCommands';
import DiffCommands from './CommandGroups/DiffCommands';
import ConfigCommands from './CommandGroups/ConfigCommands';
import AdvancedCommands from './CommandGroups/AdvancedCommands';

interface GitCommandGuideProps {
  language: 'ru' | 'ua';
}

const GitCommandGuide: React.FC<GitCommandGuideProps> = ({ language }) => {
  return (
    <div className="max-w-3xl mx-auto py-8">
      <GitHubSignupGuide language={language} />
      <GitInstallGuide language={language} />
      <StartCommands language={language} />
      <BasicCommands language={language} />
      <BranchCommands language={language} />
      <RemoteCommands language={language} />
      <UndoCommands language={language} />
      <DiffCommands language={language} />
      <ConfigCommands language={language} />
      <AdvancedCommands language={language} />
    </div>
  );
};

export default GitCommandGuide;
