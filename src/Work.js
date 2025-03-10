import React from 'react';
import './Work.css';
import { Link } from 'react-router-dom';

function Work({ projects }) {
    if (!projects || projects.length === 0) {
        return <div>Loading...</div>;
    }

    return (
        <div className="work-container">
            <h1 className="projectsTitle">Projects</h1>
            <div className="grid-container">
                {projects.map((project, index) => {
                    const backgroundImage = project.thumbnailURL ? `url(${project.thumbnailURL})` : 'none';

                    return (
                        <Link to={`/project/${project.name}`} key={index} className="grid-item">
                            <div
                                className="project-card"
                                style={{
                                    backgroundImage: backgroundImage,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center',
                                }}
                            >
                                <div className="project-content">
                                    <h2>{project.name}</h2>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

export default Work;