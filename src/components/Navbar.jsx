import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 text-white p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg ${
              isActive ? 'bg-blue-800' : 'hover:bg-blue-700'
            }`
          }
        >
          Home
        </NavLink>
        <div className="text-lg font-bold">React Paste App</div>
        <NavLink
          to="/pastes"
          className={({ isActive }) =>
            `px-4 py-2 rounded-lg ${
              isActive ? 'bg-blue-800' : 'hover:bg-blue-700'
            }`
          }
        >
          Pastes
        </NavLink>
      </div>
    </nav>
  );
};

export default Navbar;