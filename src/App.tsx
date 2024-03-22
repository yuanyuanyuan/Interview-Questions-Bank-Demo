import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import QuestionBank from './components/QuestionBank';
import QuestionDetails from './components/QuestionDetails';
import { Question } from './types';
import FavoritesList from './components/FavoritesList';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<QuestionBank />} />
          <Route path="/question/:id" element={<QuestionDetails />} />
          <Route path="/favorites" element={<FavoritesList />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
