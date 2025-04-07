import React from 'react';
import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

const LinksToNavMap = new Map([
  ["/home", "Home"],
  ["/", "Work"],
  ["/contact", "Contact"]
]);

function GenerateLinks({ darkMode }) {
  const location = useLocation(); // Get current route

  return Array.from(LinksToNavMap).map(([path, label]) => {
    return (<Link to={path} className="navLink" key={path}>
      <button className={`linkButton ${location.pathname === path ? "selectedButton" : ""} ${darkMode ? 'dark-mode' : ''}`}>
        {label}
      </button>
    </Link>);
  });
}

function Navbar({ darkMode }) {
  return (
    <header className="App-header">
      <nav className={`navbar ${darkMode ? 'dark-mode' : ''}`}>
        <GenerateLinks darkMode={darkMode}/>
      </nav>
    </header>
  );
};

export default Navbar;