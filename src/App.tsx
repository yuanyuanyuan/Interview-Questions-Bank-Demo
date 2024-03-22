// App.tsx
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import NavBar from './components/NavBar';
import Content from './components/Content';

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <NavBar />
        <Content />
      </div>
    </Router>
  );
};

export default App;
