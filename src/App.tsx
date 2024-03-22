import React from 'react';
import logo from './logo.svg';
import QuestionBank from './components/QuestionBank';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <QuestionBank />
    </div>
  );
}

export default App;
