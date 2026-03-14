import { useState } from "react";
import "@/components/styles/FormPaymentMethod_Xh.css";

export default function FormPaymentMethod_Xh({ onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    numero: "",
    marca: "Visa",
    mesVencimiento: "01",
    anioVencimiento: "2024",
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: Date.now().toString(),
      ...formData,
      predeterminado: false,
    });
  };

  return (
    <div className="formulario">
      <form onSubmit={handleSubmit}>
        <div className="grupo-input">
          <label>Nombre en la tarjeta</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grupo-input">
          <label>Apellido</label>
          <input
            type="text"
            name="apellido"
            value={formData.apellido}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grupo-input">
          <label>Número de Tarjeta</label>
          <input
            type="text"
            name="numero"
            maxLength="16"
            pattern="\d{16}"
            title="Deben ser 16 dígitos"
            value={formData.numero}
            onChange={handleChange}
            required
          />
        </div>
        <div className="grupo-fila">
          <div className="grupo-input">
            <label>Marca</label>
            <select
              name="marca"
              value={formData.marca}
              onChange={handleChange}
            >
              <option value="Visa">Visa</option>
              <option value="Master">Mastercard</option>
              <option value="Amex">American Express</option>
            </select>
          </div>
          <div className="grupo-input">
            <label>Vencimiento (Mes/Año)</label>
            <div className="d-flex">
              <select
                name="mesVencimiento"
                value={formData.mesVencimiento}
                onChange={handleChange}
              >
                {[...Array(12)].map((_, i) => (
                  <option key={i + 1} value={String(i + 1).padStart(2, "0")}>
                    {String(i + 1).padStart(2, "0")}
                  </option>
                ))}
              </select>
              <span className="separador">/</span>
              <select
                name="anioVencimiento"
                value={formData.anioVencimiento}
                onChange={handleChange}
              >
                {Array.from({ length: 15 }, (_, i) => new Date().getFullYear() + i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grupo-input">
            <label>CVV</label>
            <input
              type="text"
              name="cvv"
              maxLength="4"
              pattern="\d{3,4}"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn-guardar">
          Guardar Tarjeta
        </button>
      </form>
    </div>
  );
}
