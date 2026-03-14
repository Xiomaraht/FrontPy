import { useWishlist } from '@/context/WishlistContext';
import { useCart } from '@/context/CartContext';
import '@/components/styles/ProductsLw.css'
import HeaderLg from '@/components/common/HeaderLg'
import BannerLw from '@/components/common/BannerLw'
import CardLw from '@/components/common/CardLw' 
import FooterLg from '@/components/common/FooterLg'
import { Link } from 'react-router-dom';

export default function MiWishListLg() {
    const { wishlist, toggleWishlist } = useWishlist();
    const { addToCart } = useCart();

    return (
        <>
            <HeaderLg />
            <BannerLw titulo={'Mi Lista de Deseos'} />

            <div className="products-page-container">
                <main className="products-main-content">
                    {wishlist.length === 0 ? (
                        <div style={{textAlign: 'center', padding: '100px'}}>
                            <h2>Tu lista de deseos está vacía</h2>
                            <p>¡Explora nuestros productos y añade tus favoritos!</p>
                            <Link to="/products" className="btn btn-primary mt-3" style={{backgroundColor: '#ff8c00', border: 'none'}}>Ver Productos</Link>
                        </div>
                    ) : (
                        <div className="product-grid">
                            {wishlist.map((producto) => (
                                <Link to={`/products/${producto.id}`} key={producto.id} style={{textDecoration: 'none'}}>
                                    <CardLw
                                        productName={producto.nombre}
                                        price={`$${producto.precio}`}
                                        imageUrl={producto.imageUrl}
                                        isFavoriteInitial={true}
                                        onAddToFavorites={(e) => {
                                            e.preventDefault();
                                            toggleWishlist(producto);
                                        }}
                                        onAddToCart={(e) => {
                                            e.preventDefault();
                                            addToCart(producto);
                                            alert("¡Añadido al carrito!");
                                        }}
                                        productId={producto.id} 
                                    />
                                </Link>
                            ))}
                        </div>
                    )}
                </main>
            </div>
            <FooterLg />
        </>
    )
}