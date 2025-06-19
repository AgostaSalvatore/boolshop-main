import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';

const Wishlist = () => {
    const { wishlist, removeFromWishlist } = useWishlist();
    const { addToCart } = useCart();

    const [showPopup, setShowPopup] = useState(false);

    const handleAddToCart = (item) => {
        addToCart(item);
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 2000);
    };

    return (
        <div className="container py-5">
            {/* Toast di notifica */}
            {showPopup && (
                <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
                    <div className="toast show align-items-center text-white bg-success border-0">
                        <div className="d-flex">
                            <div className="toast-body">
                                ✅ Articolo aggiunto al carrello!
                            </div>
                            <button
                                type="button"
                                className="btn-close btn-close-white me-2 m-auto"
                                onClick={() => setShowPopup(false)}
                            ></button>
                        </div>
                    </div>
                </div>
            )}

            <div className="row d-flex justify-content-between">
                <div className="col-12 mb-4">
                    <h1 className="text-danger fw-bold mb-3">La tua Wishlist</h1>

                    {wishlist.length === 0 ? (
                        <div>
                            <p className="fs-5">La wishlist è vuota.</p>
                            <NavLink to="/" className="btn btn-outline-dark mt-4">
                                Torna alla Homepage
                            </NavLink>
                        </div>
                    ) : (
                        <ul className="list-unstyled">
                            {wishlist.map((item, index) => (
                                <li
                                    key={index}
                                    className="d-flex align-items-center gap-4 mb-4 border-bottom pb-3"
                                >
                                    <img
                                        src={item.image}
                                        alt={item.title}
                                        style={{
                                            width: '120px',
                                            height: '120px',
                                            objectFit: 'cover',
                                            borderRadius: '12px',
                                        }}
                                    />
                                    <div>
                                        <h5 className="mb-1">{item.title}</h5>
                                        <p className="mb-0 text-muted">{item.software_house}</p>
                                    </div>

                                    <div className="ms-auto d-flex align-items-center gap-2">
                                        {/* Pulsante Aggiungi al carrello */}
                                        <button
                                            className="btn btn-sm btn-outline-primary"
                                            onClick={() => handleAddToCart(item)}
                                            title="Aggiungi al carrello"
                                        >
                                            <i className="bi bi-cart-plus fs-4"></i>
                                        </button>

                                        {/* Pulsante Rimuovi dalla wishlist */}
                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => removeFromWishlist(item.id)}
                                            title="Rimuovi dalla wishlist"
                                        >
                                            <i className="bi bi-trash fs-4"></i>
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Wishlist;
