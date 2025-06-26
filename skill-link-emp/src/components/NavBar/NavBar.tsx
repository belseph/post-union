import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { Lightbulb } from 'lucide-react';
import './NavBar.css';

interface NavLink {
    label: string;
    url: string;
    onClick?: () => void;
}

interface Props {
    userIcon: string;
    links: NavLink[];
}

/** Muestra el menú desplegable y define estado de los clics. */
const NavBar: React.FC<Props> = ({ userIcon, links }) => {
    const { isLoggedIn } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);
    const location = useLocation();

    const handleToggle = () => {
        setIsMenuOpen(prev => !prev);
    };

    // Cierra el menú si se hace clic fuera de él
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // Cierra el menú cuando cambia la ruta
    useEffect(() => {
        setIsMenuOpen(false);
    }, [location]);

    return (
        <nav className="navbar">
            <Link to={isLoggedIn ? "/home" : "/"}>
                <section className="navbar-wrapper">
                    <div className="navbar-logo__container">
                        <Lightbulb />
                    </div>
                    <div className='navbar-title__container'>
                        <h1 className="navbar-title">SkillLink</h1>
                        <h2 className="navbar-subtitle">Emprendedor</h2>
                    </div>
                </section>
            </Link>

            {isLoggedIn && (
                <div className="menu" ref={menuRef}>
                    <button className="dropdown-toggle" onClick={handleToggle}>
                        <img src={userIcon} alt="Imagen de usuario" className="dropdown-toggle-icon" />
                    </button>
                    {isMenuOpen && (
                        <ul className="dropdown-menu">
                            {links.map((link, index) => (
                                <li key={index}>
                                    {link.onClick ? (
                                        <a href={link.url} onClick={link.onClick}>
                                            {link.label}
                                        </a>
                                    ) : (
                                        <Link to={link.url}>
                                            {link.label}
                                        </Link>
                                    )}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}
        </nav>
    );
};

export default NavBar;
