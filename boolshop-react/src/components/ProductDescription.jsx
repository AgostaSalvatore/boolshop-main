import React from 'react'

// Componente che mostra la descrizione dettagliata del prodotto
const ProductDescription = ({ description_HTML }) => {
    return (
        <>
            {/* Contenitore principale della descrizione */}
            <div className="container-fluid py-5">
                <div className="row">
                    {/* Colonna centrale che contiene la descrizione */}
                    <div className="col-lg-8">
                        {/* Titolo della sezione descrizione */}
                        <h2 className="mb-4">Descrizione del Prodotto</h2>

                        {/* Utilizziamo dangerouslySetInnerHTML per renderizzare l'HTML formattato */}
                        <div className="lead game-description" dangerouslySetInnerHTML={{ __html: description_HTML }} />
                    </div>
                </div>
            </div>
        </>
    );
}

export default ProductDescription
