const ProductGallery = ({ images, productName }) => {
  return (
    <div className="col-lg-12">
      <div className="bg-light rounded shadow-lg p-5">
        <div className="text-center">
          <img
            src={images}
            alt={productName}
            className="img-fluid rounded shadow"
            style={{maxHeight: '500px', objectFit: 'cover'}}
          />
          <h2 className="mt-4 mb-0">{productName}</h2>
        </div>
      </div>
    </div>
  );
};

export default ProductGallery;