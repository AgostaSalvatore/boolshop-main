import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

// Componente barra di ricerca per videogiochi
const Searchbar = () => {
  // Stato per il testo inserito nella searchbar
  const [searchText, setSearchText] = useState('');
  // Stato per i risultati filtrati della ricerca
  const [results, setResults] = useState([]);
  // Hook per navigare tra le pagine
  const navigate = useNavigate();

  // Effetto che si attiva ogni volta che cambia il testo della searchbar
  useEffect(() => {
    // Se c'è testo, effettua la chiamata API e filtra i risultati
    if (searchText.length > 0) {
      axios
        .get('http://127.0.0.1:3000/api/boolshop/', {
          params: { search: searchText }
        })
        .then((res) => {
          setResults(res.data); // Aggiorna i risultati
        })
        .catch((err) => {
          // In caso di errore, logga e svuota i risultati
          console.log('Error:', err);
          setResults([]);
        });
    } else {
      // Se la searchbar è vuota, svuota i risultati
      setResults([]);
    }
  }, [searchText]);

  // Gestisce il cambiamento del testo nella barra di ricerca
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  // Gestisce il click su un risultato della ricerca
  const handleItemClick = (videogameId) => {
    // Naviga alla pagina di dettaglio passando l'ID del videogame
    navigate(`/${videogameId}`);
    // Pulisce la searchbar e i risultati dopo il click
    setSearchText('');
    setResults([]);
  };

  // Gestisce il click sul pulsante di ricerca
  const handleSearchClick = () => {
    if (searchText.trim() !== '') {
      // Naviga alla pagina del catalogo con il parametro di ricerca
      navigate(`/catalog?search=${encodeURIComponent(searchText)}`);
      // Manteniamo il testo nella barra di ricerca
    }
  };

  // Gestisce la pressione del tasto Enter nella barra di ricerca
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSearchClick();
    }
    if (e.key === 'Escape') {
      setResults([]);
    }
  };

  return (
    <div className="searchbar-wrapper">
      <div className="searchbar-input-container d-flex">
        {/* Input di ricerca */}
        <input
          type="text"
          className="searchbar-input flex-grow-1"
          placeholder="Search videogames..."
          value={searchText}
          onChange={handleChange}
          onKeyDown={handleKeyPress}
        />
        {/* Pulsante di ricerca */}
        <button
          className="btn btn-primary search-button mx-2"
          onClick={handleSearchClick}
          aria-label="Cerca"
        >
          Cerca
        </button>
      </div>

      {/* Dropdown dei risultati */}
      {results.length > 0 && (
        <div className="searchbar-dropdown">
          {/* Filtra ogni risultato in un elemento cliccabile */}
          {results.map((videogame) => (
            <div
              key={videogame.id}
              className="searchbar-item"
              onClick={() => handleItemClick(videogame.id)}
              style={{ cursor: 'pointer' }}
            >
              {/* Titolo del videogioco */}
              <strong>{videogame.title}</strong>
              {/* Prezzo del videogioco, formattato a due decimali */}
              <span className="price">€{Number(videogame.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;