import React from 'react';

const ProductThumbnail = ({ images, mainImage, setMainImage }) => {
  return (
    <div className="flex gap-4">
      {images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`Thumbnail ${index + 1}`}
          className={`w-32 h-24 object-cover rounded-md cursor-pointer border-2 ${
            image === mainImage ? 'border-blue-500' : 'border-transparent'
          } transition-colors`}
          onClick={() => setMainImage(image)}
        />
      ))}
    </div>
  );
};

export default ProductThumbnail;
