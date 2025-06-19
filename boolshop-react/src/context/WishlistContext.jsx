import { createContext, useContext, useEffect, useState } from 'react';

// 1. Crea il contesto
const WishlistContext = createContext();

// 2. Hook personalizzato per accedere al contesto
export const useWishlist = () => useContext(WishlistContext);

// 3. Provider che avvolge l'app e fornisce il contesto
export const WishlistProvider = ({ children }) => {
    // Stato inizializzato da localStorage
    const [wishlist, setWishlist] = useState(() => {
        const stored = sessionStorage.getItem('wishlist');
        return stored ? JSON.parse(stored) : [];
    });

    // Sincronizza il localStorage ogni volta che cambia la wishlist
    useEffect(() => {
        sessionStorage.setItem('wishlist', JSON.stringify(wishlist));
    }, [wishlist]);

    // Aggiunge un elemento alla wishlist, se non già presente
    const addToWishlist = (game) => {
        const exists = wishlist.some(item => item.id === game.id);
        if (!exists) {
            setWishlist(prev => [...prev, game]);
        }
    };

    // Rimuove un elemento dalla wishlist tramite ID
    const removeFromWishlist = (id) => {
        setWishlist(prev => prev.filter(item => item.id !== id));
    };

    // Verifica se un elemento è già nella wishlist
    const isInWishlist = (id) => {
        return wishlist.some(item => item.id === id);
    };

    // Valori condivisi dal contesto
    const value = {
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist
    };

    return (
        <WishlistContext.Provider value={value}>
            {children}
        </WishlistContext.Provider>
    );
};
