import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductDescription from "../components/ProductDescription";
import RelatedProducts from "../components/RelatedProducts";

// Pagina di dettaglio del prodotto
const DetailPage = () => {
  // Recupera l'id del prodotto dalla URL
  const { id } = useParams();

  // Stato che contiene i dati del videogioco selezionato
  const [videogame, setVideogame] = useState(null);

  // Funzione per recuperare i dati del videogioco tramite chiamata API
  const fetchVideogame = () => {
    axios.get(`http://127.0.0.1:3000/api/boolshop/${id}`).then((resp) => {
      setVideogame(resp.data)
    }).catch((err) => console.log(err));
  }

  // Effetto che richiama fetchVideogame ogni volta che cambia l'id
  useEffect(() => {
    fetchVideogame();
  }, [id]);

  // Mostra un messaggio di caricamento se i dati non sono ancora disponibili
  if (!videogame) {
    return <div>Caricamento...</div>;
  }

  return (
    <div>
      {/* Layout principale della pagina di dettaglio */}
      <div className="container">
        <div className="row">
          {/* Galleria immagini */}
          <div className="col-8 mt-4">
            <ProductGallery images={videogame?.image} productName={videogame?.title} />
          </div>
          {/* Informazioni prodotto */}
          <div className="col-4">
            <ProductInfo
              title={videogame?.title}
              genre={videogame?.genres}
              price={videogame?.price}
              release_year={videogame?.release_year}
              software_house={videogame?.software_house}
              discount={videogame?.discount}
              product={videogame}
            />
          </div>
        </div>
        <div className="row mt-4">
          <div className="col-8">
            <ProductDescription description_HTML={videogame?.description_HTML} />
          </div>
        </div>
        {/* Sezione che mostra i prodotti correlati */}
        <div className="row bg-primary mt-4">
          <div className="col-12">
            <RelatedProducts currentProduct={videogame} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default DetailPage
