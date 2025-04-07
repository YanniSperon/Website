import { HashRouter, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import './App.css';
import Navbar from './Navbar';
import Home from './Home';
import Work from './Work';
import Contact from './Contact';
import Project from './Project';
import NotFound from "./NotFound";
import Footer from "./Footer.js";

import ReactGA from 'react-ga4';

function ScrollToTop() {
    const { pathname } = useLocation();

    useLayoutEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}

function PageTracking() {
    const location = useLocation();

    useEffect(() => {
        console.log("Logged page switch to " + location.pathname + location.search + " to Google Analytics");
        ReactGA.send({
            hitType: "pageview",
            page: location.pathname + location.search,
            title: document.title,
            referrer: document.referrer
        });
    }, [location]);

    return null;
}

function ModeToggle({ darkMode, toggleDarkMode }) {
    return (
        <button className="dark-mode-toggle-small" onClick={toggleDarkMode}>
            <span className="material-icons icon-box">
                {darkMode ? 'light_mode' : 'dark_mode'}
            </span>
        </button>
    );
}

function App() {
    const [data, setData] = useState(null);
    const [projects, setProjects] = useState({});
    const [icons, setIcons] = useState({});

    const [darkMode, setDarkMode] = useState(() => {
        const savedDarkMode = localStorage.getItem('darkMode');
        var res = false;
        if (savedDarkMode !== null) {
            res = savedDarkMode === "true";
            console.log("Found saved darkMode state, setting to " + res);
        } else {
            res = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches);
            console.log("Could not find saved darkMode state, setting to " + res);
        }
        return res;
    });
    const linkRef = useRef(null);

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
        fetch("/icons.json")
            .then(response => response.json())
            .then(data => setIcons(data));
    }, []);

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
        document.documentElement.setAttribute(
            "data-color-scheme",
            darkMode ? "dark" : "light"
        );
        localStorage.setItem('darkMode', JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    const handleLinkClick = (url) => {
        console.log("Logged click to " + url + " to Google Analytics");
        ReactGA.event({
            category: 'Navigation',
            action: 'Click',
            label: url
        });
        if (url.includes("mailto:") || url.includes("tel:")) {
            linkRef.current.href = url;
            linkRef.current.click();
        } else {
            window.open(url, '_blank', 'noopener noreferrer');
        }
    };

    return (
        <div className="App">
            <HashRouter>
                <ScrollToTop />
                <PageTracking />
                <Navbar darkMode={darkMode} />
                <Routes>
                    <Route path="/home" element={<Home data={data} projects={projects} handleLinkClick={handleLinkClick} />} />
                    <Route index element={<Work projects={projects} handleLinkClick={handleLinkClick} />} />
                    <Route path="/contact" element={<Contact data={data} handleLinkClick={handleLinkClick} />} />
                    <Route path="/project/:projectName" element={<Project projects={projects} handleLinkClick={handleLinkClick} icons={icons} isDarkMode={darkMode}/>} />
                    <Route path="*" element={<NotFound />} />
                </Routes>
                <Footer />
                <a ref={linkRef} href="/" aria-hidden="true" hidden={true}>Hidden Link</a>
            </HashRouter>
            <ModeToggle darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
        </div>
    );
}

export default App;
