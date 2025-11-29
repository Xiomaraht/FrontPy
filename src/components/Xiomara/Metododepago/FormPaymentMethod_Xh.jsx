import React, { useState } from "react";
import '../../Styles/FormPaymentMethod_Xh.css'

export default function FormPaymentMethod({ onSave }) {
  const [formData, setFormData] = useState({
    nombre: "",
    apellido: "",
    numero: "",
    marca: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) {
      onSave(formData);
    }
    setFormData({ nombre: "", apellido: "", numero: "", marca: "" }); // limpiar
  };

  return (
    <form className="form-payment" onSubmit={handleSubmit}>
      <h2>Agregar Método de Pago</h2>

      <label>Nombre</label>
      <input
        type="text"
        name="nombre"
        value={formData.nombre}
        onChange={handleChange}
        required
      />

      <label>Apellido</label>
      <input
        type="text"
        name="apellido"
        value={formData.apellido}
        onChange={handleChange}
        required
      />

      <label>Número de tarjeta</label>
      <input
        type="text"
        name="numero"
        value={formData.numero}
        onChange={handleChange}
        maxLength={16}
        required
      />

      <label>Marca</label>
      <input
        type="text"
        name="marca"
        value={formData.marca}
        onChange={handleChange}
        placeholder=""
        required
      />

      <button type="submit">Guardar</button>
    </form>
  );
}