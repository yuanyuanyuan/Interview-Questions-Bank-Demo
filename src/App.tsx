import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionBank from './components/QuestionBank';
import QuestionDetails from './components/QuestionDetails';
import { Question } from './types';

const App: React.FC = () => {
  // 假设数据
  const mockQuestion: Question = {
    id: 1,
    title: 'Example Question',
    type: 'Multiple Choice',
    difficulty: 'Easy',
    description: 'This is an example description.',
    example: 'Example content'
  };

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<QuestionBank />} />
          <Route
            path="/question/:id"
            element={<QuestionDetails question={mockQuestion} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
