import React from 'react'
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext'

// Componente che mostra il carrello dell'utente
const Cart = () => {
  // Recupera gli articoli presenti nel carrello dal context //  Inoltre possibilità di rimuovere gli articoli presenti nel carrello
  const { cartItems, removeFromCart } = useCart();

  const productsTotal = cartItems.reduce((sum, item) => sum + parseFloat(item.price || 0), 0); // itera l'array e restituisce il costo finale
  const hasFreeShipping = productsTotal >= 60; // spedizione gratis sopra i 60€
  const shippingCost = hasFreeShipping ? 0 : 4.99; // per i costi di spedizione, 4.99€ di spedizione al di sotto di 60€
  const finalTotal = productsTotal + shippingCost; // costo finale

  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-md-9 mb-4">
          <h1 className="text-primary fw-bold mb-3">Il tuo carrello</h1>
          {cartItems.length === 0 ? (
            <p>Il carrello è vuoto.
              Vai alla
              <a href="/" className="text-decoration-none fw-bold" style={{ color: "black" }}> Homepage </a>
              per trovare i prodotti che desideri.
            </p>
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
                    <p className="mb-0 text-muted">{item.price}€</p>
                  </div>
                  <div className="ms-auto d-flex align-items-center gap-2">
                    {/* Pulsante Wishlist */}
                    <button className="btn btn-outline-secondary">
                      <i className="bi bi-heart"></i>
                    </button>

                    {/* Pulsante Rimuovi dal carrello */}
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
        <div className="col-12 col-md-3">
          <h2 className="text-success fw-bold mb-3">Riepilogo Ordine</h2>
          <div className="d-flex justify-content-between gap-5 mb-2">
            <span>Prodotti</span>
            <span>{productsTotal.toFixed(2)} €</span>
          </div>
          <div className="d-flex justify-content-between gap-5 mb-2">
            <span>Costo di spedizione</span>
            <span>{hasFreeShipping ? "Gratuita" : "4,99 €"}</span>
          </div>
          <hr />
          <div className="d-flex justify-content-between gap-5 fw-bold mb-2">
            <span>Totale</span>
            <span>{finalTotal.toFixed(2)} € </span>
          </div>
        </div>

        {/* Riga separata per il pulsante di checkout */}
        <div className="row">
          <div className="col-12">
            {/* Pulsante per andare al pagamento */}
            <NavLink to={"/checkout"}>
              <button type="button" className="btn checkout-button btn-primary">
                Vai al pagamento
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
