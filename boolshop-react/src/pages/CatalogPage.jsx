import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CatalogPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Recupera i dati dalla tua API
        axios.get('http://127.0.0.1:3000/api/boolshop')
            .then((response) => {
                setGames(response.data); // Salva i dati dei giochi nello stato
                setLoading(false); // Imposta il caricamento su false
            })
            .catch((error) => {
                console.error('Errore nel recupero dei dati:', error);
                setLoading(false);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Catalogo Giochi</h1>
            {loading ? (
                <p className="text-center">Caricamento giochi...</p>
            ) : (
                <div className="row">
                    {games.map((game) => (
                        <div key={game.id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={game.image} className="card-img-top" alt={game.title} />
                                <div className="card-body">
                                    <h5 className="card-title">{game.title}</h5>
                                    <p className="card-text">Prezzo: €{game.price}</p>
                                    <button className="btn btn-primary">Dettagli</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CatalogPage;