import React, { useState, useEffect, useRef, } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';

// Componente barra di ricerca per videogiochi
const Searchbar = () => {
  // Stato per il testo inserito nella searchbar
  const [searchText, setSearchText] = useState('');
  // Stato per i risultati filtrati della ricerca
  const [results, setResults] = useState([]);
  // Hook per navigare tra le pagine
  const navigate = useNavigate();
  // Indice dell'elemento attualmente evidenziato nel menu a tendina (-1 significa nessuna selezione)
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  // Riferimento al contenitore del dropdown, utile per rilevare clic fuori o per il posizionamento
  const dropdownRef = useRef(null);
  // Riferimenti agli elementi della lista, usati per gestire il focus o lo scroll sugli item
  const itemRefs = useRef([]);
  // Stato per rilevare la pagina corrente
  const location = useLocation();
  // Ref per il contenitore principale del componente, utile per gestire eventi o misure relative all'intero wrapper
  const wrapperRef = useRef(null);

  
  
  // Effetto che aggiunge un listener per chiudere il dropdown quando si clicca fuori dalla searchbar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
        setResults([]);
        setHighlightedIndex(-1);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Effetto per svuotare i risultati al cambio pagina
  useEffect(() => {
    // Quando cambia il percorso URL, resetta la ricerca
    setResults([]);
    setHighlightedIndex(-1);
    setSearchText('');
  }, [location.pathname, location.search]);

  // Allineo il numero di riferimenti agli item con la lunghezza dei risultati
  useEffect(() => {
    itemRefs.current = itemRefs.current.slice(0, results.length);
  }, [results]);

  // Quando cambia l'indice evidenziato, assicuro che l'elemento attivo sia visibile nel dropdown
  // Se è fuori dalla viewport del menu, scrollo il dropdown per mostrarlo correttamente
  useEffect(() => {
    if (highlightedIndex < 0 || !dropdownRef.current || !itemRefs.current[highlightedIndex]) return;

    const dropdown = dropdownRef.current;
    const item = itemRefs.current[highlightedIndex];

    const dropdownTop = dropdown.scrollTop;
    const dropdownHeight = dropdown.clientHeight;

    const itemTop = item.offsetTop;
    const itemHeight = item.offsetHeight;

    if (itemTop < dropdownTop) {
      dropdown.scrollTop = itemTop;
    } else if (itemTop + itemHeight > dropdownTop + dropdownHeight) {
      dropdown.scrollTop = itemTop + itemHeight - dropdownHeight;
    }
  }, [highlightedIndex]);

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

  // Resetto l'indice evidenziato ogni volta che cambiano i risultati
  useEffect(() => {
    setHighlightedIndex(-1);
  }, [results]);


  // Gestisce il cambiamento del testo nella barra di ricerca
  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  // Gestisce il click su un risultato della ricerca
  const handleItemClick = (slug) => {
    // Naviga alla pagina di dettaglio passando l'ID del videogame
    navigate(`/${slug}`);
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
      if (highlightedIndex >= 0 && highlightedIndex < results.length) {
        handleItemClick(results[highlightedIndex].slug);
      } else {
        handleSearchClick();
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault(); // impedisce lo scroll della pagina
      setHighlightedIndex((prev) =>
        prev < results.length - 1 ? prev + 1 : 0
      );
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightedIndex((prev) =>
        prev > 0 ? prev - 1 : results.length - 1
      );
    } else if (e.key === 'Escape') {
      setResults([]);
      setHighlightedIndex(-1);
    }
  };


  return (
    <div className="searchbar-wrapper" ref={wrapperRef}>
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
        <div className="searchbar-dropdown"
          ref={dropdownRef}
          style={{ overflowY: 'auto' }}>
          {/* Filtra ogni risultato in un elemento cliccabile */}
          {results.map((videogame, index) => (
            <div
              key={videogame.id}
              className={`searchbar-item ${highlightedIndex === index ? 'active' : ''}`}
              ref={(el) => (itemRefs.current[index] = el)}
              onClick={() => handleItemClick(videogame.slug)}
              onMouseEnter={() => setHighlightedIndex(index)}
              onMouseLeave={() => setHighlightedIndex(-1)}
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