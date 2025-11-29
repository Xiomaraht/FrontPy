// components/VaciarCarrito.jsx
import React from 'react';

// Receives the function to empty the cart as a prop
export default function VaciarCarrito({ vaciar }) {
  return (
    <div className="vaciar" onClick={vaciar}>Vaciar Carrito</div>
  );
}