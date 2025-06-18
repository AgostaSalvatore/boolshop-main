import React from 'react'

// Componente che mostra la descrizione dettagliata del prodotto
const ProductDescription = ({ description }) => {
  return (
    <>
        {/* Contenitore principale della descrizione */}
        <div className="container-fluid py-5">
            <div className="row">
                {/* Colonna centrale che contiene la descrizione */}
                <div className="col-lg-8">
                    {/* Titolo della sezione descrizione */}
                    <h3 className="mb-4">Descrizione del Prodotto</h3>
                    
                    {/* Paragrafo principale che mostra la descrizione passata come prop */}
                    <p className="lead">
                        {description}
                    </p>
                </div>
            </div>
        </div>
    </>
  );
}

export default ProductDescription
