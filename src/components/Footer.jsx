import "./footer.css";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>
          Copyright © Pasantías 2024 Underc0de | La casa de los informáticos
        </p>
        <div className="social-icons">
          <Link to="" target="_blank">
            <img src="./iconsFacebook.png" alt="ícono facebook" />
          </Link>
          <Link to="" target="_blank" rel="noopener noreferrer">
            <img src="./iconsX.png" alt="ícono X" />
          </Link>
          <Link to="" target="_blank" rel="noopener noreferrer">
            <img src="./iconsIn.png" alt="ícono Linkedin" />
          </Link>
          <Link to="" target="_blank" rel="noopener noreferrer">
            <img src="./iconsYoutube.png" alt="ícono Youtube" />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
