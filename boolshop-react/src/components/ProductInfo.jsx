import React from 'react'

const ProductInfo = () => {
  return (
    <>
        {/* Action buttons */}
        <div className="d-flex gap-2 mb-4">
          <button className="btn btn-outline-primary">
            <i className="fas fa-heart me-2"></i>LISTA DESIDERI
          </button>
          <button className="btn btn-outline-primary">
            <i className="fas fa-star me-2"></i>AGGIUNGI AL CARRELLO
          </button>
        </div>

        {/* Product details */}
        <div className="row g-3">
          <div className="col-sm-6">
            <strong>Linea di prodotto:</strong> PlayStation 5
          </div>
          <div className="col-sm-6">
            <strong>Codice a barre:</strong> 3391892034264
          </div>
          <div className="col-sm-6">
            <strong>Genere:</strong> Strategico
          </div>
          <div className="col-sm-6">
            <strong>Età consigliata:</strong> 18 Anni
          </div>
          <div className="col-sm-6">
            <strong>Disponibile dal:</strong> 24/04/2025
          </div>
          <div className="col-sm-6">
            <strong>Dimensioni:</strong> 17.1 x 13.5 x 1.4 cm
          </div>
          <div className="col-sm-6">
            <strong>Peso:</strong> 80 grammi
          </div>
        </div>
    </>
  )
}

export default ProductInfo
