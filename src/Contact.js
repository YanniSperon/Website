import React from 'react';
import './About.css';

function Contact({ data, handleLinkClick }) {
    if (!data) {
        return <div>Loading...</div>;
    }

    const { email, linkedin, phone } = data.contactInfo;

    return (
        <div className="container">
            <h1 className="contactInfoLabel">Contact Information</h1>
            <div className="button-container">
                <button 
                    onClick={() => handleLinkClick(`mailto:${email}`)} 
                    className="ResumeButton"
                >
                    <span className="material-icons">email</span> {email}
                </button>
                <button 
                    onClick={() => handleLinkClick(linkedin)} 
                    className="ResumeButton"
                >
                    <span className="material-icons">groups</span> {linkedin}
                </button>
                <button 
                    onClick={() => handleLinkClick(`tel:${phone}`)} 
                    className="ResumeButton"
                >
                    <span className="material-icons">call</span> {phone}
                </button>
            </div>
        </div>
    );
}

export default Contact;