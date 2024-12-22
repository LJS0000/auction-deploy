import React, { useState } from 'react';
import UploadImageGallery from '../components/UploadImageGallery';
import ProductInputField from '../components/ProductInputField';
import CategorySelect from '../components/CategorySelect';
import ErrorMessage from '../components/ErrorMessage';

const AddProductPage = ({ onProductSubmit }) => {
  const [productName, setProductName] = useState('');
  const [bidDeadline, setBidDeadline] = useState('');
  const [category, setCategory] = useState('');
  const [startingPrice, setStartingPrice] = useState('');
  const [immediatePurchasePrice, setImmediatePurchasePrice] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [images, setImages] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (images.length + files.length > 5) {
      alert('이미지는 최대 5개까지 추가할 수 있습니다.');
      return;
    }
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const handleImageRemove = (index) => {
    setImages((prevImages) => prevImages.filter((_, i) => i !== index));
  };

  const handleFormSubmit = () => {
    const missingFields = [];

    if (images.length === 0) missingFields.push('이미지');
    if (!productName) missingFields.push('상품명');
    if (!bidDeadline) missingFields.push('입찰 마감 기한');
    if (!category) missingFields.push('카테고리');
    if (!immediatePurchasePrice) missingFields.push('즉시 구매가');
    if (!productDescription) missingFields.push('상품 설명');

    if (missingFields.length > 0) {
      setErrorMessage(`${missingFields.join(', ')}을(를) 입력해주세요.`);
      return;
    }

    const finalStartingPrice = isChecked ? startingPrice || 0 : 0;

    const productData = {
      productName,
      bidDeadline,
      category,
      startingPrice: finalStartingPrice,
      immediatePurchasePrice,
      productDescription,
      images,
    };

    setErrorMessage('');
    onProductSubmit(productData);
  };

  return (
    <div className="w-[70%] mx-auto mt-10 p-8 bg-white rounded-lg relative">
      <UploadImageGallery
        images={images}
        onImageChange={handleImageChange}
        onImageRemove={handleImageRemove}
      />
      <CategorySelect
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />
      <ProductInputField
        id="productName"
        value={productName}
        onChange={(e) => setProductName(e.target.value)}
        placeholder="상품명을 입력하세요 (최대 30자)"
      />
      <ProductInputField
        id="bidDeadline"
        type="date"
        value={bidDeadline}
        onChange={(e) => setBidDeadline(e.target.value)}
      />
      <div className="flex items-center gap-4">
        <input
          type="checkbox"
          checked={isChecked}
          onChange={(e) => setIsChecked(e.target.checked)}
        />
        <ProductInputField
          id="startingPrice"
          type="number"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
          placeholder="경매 시작가"
          disabled={!isChecked}
        />
        <ProductInputField
          id="immediatePurchasePrice"
          type="number"
          value={immediatePurchasePrice}
          onChange={(e) => setImmediatePurchasePrice(e.target.value)}
          placeholder="즉시구매가"
        />
      </div>
      <textarea
        value={productDescription}
        onChange={(e) => setProductDescription(e.target.value)}
        className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="상품 설명을 입력해주세요 (최대 1000자)"
        rows="5"
      />
      <ErrorMessage message={errorMessage} />
      <button
        onClick={handleFormSubmit}
        className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 absolute bottom-5 right-5"
      >
        등록하기
      </button>
    </div>
  );
};

export default AddProductPage;
