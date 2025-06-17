import React from 'react'

const Cart = () => {
  return (
    <div className="container py-5">
      <div className="row d-flex justify-content-between">
        <div className="col-12 col-md-9 mb-4">
          <h1 className="text-primary fw-bold mb-3">Il tuo carrello è vuoto</h1>
          <p className="fs-5">
            Vai alla&nbsp;
            <a href="/" className="text-reset text-decoration-none">Homepage</a>
            &nbsp;per trovare i prodotti che desideri.
          </p>
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
      </div>
    </div>
  )
}

export default Cart
