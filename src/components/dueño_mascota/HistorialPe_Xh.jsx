import React from 'react';
import '@/components/styles/HistorialPe_Xh.css';

export default function HistorialPe_Xh() {
  return (
    <div className="Historial">
      <h2>Historial de Pedidos</h2>
      {[1, 2, 3].map((pedido, idx) => (
        <div className="pedido-card" key={idx}>
          <div className="pedido-header">
            <span>Pedido</span>
            <span className="estado entregado">Entregado</span>
          </div>
          <div className="pedido-productos">
            <div className="producto">
              <div className="producto-img" />
              <div>
                <p>Nombre Producto</p>
                <span>$20.000</span>
              </div>
            </div>
            <div className="producto">
              <div className="producto-img" />
              <div>
                <p>Nombre Producto</p>
                <span>$20.000</span>
              </div>
            </div>
          </div>
          <div className="pedido-footer">
            <p>Entregado el 5 de marzo, 2025</p>
            <p>Dirección: Cl. 72 #14-15 apto 301</p>
            <div className="total">Total: $40.000</div>
            <button>Comprar de nuevo</button>
          </div>
        </div>
      ))}
    </div>
  );
}