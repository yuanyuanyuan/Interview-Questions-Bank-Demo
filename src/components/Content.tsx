// components/Content.tsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import QuestionBank from './QuestionBank';
import QuestionDetails from './QuestionDetails';
import FavoritesList from './FavoritesList';
import BackTo from './BackTo';

const Content: React.FC = () => {
  return (
    <div className="content p-4">
      <Routes>
        <Route path="/" element={<QuestionBank />} />
        <Route path="/question/:id" element={<QuestionDetails />} />
        <Route path="/favorites" element={<FavoritesList />} />
      </Routes>
      <BackTo></BackTo>
    </div>
  );
};

export default Content;
