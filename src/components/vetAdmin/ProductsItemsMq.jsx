import React, { useState, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import HeaderLg from '@/components/common/HeaderLg';
import BannerLw from '@/components/common/BannerLw';
import FooterLg from '@/components/common/FooterLg';
import { obtenerProductoPorId } from '@/api/productsApi';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

import '@/components/styles/ProductsItemsMq.css';

const CartIcon = <i className="bi bi-cart"></i>;
export default function ProductsItemsMq() {
    const { productid } = useParams();
    const productId = parseInt(productid);

    const [product, setProduct] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const { addToCart } = useCart();
    const { toggleWishlist, isInWishlist } = useWishlist();

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        obtenerProductoPorId(productId)
            .then((data) => {
                if (data) {
                    setProduct(data);
                } else {
                    setError('Producto no encontrado');
                }
                setIsLoading(false);
            })
            .catch((err) => {
                setError('Error al cargar el producto');
                setIsLoading(false);
            });
    }, [productId]);

    const handleToggleFavorite = () => {
        if (product) toggleWishlist(product);
    };

    const handleAddToCart = () => {
        if (product) {
            addToCart(product);
            alert("¡Añadido al carrito!");
        }
    };

    const formatPrice = (price) => {
        if (price == null) return 'N/A';
        const numericPrice = typeof price === 'string' ? parseFloat(price) : price;
        return numericPrice.toLocaleString('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        });
    };

    const imageSrc = useMemo(() => {
        if (product && product.picture && typeof product.picture === 'string') {
            // Si product.picture es una cadena, asumimos que es la URL de la nube
            return product.picture; 
        }
        // Placeholder si no hay imagen (o si el campo es nulo/vacío)
        return 'https://placehold.co/400x400/CCCCCC/000000?text=No+Image';
    }, [product]);

    // Renderizado condicional de carga/error y producto (se conserva igual)
    if (isLoading) {
        return (
            <>
                <HeaderLg />
                <BannerLw titulo={'Cargando Detalles...'} />
                <main className="product-detail-container">
                    <p style={{textAlign: 'center', padding: '50px'}}>Cargando información del producto...</p>
                </main>
                <FooterLg />
            </>
        );
    }

    if (error || !product) {
        return (
            <>
                <HeaderLg />
                <BannerLw titulo={'Producto No Disponible'} />
                <main className="product-detail-container">
                    <p style={{textAlign: 'center', padding: '50px', color: 'red'}}>
                        {error ? `ERROR: ${error}` : 'El producto solicitado no existe o no se pudo cargar.'}
                    </p>
                </main>
                <FooterLg />
            </>
        );
    }

    return (
        <>
            <HeaderLg />
            <BannerLw titulo={`Detalle de ${product.name}`} />

            <main className="product-detail-container">
                <div className="product-layout">
                    <div className="product-image-section">
                        <img
                            src={imageSrc} // Usa la URL generada en useMemo
                            alt={product.name}
                            className="main-product-image"
                        />
                    </div>
                    <div className="product-info-section">
                        <h1 className="product-name-detail">{product.name}</h1>
                        <p className="product-brand-detail">Marca: {product.brand || 'No especificada'}</p>
                        <div className="product-price-detail">
                            {formatPrice(product.price)}
                        </div>
                        <hr className='hrP-Lw'/>
                        <div className="product-description-full">
                            <h2 className="description-title">Descripción del Producto</h2>
                            <p>{product.description || 'Descripción no disponible.'}</p>
                            <div className="extra-details-container">
                                <div className="extra-details-pill">
                                    Categorías: <span>
                                        {Array.isArray(product.categories) && product.categories.length > 0
                                            ? product.categories.map(c => c.name).join(', ')
                                            : 'N/A'
                                        }
                                    </span>
                                </div>
                                <div className="extra-details-pill">
                                    Stock: <span>{product.stock ?? 0} unidades</span>
                                </div>
                                <div className="extra-details-pill">
                                    Disponibilidad: <span>{(product.stock ?? 0) > 0 ? 'En stock' : 'Agotado'}</span>
                                </div>
                            </div>
                        </div>
                        <hr className='hrP-Lw'/>
                        <div className="product-actions">
                            <button className="add-to-cart-btn-detail" onClick={handleAddToCart} disabled={(product.stock ?? 0) <= 0}>
                                {CartIcon} {(product.stock ?? 0) > 0 ? 'AÑADIR A LA CESTA' : 'SIN STOCK'}
                            </button>
                            <button className="favorite-btn-detail" onClick={handleToggleFavorite} title="Añadir/Quitar de Wishlist">
                                {product && isInWishlist(product.id) ? <i className="bi bi-heart-fill"></i> : <i className="bi bi-heart"></i>}
                            </button>
                        </div>
                    </div>
                </div>
            </main>
            <FooterLg />
        </>
    );
}