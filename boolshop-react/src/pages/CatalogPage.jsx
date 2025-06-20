import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

const CatalogPage = () => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // Stato per la modalità di visualizzazione
    const navigate = useNavigate(); // Hook per la navigazione
    const location = useLocation(); // Hook per accedere ai parametri dell'URL

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

    // Effetto per filtrare i giochi in base al parametro di ricerca nell'URL
    useEffect(() => {
        if (!loading) {
            const searchParams = new URLSearchParams(location.search);
            const searchTerm = searchParams.get('search');

            if (searchTerm) {
                // Filtra i giochi in base al termine di ricerca
                const filtered = games.filter(game =>
                    game.title.toLowerCase().includes(searchTerm.toLowerCase())
                );
                setFilteredGames(filtered);
            } else {
                // Se non c'è un termine di ricerca, mostra tutti i giochi
                setFilteredGames(games);
            }
        }
    }, [games, location.search, loading]);

    return (
        <div className="container mt-5">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h1>Catalogo Giochi</h1>
                    {/* Mostra il termine di ricerca se presente */}
                    {new URLSearchParams(location.search).get('search') && (
                        <p className="text-muted">
                            Risultati per: "{new URLSearchParams(location.search).get('search')}"
                            <button
                                className="btn btn-sm btn-outline-secondary ms-2"
                                onClick={() => navigate('/catalog')}
                            >
                                Mostra tutti
                            </button>
                        </p>
                    )}
                </div>
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
                        filteredGames.map((game) => (
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
                        filteredGames.map((game) => (
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