import React from 'react';

const ProductImage = ({ mainImage, title }) => {
  return (
    <img
      src={mainImage}
      alt={title}
      className="w-full h-[500px] object-cover rounded-lg"
    />
  );
};

export default ProductImage;
