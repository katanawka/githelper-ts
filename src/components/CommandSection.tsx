
import React from 'react';

interface CommandSectionProps {
  title: string;
  id: string;
  children: React.ReactNode;
}

const CommandSection: React.FC<CommandSectionProps> = ({ title, id, children }) => {
  return (
    <div id={id} className="command-section mb-12 hover:translate-y-[-5px] transition-transform duration-300">
      <h3 className="text-2xl font-bold text-gitOrange mb-6">{title}</h3>
      {children}
    </div>
  );
};

export default CommandSection;
