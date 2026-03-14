import React from 'react';
import ResumenCompra from '@/components/dueño_mascota/ResumenCarritoTL';
import '@/components/styles/FormaEntregaCarritoTL.css'

export default function FormaEntrega({ productos, subtotal, goToNextStep }) {
    

    const totalProductos = productos.reduce((acc, p) => acc + p.cantidad, 0);

    return (
        <div className="delivery-container">
            <div className="delivery-main-content">
                <h1>Elige la forma de entrega</h1>

                {/* Contenedor de la opción de entrega */}
                <div className="delivery-option-box">
                    <label className="delivery-radio-label">
                        <input type="radio" name="deliveryMethod" value="domicilio" defaultChecked />
                        <div className="info-text">
                            <p className="main-text">Enviar a domicilio</p>
                            <p className="sub-text">Engativá, Bogotá D.C.</p>
                        </div>
                        <span className="gratis-tag">Gratis</span>
                    </label>
                </div>

                <button className="btn-continuar-delivery" onClick={goToNextStep}>
                    Continuar
                </button>
            </div>

            <div className="delivery-summary-panel">
                <ResumenCompra 
                    productos={productos} 
                    subtotal={subtotal} 
                    isDeliveryView={true} 
                />
            </div>
        </div>
    );
}