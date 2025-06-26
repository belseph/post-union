import { Link } from 'react-router-dom';
import { Lightbulb } from "lucide-react"
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <div className="footer-brand">
                    <div className="footer-brand__container">
                        <Lightbulb className="footer-icon" />
                        <h3>SkillLink</h3>
                    </div>
                    <p>Conectando talento con oportunidades.</p>
                </div>
                <div className="footer-links">
                    <Link to="/">Inicio</Link>
                    <Link to="/about">Sobre Nosotros</Link>
                </div>
            </div>
            <div className="footer-bottom">
                <p>&copy; {new Date().getFullYear()} SkillLink. Casi todos los derechos reservados.</p>
            </div>
        </footer>
    );
};

export default Footer;
