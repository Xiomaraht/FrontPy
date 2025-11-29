// components/ResumenCompra.jsx
import React from 'react';


export default function ResumenCompra({ productos, subtotal, goToNextStep, isDeliveryView }) {
    const totalProductos = productos.reduce((acc, p) => acc + p.cantidad, 0);

    // 🚨 LÓGICA CONDICIONAL: Vista de Entrega (Simplificada)
    if (isDeliveryView) {
        return (
            <div className="resumen-compra delivery-summary">
                <h2>Resumen de Compra</h2>
                <div className="summary-line">
                    <span>Productos ({totalProductos})</span> 
                    <span>${subtotal.toLocaleString("es-CO")}</span>
                </div>
                <div className="summary-line">
                    <span>Cupón Aplicado</span> 
                    <span>$0.00</span>
                </div>
                <hr className="divider" /> 
                <div className="summary-line final-total">
                    <span>Pagos</span> 
                    <span>${subtotal.toLocaleString("es-CO")}</span>
                </div>
                {/* NOTA: En esta vista no hay botón de Continuar ni input de cupón */}
            </div>
        );
    }


    // 🚨 LÓGICA CONDICIONAL: Vista de Carrito (Completa)
    return (
        <div className="resumen-compra">
            <h2>Resumen de Compra</h2>
            {/* ... (Todo el contenido original del carrito: Descuento, Envío, Input, Botón) ... */}
            <p><span>Productos:</span> {totalProductos}</p>
            <p><span>Subtotal:</span> ${subtotal.toLocaleString("es-CO")}</p>
            <p><span>Descuento:</span> $0.00</p>
            <p><span>Envío:</span> <span className="gratis">Gratis</span></p>
            <p><span>Cupón Aplicado:</span> $0.00</p>
            <div className="cont-cupon">
              <input type="text" placeholder="Código de Cupón" />
            </div>
            <h3>Total: ${subtotal.toLocaleString("es-CO")}</h3>
            {/* El botón debe usar la función de transición */}
            <button className="btn-continuar" onClick={goToNextStep}>Continuar Compra</button>
        </div>
    );
}