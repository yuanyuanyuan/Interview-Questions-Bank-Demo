// src/components/FavoritesButton.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import { addFavorite } from '../features/favorites/favoritesSlice';
import { Question } from '../types';

interface Props {
  question: Question;
}

const FavoritesButton: React.FC<Props> = ({ question }) => {
  const dispatch = useDispatch();

  const handleAddFavorite = () => {
    dispatch(addFavorite(question.id));
  };

  return (
    <button
      onClick={handleAddFavorite}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
    >
      Add to Favorites
    </button>
  );
};

export default FavoritesButton;
