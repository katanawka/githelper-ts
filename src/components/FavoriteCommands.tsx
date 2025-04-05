
import React from 'react';
import { useFavorites } from '../contexts/FavoritesContext';
import Command from './Command';
import { translations } from '../utils/translations';

interface FavoriteCommandsProps {
  language: 'ru' | 'ua';
}

const FavoriteCommands: React.FC<FavoriteCommandsProps> = ({ language }) => {
  const { favorites } = useFavorites();
  const t = translations[language];

  if (favorites.length === 0) {
    return (
      <div className="p-6 text-center text-gray-400">
        {language === 'ru' ? 'Нет избранных команд' : 'Немає обраних команд'}
      </div>
    );
  }

  return (
    <div className="space-y-4 p-2">
      {favorites.map((fav) => (
        <Command
          key={fav.command}
          command={fav.command}
          description={fav.description}
          language={language}
        />
      ))}
    </div>
  );
};

export default FavoriteCommands;
