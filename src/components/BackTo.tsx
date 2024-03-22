import React from 'react';
import { useNavigate } from 'react-router-dom';

const BackTo = () => {
  const navigate = useNavigate();

  const goBack = () => {
    navigate(-1); // 回到历史记录中的上一个页面
  };

  return (
    <div>
      {/* 返回按钮 */}
      <button
        onClick={goBack}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        返回
      </button>

      {/* 其他组件内容 */}
    </div>
  );
};

export default BackTo;
