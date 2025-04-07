import React from 'react';
import './Work.css';
import './About.css';
import { Link } from 'react-router-dom';

function Work({ projects }) {
    if (!projects || projects.length === 0) {
        return <div className="work-container">
            <h1 className='projectsTitle'>Loading...</h1>;
        </div>
    }

    return (
        <div className="work-container">
            <h1 className="projectsTitle">Professional Work</h1>
            <div className="grid-container">
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