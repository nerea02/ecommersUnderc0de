import './footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <p>Copyright © Pasantías 2024 Underc0de | La casa de los informáticos</p>
        <div className="social-icons">
          <a href="" target="_blank">
            <img src="./iconsFacebook.png" alt="ícono facebook" />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <img src='./iconsX.png' alt='ícono X' />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <img src='./iconsIn.png' alt='ícono Linkedin' />
          </a>
          <a href="" target="_blank" rel="noopener noreferrer">
            <img src='./iconsYoutube.png' alt='ícono Youtube' />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
