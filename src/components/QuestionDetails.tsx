// src/components/QuestionDetails.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../app/store';

const QuestionDetails: React.FC = () => {
  // 使用 useParams 钩子获取路由参数
  const { id } = useParams<{ id: string }>();
  const questions = useSelector(
    (state: RootState) => state.questions.questions
  ); // 假设你的Redux state是这么组织的

  // 根据id找到具体的问题
  const question = questions.find((q) => q.id);

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
