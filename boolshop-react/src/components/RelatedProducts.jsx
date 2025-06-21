import React, { useState, useEffect } from 'react';
import axios from 'axios';

const RelatedProducts = ({ currentProductId }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Funzione per caricare i prodotti correlati
    const loadRelatedProducts = () => {
        setIsLoading(true);
        setError(null);
        
        axios.get(`http://localhost:3000/api/boolshop/${currentProductId}/related`)
            .then((response) => {
                if (response.data.success) {
                    setRelatedProducts(response.data.data);
                } else {
                    setError('Errore nel caricamento');
                }
            })
            .catch((err) => {
                console.log('Errore:', err);
                setError('Errore di connessione');
            })
            .finally(() => {
                setIsLoading(false);
            });
    };

    // Carica i prodotti quando cambia l'ID del prodotto corrente
    useEffect(() => {
        if (currentProductId) {
            loadRelatedProducts();
        }
    }, [currentProductId]);

    // Se sta caricando
    if (isLoading) {
        return (
            <div className="related-products">
                <h3>Prodotti Correlati</h3>
                <p>Caricamento...</p>
            </div>
        );
    }

    // Se c'è un errore
    if (error) {
        return (
            <div className="related-products">
                <h3>Prodotti Correlati</h3>
                <p>Errore nel caricamento dei prodotti correlati.</p>
            </div>
        );
    }

    // Se non ci sono prodotti correlati
    if (relatedProducts.length === 0) {
        return (
            <div className="related-products">
                <h3>Prodotti Correlati</h3>
                <p>Nessun prodotto simile trovato.</p>
            </div>
        );
    }

    // Mostra i prodotti correlati
    return (
        <div className="related-products">
            <h3>Prodotti che potrebbero interessarti</h3>
            <div className="products-grid">
                {relatedProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        <img 
                            src={product.image} 
                            alt={product.title}
                            className="product-image"
                        />
                        <div className="product-info">
                            <h4 className="product-title">{product.title}</h4>
                            <p className="product-publisher">{product.software_house}</p>
                            <button 
                                className="view-details-btn"
                                onClick={() => window.location.href = `/${product.slug}`}
                            >
                                Vedi Dettagli
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;