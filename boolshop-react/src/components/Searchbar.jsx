import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Searchbar = () => {
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchText.length > 0) {
      axios
        .get('http://127.0.0.1:3000/api/boolshop/')
        .then((res) => {
          const filtered = res.data.filter((videogame) =>
            videogame.title.toLowerCase().includes(searchText.toLowerCase())
          );
          setResults(filtered);
        })
        .catch((err) => {
          console.log('Error:', err);
          setResults([]);
        });
    } else {
      setResults([]);
    }
  }, [searchText]);

  const handleChange = (e) => {
    setSearchText(e.target.value);
  };

  return (
    <div className="searchbar-wrapper">
      <input
        type="text"
        className="searchbar-input"
        placeholder="Search videogames..."
        value={searchText}
        onChange={handleChange}
      />

      {results.length > 0 && (
        <div className="searchbar-dropdown">
          {results.map((videogame) => (
            <div key={videogame.id} className="searchbar-item">
              <strong>{videogame.title}</strong>
              <span className="price">€{Number(videogame.price).toFixed(2)}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Searchbar;
