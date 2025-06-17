import React from 'react'

const ProductInfo = ({ title, genre, price, release_year, software_house, discount }) => {
  return (
    <>
        {/* Action buttons */}
        <div className="d-flex gap-2 mb-4">
          <button className="btn btn-outline-primary">
            LISTA DESIDERI
          </button>
          <button className="btn btn-outline-primary">
            AGGIUNGI AL CARRELLO
          </button>
        </div>

        {/* Product details */}
        <div className="row g-3">
          <div className="col-sm-6">
            <strong>Nome:</strong> {title}
          </div>
          <div className="col-sm-6">
            <strong>Genere:</strong> {Array.isArray(genre) ? genre.join(', ') : 'N/A'}
          </div>
          <div className="col-sm-6">
            <strong>Prezzo:</strong> {price}
          </div>
          <div className="col-sm-6">
            <strong>Anno di rilascio:</strong> {release_year}
          </div>
          <div className="col-sm-6">
            <strong>Casa produttrice:</strong> {software_house}
          </div>
          <div className="col-sm-6">
            <strong>Sconto:</strong> {discount}
          </div>
        </div>
    </>
  )
}

export default ProductInfo
