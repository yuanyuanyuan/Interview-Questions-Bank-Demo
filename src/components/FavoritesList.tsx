// src/components/FavoritesList.tsx
import React from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../app/store';

const FavoritesList: React.FC = () => {
  // 使用 useSelector 钩子来获取 favorites.ids状态
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  // 使用 useSelector 钩子来获取所有问题
  const allQuestions = useSelector((state: RootState) => state.questions);

  return (
    <ul>
      {allQuestions
        .filter((question) => favoriteIds.includes(question.id))
        .map((question) => (
          <li key={question.id}>{question.title}</li>
        ))}
    </ul>
  );
};

export default FavoritesList;
