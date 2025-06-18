import React from 'react'
import { useCart } from '../context/CartContext'
import { useNavigate } from 'react-router-dom';

// Componente che mostra le informazioni principali del prodotto e i pulsanti azione
const ProductInfo = ({ title, genre, price, release_year, software_house, discount, product }) => {
  const navigate = useNavigate();
  // Recupera la funzione per aggiungere al carrello dal context
  const { addToCart } = useCart();

  // Gestore per il click su "Aggiungi al carrello"
  const handleAddToCart = () => {
    addToCart(product) // Aggiunge il prodotto al carrello
    navigate("/cart"); // Reindirizza alla pagina carrello
  };

  return (
    <>
      {/* Pulsanti di azione: lista desideri e aggiungi al carrello */}
      <div className="d-flex gap-2 mb-4">
        <button className="btn btn-outline-primary">
          LISTA DESIDERI
        </button>
        <button className="btn btn-outline-primary" onClick={handleAddToCart}>
          AGGIUNGI AL CARRELLO
        </button>
      </div>

      {/* Product details */}
      <div className="row g-3">
        <div className="col-sm-6">
          {/* Nome del prodotto */}
          <strong>Nome:</strong> {title}
        </div>
        <div className="col-sm-6">
          {/* Genere del prodotto, gestisce array o valore mancante */}
          <strong>Genere:</strong> {Array.isArray(genre) ? genre.join(', ') : 'N/A'}
        </div>
        <div className="col-sm-6">
          {/* Prezzo del prodotto */}
          <strong>Prezzo:</strong> {price}
        </div>
        <div className="col-sm-6">
          {/* Anno di rilascio */}
          <strong>Anno di rilascio:</strong> {release_year}
        </div>
        <div className="col-sm-6">
          {/* Casa produttrice */}
          <strong>Casa produttrice:</strong> {software_house}
        </div>
        <div className="col-sm-6">
          {/* Sconto applicato */}
          <strong>Sconto:</strong> {discount}
        </div>
      </div>
    </>
  )
}

export default ProductInfo
