
import React from 'react';
import { translations } from '../utils/translations';

interface GitHubSignupGuideProps {
  language: 'ru' | 'ua';
}

const GitHubSignupGuide: React.FC<GitHubSignupGuideProps> = ({ language }) => {
  const t = translations[language];
  
  return (
    <div className="mb-12 bg-[#161621] p-6 rounded-lg transform transition-all duration-300 hover:shadow-lg hover:shadow-gitOrange/20">
      <h3 className="text-2xl font-bold text-gitOrange mb-4">{t.githubGuide.title}</h3>
      <ol className="list-decimal list-inside space-y-4 text-left">
        {t.githubGuide.steps.map((step, index) => (
          <li key={index} className="text-gray-300">
            {step.includes('github.com') ? (
              <>
                {step.split('github.com')[0]}
                <a href="https://github.com" className="text-gitOrange hover:underline" target="_blank" rel="noopener noreferrer">
                  github.com
                </a>
                {step.split('github.com')[1]}
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

export default GitHubSignupGuide;
