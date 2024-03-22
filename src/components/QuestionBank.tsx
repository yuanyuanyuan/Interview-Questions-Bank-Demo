// src/components/QuestionBank.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '../app/store';
import {
  addFavorite,
  removeFavorite
} from '../features/favorites/favoritesSlice';
import { fetchQuestionsAsync } from '../features/questions/questionsSlice';

const QuestionBank: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  // 添加分页状态
  const [currentPage, setCurrentPage] = useState(1);
  const questionsPerPage = 2; // 每页显示的问题数量

  // 选择questions状态，loading状态和error状态
  const questions = useSelector(
    (state: RootState) => state.questions.questions
  );
  const loading = useSelector((state: RootState) => state.questions.loading);
  const error = useSelector((state: RootState) => state.questions.error);

  useEffect(() => {
    // 首次加载数据时，分派fetchQuestionsAsync action
    if (questions.length === 0 && !loading) {
      dispatch(fetchQuestionsAsync());
    }
  }, []);

  // 使用 useSelector 钩子来获取 favorites.ids状态
  const favoriteIds = useSelector((state: RootState) => state.favorites.ids);

  const handleFavorite = (questionId: number) => {
    favoriteIds.includes(questionId)
      ? dispatch(removeFavorite(questionId))
      : dispatch(addFavorite(questionId));
  };

  const [filter, setFilter] = useState({
    type: '',
    difficulty: '',
    keyword: ''
  });

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
  const filteredQuestions = () => {
    // 首先检查questions是否为空或者未定义
    if (!questions) {
      // 如果questions是undefined或者null，返回一个空数组
      return [];
    }

    // 然后使用filter函数来过滤questions
    return questions.filter((question) => {
      // 检查filter.type是否存在，如果存在则比较question.type
      const typeFilter = filter.type ? question.type === filter.type : true;
      // 检查filter.difficulty是否存在，如果存在则比较question.difficulty
      const difficultyFilter = filter.difficulty
        ? question.difficulty === filter.difficulty
        : true;
      // 检查filter.keyword是否存在，如果存在则比较question.title（不区分大小写）是否包含keyword（也不区分大小写）
      const keywordFilter = filter.keyword
        ? question.title.toLowerCase().includes(filter.keyword.toLowerCase())
        : true;

      // 只有当所有过滤条件都满足时，才包含当前问题
      return typeFilter && difficultyFilter && keywordFilter;
    });
  };
  const filteredQuestionsList = filteredQuestions();
  console.log('filteredQuestionsList', filteredQuestionsList);

  // 计算当前页的问题列表
  const paginatedQuestions = () => {
    const start = (currentPage - 1) * questionsPerPage;
    const end = start + questionsPerPage;
    return filteredQuestionsList.slice(start, end);
  };
  // 分页导航
  const totalPages = Math.ceil(filteredQuestionsList.length / questionsPerPage);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <nav>
        <Link to={`/`}>index</Link>
        <hr />
        <Link to={`/favorites`}>favorites</Link>
      </nav>
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

      {/* 处理error状态 */}
      {error && <div>Error: {error}</div>}
      {/*/!* 处理加载中的状态 *!/*/}
      {/*{loading && <div>Loading...</div>}*/}
      {/*/!* 处理首次加载数据 *!/*/}
      {/*{questions.length === 0 && !loading && <div>No questions available.</div>}*/}

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>题目名称</th>
            <th>题目类型</th>
            <th>难度</th>
            <th>操作</th>
            {/* 添加操作列，用于查看详情 */}
          </tr>
        </thead>
        <tbody>
          {paginatedQuestions().map((question) => (
            <tr key={question.id}>
              <td>{question.id}</td>
              <td>{question.title}</td>
              <td>{question.type}</td>
              <td>{question.difficulty}</td>
              <td>
                <Link to={`/question/${question.id}`}>查看详情</Link>
                <button onClick={() => handleFavorite(question.id)}>
                  {favoriteIds.includes(question.id) ? '取消收藏' : '收藏'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {/* 添加页码导航 */}
      <div>
        <button
          onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)}
        >
          上一页
        </button>
        <span>
          页码：{currentPage} / {totalPages}
        </span>
        <button
          onClick={() =>
            currentPage < totalPages && setCurrentPage(currentPage + 1)
          }
        >
          下一页
        </button>
      </div>
    </div>
  );
};

export default QuestionBank;
