import { createContext, useEffect, useState } from 'react';

export const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
    const [wishlist, setWishlist] = useState([]);

    // Carica dal localStorage
    useEffect(() => {
        const stored = localStorage.getItem('wishlist');
        if (stored) setWishlist(JSON.parse(stored));
    }, []);

    // Salva ogni volta che cambia
    useEffect(() => {
        localStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    const addToWishlist = (item) => {
        if (!wishlist.find(i => i.id === item.id)) {
            setWishlist(prev => [...prev, item]);
        }
    };

    const removeFromWishlist = (id) => {
        setWishlist(prev => prev.filter(i => i.id !== id));
    };

    return (
        <WishlistContext.Provider value={{ wishlist, addToWishlist, removeFromWishlist }}>
            {children}
        </WishlistContext.Provider>
    );
};
