
import React from 'react';
import { translations } from '../utils/translations';

interface GitInstallGuideProps {
  language: 'ru' | 'ua';
}

const GitInstallGuide: React.FC<GitInstallGuideProps> = ({ language }) => {
  const t = translations[language];
  
  return (
    <div className="mb-12 bg-[#161621] p-6 rounded-lg transform transition-all duration-300 hover:shadow-lg hover:shadow-gitOrange/20">
      <h3 className="text-2xl font-bold text-gitOrange mb-4">{t.gitInstallGuide.title}</h3>
      <ol className="list-decimal list-inside space-y-4 text-left">
        {t.gitInstallGuide.steps.map((step, index) => (
          <li key={index} className="text-gray-300">
            {step.includes('git-scm.com') ? (
              <>
                {step.split('git-scm.com')[0]}
                <a href="https://git-scm.com" className="text-gitOrange hover:underline" target="_blank" rel="noopener noreferrer">
                  git-scm.com
                </a>
                {step.split('git-scm.com')[1]}
              </>
            ) : (
              step
            )}
          </li>
        ))}
      </ol>
    </div>
  );
};

export default GitInstallGuide;
