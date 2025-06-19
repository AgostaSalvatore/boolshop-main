import React from 'react'
import { Link } from 'react-router-dom'

const DiscountedGamesRow = ({ games }) => {
    return (
        <div className="discounted-games-container d-flex justify-content-center">
            {games.slice(0, 5).map((game, index) => ( // Genera solo 5 card randomiche
                <div key={index} className="card me-3" style={{ width: '200px' }}>
                    <Link to={`/${game.id}`}>
                        <img src={game.image} className="card-img-top" alt={game.title} />
                    </Link>
                    <div className="card-body">
                        <h5 className="card-title">{game.title}</h5>
                        <p className="card-text">Prezzo: €{game.price}</p>
                        <p className="card-text text-danger">Sconto: {game.discount}%</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default DiscountedGamesRow