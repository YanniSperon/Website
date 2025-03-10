import './Home.css';
import './App.css';
import React from 'react';

function Home({ data, projects }) {
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

    return (
        <div className="container">
            <h1>Yanni Speron</h1>
            {data.description.map((desc, index) => (
                <p key={index}>{desc}</p>
            ))}

            <h2>Seeking</h2>
            <ul>
                {data.seeking.map((seek, index) => (
                    <li key={index}>{seek}</li>
                ))}
            </ul>

            <h2>Employment</h2>
            <ul>
                {data.employment.map((job, index) => (
                    <li key={index}>
                        <strong>{job.title}</strong> at <a href={job.link}>{job.company} in {job.location}</a>
                        <ul><li>{job.startCondition} - {job.endCondition}</li></ul>
                        <ul><li>{job.hours}</li></ul>
                        <ul>
                            {job.description.map((desc, i) => (
                                <li key={i}>{parseDescription(desc)}</li>
                            ))}
                        </ul>
                    </li>
                ))}
            </ul>

            <h2>Education</h2>
            <ul>
                {data.education.map((edu, index) => (
                    <li key={index}>
                        <strong>{edu.degree}</strong> at <a href={edu.link}>{edu.school} in {edu.location}</a>
                        <ul><li>{edu.startCondition}, {edu.endCondition}</li></ul>
                        <ul><li>GPA: {edu.gpa}</li></ul>
                        
                    </li>
                ))}
            </ul>

            <h2>Favorite Projects</h2>
            <ul>
                {data.favoriteProjects.map((project, index) => (
                    <li key={index}>{project}</li>
                ))}
            </ul>

            <h2>Ongoing Projects</h2>
            <ul>
                {data.ongoingProjects.map((project, index) => (
                    <li key={index}>
                        <strong>{project.name}</strong> - {project.status} ({project.privacy})
                    </li>
                ))}
            </ul>

            <a href={`${process.env.PUBLIC_URL}/YanniSperonResume.pdf`} download="YanniSperonResume" target='_blank' rel="noopener noreferrer">
                <button className="ResumeButton">Download Resume</button>
            </a>
        </div>
    );
}

export default Home;