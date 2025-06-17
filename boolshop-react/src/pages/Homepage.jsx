import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Homepage = () => {


    const [games, setGames] = useState([]);
    const fetchGames = (() => {
        axios.get('http://127.0.0.1:3000/api/boolShop/').then((resp) => {
            setGames(resp.data)
            console.log(resp.data);

        }).catch((err) => {
            console.log(err)
        })
    })

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
                                        <div className="bg-danger text-white p-3 mx-auto" style={{ maxWidth: '80%' }}>
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
        </div >
    )
}

export default Homepage