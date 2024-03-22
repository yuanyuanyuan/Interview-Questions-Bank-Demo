// src/components/FavoritesList.tsx
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { RootState } from '../app/store';
import { Link } from 'react-router-dom';

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
    <ul className="list-disc pl-5 space-y-2">
      {' '}
      {/* 添加了space-y-2来给列表项添加垂直间距 */}
      {allQuestions
        .filter((question) => favoriteIds.includes(question.id))
        .map((question) => (
          <li key={question.id} className="mt-1">
            {/* 使用Tailwind CSS的类来移除下划线并添加交互效果 */}
            <Link
              to={`/question/${question.id}`}
              className="text-blue-600 hover:text-blue-800 focus:text-blue-900 active:text-blue-700"
              onClick={() => window.scrollTo(0, 0)}
            >
              {question.title}
            </Link>
          </li>
        ))}
    </ul>
  );
};

export default FavoritesList;
