import React from 'react';
import '../styles/AddVetLg.css'

import NewVetFormLg from './NewVetFormLg'; // Importa el componente del formulario

// Este componente ahora es el "host" del formulario
const AddVetLg = ({ onRegresar, onAddVet }) => {
  return (
    <div className="add-vet-section"> {/* Puedes usar esta clase para estilizar el contenedor general del formulario si es necesario */}
      <NewVetFormLg
        onRegresar={onRegresar}
        onAddVet={onAddVet}
      />
    </div>
  );
};

export default AddVetLg;


