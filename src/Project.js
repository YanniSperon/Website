import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Home.css';

function Project({ projects }) {
    const { projectName } = useParams();
    const project = projects.find(p => p.name === projectName);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);

    if (!project) {
        return <div>Project not found</div>;
    }

    const handlePrevImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === 0 ? project.pictureURLs.length - 1 : prevIndex - 1));
    };

    const handleNextImage = () => {
        setCurrentImageIndex((prevIndex) => (prevIndex === project.pictureURLs.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="container project-details">
            <h1 className='contactInfoLabel'>{project.name}</h1>
            {project.githubURL && project.githubURL.length > 0 && (
                <a href={project.githubURL} target="_blank" rel="noopener noreferrer" className="github-link">View on GitHub</a>
            )}
            <h2 className='contactInfoLabel'>Project Timeline</h2>
            <p className='contactInfoLabel'>Start Date: {project.projectStart}</p>
            <p className='contactInfoLabel'>End Date: {project.projectEnd}</p>
            <h2 className='contactInfoLabel'>Description</h2>
            <h4 className='projectDescription'>{project.description}</h4>
            {project.pictureURLs && project.pictureURLs.length > 0 && (
                <div>
                    <h2 className='contactInfoLabel'>Photos</h2>
                    <div className="slideshow-container">
                        <button className="prev" onClick={handlePrevImage}>&#10094;</button>
                        <img src={project.pictureURLs[currentImageIndex]} alt={`${project.name} ${currentImageIndex + 1}`} className="slideshow-image" />
                        <button className="next" onClick={handleNextImage}>&#10095;</button>
                        <p className="image-description">{project.pictureDescriptions[currentImageIndex]}</p>
                    </div>
                </div>
            )}
            <div className="project-details">
                {project.components && project.components.length > 0 && (
                    <h2 className='contactInfoLabel'>Components</h2>
                )}
                <ul>
                    {project.components.map((component, index) => (
                        <li key={index}>{component}</li>
                    ))}
                </ul>
                {project.primaryLanguages && project.primaryLanguages.length > 0 && (
                    <h2 className='contactInfoLabel'>Primary Languages</h2>
                )}
                <ul>
                    {project.primaryLanguages.map((language, index) => (
                        <li key={index}>{language}</li>
                    ))}
                </ul>
                {project.frameworks && project.frameworks.length > 0 && (
                    <h2 className='contactInfoLabel'>Frameworks</h2>
                )}
                <ul>
                    {project.frameworks.map((framework, index) => (
                        <li key={index}>{framework}</li>
                    ))}
                </ul>
                {project.tools && project.tools.length > 0 && (
                    <h2 className='contactInfoLabel'>Tools</h2>
                )}
                <ul>
                    {project.tools.map((tool, index) => (
                        <li key={index}>{tool}</li>
                    ))}
                </ul>
                {project.relatedProjects && project.relatedProjects.length > 0 && (
                    <h2 className='contactInfoLabel'>Related Projects</h2>
                )}
                <ul>
                    {project.relatedProjects.map((relatedProject, index) => (
                        <li key={index}>
                            <Link to={`/project/${relatedProject}`}>{relatedProject}</Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default Project;