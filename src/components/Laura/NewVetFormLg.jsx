import React, { useState } from 'react';
import InputGroupLg from './InputGroupLg';
import '../styles/NewVetFormLg.css'; // Imports its own CSS

const NewVetFormLg = ({ onAddVet }) => { // onRegresar is NO longer received here
  const [formData, setFormData] = useState({
    name: '',
    nit: '',
    barrio: '',
    phone: '',
    address: '',
    email: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Basic validations (you can expand this)
    if (!formData.name || !formData.nit || !formData.phone) {
      alert('Por favor, completa los campos obligatorios (Nombre, NIT, Teléfono).');
      return;
    }
    onAddVet(formData); // Call the parent function to add the veterinarian
    setFormData({ // Reset the form after submission
      name: '', nit: '', barrio: '', phone: '', address: '', email: '',
    });
  };

  return (
    <div className="new-vet-form-container">
      <h2>Nueva Veterinaria</h2>
      <form onSubmit={handleSubmit} className="new-vet-form">
        <InputGroupLg
          label="Nombre Veterinaria"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Value"
        />
        <InputGroupLg
          label="NIT"
          name="nit"
          value={formData.nit}
          onChange={handleChange}
          placeholder="Value"
        />
        <InputGroupLg
          label="Barrio"
          name="barrio"
          value={formData.barrio}
          onChange={handleChange}
          placeholder="Value"
        />
        <InputGroupLg
          label="Numero de Telefono"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Value"
          type="tel"
        />
        <InputGroupLg
          label="Dirección"
          name="address"
          value={formData.address}
          onChange={handleChange}
          placeholder="Value"
        />
        <InputGroupLg
          label="Correo"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Value"
          type="email"
        />

        <div className="form-buttons">
          <button type="submit" className="registrar-btn">Registrar</button>
        </div>
      </form>
      {/* The "Back" button has been moved to the parent AdmiClinicoVetLg component */}
    </div>
  );
};

export default NewVetFormLg;