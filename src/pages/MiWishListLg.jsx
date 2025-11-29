import { useState } from 'react';
import '../components/styles/ProductsLw.css'
import HeaderLg from '../components/Laura/HeaderLg'
import BannerLw from '../components/Lina/BannerLw'
import CardLw from '../components/Lina/CardLw' // Asumo que este es el CardLw modificado
import FooterLg from '../components/Laura/FooterLg'
import data from '../components/Data/Products.json' // Tus datos
import { Link } from 'react-router-dom';


export default function ProductsLw() {
    // --- ESTADO PARA LA LISTA DE FAVORITOS ---
    // Almacenamos un Set con los IDs de los productos favoritos para búsquedas rápidas
    const [favoriteIds, setFavoriteIds] = useState(new Set());

    // --- FUNCIÓN PARA TOGGLE (ALTERNAR) FAVORITOS ---
    const handleToggleFavorite = (productId) => {
        setFavoriteIds(prevIds => {
            const newIds = new Set(prevIds);
            if (newIds.has(productId)) {
                // Si ya está en favoritos, lo quitamos
                newIds.delete(productId);
            } else {
                // Si no está, lo añadimos
                newIds.add(productId);
            }
            // En una app real, aquí también harías una llamada a la API
            return newIds;
        });
    };

    // --- CÓDIGO DE FILTROS Y PAGINACIÓN ELIMINADO ---
    // Usaremos todos los productos y no haremos paginación para simplificar
    const productsToDisplay = data; 
    
    return (
        <>
            <HeaderLg />
            <BannerLw titulo={'Productos'} />

            {/* Contenedor principal para la disposición de productos */}
            <div className="products-page-container">
                <main className="products-main-content">
                    {/* Quitamos los headers de resultados y el filtro de ordenar */}

                    <div className="product-grid">
                        {productsToDisplay.map((producto) => (
                            // Usamos el ID del producto como key para mejor rendimiento
                            <Link to={`/products/${producto.id}`} key={producto.id}>
                                <CardLw
                                    productName={producto.nombre}
                                    price={producto.precio}
                                    // isFavorite: Verifica si el ID está en el Set de favoritos
                                    isFavoriteInitial={favoriteIds.has(producto.id)}
                                    // onAddToFavorites: Pasa la función para alternar el favorito
                                    onAddToFavorites={() => handleToggleFavorite(producto.id)}
                                    // Agregamos el id al card por si lo necesitas internamente
                                    productId={producto.id} 
                                />
                            </Link>
                        ))}
                    </div>
                </main>
            </div>
            {/* Componente de paginación eliminado */}
            <FooterLg />
        </>
    )
}