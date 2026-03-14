import { createContext, useState, useEffect, useContext } from 'react';

export const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(() => {
        const localData = localStorage.getItem('petCareCart');
        return localData ? JSON.parse(localData) : [];
    });

    useEffect(() => {
        localStorage.setItem('petCareCart', JSON.stringify(cart));
    }, [cart]);

    const addToCart = (product) => {
        setCart(prev => {
            const exists = prev.find(item => item.id === product.id);
            if (exists) {
                return prev.map(item => item.id === product.id ? { ...item, cantidad: item.cantidad + 1 } : item);
            }
            // Mapeamos los datos del producto al formato que espera el carrito
            return [...prev, { 
                id: product.id, 
                nombre: product.name || product.nombre || 'Producto', 
                precioUnit: typeof product.price === 'string' ? parseFloat(product.price.replace(/[^0-9.-]+/g,"")) : product.price || 0,
                cantidad: 1,
                imageUrl: product.picture || product.imagenPrincipal || product.imageUrl
            }];
        });
    };

    const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
    
    const increaseQuantity = (id) => setCart(prev => prev.map(item => item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item));
    const decreaseQuantity = (id) => setCart(prev => prev.map(item => item.id === id && item.cantidad > 1 ? { ...item, cantidad: item.cantidad - 1 } : item));
    const clearCart = () => setCart([]);

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, increaseQuantity, decreaseQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
