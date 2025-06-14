import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';


const DetailPage = () => {
  const {id} = useParams();

  const [videogame, setVideogame] = useState(null);
  
  const fetchVideogame = () => {
    axios.get(`http://127.0.0.1:3000/api//${id}`).then((resp) => {
      setVideogame(resp.data)
    }).catch((err) => console.log(err));
  }

  useEffect(() => {
    fetchVideogame();
  }, []);
  return (
    <div>
      
    </div>
  )
}

export default DetailPage
