import "@/components/styles/HeaderLg.css"
import Logo from "@/components/images/logo.png" 
import { Link, useNavigate, useLocation } from 'react-router-dom'; 
import { useState, useEffect } from 'react';
import { logout } from '@/api/authApi';

export default function HeaderLg() {
    const [isAuthMenuOpen, setIsAuthMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Renamed from logueado for consistency
    const [userRole, setUserRole] = useState(null);
    const [userInfo, setUserInfo] = useState(null); // New state variable for full user info
    const navigate = useNavigate();
    const location = useLocation(); // Added useLocation hook

    useEffect(() => {
        const token = localStorage.getItem('token');
        const userInfoRaw = localStorage.getItem('userInfo');

        if (token && userInfoRaw) {
            try {
                const user = JSON.parse(userInfoRaw);
                setUserInfo(user);
                setIsLoggedIn(true); // Corresponds to setLogueado(true)
                setUserRole(user.rol); // Keep existing userRole state
            } catch (e) {
                console.error("Error parsing userInfo", e);
                localStorage.clear();
                setIsLoggedIn(false); // Corresponds to setLogueado(false)
                setUserInfo(null);
                setUserRole(null);
            }
        } else {
            setIsLoggedIn(false); // Corresponds to setLogueado(false)
            setUserInfo(null);
            setUserRole(null);
        }
    }, [location.pathname]); // Dependency changed to location.pathname

    const handleLogout = async () => {
        try {
            await logout();
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
            // Even if API fails, proceed with local cleanup
        } finally {
            // Limpieza agresiva de localStorage por seguridad
            localStorage.clear();
            setIsLoggedIn(false); // Use existing state setter
            setUserRole(null); // Use existing state setter
            setIsAuthMenuOpen(false);
            navigate('/home');
            window.location.reload(); // Forzar recarga para limpiar estados globales
        }
    };

    const getProfileLink = () => {
        if (userRole === 'ROLE_ADMIN') return '/ingresoAdmin';
        if (userRole === 'ROLE_VETERINARIAN') return '/adminClient';
        return '/miperfil';
    };

    return (
    <header className="headerHl-Lg">
        <div className="logo-section">
            <div className="logo">
                <Link to={"/home"}>
                    <img src={Logo} alt="Logo PetCare" className="logo-img" /> 
                </Link>
            </div>
            <div className="site-title">
                PetCare
            </div>
        </div>
        
        <nav className="naOne">
            <ul>
                <li><Link to={"/home"}>Inicio</Link></li>
                <li><Link to={"/servicios"}>Servicios</Link></li>
                <li><Link to={"/products"}>Productos</Link></li>
                <li><Link to={"/veterinarias"}>Veterinarias</Link></li>
            </ul>
        </nav>
        <div className="liProf">
            <Link to={'/cart'} className="header-icon-link"><i className="bi bi-cart"></i></Link>
            <Link to={'/wishlist'} className="header-icon-link"><i className="bi bi-heart"></i></Link>
            
            <div className="auth-dropdown-container" style={{position: 'relative', display: 'inline-block'}}>
                <button 
                    className="header-login-link" 
                    onClick={() => setIsAuthMenuOpen(!isAuthMenuOpen)}
                    style={{background: 'none', border:'none', cursor:'pointer', display: 'flex', alignItems: 'center', color: 'var(--colorTextoOscura)'}}
                >
                    <i className="bi bi-person" style={{fontSize: '1.5rem', marginRight: '5px'}}></i>
                    <span className="login-text" style={{fontSize: '1rem', fontWeight: 'bold'}}>
                        {isLoggedIn ? 'Mi Cuenta' : 'Ingresar'}
                    </span>
                    <i className={`bi bi-chevron-${isAuthMenuOpen ? 'up' : 'down'}`} style={{marginLeft: '5px', fontSize: '0.8rem'}}></i>
                </button>
                
                {isAuthMenuOpen && (
                    <div className="auth-dropdown-menu" style={{
                        position: 'absolute', 
                        top: '120%', 
                        right: '0', 
                        background: 'var(--colorInterfazOscura)', 
                        boxShadow: '0 4px 6px rgba(0,0,0,0.1)', 
                        borderRadius: '8px',
                        overflow: 'hidden',
                        zIndex: 1000,
                        minWidth: '220px',
                        border: '1px solid var(--colorControlesBaseOscura)'
                    }}>
                        {isLoggedIn ? (
                            <>
                                <Link to={getProfileLink()} onClick={() => setIsAuthMenuOpen(false)} style={{display: 'block', padding: '12px 20px', color: 'var(--colorTextoOscura)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                                    <i className="bi bi-person-circle" style={{marginRight: '8px', color: 'var(--colorEnfasisOscura)'}}></i> Mi Perfil
                                </Link>
                                <button onClick={handleLogout} style={{width: '100%', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', display: 'block', padding: '12px 20px', color: 'var(--colorTextoOscura)', textDecoration: 'none'}}>
                                    <i className="bi bi-box-arrow-right" style={{marginRight: '8px', color: 'var(--colorEnfasisOscura)'}}></i> Cerrar Sesión
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to={'/auth/login'} onClick={() => setIsAuthMenuOpen(false)} style={{display: 'block', padding: '12px 20px', color: 'var(--colorTextoOscura)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                                    <i className="bi bi-box-arrow-in-right" style={{marginRight: '8px', color: 'var(--colorEnfasisOscura)'}}></i> Iniciar Sesión
                                </Link>
                                <Link to={'/auth/login?action=register&role=customer'} onClick={() => setIsAuthMenuOpen(false)} style={{display: 'block', padding: '12px 20px', color: 'var(--colorTextoOscura)', textDecoration: 'none', borderBottom: '1px solid rgba(255,255,255,0.1)'}}>
                                    <i className="bi bi-person-heart" style={{marginRight: '8px', color: 'var(--colorEnfasisOscura)'}}></i> Soy Dueño de Mascota
                                </Link>
                                <Link to={'/auth/login?action=register&role=vet'} onClick={() => setIsAuthMenuOpen(false)} style={{display: 'block', padding: '12px 20px', color: 'var(--colorTextoOscura)', textDecoration: 'none'}}>
                                    <i className="bi bi-shop" style={{marginRight: '8px', color: 'var(--colorEnfasisOscura)'}}></i> Soy Veterinario
                                </Link>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    </header>
    )
}