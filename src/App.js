import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState, useEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Work from './Work';
import Contact from './Contact';
import Project from './Project';

function App() {
  const [data, setData] = useState(null);
  const [projects, setProjects] = useState([]);
  const [darkMode, setDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

  useEffect(() => {
    fetch("/data.json")
      .then(response => response.json())
      .then(data => setData(data));
  }, []);

  useEffect(() => {
    fetch("/projects.json")
      .then(response => response.json())
      .then(data => setProjects(data));
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Navbar darkMode={darkMode} />
        <button className="dark-mode-toggle" onClick={toggleDarkMode}>
          <span className="material-icons">
            {darkMode ? 'dark_mode' : 'light_mode'}
          </span>
        </button>
        <Routes>
          <Route index element={<Home data={data} projects={projects} />} />
          <Route path="/work" element={<Work projects={projects} />} />
          <Route path="/contact" element={<Contact data={data} />} />
          <Route path="/project/:projectName" element={<Project projects={projects} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
