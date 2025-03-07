import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import CartWidget from '../CartWidget/CartWidget';
import './NavBar.css';

const NavBar = () => {
    const { user, logout } = useContext(AuthContext);

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        }
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                Tu Tienda
            </Link>
            
            <div className="navbar-links">
                <Link to="/category/remeras" className="nav-link">Remeras</Link>
                <Link to="/category/pantalones" className="nav-link">Pantalones</Link>
                <Link to="/category/buzos" className="nav-link">Buzos</Link>
            </div>

            <div className="auth-links">
                {user ? (
                    <>
                        <span className="user-email">{user.email}</span>
                        <button onClick={handleLogout} className="auth-button">
                            Cerrar Sesión
                        </button>
                        <CartWidget />
                    </>
                ) : (
                    <>
                        <Link to="/login" className="auth-button">Iniciar Sesión</Link>
                        <Link to="/register" className="auth-button">Registrarse</Link>
                    </>
                )}
            </div>
        </nav>
    );
};

export default NavBar;