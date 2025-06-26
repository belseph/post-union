import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import NavBar from './NavBar';
import { getUserAvatar } from '../Post/utils/avatarUtils';

const NavBarWrapper = () => {
    const navigate = useNavigate();
    const { isLoggedIn, logout, user } = useAuth();

    // 🖼️ NUEVO: Obtener la foto del usuario actual
    const userAvatar = user?.userId ? getUserAvatar(user.userId) : '/src/assets/userIcon.png';

    console.log('🔍 NavBarWrapper - Usuario:', user);
    console.log('🖼️ Avatar del usuario:', userAvatar);

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
            userIcon={userAvatar}
            links={navLinks}
        />
    );
};

export default NavBarWrapper;