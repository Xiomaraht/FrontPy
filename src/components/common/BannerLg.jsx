import "@/components/styles/BannerLg.css"
import { Link } from 'react-router-dom';

export default function BannerLg() {
  return (
    <section className="banner">
        <div className="banner-content">
            <h2>¡Bienvenido!</h2>
            <p>Descubre los mejores productos y servicios para el cuidado de tu mascota.</p>
            <Link to="/products" className="ver-mas" style={{ textDecoration: 'none', display: 'inline-block' }}>Ver más </Link>
        </div>
    </section>
  )
}
