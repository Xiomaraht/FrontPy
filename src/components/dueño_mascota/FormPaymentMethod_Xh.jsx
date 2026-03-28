import { useState } from "react";
import "@/components/styles/FormPaymentMethod_Xh.css";

export default function FormPaymentMethod_Xh({ onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    numero: "",
    marca: "Visa",
    mesVencimiento: "01",
    anioVencimiento: new Date().getFullYear().toString(),
    cvv: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      predeterminado: false,
    });
  };

  return (
    <div className="formulario-xh">
      <form onSubmit={handleSubmit}>
        <div className="grupo-fila-xh">
          <div className="grupo-input-xh">
            <label>Nombre</label>
            <input
              type="text"
              name="nombre"
              placeholder="Ej. Juan"
              value={formData.nombre}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grupo-input-xh">
            <label>Apellido</label>
            <input
              type="text"
              name="apellido"
              placeholder="Ej. Perez"
              value={formData.apellido}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="grupo-input-xh">
          <label>Número de Tarjeta</label>
          <input
            type="text"
            name="numero"
            placeholder="0000 0000 0000 0000"
            maxLength="16"
            pattern="\d{16}"
            title="Deben ser 16 dígitos"
            value={formData.numero}
            onChange={handleChange}
            required
          />
        </div>

        <div className="grupo-fila-xh">
          <div className="grupo-input-xh">
            <label>Marca</label>
            <select
              name="marca"
              value={formData.marca}
              onChange={handleChange}
            >
              <option value="Visa">Visa</option>
              <option value="Mastercard">Mastercard</option>
              <option value="American Express">Amex</option>
            </select>
          </div>
          <div className="grupo-input-xh">
            <label>Vencimiento</label>
            <div className="d-flex-xh">
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
              <span className="separador-xh">/</span>
              <select
                name="anioVencimiento"
                value={formData.anioVencimiento}
                onChange={handleChange}
              >
                {Array.from({ length: 10 }, (_, i) => new Date().getFullYear() + i).map((y) => (
                  <option key={y} value={y}>
                    {y}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="grupo-input-xh">
            <label>CVV</label>
            <input
              type="password"
              name="cvv"
              placeholder="123"
              maxLength="4"
              pattern="\d{3,4}"
              value={formData.cvv}
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <button type="submit" className="btn-guardar-xh">
          Confirmar y Guardar
        </button>
      </form>
    </div>
  );
}
