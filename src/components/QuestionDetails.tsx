// src/components/QuestionDetails.tsx
import React from 'react';
import { Question } from '../types';

interface Props {
  question: Question; // 传入的题目详情
}

const QuestionDetails: React.FC<Props> = ({ question }) => {
  if (!question) {
    return <div>题目不存在或已被删除</div>;
  }

  return (
    <div>
      <h2>{question.title}</h2>
      <p>
        <strong>题目类型:</strong> {question.type}
      </p>
      <p>
        <strong>难度:</strong> {question.difficulty}
      </p>
      <p>
        <strong>描述:</strong> {question.description}
      </p>
      <p>
        <strong>示例:</strong> {question.example}
      </p>
      {/* 根据需要展示更多题目详情 */}
    </div>
  );
};

export default QuestionDetails;
