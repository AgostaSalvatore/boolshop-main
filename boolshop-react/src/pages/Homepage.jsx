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
            <h1>Homepage</h1>
            <h2>Section</h2>
            <div className="row">
                <div className="col-12">
                    <div id="carouselExample" className="carousel slide">
                        <div className="carousel-inner">
                            {console.log(games.map(game => game.image))} {/* Verifica i percorsi delle immagini */}
                            {games.map((game, index) => (
                                <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`}>
                                    <img src={game.image} className="d-block w-100" alt={game.name || 'Game image'} />
                                </div>
                            ))}
                        </div>
                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                            <span className="visually-hidden">Previous</span>
                        </button>
                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
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