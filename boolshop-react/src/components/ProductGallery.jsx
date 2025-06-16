import { useState } from "react";

const ProductGallery = ({ images, productName }) => {
  const [activeImage, setActiveImage] = useState(0);
  
  return (
    <div className="col-lg-5">
      <div className="position-relative">
        <img 
          src={images[activeImage]} 
          alt={productName}
          className="img-fluid rounded shadow-lg w-100"
          style={{aspectRatio: '3/4', objectFit: 'cover'}}
        />
        
        {/* Thumbnails */}
        <div className="d-flex justify-content-center mt-3 gap-2">
          {images.map((img, index) => (
            <button
              key={index}
              className={`btn p-1 ${activeImage === index ? 'btn-primary' : 'btn-outline-secondary'}`}
              onClick={() => setActiveImage(index)}
              style={{width: '60px', height: '60px'}}
            >
              <img 
                src={img} 
                alt={`${productName} ${index + 1}`}
                className="img-fluid rounded"
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductGallery