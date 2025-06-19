import React from 'react';

const CatalogPage = () => {
    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4">Catalogo Giochi</h1>
            <div className="row">
                {/* Qui verranno mostrati i giochi */}
                <p className="text-center">Caricamento giochi...</p>
            </div>
        </div>
    );
};

export default CatalogPage;