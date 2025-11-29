// src/components/Laura/AddBtnLg.jsx
import React from 'react';
import '../styles/ButtonLg.css'; // Asegúrate de tener un CSS para este botón si es específico

// Asumimos que quieres el mismo texto y el mismo ícono que tenías
export default function AddBtnLg({ onClick, icon='', textbutton }) {
    return (
        <div className="add-btn-containerAg-Lg"> {/* Mantén este contenedor para el espaciado */}
            <button className="add-btnAg-Lg" onClick={onClick}>
                <span className="material-symbols-outlined">{icon}</span>{textbutton}
            </button>
        </div>
    );
}