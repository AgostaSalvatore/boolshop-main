import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


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
  }, []);
  return (
    <>
      <div className="col-12 col-md-6 col-lg-4">
        <img src={videogame.image} className="img-fluid" alt="videogame" />
      </div>
      <div className="col-12 col-md-6 col-lg-8">
        <h1>{videogame.title}</h1>
        <h3>{videogame.director}</h3>
        <p>{videogame.abstract}</p>
      </div>
      <div className="col-12">
        <div className="d-flex justify-content-between">
          <h3>Our community reviews</h3>
        </div>
      </div>
    </>
  )
}

export default DetailPage
