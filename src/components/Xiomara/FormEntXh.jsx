import { useNavigate } from 'react-router-dom';
import '../Styles/FormEnt.css'

export default function FormEnt() {
 const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate('/direccion');
  };

  return (
    <div className="form-container">
      <h2>📦 Datos de envío</h2>
      <form className="formu-form" onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre completo</label>
        <input type="text" id="nombre" placeholder="Juan Pérez" />

        <label htmlFor="direccion">Dirección</label>
        <input type="text" id="direccion" placeholder="Calle 123 #45-67" />

        <label htmlFor="telefono">Teléfono</label>
        <input type="tel" id="telefono" placeholder="3001234567" />

        <label htmlFor="email">Correo electrónico</label>
        <input type="email" id="email" placeholder="correo@ejemplo.com" />

        <label htmlFor="mensaje">Mensaje para el domiciliario</label>
        <textarea id="mensaje" placeholder="Ej: Tocar el timbre o dejar en portería" />

        <button type="submit">Continuar con el pago</button>
      </form>
    </div>
  );
};