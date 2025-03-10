import React from 'react';
import './Home.css';

function Contact({ data }) {
    if (!data) {
        return <div>Loading...</div>;
    }

    const { email, linkedin } = data.contactInfo;

    return (
        <div className="container">
            <h1>Contact Information</h1>
            <div className="button-container">
                <a href={`mailto:${email}`} className="ContactButton">
                    <button className="ResumeButton">
                        <span className="material-icons">email</span> {email}
                    </button>
                </a>
                <a href={linkedin} target="_blank" rel="noopener noreferrer" className="ContactButton">
                    <button className="ResumeButton">
                        <span className="material-icons">groups</span> {linkedin}
                    </button>
                </a>
            </div>
        </div>
    );
}

export default Contact;