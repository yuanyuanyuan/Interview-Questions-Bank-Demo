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

  const [filter, setFilter] = useState({
    type: '',
    difficulty: '',
    keyword: ''
  });

  // 假设从API获取题目数据
  useEffect(() => {
    // fetchQuestions();
  }, []);

  // 更新筛选条件
  const handleFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value
    }));
  };

  // 根据筛选条件过滤题目
  const filteredQuestions = questions.filter(
    (question) =>
      (filter.type ? question.type === filter.type : true) &&
      (filter.difficulty ? question.difficulty === filter.difficulty : true) &&
      (filter.keyword
        ? question.title.toLowerCase().includes(filter.keyword.toLowerCase())
        : true)
  );

  return (
    <div>
      <h2>题库</h2>

      <div>
        <select name="type" onChange={handleFilterChange}>
          <option value="">所有类型</option>
          <option value="Multiple Choice">选择题</option>
          <option value="True or False">判断题</option>
          {/* 其他类型 */}
        </select>
        <select name="difficulty" onChange={handleFilterChange}>
          <option value="">所有难度</option>
          <option value="Easy">简单</option>
          <option value="Medium">中等</option>
          <option value="Hard">困难</option>
        </select>
        <input
          type="text"
          name="keyword"
          placeholder="搜索题目"
          onChange={handleFilterChange}
        />
      </div>

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
          {filteredQuestions.map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.title}</td>
              <td>{question.type}</td>
              <td>{question.difficulty}</td>
              <td>
                <Link to={`/question/${question.id}`}>查看详情</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default QuestionBank;
