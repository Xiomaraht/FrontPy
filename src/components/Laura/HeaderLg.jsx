import "../styles/HeaderLg.css"
import Logo from "../images/Logo.png" 
import { Link } from 'react-router-dom'; 


export default function HeaderLg() {
    return (
    <header className="headerHl-Lg">
        <div className="logo-section"> {/* ⬅️ Nuevo contenedor para el logo y el texto */}
            <div className="logo">
                <Link to={"/"}>
                    <img src={Logo} alt="Logo de la Empresa" className="logo-img" /> 
                </Link>
            </div>
            
            {/* ⬅️ Nuevo elemento de texto al lado del logo */}
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
            <Link to={'/cart'}><i className="ri-shopping-cart-line"></i></Link>
            <Link to={'/wishlist'}><i className="ri-heart-line"></i></Link>
            <Link to={'/miperfil'}><i className="ri-user-line"></i></Link>
            <div className="search-bar">
                <i className="ri-search-line"></i>
                <input type="text" placeholder="Buscar..."/>
            </div>
        </div>
    </header>
    )
}