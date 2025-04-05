
import React, { createContext, useContext, useState, useEffect } from 'react';
import { translations } from '../utils/translations';

type FavoriteCommand = {
  command: string;
  description: string;
};

interface FavoritesContextType {
  favorites: FavoriteCommand[];
  addFavorite: (command: string, description: string) => void;
  removeFavorite: (command: string) => void;
  isFavorite: (command: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};

interface FavoritesProviderProps {
  children: React.ReactNode;
  language: 'ru' | 'ua';
}

export const FavoritesProvider: React.FC<FavoritesProviderProps> = ({ children, language }) => {
  const [favorites, setFavorites] = useState<FavoriteCommand[]>([]);

  // Load favorites from localStorage on initial render
  useEffect(() => {
    const storedFavorites = localStorage.getItem('gitHelperFavorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (error) {
        console.error('Failed to parse favorites from localStorage:', error);
      }
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('gitHelperFavorites', JSON.stringify(favorites));
  }, [favorites]);

  const addFavorite = (command: string, description: string) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.command === command)) {
        return prev;
      }
      return [...prev, { command, description }];
    });
  };

  const removeFavorite = (command: string) => {
    setFavorites(prev => prev.filter(fav => fav.command !== command));
  };

  const isFavorite = (command: string) => {
    return favorites.some(fav => fav.command === command);
  };

  return (
    <FavoritesContext.Provider value={{ favorites, addFavorite, removeFavorite, isFavorite }}>
      {children}
    </FavoritesContext.Provider>
  );
};
