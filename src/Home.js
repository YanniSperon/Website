import './Home.css';
import './App.css';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home({ data, projects, handleLinkClick }) {
    const [showPopover, setShowPopover] = useState(false);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showPopover) {
                setShowPopover(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [showPopover]);

    if (!data) {
        return <div>Loading...</div>;
    }

    const parseDescription = (text) => {
        const parts = text.split(/(\*[^*]+\*)/g);
        return parts.map((part, index) => {
            if (part.startsWith('*') && part.endsWith('*')) {
                return <em key={index}>{part.slice(1, -1)}</em>;
            }
            return part;
        });
    };

    const handlePopoverButtonClick = (event) => {
        event.stopPropagation();
        setShowPopover(true);
    };

    return (
        <div className="container">
            <h1 className="centeredText">Yanni Speron</h1>

            <img className="headshot" src="/YanniSperonHeadshot.jpg" alt="Headshot" />
            <button className="ResumeButton" onClick={handlePopoverButtonClick}>View Professional Summary</button>

            <h2 className="centeredText">Seeking</h2>
            <ul>
                {data.seeking.map((seek, index) => (
                    <li key={index}>{seek}</li>
                ))}
            </ul>

            <h2 className="centeredText">Favorite Projects</h2>
            <ul>
                {data.favoriteProjects.map((project, index) => (
                    <li className="centeredText" key={index}>
                        <Link className="home-projects-link" to={`/project/${project}`}>{project}</Link>
                    </li>
                ))}
            </ul>

            <h2 className="centeredText">Ongoing Projects</h2>
            <ul>
                {data.ongoingProjects.map((project, index) => (
                    <li className="centeredText" key={index}>
                        <Link className="home-projects-link" to={`/project/${project.name}`}>
                            {project.name} - {project.status} ({project.privacy})
                        </Link>
                    </li>
                ))}
            </ul>
            
            <h2 className="centeredText">Pending Projects</h2>
            <ul>
                {data.pendingProjects.map((project, index) => (
                    <li className="centeredText" key={index}>
                        <Link className="home-projects-link" to={`/project/${project.name}`}>
                            {project.name} - {project.reason}
                        </Link>
                    </li>
                ))}
            </ul>

            <h2 className="centeredText">Resources</h2>
            <button className="ResumeButton" onClick={() => handleLinkClick("/YanniSperonResume.pdf")}>Download Resume</button>
            <button className="ResumeButton" onClick={() => handleLinkClick("/YanniSperonCoverLetter.pdf")}>Download Cover Letter</button>

            {showPopover && (
                <div className="popover-overlay">
                    <div className="popover">
                        <h2 className="centeredText">Professional Summary</h2>
                        <div>
                            {data.description.map((desc, index) => (
                                <p className="missionStatementParagraph" key={index}>{parseDescription(desc)}</p>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Home;
