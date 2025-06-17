import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const RelatedProducts = ({ currentProduct }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      // Controllo più robusto
      if (!currentProduct || !currentProduct.genres || !currentProduct.id) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await axios.get('http://127.0.0.1:3000/api/boolshop/');
        
        // Filtra i prodotti correlati per genere, escludendo il prodotto corrente
        const filtered = response.data.filter(
          (videogame) => {
            // Controlla se il videogame ha generi validi
            if (!videogame.genres || !videogame.id) return false;
            
            // Se i generi sono array, controlla se hanno almeno un genere in comune
            if (Array.isArray(videogame.genres) && Array.isArray(currentProduct.genres)) {
              const hasCommonGenre = videogame.genres.some(genre => 
                currentProduct.genres.includes(genre)
              );
              return hasCommonGenre && videogame.id !== currentProduct.id;
            }
            
            // Se i generi sono stringhe, confronta direttamente
            if (typeof videogame.genres === 'string' && typeof currentProduct.genres === 'string') {
              return videogame.genres === currentProduct.genres && videogame.id !== currentProduct.id;
            }
            
            return false;
          }
        );
        
        setRelatedProducts(filtered);
        setError(null);
      } catch (err) {
        console.error('Error fetching related products:', err);
        setError('Errore nel caricamento dei prodotti correlati');
        setRelatedProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRelatedProducts();
  }, [currentProduct]);

  const handleProductClick = (productId) => {
    navigate(`/${productId}`);
  };

  // Non renderizzare nulla se non c'è un prodotto corrente
  if (!currentProduct) {
    return null;
  }

  // Stato di caricamento
  if (loading) {
    return (
      <div className="related-products">
        <h3>Prodotti Correlati</h3>
        <div className="loading">Caricamento prodotti correlati...</div>
      </div>
    );
  }

  // Gestione errori
  if (error) {
    return (
      <div className="related-products">
        <h3>Prodotti Correlati</h3>
        <div className="error">{error}</div>
      </div>
    );
  }

  // Nessun prodotto correlato trovato
  if (relatedProducts.length === 0) {
    return (
      <div className="related-products">
        <h3>Prodotti Correlati</h3>
        <p className="no-products">
          Nessun altro prodotto trovato per il genere {
            Array.isArray(currentProduct.genres) 
              ? currentProduct.genres.join(', ') 
              : currentProduct.genres
          }
        </p>
      </div>
    );
  }

  return (
    <div className="related-products">
      <h3>
        Giochi simili - {
          Array.isArray(currentProduct.genres) 
            ? currentProduct.genres.join(', ') 
            : currentProduct.genres
        }
      </h3>
      
      <div className="related-products-grid">
        {relatedProducts.map((product) => (
          <div
            key={product.id}
            className="related-product-card"
            onClick={() => handleProductClick(product.id)}
          >
            {product.thumb && (
              <div className="product-image">
                <img 
                  src={product.thumb} 
                  alt={product.title}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                />
              </div>
            )}
            
            <div className="product-info">
              <h4 className="product-title">{product.title}</h4>
              <p className="product-price">€{Number(product.price).toFixed(2)}</p>
              
              {product.vote && (
                <div className="product-vote">
                  <span className="vote-label">Voto: </span>
                  <span className="vote-value">{product.vote}/10</span>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;