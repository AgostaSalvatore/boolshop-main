import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const CatalogPage = () => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // Stato per la modalità di visualizzazione
    const [filterVisible, setFilterVisible] = useState(false); // Stato per la visibilità del filtro
    const [selectedGenres, setSelectedGenres] = useState([]); // Stato per i generi selezionati
    const [genres, setGenres] = useState([]); // Stato per i generi disponibili
    const navigate = useNavigate(); // Hook per la navigazione
    const location = useLocation(); // Hook per accedere ai parametri dell'URL

    // Funzione per caricare i generi disponibili
    const loadGenres = () => {
        axios.get('http://127.0.0.1:3000/api/boolshop')
            .then((response) => {
                // Estrai tutti i generi unici dai giochi
                const allGenres = new Set();
                
                response.data.forEach(game => {
                    if (game.genres) {
                        const genresStr = String(game.genres);
                        const genresList = genresStr.split(',');
                        
                        genresList.forEach(genre => {
                            const trimmedGenre = genre.trim();
                            if (trimmedGenre) {
                                allGenres.add(trimmedGenre);
                            }
                        });
                    }
                });
                
                setGenres(Array.from(allGenres).sort());
            })
            .catch((error) => {
                console.error('Errore nel recupero dei generi:', error);
            });
    };
    
    // Funzione per caricare i giochi (con o senza filtro per genere)
    const loadGames = (genreFilter = null) => {
        setLoading(true);
        
        // Costruisci l'URL in base al filtro
        let url = 'http://127.0.0.1:3000/api/boolshop';
        if (genreFilter) {
            url = `http://127.0.0.1:3000/api/boolshop/catalog?genre=${genreFilter}`;
        }
        
        axios.get(url)
            .then((response) => {
                setGames(response.data);
                setFilteredGames(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.error('Errore nel recupero dei dati:', error);
                setLoading(false);
            });
    };
    
    useEffect(() => {
        // Carica i generi all'avvio
        loadGenres();
        
        // Carica tutti i giochi all'avvio
        loadGames();
    }, []);

    // Effetto per filtrare i giochi in base al parametro di ricerca nell'URL
    useEffect(() => {
        if (!loading) {
            const searchParams = new URLSearchParams(location.search);
            const searchTerm = searchParams.get('search');

            if (searchTerm) {
                // Filtra i giochi in base al termine di ricerca (titolo o software_house)
                const filtered = games.filter(game =>
                    game.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    (game.software_house && game.software_house.toLowerCase().includes(searchTerm.toLowerCase()))
                );
                setFilteredGames(filtered);
            } else {
                // Se non c'è un termine di ricerca, mostra tutti i giochi
                setFilteredGames(games);
            }
        }
    }, [games, location.search, loading]);

    const { addToCart } = useCart();
    const [showPopup, setShowPopup] = useState(false)

    const handleAddToCart = (game) => {
        addToCart(game) // Aggiunge il prodotto al carrello
        setShowPopup(true) //Attiva il metodo

        setTimeout(() => setShowPopup(false), 2000);  // dopo 2 secondi nasconde il popup
    };

    // Gestisce il cambiamento del genere selezionato
    const handleGenreChange = (e) => {
        const selectedGenre = e.target.value;
        
        if (selectedGenre === "") {
            // Se è selezionato "Tutti i generi", carica tutti i giochi
            loadGames();
        } else {
            // Carica i giochi filtrati per genere dal backend
            loadGames(selectedGenre);
        }
    };

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
                    
                    {/* Filtro per genere */}
                    <div className="mt-3">
                        <select 
                            className="form-select" 
                            onChange={handleGenreChange}
                            aria-label="Filtra per genere"
                        >
                            <option value="">Tutti i generi</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>
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
                    {showPopup && (
                        <div className="position-fixed top-0 end-0 p-3" style={{ zIndex: 1050 }}>
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
                                        <button onClick={() => { handleAddToCart(game) }} type="button" className="btn btn-danger mt-2">Aggiungi al carrello</button>
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
                                                <button onClick={() => { handleAddToCart(game) }} type="button" className="btn btn-danger mt-2">Aggiungi al carrello</button>
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