import { useState } from "react";
import "@/components/styles/FooterLg.css";
import Logo from "@/components/images/Logo.png"; // ✅ Importación del logo
import { Link } from "react-router-dom";

export default function FooterLg() {
  const [isDarkTheme, setIsDarkTheme] = useState(true);

  // Función para cambiar los colores del tema
  const cambiarTheme = () => {
    const root = document.documentElement;

    if (isDarkTheme) {
      // Cambiar a tema claro
      root.style.setProperty("--colorInterfazOscura", "var(--colorInterfazClara)");
      root.style.setProperty("--colorContenedorOscura", "var(--colorContenedorClara)");
      root.style.setProperty("--colorTituloOscura", "var(--colorTituloClara)");
      root.style.setProperty("--colorEnfasisOscura", "var(--colorEnfasisClara)");
    } else {
      // Cambiar a tema oscuro (valores por defecto)
      root.style.setProperty("--colorInterfazOscura", "#0A1931");
      root.style.setProperty("--colorContenedorOscura", "#1A3D63");
      root.style.setProperty("--colorTituloOscura", "#F6FAFD");
      root.style.setProperty("--colorEnfasisOscura", "#13f299");
    }
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <footer className="footer">
      <div className="footer-contenedor">

        {/* ✅ Sección del logo */}
        <div className="footer-logo">
          <img src={Logo} alt="Logo PetCare" className="footer-logo-img" />
          <p>Cuidamos a tu mascota con amor y dedicación.</p>
        </div>

        <div className="footer-enlaces">
          <h3>Enlaces Rápidos</h3>
          <ul>
            <li><Link to="/home">Inicio</Link></li>
            <li><Link to="/servicios">Servicios</Link></li>
            <li><Link to="/home">Nosotros</Link></li>
            <li>
              <button onClick={cambiarTheme}>Cambiar tema</button>
            </li>
          </ul>
        </div>

        <div className="footer-contacto">
          <h3>Contacto</h3>
          <p><i className="bi bi-telephone"></i> +57 123 456 7890</p>
          <p><i className="bi bi-envelope"></i> contacto@petcare.com</p>
          <p><i className="bi bi-geo-alt"></i> Bogotá, Colombia</p>
        </div>

      </div>
    </footer>
  );
}
