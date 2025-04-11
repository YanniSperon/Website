import React from 'react';
import './About.css';

function Contact({ data, handleLinkClick }) {
    if (!data) {
        return <div>Loading...</div>;
    }

    const { email, linkedin, github, phone, phoneLink } = data.contactInfo;

    return (
        <div className="container">
            <h1 className="contactInfoLabel">Contact Information</h1>
            <div className="button-container">
                <button 
                    onClick={() => handleLinkClick(`mailto:${email}`)} 
                    className="ResumeButton"
                    style={{gap: '25px'}} 
                >
                    <span style={{marginLeft: '25px'}} className="material-icons">email</span>
                    <p style={{marginRight: '25px', overflow: 'hidden', textOverflow: "ellipsis"}} >{email}</p>
                </button>
                <button
                    onClick={() => handleLinkClick(linkedin)} 
                    className="ResumeButton"
                    style={{gap: '25px'}} 
                >
                    <span style={{marginLeft: '25px'}} className="material-icons">groups</span>
                    <p style={{marginRight: '25px', overflow: 'hidden', textOverflow: "ellipsis"}} >{linkedin}</p>
                </button>
                <button 
                    onClick={() => handleLinkClick(github)} 
                    className="ResumeButton"
                    style={{gap: '25px', inset: "50px"}} 
                >
                    <span style={{marginLeft: '25px'}} className="material-icons">groups</span>
                    <p style={{marginRight: '25px', overflow: 'hidden', textOverflow: "ellipsis"}} >{github}</p>
                </button>
                <button 
                    onClick={() => handleLinkClick(`tel:${phoneLink}`)} 
                    className="ResumeButton"
                    style={{gap: '25px'}} 
                >
                    <span style={{marginLeft: '25px'}} className="material-icons">call</span>
                    <p style={{marginRight: '25px', overflow: 'hidden', textOverflow: "ellipsis"}} >{phone}</p>
                </button>
            </div>
        </div>
    );
}

export default Contact;