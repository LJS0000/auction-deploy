import React, { useState } from 'react';
import ProductImage from '../components/ProductImage';
import ProductThumbnail from '../components/ProductThumbnail';
import ProductPriceChart from '../components/ProductPriceChart';
import Modal from '../components/Modal';

const DetailPage = ({ product }) => {
  if (!product) {
    product = {
      productName: '편안한 스포츠 신발',
      productDescription:
        '이 신발은 뛰어난 착용감과 내구성을 제공합니다. 일상적인 착용부터 스포츠 활동까지 모두 적합합니다.',
      startingPrice: 100,
      immediatePurchasePrice: 150,
      images: [
        'https://tse1.mm.bing.net/th?id=OIP.mK86e5IKFb8QUgerx-OhuQHaE8&pid=Api',
        'https://tse4.mm.bing.net/th?id=OIP.JdoHKxDRCbA9pNbos-Z8JQHaHa&pid=Api',
        'https://tse1.mm.bing.net/th?id=OIP.wOlNxVToKCHBPHG0cOqvjQHaHa&pid=Api',
        'https://tse1.mm.bing.net/th?id=OIP.fmU91rkYxhqInUSz5X4B8wHaHa&pid=Api',
        'https://tse4.mm.bing.net/th?id=OIP.0DV5YloiAPrjpd6DGSMt0QHaHa&pid=Api',
      ],
    };
  }

  const [mainImage, setMainImage] = useState(product.images[0]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bidAmount, setBidAmount] = useState('');
  const [bidHistory, setBidHistory] = useState([]);
  const [currentStartingPrice, setCurrentStartingPrice] = useState(
    product.startingPrice
  );

  const addBid = () => {
    if (bidAmount && !isNaN(bidAmount) && bidAmount > 0) {
      const currentTime = new Date().toISOString(); // ISO 형식으로 저장
      setBidHistory([
        ...bidHistory,
        { time: currentTime, price: parseFloat(bidAmount) },
      ]);
      setCurrentStartingPrice(parseFloat(bidAmount));
      setIsModalOpen(false);
      setBidAmount('');
    } else {
      alert('유효한 금액을 입력해주세요.');
    }
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
      <div className="flex flex-col gap-4">
        <ProductImage mainImage={mainImage} title={product.productName} />
        <ProductThumbnail
          images={product.images}
          mainImage={mainImage}
          setMainImage={setMainImage}
        />
      </div>

      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">{product.productName}</h1>
        <div className="flex gap-4 text-gray-700">
          <p>실시간 경매가: {currentStartingPrice}원</p>
          <p>즉시구매가: {product.immediatePurchasePrice}원</p>
        </div>
        <ProductPriceChart bidHistory={bidHistory} />
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          입찰하기
        </button>
      </div>

      <div className="col-span-2 mt-6">
        <h2 className="text-xl font-bold mb-2">제품 설명</h2>
        <p className="text-gray-700">{product.productDescription}</p>
      </div>

      <Modal
        isOpen={isModalOpen}
        bidAmount={bidAmount}
        setBidAmount={setBidAmount}
        onClose={() => setIsModalOpen(false)}
        onSubmit={addBid}
      />
    </div>
  );
};

export default DetailPage;
