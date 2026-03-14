import React from 'react';
import '@/components/styles/PedidoListo.css'; // Crear este archivo CSS

export default function PedidoListo({ productos, subtotal }) {
    
    const pedido = {
        orden: '#FKGZ9876TY',
        metodoPago: 'Tarjeta de Crédito (VISA)',
        transaccion: 'CD789PLMNB',
        entregaEstimada: '10 - Junio - 2025',
        envio: 0.00,
        iva: 0.19,
        cupon: 0.00,
        total: subtotal
    };

    return (
        <div className="pedido-listo-body">
            <div className="pedido-listo-container">
                
                <div className="header-confirmacion">
                    <i className="fas fa-check-circle check-icon"></i> 
                    <h1>¡Tu pedido está listo!</h1>
                </div>

                <div className="resumen-superior-box">
                    <div className="resumen-superior-item">
                        <span>Número de Orden</span>
                        <b>{pedido.orden}</b>
                    </div>
                    <div className="resumen-superior-item">
                        <span>Método de Pago</span>
                        <b>{pedido.metodoPago}</b>
                    </div>
                    <div className="resumen-superior-item">
                        <span>Número de Transacción</span>
                        <b>{pedido.transaccion}</b>
                    </div>
                    <div className="resumen-superior-item">
                        <span>Fecha estimada de entrega</span>
                        <b>{pedido.entregaEstimada}</b>
                    </div>
                    <button className="btn-descargar">Descargar factura</button>
                </div>
                
                <h2>Detalles del Pedido</h2>

                {productos.map(p => (
                    <div className="detalle-producto" key={p.id}>
                        <div className="imagen-placeholder"></div> 
                        <div className="info">
                            <b>{p.nombre}</b>
                            <p>{p.peso}</p>
                        </div>
                        <div className="precio">${p.precioUnit.toLocaleString("es-CO")}</div>
                    </div>
                ))}
                
                <div className="resumen-costos">
                    <p><span>Envío</span> <span>${pedido.envio.toFixed(2)}</span></p>
                    <p><span>IVA</span> <span>${pedido.iva.toFixed(2)}</span></p>
                    <p><span>Cupón Aplicado</span> <span>${pedido.cupon.toFixed(2)}</span></p>
                    <p className="total-final"><span>Total</span> <span>${pedido.total.toLocaleString("es-CO")}</span></p>
                </div>

            </div>
        </div>
    );
}