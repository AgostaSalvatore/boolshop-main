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
        setCartItems(prevItems => {
            const existingItem = prevItems.find(item => item.id === product.id);
            if (existingItem) {
                return prevItems.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            } else {
                return [...prevItems, { ...product, quantity: 1 }];
            }
        });
    };
    const increaseQuantity = (productId) => {
        setCartItems(prevItems =>
            prevItems.map(item =>
                item.id === productId
                    ? { ...item, quantity: item.quantity + 1 }
                    : item
            )
        );
    };
    const decreaseQuantity = (id) => {
        setCartItems(prevItems => {
            return prevItems
                .map(item =>
                    item.id === id ? { ...item, quantity: item.quantity - 1 } : item
                )
                .filter(item => item.quantity > 0); // rimuove item solo se la quantità scende a 0
        });
    };


    const removeFromCart = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const value = {
        cartItems,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        increaseQuantity
    };

    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
