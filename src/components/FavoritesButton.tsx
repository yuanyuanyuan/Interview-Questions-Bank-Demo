// src/components/FavoritesButton.tsx
import React from 'react';
import { useDispatch } from 'react-redux';
import {
  addFavorite,
  removeFavorite
} from '../features/favorites/favoritesSlice';
import { Question } from '../types';

interface Props {
  question: Question;
}

const FavoritesButton: React.FC<Props> = ({ question }) => {
  const dispatch = useDispatch();

  const handleAddFavorite = () => {
    dispatch(addFavorite(question.id));
  };

  return <button onClick={handleAddFavorite}>Add to Favorites</button>;
};

export default FavoritesButton;
