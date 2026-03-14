import React from 'react';
import ResumenCompra from '@/components/dueño_mascota/ResumenCarritoTL';
import '@/components/styles/FormaEntregaCarritoTL.css'; 

export default function FechaEnvio({ productos, subtotal, goToNextStep, direccionSeleccionada}) {

    const direccionTexto = direccionSeleccionada || 'Dirección no especificada';

    return (
        <div className="delivery-container">
            <div className="delivery-main-content">
                
                <h1>Revisa cuándo llega tu compra</h1>
                
                <p className="delivery-subtitle">
                    <i className="fas fa-map-marker-alt" style={{marginRight: '8px'}}></i>
                    Envío a ({direccionTexto})
                </p>

                <div className="delivery-option-box">
                    <label className="delivery-radio-label">
                        <input type="radio" name="deliveryDate" value="envio1" defaultChecked />
                        <div className="info-text">
                            <p className="main-text">Envío 1</p>
                        </div>
                        <span className="gratis-tag">Gratis</span>
                    </label>
                </div>
                
                <button className="btn-continuar-delivery" onClick={goToNextStep}>
                    Continuar
                </button>
            </div>

            {/* Panel de Resumen Simplificado */}
            <div className="delivery-summary-panel">
                <ResumenCompra 
                    productos={productos} 
                    subtotal={subtotal} 
                    isDeliveryView={true} // Usamos la versión simplificada
                />
            </div>
        </div>
    );
}