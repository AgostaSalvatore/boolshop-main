import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useCart } from '../context/CartContext';

const CatalogPage = () => {
    const [games, setGames] = useState([]);
    const [filteredGames, setFilteredGames] = useState([]);
    const [loading, setLoading] = useState(true);
    const [viewMode, setViewMode] = useState('grid'); // Stato per la modalità di visualizzazione
    const [selectedGenre, setSelectedGenre] = useState(""); // Stato per il genere selezionato
    const [selectedSoftwareHouse, setSelectedSoftwareHouse] = useState(""); // Stato per la software house selezionata
    const [genres, setGenres] = useState([]); // Stato per i generi disponibili
    const [softwareHouses, setSoftwareHouses] = useState([]); // Stato per le software house disponibili
    const navigate = useNavigate(); // Hook per la navigazione
    const location = useLocation(); // Hook per accedere ai parametri dell'URL

    // Funzione per caricare i generi disponibili
    const loadGenres = () => {
        axios.get('http://127.0.0.1:3000/api/boolshop')
            .then((response) => {
                // Estrai tutti i generi unici dai giochi
                const allGenres = new Set();
                // Estrai tutte le software house uniche dai giochi
                const allSoftwareHouses = new Set();

                response.data.forEach(game => {
                    // Estrai generi
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

                    // Estrai software house
                    if (game.software_house) {
                        allSoftwareHouses.add(game.software_house);
                    }
                });

                setGenres(Array.from(allGenres).sort());
                setSoftwareHouses(Array.from(allSoftwareHouses).sort());
            })
            .catch((error) => {
                console.error('Errore nel recupero dei dati:', error);
            });
    };

    // Funzione per caricare i giochi con filtri concatenati
    const loadGames = () => {
        setLoading(true);

        // Costruisci l'URL in base ai filtri attivi
        let url = 'http://127.0.0.1:3000/api/boolshop/catalog'; // Usiamo sempre l'endpoint catalog
        const params = [];

        // Log per debug
        console.log("Filtri selezionati:", {
            genere: selectedGenre,
            softwareHouse: selectedSoftwareHouse
        });

        // Se il genere è selezionato e non è "tutti", aggiungi il parametro
        if (selectedGenre && selectedGenre !== "" && selectedGenre !== "tutti") {
            params.push(`genre=${encodeURIComponent(selectedGenre)}`);
        } else if (selectedGenre === "tutti") {
            // Se è selezionato "tutti", inviamo un parametro speciale che il backend riconoscerà
            params.push(`genre=tutti`);
        }

        // Se la software house è selezionata e non è "tutte", aggiungi il parametro
        if (selectedSoftwareHouse && selectedSoftwareHouse !== "" && selectedSoftwareHouse !== "tutte") {
            params.push(`software_house=${encodeURIComponent(selectedSoftwareHouse)}`);
        } else if (selectedSoftwareHouse === "tutte") {
            // Se è selezionato "tutte", non aggiungiamo il parametro software_house
            console.log("Mostro tutte le software house");
        }

        // Se entrambi i filtri sono "tutti"/"tutte", mostra tutti i giochi
        if ((selectedGenre === "tutti" || selectedGenre === "") &&
            (selectedSoftwareHouse === "tutte" || selectedSoftwareHouse === "")) {
            // Cambia l'URL per ottenere tutti i giochi
            url = 'http://127.0.0.1:3000/api/boolshop';
            params.length = 0; // Svuota l'array dei parametri
            console.log("Mostro tutti i giochi");
        }
        // Se non ci sono filtri selezionati e non siamo nel caso "tutti"/"tutte", usa i default
        else if (params.length === 0) {
            params.push(`genre=Action`);
            params.push(`software_house=id%20Software`);
            console.log("Impostati filtri default: Action e id Software");
        }

        // Aggiungi i parametri all'URL
        url += `?${params.join('&')}`;
        console.log("URL finale:", url);

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

    // Effetto per caricare i generi e i giochi all'avvio
    useEffect(() => {
        loadGenres();
        // Imposta i filtri per mostrare tutti i giochi all'avvio
        setSelectedGenre("tutti");
        setSelectedSoftwareHouse("tutte");
        loadGames();
    }, []);

    // Effetto per ricaricare i giochi quando cambiano i filtri
    useEffect(() => {
        // Carica i giochi solo se entrambi i filtri sono definiti
        if (selectedGenre !== undefined && selectedSoftwareHouse !== undefined) {
            loadGames();
        }
    }, [selectedGenre, selectedSoftwareHouse]);

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

    // Funzione per gestire il cambio di genere
    const handleGenreChange = (e) => {
        const newGenre = e.target.value;
        setSelectedGenre(newGenre);
        if (newGenre === "") {
            setDefaultFilters();
        }
    };

    // Funzione per gestire il cambio di software house
    const handleSoftwareHouseChange = (e) => {
        const newSoftwareHouse = e.target.value;
        setSelectedSoftwareHouse(newSoftwareHouse);
        if (newSoftwareHouse === "") {
            setDefaultFilters();
        }
    };

    // Funzione per impostare i filtri predefiniti
    const setDefaultFilters = () => {
        setSelectedGenre("Action");
        setSelectedSoftwareHouse("id Software");
        // Ricarica i giochi con i nuovi filtri
        setTimeout(() => loadGames(), 0);
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
                            className="form-select mb-2"
                            onChange={handleGenreChange}
                            value={selectedGenre}
                            aria-label="Filtra per genere"
                        >
                            <option value="tutti">Tutti i generi</option>
                            {genres.map((genre, index) => (
                                <option key={index} value={genre}>{genre}</option>
                            ))}
                        </select>
                    </div>

                    {/* Filtro per software house */}
                    <div className="mt-2">
                        <select
                            className="form-select"
                            onChange={handleSoftwareHouseChange}
                            value={selectedSoftwareHouse}
                            aria-label="Filtra per software house"
                        >
                            <option value="tutte">Tutte le software house</option>
                            {softwareHouses.map((softwareHouse, index) => (
                                <option key={index} value={softwareHouse}>{softwareHouse}</option>
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
            ) : filteredGames.length === 0 ? (
                <div className="alert alert-info text-center" role="alert">
                    <h4>Nessun gioco trovato</h4>
                    <p>Non ci sono giochi che corrispondono ai filtri selezionati.</p>
                </div>
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
                                            onClick={() => navigate(`/${game.slug}`)} // Naviga alla pagina di dettaglio con slug
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