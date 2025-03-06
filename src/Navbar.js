import { Link, useLocation } from "react-router-dom";
import './Navbar.css';

const LinksToNavMap = new Map([
  ["/", "Home"],
  ["/work", "Work"],
  ["/contact", "Contact"]
]);

function GenerateLinks() {
  const location = useLocation(); // Get current route

  return Array.from(LinksToNavMap).map(([path, label]) => {
    return (<Link to={path} className="navLink" key={path}>
      <button className={`linkButton ${location.pathname === path ? "selectedButton" : ""}`}>
        {label}
      </button>
    </Link>);
  });
}

function Navbar() {
  return (
    <header className="App-header">
      <nav>
        <GenerateLinks/>
      </nav>
    </header>
  );
};

export default Navbar;