import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useLayoutEffect } from 'react';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Work from './Work';
import Contact from './Contact';
import Project from './Project';
import NotFound from "./NotFound";

import ReactGA from 'react-ga4';

function ScrollToTop() {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function App() {
    const [data, setData] = useState(null);
    const [projects, setProjects] = useState({});
    const [darkMode, setDarkMode] = useState(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: window.location.pathname + window.location.search, title: "Landing Page", referrer: document.referrer });
    }, []);

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
            <HashRouter onUpdate={() => window.scrollTo(0, 0)}>
                <ScrollToTop />
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
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </HashRouter>
        </div>
    );
}

export default App;
