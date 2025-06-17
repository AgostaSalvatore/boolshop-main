import React from 'react'

const DiscountedGamesRow = ({ games }) => {
    const scrollLeft = () => {
        document.querySelector('.discounted-games-container .d-flex').scrollBy({ left: -200, behavior: 'smooth' });
    };

    const scrollRight = () => {
        document.querySelector('.discounted-games-container .d-flex').scrollBy({ left: 200, behavior: 'smooth' });
    };

    return (
        <div className="discounted-games-container position-relative">
            <button className="btn btn-primary discounted-games-prev position-absolute" onClick={scrollLeft}>←</button>
            <div className="d-flex overflow-hidden">
                {games.map((game, index) => (
                    <div key={index} className="card me-3" style={{ width: '200px' }}>
                        <img src={game.image} className="card-img-top" alt={game.name} />
                        <div className="card-body">
                            <h5 className="card-title">{game.name}</h5>
                            <p className="card-text">Prezzo: €{game.price}</p>
                            <p className="card-text text-danger">Sconto: {game.discount}%</p>
                        </div>
                    </div>
                ))}
            </div>
            <button className="btn btn-primary discounted-games-next position-absolute" onClick={scrollRight}>→</button>
        </div>
    );
};

export default DiscountedGamesRow