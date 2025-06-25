import React from 'react'
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext'
import { useState, useEffect } from 'react';
import axios from 'axios';

// Componente che mostra il carrello dell'utente
const Cart = () => {
  // Recupera gli articoli presenti nel carrello dal context //  Inoltre possibilità di rimuovere gli articoli presenti nel carrello
  const { cartItems, removeFromCart, decreaseQuantity, increaseQuantity } = useCart();

  const productsTotal = cartItems.reduce((sum, item) => sum + (parseFloat(item.price || 0) * item.quantity), 0);  // itera l'array e restituisce il costo finale
  const hasFreeShipping = productsTotal >= 60; // spedizione gratis sopra i 60€
  const shippingCost = hasFreeShipping ? 0 : 4.99; // per i costi di spedizione, 4.99€ di spedizione al di sotto di 60€
  const finalTotal = productsTotal + shippingCost; // costo finale
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    const initialQuantity = {};
    cartItems.forEach(item => {
      initialQuantity[item.id] = item.quantity || 1; // Impostiamo la quantità iniziale per ogni prodotto
    });
    setQuantities(initialQuantity);
  }, [cartItems])

  const handleQuantity = (id) => {
    axios.patch(`http://127.0.0.1:3000/api/boolShop/${id}`)
      .then(() => {
        setQuantities((prev) => ({
          ...prev,
          [id]: Math.max((prev[id] ?? 1) - 1, 0)
        }));
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-md-9 mb-4">
          <h1 className="text-primary fw-bold mb-3">Il tuo carrello</h1>
          {cartItems.length === 0 ? (
            <div>
              <p className="fs-5">Il carrello è vuoto.</p>
              <NavLink
                to="/"
                className="btn btn-outline-dark mt-4"
              >
                Torna alla Homepage
              </NavLink>
            </div>
          ) : (
            <ul className="list-unstyled">
              {/* Filtra ogni prodotto in un elemento della lista */}
              {cartItems.map((item, index) => (
                <li key={index} className="d-flex align-items-center gap-4 mb-4 border-bottom pb-3">
                  {/* Immagine del prodotto */}
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: '120px',
                      height: '120px',
                      objectFit: 'cover',
                      borderRadius: '12px'
                    }}
                  />
                  {/* Dettagli del prodotto: titolo e prezzo */}
                  <div>
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-0 text-muted">
                      {item.price}€
                    </p>

                  </div>

                  <div className="ms-auto d-flex align-items-center gap-2">
                    {/* Pulsante diminusci, aumenta e rimuovi dal carrello */}
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      <i className="bi bi-dash"></i>
                    </button>
                    <span className="px-2">{item.quantity}</span> {/* mostra la quantità */}

                    <button
                      className="btn btn-outline-success"
                      onClick={() => increaseQuantity(item.id)}
                    >
                      <i className="bi bi-plus"></i>
                    </button>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        {cartItems.length > 0 && (
          <div className="col-12 col-md-3">
            <h2 className="text-success fw-bold mb-3">Riepilogo Ordine</h2>
            <div className="d-flex justify-content-between gap-5 mb-2">
              <span>Prodotti</span>
              <span>{productsTotal.toFixed(2)} €</span>
            </div>
            <div className="d-flex justify-content-between gap-5 mb-2">
              <span>Spedizione</span>
              <span>{hasFreeShipping ? "Gratuita" : "4,99 €"}</span>
            </div>
            <hr />
            <div className="d-flex justify-content-between gap-5 fw-bold mb-2">
              <span>Totale</span>
              <span>{finalTotal.toFixed(2)} €</span>
            </div>
          </div>
        )}


        {/* Riga separata per il pulsante di checkout */}
        <div className="row">
          <div className="col-12">
            {/* Pulsante per andare al pagamento */}
            {cartItems.length === 0 ? (
              <button type="button" className="btn checkout-button btn-primary disabled">
                Vai al pagamento
              </button>
            ) : (
              <NavLink to={"/checkout"}>
                <button
                  disabled={Object.values(quantities).some(qty => qty <= 0)}
                  onClick={() => {
                    cartItems.forEach(item => {
                      handleQuantity(item.id);
                    });
                  }} type="button" className="btn checkout-button btn-primary">
                  Vai al pagamento
                </button>
              </NavLink>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
