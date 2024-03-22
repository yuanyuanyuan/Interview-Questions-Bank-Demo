// src/components/FavoritesList.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../app/store';
import { fetchQuestionsAsync } from '../features/questions/questionsSlice';

const FavoritesList: React.FC = () => {
  // 使用 useSelector 钩子来获取 favorites.ids状态
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);
  // 使用 useSelector 钩子来获取所有问题
  const allQuestions = useSelector(
    (state: RootState) => state.questions.questions
  );

  // 自定义逻辑
  useEffect(() => {
    console.log('favoriteIds', favoriteIds);
    console.log('allQuestions', allQuestions);
  }, [favoriteIds]);

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
