import React from 'react';
import ResumenCompra from './ResumenCarritoTL';
import '../styles/FormaEntregaCarritoTL.css';
// Nota: Necesitarás iconos (FontAwesome, etc.) para las opciones

export default function MetodoPago({ productos, subtotal, goToNextStep }) {
    
    // Lista de opciones de pago (simulado)
    const opcionesPago = [
        { id: 1, label: 'Nueva tarjeta de débito', icon: 'fa-credit-card' },
        { id: 2, label: 'Nueva tarjeta de crédito', icon: 'fa-credit-card' },
        { id: 3, label: 'Transferencia con PSE', icon: 'fa-university' },
        { id: 4, label: 'Efecty', icon: 'fa-money-bill-alt' },
    ];

    return (
        <div className="delivery-container">
            <div className="delivery-main-content">
                
                <h1>Elige cómo pagar</h1>
                
                {opcionesPago.map(opcion => (
                    <div className="payment-option-box" key={opcion.id}>
                        <label className="delivery-radio-label">
                            <input type="radio" name="paymentMethod" value={opcion.id} />
                            
                            <div className="info-text">
                                {/* Simulación de ícono */}
                                <i className={`fas ${opcion.icon}`} style={{marginRight: '15px'}}></i> 
                                <p className="main-text">{opcion.label}</p>
                            </div>
                            
                            <div className="empty-tag"></div> {/* Espaciador */}
                        </label>
                    </div>
                ))}

                <button className="btn-continuar-delivery" onClick={goToNextStep}>
                    Continuar
                </button>
            </div>

            {/* Panel de Resumen Simplificado */}
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