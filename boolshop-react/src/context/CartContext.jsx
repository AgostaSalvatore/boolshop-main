import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(); // creo il contenitore

export const useCart = () => useContext(CartContext); //hook per accedere al contesto

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const stored = sessionStorage.getItem('cart');
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        sessionStorage.setItem('cart', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product) => {
        if (product.quantity && product.quantity > 0) {
            setCartItems(prev => [...prev, product]);
        }
    };

    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
