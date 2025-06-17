import React from 'react'
import { NavLink } from 'react-router-dom';
import { useCart } from '../context/CartContext'
const Cart = () => {
  const { cartItems } = useCart();
  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-md-9 mb-4">
          <h1 className="text-primary fw-bold mb-3">Il tuo carrello</h1>
          {cartItems.length === 0 ? (
            <p>Il carrello è vuoto.
              Vai alla&nbsp;
              <a href="/" className="text-decoration-none fw-bold" style={{ color: "black" }}>Homepage</a>
              &nbsp;per trovare i prodotti che desideri.
            </p>
          ) : (
            <ul className="list-unstyled">
              {cartItems.map((item, index) => (
                <li key={index} className="d-flex align-items-center gap-4 mb-4 border-bottom pb-3">
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
                  <div>
                    <h5 className="mb-1">{item.title}</h5>
                    <p className="mb-0 text-muted">{item.price}€</p>
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
            <span>€ 0,00</span>
          </div>
          <div className="d-flex justify-content-between gap-5 mb-2">
            <span>Subtotale</span>
            <span>€ 0,00</span>
          </div>
          <div className="d-flex justify-content-between gap-5 mb-2">
            <span>Spedizione gratuita</span>
            <span>Sì/No</span>
          </div>
          <div className="d-flex justify-content-between gap-5 mb-2">
            <span>Totale</span>
            <span>0</span>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <NavLink to={"/checkout"}> <button type="button" className="btn checkout-button btn-primary">Vai al pagamento</button></NavLink>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
