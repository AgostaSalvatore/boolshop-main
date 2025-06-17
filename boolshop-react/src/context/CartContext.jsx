import React from 'react'
import { createContext, useContext, useState } from 'react'

const CartContext = createContext(); // creo il contenitore

export const useCart = () => useContext(CartContext); //hook per accedere al contesto

export const CartProvider = ({ children }) => {   //creo il provider
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems(prev => [...prev, product]);
    };

    const value = {
        cartItems,
        addToCart
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
