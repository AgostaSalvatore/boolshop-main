import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import ProductGallery from "../components/ProductGallery";
import ProductInfo from "../components/ProductInfo";
import ProductDescription from "../components/ProductDescription";


const DetailPage = () => {
  const { id } = useParams();

  const [videogame, setVideogame] = useState(null);

  const fetchVideogame = () => {
    axios.get(`http://127.0.0.1:3000/api/boolshop/${id}`).then((resp) => {
      setVideogame(resp.data)
    }).catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchVideogame();
  },[]);

  return (
    <div>
      <h1>Detail Page</h1>
      <div className="container">
        <div className="row">
          <div className="col-8">
            <ProductGallery images={videogame?.image}/>
          </div>
          <div className="col-4">
            <ProductInfo />
          </div>
        </div>
        <div className="row">
          <div className="col-8">
            <ProductDescription />
          </div>
        </div>
      </div>
      

    </div>
  )
}

export default DetailPage
