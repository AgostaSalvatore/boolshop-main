import React from 'react'
import { NavLink } from 'react-router-dom'

const Cart = () => {
  return (
    <div>
      <div className="container my-3">
        <h2>Il tuo carrello</h2>
        <div className="row">
          <div className="col d-flex">
            <h4>Il carrelo è vuoto</h4>
            <p> <a href="/" className='text-decoration-none'>Vai alla Homepage per trovare i prodotti che desideri</a></p>
          </div>
        </div>
        <div className="col">
          <h5>Riepilogo ordine</h5>
          <div className="d-flex justify-content-between">
            <span>Prodotti</span>
            <span>€ 0,00</span>
            <hr />
            <div className="d-flex justify-content-between">
              <span>Totale</span>
              <span>0</span>
            </div>
            <hr />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
