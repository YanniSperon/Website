import './App.css';

function Home() {
    return (
        <div>
            <p>Hi, my name is Yanni Speron. I am a </p>
            <a href={`${process.env.PUBLIC_URL}/YanniSperonResume.pdf`} download="YanniSperonResume" target='_blank' rel="noopener noreferrer">
                <button className="ResumeButton">Download Resume</button>
            </a>
        </div>
    );
}

export default Home;