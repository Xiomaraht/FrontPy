// components/ListaProductos.jsx
import React from 'react';

// Receives the product list and the control functions as props
export default function ListaProductos({ productos, aumentar, disminuir }) {
  return (
    <div className="carro">
      <div className="info-productoCar">
        <h3>Producto</h3>
        <h3>Cantidad</h3>
        <h3>Precio</h3>
      </div>

      {productos.map((p) => (
        <div className="productoCar" key={p.id}>
          <div className="detalles">
            <p><b>{p.nombre}</b></p>
            <p>{p.peso}</p>
          </div>
          <div className="cantidad">
            <button className="btn-eliminar" onClick={() => disminuir(p.id)}>-</button>
            <input type="number" value={p.cantidad} readOnly />
            <button className="btn-mas" onClick={() => aumentar(p.id)}>+</button>
          </div>
          {/* Format the total price for the item */}
          <div className="precioCar">${(p.precioUnit * p.cantidad).toLocaleString("es-CO")}</div>
        </div>
      ))}

      {productos.length === 0 && (
          <p className="carrito-vacio-msg">Tu carrito está vacío. ¡Añade algunos productos!</p>
      )}
    </div>
  );
}