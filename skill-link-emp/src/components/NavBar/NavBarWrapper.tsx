import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavBar from './NavBar';
import userImg from '../../assets/userIcon.png';

const NavBarWrapper = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout } = useAuth();

    const navLinks = isLoggedIn 
    ? [
        {
            label: "Inicio",
            url: "/home"
        },
        {
            label: "Dashboard",
            url: "/dashboard"
        },
        {
            label: "Cerrar Sesión",
            url: "/",
            onClick: (e?: React.MouseEvent) => {
                e?.preventDefault();
                logout();
                navigate('/');
            },
        },
    ]: [];

    return (
        <NavBar
            userIcon={userImg}
            links={navLinks}

        />
    );
};

export default NavBarWrapper;
