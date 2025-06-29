import React from 'react'
import { useCart } from '../context/CartContext'
import { useWishlist } from '../context/WishlistContext';
import { useState } from 'react';
import axios from 'axios';
import CartSideBar from './CartSideBar';



// Componente che mostra le informazioni principali del prodotto e i pulsanti azione
const ProductInfo = ({ title, genre, price, release_year, software_house, discount, product, quantity, slug, initialQuantity }) => {
  // Recupera la funzione per aggiungere al carrello dal context
  const { addToCart, cartItems } = useCart();
  const { addToWishlist, isInWishlist } = useWishlist(); // <-- usa i metodi della wishlist
  const [showPopup, setShowPopup] = useState(false) //Uso la variabile di stato per mostrare un popup tot secondi dopo click
  const [wishPopup, setWishPopup] = useState(false); //Uso la variabile di stato per mostrare un popup tot secondi dopo click
  const [CurrentQuantity, setCurrentQuantity] = useState(initialQuantity); // Stato per la quantità disponibile
  const [showCartSidebar, setShowCartSidebar] = useState(false); // Stato aggiuntivo per sidebar

  // Gestore per il click su "Aggiungi al carrello"
  const handleAddToCart = () => {
    addToCart(product) // Aggiunge il prodotto al carrello
    setShowPopup(true) //Attiva il metodo
    setShowCartSidebar(true) //mostra la tendina laterale

    setTimeout(() => setShowPopup(false), 1500);  // dopo 1,5 secondi nasconde il popup
  };

  const handleAddToWishlist = () => {
    if (!isInWishlist(product.id)) {
      addToWishlist(product);
      setWishPopup(true);
      setTimeout(() => setWishPopup(false), 2000);
    }
  };

  return (
    <>
      {/* PopUp per il carrello */}
      {showPopup && (
        <div className="position-fixed top-0 start-0 p-3" style={{ zIndex: 1050 }}>
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
      {/* Popup per la wishlist */}
      {wishPopup && (
        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
          <div className="toast show align-items-center text-white bg-danger border-0">
            <div className="d-flex">
              <div className="toast-body">❤️ Aggiunto alla Wishlist!</div>
              <button
                type="button"
                className="btn-close btn-close-white me-2 m-auto"
                onClick={() => setWishPopup(false)}
              ></button>
            </div>
          </div>
        </div>
      )}

      {/* Pulsanti di azione: lista desideri e aggiungi al carrello */}
      <div className="d-flex flex-wrap gap-2 mb-4 mt-4">
        {/* Versione DESKTOP e TABLET */}
        <div className="d-none d-md-flex gap-2 w-100 justify-content-start">
          <button className="btn btn-outline-dark rounded-4 w-auto" onClick={handleAddToWishlist}>
            AGGIUNGI ALLA WISHLIST
          </button>
          <button
            className="btn btn-outline-dark rounded-4 w-auto"
            disabled={CurrentQuantity === 0}
            onClick={handleAddToCart}
          >
            AGGIUNGI AL CARRELLO
          </button>
        </div>

        {/* Versione MOBILE */}
        <div className="d-flex d-md-none gap-2 w-100 justify-content-start">
          <button className="btn btn-outline-danger" onClick={handleAddToWishlist}>
            + <i className="bi bi-heart"></i>
          </button>
          <button
            className="btn btn-outline-danger"
            disabled={CurrentQuantity === 0}
            onClick={handleAddToCart}
          >
            + <i className="bi bi-cart"></i>
          </button>
        </div>
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
          <strong>Prezzo:</strong> {price}€
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
          <strong>Sconto:</strong> {discount}%
        </div>
        <div className="col-sm-6">
          {/* Sconto applicato */}
          <strong>Copie disponibili: </strong> {CurrentQuantity}
        </div>
      </div>
      <CartSideBar isOpen={showCartSidebar} onClose={() => setShowCartSidebar(false)} cartItems={cartItems} />
    </>
  )
}

export default ProductInfo
