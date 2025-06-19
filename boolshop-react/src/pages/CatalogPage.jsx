import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const CatalogPage = () => {
    const [games, setGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // Stato per la modalità di visualizzazione
    const navigate = useNavigate(); // Hook per la navigazione

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
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Catalogo Giochi</h1>
                {/* Pulsante per cambiare modalità */}
                <div>
                    <button
                        className={`btn btn-outline-primary me-2 ${viewMode === 'list' ? 'active' : ''}`}
                        onClick={() => setViewMode('list')}
                    >
                        Lista
                    </button>
                    <button
                        className={`btn btn-outline-primary ${viewMode === 'grid' ? 'active' : ''}`}
                        onClick={() => setViewMode('grid')}
                    >
                        Griglia
                    </button>
                </div>
            </div>
            {loading ? (
                <p className="text-center">Caricamento giochi...</p>
            ) : (
                <div className="row">
                    {viewMode === 'grid' ? (
                        // Modalità griglia
                        games.map((game) => (
                            <div key={game.id} className="col-md-4 mb-4">
                                <div className="card">
                                    <img src={game.image} className="card-img-top" alt={game.title} />
                                    <div className="card-body">
                                        <h5 className="card-title">{game.title}</h5>
                                        <p className="card-text">Prezzo: €{game.price}</p>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate(`/${game.id}`)} // Naviga alla pagina di dettaglio
                                        >
                                            Dettagli
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        // Modalità lista
                        games.map((game) => (
                            <div key={game.id} className="col-12 mb-4">
                                <div className="card">
                                    <div className="row g-0">
                                        <div className="col-md-4">
                                            <img src={game.image} className="img-fluid rounded-start" alt={game.title} />
                                        </div>
                                        <div className="col-md-8">
                                            <div className="card-body">
                                                <h5 className="card-title">{game.title}</h5>
                                                <p className="card-text">Prezzo: €{game.price}</p>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => navigate(`/${game.id}`)} // Naviga alla pagina di dettaglio
                                                >
                                                    Dettagli
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default CatalogPage;