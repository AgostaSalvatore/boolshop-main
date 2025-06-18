import React, { useState, useEffect } from 'react'
import axios from 'axios'
import DiscountedGamesRow from '../components/DiscountedGamesRow';



const Homepage = () => {


    const [games, setGames] = useState([]);
    const [discountedGames, setDiscountedGames] = useState([]);

    // Funzione per mescolare casualmente un array
    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    // Funzione per recuperare i giochi dall'API
    const fetchGames = () => {
        axios.get('http://127.0.0.1:3000/api/boolShop/')
            .then((resp) => {
                setGames(resp.data); // Salva tutti i giochi nello stato `games`
                const discountedGames = resp.data.filter(game => game.discount > 0); // Filtra i giochi in sconto
                const shuffledGames = shuffleArray(discountedGames); // Mescola i giochi in sconto
                setDiscountedGames(shuffledGames.slice(0, 5)); // Seleziona solo i primi 5 giochi randomici
            })
            .catch((err) => {
                console.log(err);
            });
    };

    useEffect(() => {
        fetchGames()
    }, []);

    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <div id="carouselExample" className="carousel slide custom-carousel">
                        <div className="carousel-inner">
                            {console.log(games.map(game => game.image))} {/* Verifica i percorsi delle immagini */}
                            {games.map((game, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    {/* Immagine del gioco */}
                                    <div className="text-center">
                                        <img
                                            src={game.image}
                                            className="d-block mx-auto carousel-game-image"
                                            alt={game.name || 'Game image'}
                                        />
                                    </div>

                                    {/* Informazioni sul gioco */}
                                    <div className="mt-3 mb-4 text-center">
                                        <div className="bg-danger text-white p-3 mx-auto" style={{ maxWidth: '80%' }} >
                                            <p className="mt-2">{game.description}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev" style={{
                            width: '5%',
                            zIndex: 5
                        }}>
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next" style={{
                            width: '5%',
                            zIndex: 5
                        }}>
                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Next</span>
                        </button>
                    </div>
                </div>
            </div>
            <div className="row">
                <h2 className='m-2'>Giochi in offerta:</h2>
            </div>
            <div className='row mt-4'>
                <DiscountedGamesRow games={discountedGames} />
            </div>
        </div >
    )
}

export default Homepage