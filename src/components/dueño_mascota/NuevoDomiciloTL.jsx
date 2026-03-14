import React, { useState } from 'react';
import '@/components/styles/NuevoDomicilioTL.css';

export default function NuevoDomicilio({setDireccionPrincipal, goToNextStep }) {

    const [inputDireccion, setInputDireccion] = useState('Ej: Calle 76D #105D-99');

    const handleContinuar = () => {
        setDireccionPrincipal(inputDireccion);
        goToNextStep();
    };

    return (

        <div className="domicilio-contenedor">
                <h2>Nuevo Domicilio</h2>
                <div className="location-header">
                    <span className="location-dot"></span>
                    <a href="#" className="location-link">Completar con mi ubicación</a>
                </div>
                <div className="form-group">
                    <label htmlFor="direccion">Dirección o lugar de entrega</label>
                    <input 
                        type="text" 
                        id="direccion" 
                        value={inputDireccion} // Controlamos el input
                        onChange={(e) => setInputDireccion(e.target.value)} // Actualizamos el estado local
                        placeholder="Ej: Calle 76D #105D-99" 
                    />
                </div>

                {/* 1. Dirección y Lugar de Entrega */}
                <div className="form-group">
                    <label htmlFor="direccion">Dirección o lugar de entrega</label>
                    <input type="text" id="direccion" placeholder="Ej: Calle 76D #105D-99" />
                </div>
                
                <div className="form-row">
                    <div className="form-group half">
                        <label htmlFor="departamento">Departamento</label>
                        <select id="departamento" defaultValue="placeholder">
                            <option value="placeholder" disabled>Placeholder text</option>
                            <option value="action1">Action</option>
                        </select>
                    </div>
                    <div className="form-group half">
                        <label htmlFor="municipio">Municipio / Localidad</label>
                        <select id="municipio" defaultValue="placeholder">
                            <option value="placeholder" disabled>Placeholder text</option>
                            <option value="action1">Action</option>
                        </select>
                    </div>
                </div>

                <div className="form-row"> 
                    <div className="form-group half">
                        <label htmlFor="barrio">Barrio</label>
                        <select id="barrio" defaultValue="placeholder">
                            <option value="placeholder" disabled>Placeholder text</option>
                            <option value="action1">Action</option>
                        </select>
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="apartamento">Apartamento / Casa</label>
                    <input type="text" id="apartamento" />
                </div>

                {/* 2. Indicaciones */}
                <div className="form-group">
                    <label htmlFor="indicaciones">Indicaciones para la entrega</label>
                    <textarea id="indicaciones"></textarea>
                </div>
                
                {/* 3. Tipo de Domicilio */}
                <div className="form-group type-group">
                    <label>Tipo de domicilio</label>
                    <div className="radio-options">
                        <label className="radio-option">
                            <input type="radio" name="tipoDomicilio" value="residencial" defaultChecked /> Residencial
                        </label>
                        <label className="radio-option">
                            <input type="radio" name="tipoDomicilio" value="laboral" /> Laboral
                        </label>
                    </div>
                </div>

                {/* 4. Datos de Contacto */}
                <div className="contact-info">
                    <label>Datos de Contacto</label>
                    <p className="contact-text">Tu información de contacto es importante para nosotros. Solo la usaremos para avisarte rápidamente si surge algún imprevisto con la entrega.</p>
                </div>

                <div className="form-group">
                    <label htmlFor="nombre">Nombre y Apellido</label>
                    <input type="text" id="nombre" />
                </div>

                <div className="form-group">
                    <label htmlFor="telefono">Teléfono</label>
                    <input type="text" id="telefono" />
                </div>
                
                <button className="btn-continuar-final" onClick={handleContinuar}> 
                    Continuar
                </button>
            </div>
    );
}