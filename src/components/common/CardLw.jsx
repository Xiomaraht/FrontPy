import '@/components/styles/CardLw.css'
import React, { useState } from 'react';

const CardLw = ({
productName = 'Nombre del Producto',
price = '$20.000',
showPrice = true,
showCartIcon = true,
showHeartIcon = true,
onAddToCart = () => console.log('Añadir al carrito'),
onAddToFavorites = () => console.log('Añadir a favoritos'),
imageUrl = 'https://via.placeholder.com/150', // Imagen de placeholder por defecto
imageAlt = 'Imagen del producto',
}) => {
const [isCartHovered, setIsCartHovered] = useState(false);
const [isHeartHovered, setIsHeartHovered] = useState(false);

return (
<div className="product-card">
    <div className="product-image-container">
    <img src={imageUrl} alt={imageAlt} className="product-image" />
    </div>
    <div className="product-info">
    <h3 className="product-name">{productName}</h3>
    <div className="product-footer">
        {showPrice && <span className="product-price">{price}</span>}
        <div className="product-icons">
        {showCartIcon && (
            <span
            className="icon cart-icon"
            onMouseEnter={() => setIsCartHovered(true)}
            onMouseLeave={() => setIsCartHovered(false)}
            onClick={onAddToCart}
            style={{ cursor: 'pointer', color: isCartHovered ? '#007bff' : 'inherit' }}
            >
            <i className="bi bi-cart"></i> {/* Icono de carrito de Bootstrap Icons */}
            </span>
        )}
        {showHeartIcon && (
            <span
            className="icon heart-icon"
            onMouseEnter={() => setIsHeartHovered(true)}
            onMouseLeave={() => setIsHeartHovered(false)}
            onClick={onAddToFavorites}
            style={{ cursor: 'pointer', color: isHeartHovered ? '#dc3545' : 'inherit' }}
            >
            <i className="bi bi-heart"></i> {/* Icono de corazón de Bootstrap Icons */}
            </span>
        )}
        </div>
    </div>
    </div>
</div>
);
};

export default CardLw;