import React, { useState, useEffect } from 'react';
import './Work.css';
import './About.css';
import { Link } from 'react-router-dom';

function Work({ projects }) {
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth <= 666);

    useEffect(() => {
        const handleResize = () => {
            setIsSmallScreen(window.innerWidth <= 666);
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    if (!projects || projects.length === 0) {
        return <div className="work-container">
            <h1 className='projectsTitle'>Loading...</h1>;
        </div>
    }

    return (
        <div className="work-container">
            <h1 className="projectsTitle">Full-Time Professional Work</h1>
            <div
                className={`grid-container ${
                    !isSmallScreen && Object.entries(projects).filter(([_, v]) => !v.isPersonal).length === 2
                        ? 'two-items'
                        : ''
                }`}
            >
                {Object.entries(projects).map(([k, v]) => {
                    if (!v.isPersonal) {
                        const backgroundImage = v.thumbnailURL ? `url(${v.thumbnailURL})` : 'none';
                        
                        return (
                            <Link to={`/project/${k}`} key={k + "professional"} className="grid-item">
                                <div
                                    className="project-card"
                                    style={{
                                        backgroundImage: backgroundImage,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="blurCover"></div>
                                    <div className="project-content">
                                        <h2>{k}</h2>
                                    </div>
                                </div>
                            </Link>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>

            <h1 className="projectsTitle">Personal Projects</h1>
            <div className="grid-container">
                {Object.entries(projects).map(([k, v]) => {
                    if (v.isPersonal) {
                        const backgroundImage = v.thumbnailURL ? `url(${v.thumbnailURL})` : 'none';
                        
                        return (
                            <Link to={`/project/${k}`} key={k + "personal"} className="grid-item">
                                <div
                                    className="project-card"
                                    style={{
                                        backgroundImage: backgroundImage,
                                        backgroundSize: 'cover',
                                        backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="blurCover"></div>
                                    <div className="project-content">
                                        <h2>{k}</h2>
                                    </div>
                                </div>
                            </Link>
                        );
                    } else {
                        return null;
                    }
                })}
            </div>
        </div>
    );
}

export default Work;