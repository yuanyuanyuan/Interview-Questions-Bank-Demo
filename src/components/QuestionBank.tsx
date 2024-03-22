// src/components/QuestionBank.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { Question } from '../types';

const QuestionBank: React.FC = () => {
  // 假设有静态数据，实际开发中可能需要从API获取
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: 'Example Question 1',
      type: 'Multiple Choice',
      difficulty: 'Easy'
    },
    {
      id: 2,
      title: 'Example Question 2',
      type: 'Multiple Choice',
      difficulty: 'medium'
    },
    {
      id: 3,
      title: 'Example Question 3',
      type: 'Multiple Choice',
      difficulty: 'hard'
    }
    // 添加更多题目...
  ]);

  return (
    <div>
      <h2>题库</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>题目名称</th>
            <th>题目类型</th>
            <th>难度</th>
            <th>操作</th> {/* 添加操作列，用于查看详情 */}
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.title}</td>
              <td>{question.type}</td>
              <td>{question.difficulty}</td>
              <td>
                <Link to={`/question/${question.id}`}>查看详情</Link>{' '}
                {/* 使用Link组件跳转到详情页面 */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;
