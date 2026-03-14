import { createContext, useState, useEffect, useContext } from 'react';

export const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState(() => {
        const localData = localStorage.getItem('petCareWishlist');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('petCareWishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const toggleWishlist = (product) => {
        setWishlist(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.filter(item => item.id !== product.id); // Remove if exists
            }
            // Add if not exists
            return [...prev, { 
                id: product.id,
                nombre: product.name || product.nombre || 'Producto', 
                precio: product.price || 0,
                imageUrl: product.picture || product.imagenPrincipal || product.imageUrl
            }];
        });
    };

    const removeFromWishlist = (id) => setWishlist(prev => prev.filter(item => item.id !== id));

    const isInWishlist = (id) => wishlist.some(item => item.id === id);

    return (
        <WishlistContext.Provider value={{ wishlist, toggleWishlist, removeFromWishlist, isInWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
