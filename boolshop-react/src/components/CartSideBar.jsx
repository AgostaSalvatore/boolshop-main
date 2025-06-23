import React from 'react'
import { useCart } from '../context/CartContext'
import { NavLink } from 'react-router-dom'

const CartSideBar = ({ isOpen, onClose }) => {
    const { cartItems, removeFromCart } = useCart();
    const productsTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0);
    return (
        <div
            className={`cart-floating-sidebar ${isOpen ? 'show' : ''}`}
            style={{
                position: 'fixed',
                top: '60px',
                right: isOpen ? '30px' : '-400px',
                width: '300px',
                backgroundColor: '#000',
                color: '#FFA500',
                boxShadow: '0 8px 24px rgba(255,165,0,0.4)',
                borderRadius: '16px',
                padding: '20px',
                zIndex: 1050,
                transition: 'right 0.4s ease-in-out',
            }}
        >
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h5 className="mb-0">Il tuo carrello</h5>
                <button type="button" className="btn-close btn-close-white" onClick={onClose}></button>
            </div>

            {cartItems.length === 0 ? (
                <p>Il carrello è vuoto.</p>
            ) : (
                <ul className="list-unstyled">
                    {cartItems.map((item, index) => (
                        <li key={index} className="d-flex align-items-center gap-3 mb-3">
                            <img src={item.image} alt={item.title} style={{ width: 60, height: 60, objectFit: 'cover', borderRadius: 8 }} />
                            <div>
                                <p className="mb-0 fw-semibold">{item.title}</p>
                                <small>{item.price} €</small>
                            </div>
                            <button
                                className="btn btn-sm btn-outline-danger ms-auto"
                                onClick={() => removeFromCart(item.id)}
                            >
                                <i className="bi bi-trash"></i>
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <hr />
            <div className="d-flex justify-content-between fw-bold mb-2">
                <span>Totale:</span>
                <span>{productsTotal.toFixed(2)} €</span>
            </div>

            <NavLink
                to="/checkout"
                className={`btn w-100 mt-2 ${cartItems.length === 0 ? 'btn-secondary disabled' : 'btn-warning text-black fw-bold'}`}
                style={{
                    pointerEvents: cartItems.length === 0 ? 'none' : 'auto',
                    backgroundColor: cartItems.length === 0 ? '#555' : '#FFA500',
                    border: 'none'
                }}
            >
                Vai al pagamento
            </NavLink>
        </div>

    )
}

export default CartSideBar
