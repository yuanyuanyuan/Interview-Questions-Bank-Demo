// src/components/QuestionDetails.tsx
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../app/store';
import { renderQuestionType } from '../const';

const QuestionDetails: React.FC = () => {
  // 使用 useParams 钩子获取路由参数
  const { id } = useParams<{ id: string }>();
  const questions = useSelector(
    (state: RootState) => state.questions.questions
  ); // 假设你的Redux state是这么组织的

  // 根据id找到具体的问题
  const question = questions.find((q) => {
    // 使用类型守卫确保id是字符串
    if (typeof id === 'string') {
      return q.id === parseInt(id);
    }
    return false;
  });
  if (!question) {
    return <div>题目不存在或已被删除</div>;
  }

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold text-gray-800">{question.title}</h2>
      <p className="mt-2">
        <strong>题目类型:</strong> {renderQuestionType(question.type)}
      </p>
      <p className="mt-2">
        <strong>难度:</strong> {question.difficulty}
      </p>
      <p className="mt-2">
        <strong>描述:</strong> {question.description}
      </p>
      <p className="mt-2">
        <strong>示例:</strong> {question.example}
      </p>
      {/* 根据需要展示更多题目详情 */}
    </div>
  );
};

export default QuestionDetails;
