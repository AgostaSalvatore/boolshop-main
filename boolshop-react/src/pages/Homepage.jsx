import React, { useState, useEffect } from 'react'
import axios from 'axios'



const Homepage = () => {


    const [games, setGames] = useState(null);
    const fetchGames = (() => {
        axios.get('http://127.0.0.1:3000/api/boolShop/').then((resp) => {
            setGames(resp.data)
        }).catch((err) => {
            console.log(err)
        })
    })

    useEffect(() => {
        fetchGames()
    }, []);

    console.log(games)
    return (
        <div className="container">
            <h1>Homepage</h1>
            <h2>Section</h2>
            <div className="row">
                <div className="col-12">
                    <div id="carouselExample" className="carousel slide">
                        <div className="carousel-inner">
                            {games?.map((game, index) => {
                                return < div key={`videogame ${game.id}`} className={`carousel-item ${index === 0 ? 'active' : ''}`}
                                >
                                    <img src={`http://127.0.0.1:3000/imgs/videogame_imgs/${game.image}`} className="d-block w-100" alt="" />
                                </div>
                            })}
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