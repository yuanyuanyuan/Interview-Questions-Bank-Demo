// components/NavBar.tsx
import React from 'react';
import { Link } from 'react-router-dom';

const NavBar: React.FC = () => {
  return (
    <nav className="bg-blue-500 p-4 text-white">
      <ul className="flex justify-between">
        <li>
          <Link to="/" className="hover:text-blue-300">
            Question Bank
          </Link>
        </li>
        <li>
          <Link to="/favorites" className="hover:text-blue-300">
            Favorites
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
