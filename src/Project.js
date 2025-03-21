import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import './Home.css';

function PlaceImageDisplay({ version, imageIndex, name }) {
    const url = version.pictureURLs[imageIndex];
    if (url.includes(".mp4")) {
        return (
            <video key={url} controls className="slideshow-media">
                <source src={url} type="video/mp4" />
                Your browser does not support the video tag.
            </video>
        );
    } else {
        return (
            <img
                src={url}
                alt={`${name} ${imageIndex + 1}`}
                className="slideshow-media"
            />
        );
    }
}

function VersionToImageCategoryString(version) {
    var videos = false;
    var photos = false;
    version.pictureURLs.forEach((element) => {
        if (element.includes(".mp4")) {
            videos = true;
        } else if (element.includes(".png") || element.includes(".jpg") || element.includes(".jpeg")) {
            photos = true;
        }
    });

    if (videos === true && photos === false) {
        return "Videos";
    } else if (videos === true) {
        // Photos must be true
        return "Photos & Videos";
    } else {
        // Must just be photos
        return "Photos";
    }
}

function Project({ projects, handleLinkClick }) {
    const { projectName } = useParams();
    const project = projects[projectName];
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [selectedVersion, setSelectedVersion] = useState(null);
    const [showAllComponents, setShowAllComponents] = useState(false);

    if (!project) {
        return (
            <div className="container project-details">
                <h1 className='contactInfoLabel'>Project not found</h1>
            </div>
        );
    }

    // Get all version keys and set the first one as default if not already set
    const versionKeys = Object.keys(project).filter(key => key.startsWith('Version '));

    if (!selectedVersion && versionKeys.length > 0) {
        setSelectedVersion(versionKeys[0]);
    }

    const currentVersion = selectedVersion ? project[selectedVersion] : null;

    const handlePrevImage = () => {
        if (!currentVersion || !currentVersion.pictureURLs) return;
        setCurrentImageIndex((prevIndex) =>
            (prevIndex === 0 ? currentVersion.pictureURLs.length - 1 : prevIndex - 1)
        );
    };

    const handleNextImage = () => {
        if (!currentVersion || !currentVersion.pictureURLs) return;
        setCurrentImageIndex((prevIndex) =>
            (prevIndex === currentVersion.pictureURLs.length - 1 ? 0 : prevIndex + 1)
        );
    };

    const handleVersionChange = (version) => {
        setSelectedVersion(version);
        setCurrentImageIndex(0); // Reset image index when changing versions
    };

    const toggleShowAllComponents = () => {
        setShowAllComponents(!showAllComponents);
    };

    if (!currentVersion) {
        return (
            <div className="container project-details">
                <h1 className='contactInfoLabel'>{project.name}</h1>
                <h4 className='contactInfoLabel'>No version information available</h4>
            </div>
        );
    }

    return (
        <div className="container project-details">
            <h1 className='contactInfoLabel'>{projectName}</h1>

            {/* Version selector */}
            {versionKeys.length > 1 && (
                <div className="version-selector">
                    <div className="button-container">
                        {versionKeys.map((version) => (
                            <button
                                key={version}
                                className={`ResumeButton ${selectedVersion === version ? 'active' : ''}`}
                                onClick={() => handleVersionChange(version)}
                            >
                                {version}
                            </button>
                        ))}
                    </div>
                </div>
            )}

            {/* Version changes */}
            {currentVersion.changes && (
                <div>
                    <h2 className='contactInfoLabel'>Changes in this version</h2>
                    <h4 className='projectDescription'>{currentVersion.changes}</h4>
                </div>
            )}

            {/* GitHub link */}
            {currentVersion.githubURL && (
                <button
                    onClick={() => handleLinkClick(currentVersion.githubURL)}
                    className="github-link"
                >
                    View on GitHub
                </button>
            )}

            {/* Project timeline */}
            <h2 className='contactInfoLabel'>Project Timeline</h2>
            <h4 className='contactInfoLabel'>{currentVersion.projectStart} to {currentVersion.projectEnd}</h4>

            {/* Description */}
            <h2 className='contactInfoLabel'>Description</h2>
            <p className='projectDescription'>{currentVersion.description}</p>

            {/* Images/Photos */}
            {currentVersion.pictureURLs && currentVersion.pictureURLs.length > 0 && (
                <div>
                    <h2 className='contactInfoLabel'>{VersionToImageCategoryString(currentVersion)}</h2>
                    <div className="slideshow-container-background">
                        <div className="slideshow-container">
                            <button className="prev" onClick={handlePrevImage}>&#10094;</button>
                            <PlaceImageDisplay version={currentVersion} imageIndex={currentImageIndex} name={projectName} />
                            <button className="next" onClick={handleNextImage}>&#10095;</button>
                        </div>
                    </div>
                    {currentVersion.pictureDescriptions && currentVersion.pictureDescriptions[currentImageIndex] && (
                        <h4 className="image-description">
                            {currentVersion.pictureDescriptions[currentImageIndex]}
                        </h4>
                    )}
                </div>
            )}

            {/* Primary Languages */}
            {currentVersion.primaryLanguages && currentVersion.primaryLanguages.length > 0 && (
                <div>
                    <h2 className='contactInfoLabel'>Primary Languages</h2>
                    <ul>
                        {currentVersion.primaryLanguages.map((language, index) => (
                            <li key={index}>{language}</li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Frameworks */}
            {currentVersion.frameworks && currentVersion.frameworks.length > 0 && (
                <div>
                    <h2 className='contactInfoLabel'>Frameworks</h2>
                    <ul>
                        {currentVersion.frameworks.map((framework, index) => (
                            <li key={index}>
                                {framework}
                                {currentVersion.frameworkHints && currentVersion.frameworkHints[index] && (
                                    <span className="hint"> - {currentVersion.frameworkHints[index]}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Tools */}
            {currentVersion.tools && currentVersion.tools.length > 0 && (
                <div>
                    <h2 className='contactInfoLabel'>Tools</h2>
                    <ul>
                        {currentVersion.tools.map((tool, index) => (
                            <li key={index}>
                                {tool}
                                {currentVersion.toolHints && currentVersion.toolHints[index] && (
                                    <span className="hint"> - {currentVersion.toolHints[index]}</span>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            {/* Components */}
            {currentVersion.components && currentVersion.components.length > 0 && (
                <div>
                    <h2 className='contactInfoLabel'>Components</h2>
                    <ul>
                        {currentVersion.components.slice(0, showAllComponents ? currentVersion.components.length : 5).map((component, index) => (
                            <li key={index}>{component}</li>
                        ))}
                    </ul>
                    {currentVersion.components.length > 5 && (
                        <div className="centeredButton">
                            <button className="github-link relatedProjectsLink centeredText centeredButtonMargin" onClick={toggleShowAllComponents}>
                                {showAllComponents ? 'Less' : 'More'}
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* Collaborators */}
            {project.collaborators && project.collaborators.length > 0 && (
                <div>
                    <h2 className='contactInfoLabel'>Collaborators</h2>
                    <ul>
                        {project.collaborators.map((collaborator, index) => (
                            <a
                                key={collaborator}
                                href={project.collaboratorLinks[index]}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="github-link relatedProjectsLink centeredText"
                            >
                                {collaborator}
                                {project.collaboratorHints && project.collaboratorHints[index] && (
                                    <span className="hintInner"> - {project.collaboratorHints[index]}</span>
                                )}
                            </a>
                        ))}
                    </ul>
                </div>
            )}

            {/* Related Projects */}
            {project.relatedProjects && project.relatedProjects.length > 0 && (
                <div>
                    <h2 className='contactInfoLabel'>Related Projects</h2>
                    <ul>
                        {project.relatedProjects.map((relatedProject, index) => (
                            <Link key={relatedProject} to={`/project/${relatedProject}`} className="github-link relatedProjectsLink centeredText">
                                {relatedProject}
                                {project.relatedProjectHints && project.relatedProjectHints[index] && (
                                    <span className="hintInner"> - {project.relatedProjectHints[index]}</span>
                                )}
                            </Link>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Project;