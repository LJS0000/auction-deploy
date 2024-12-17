import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
} from 'chart.js';

ChartJS.register(LineElement, CategoryScale, LinearScale, PointElement);

const DetailPage = ({ product }) => {
  if (!product) {
    product = {
      title: '편안한 스포츠 신발',
      description:
        '이 신발은 뛰어난 착용감과 내구성을 제공합니다. 일상적인 착용부터 스포츠 활동까지 모두 적합합니다.',
      startingPrice: 100,
      currentPrice: 150,
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

  const handleBidSubmit = () => {
    if (bidAmount && !isNaN(bidAmount)) {
      const currentTime = new Date().toLocaleTimeString();
      setBidHistory([
        ...bidHistory,
        { time: currentTime, price: parseFloat(bidAmount) },
      ]);
      setIsModalOpen(false);
      setBidAmount('');
    }
  };

  const handleModalClick = (e) => {
    if (e.target.id === 'modal-overlay') {
      setIsModalOpen(false);
    }
  };

  const graphData = {
    labels: bidHistory.map((bid) => bid.time),
    datasets: [
      {
        label: '입찰 가격',
        data: bidHistory.map((bid) => bid.price),
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
      },
    ],
  };

  return (
    <div className="max-w-7xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg grid grid-cols-1 md:grid-cols-2 gap-6">
      {/*왼쪽에 이미지 */}
      <div className="flex flex-col gap-4">
        <img
          src={mainImage}
          alt={product.title}
          className="w-full h-[500px] object-cover rounded-lg shadow-md"
        />
        <div className="flex gap-4">
          {product.images.map((image, index) => (
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
      </div>

      {/* 오른쪽에 정보 */}
      <div className="flex flex-col gap-6">
        <h1 className="text-2xl font-bold">{product.title}</h1>

        <p className="text-gray-700">실시간 경매가: ${product.startingPrice}</p>
        <p className="text-gray-700">즉시구매가: ${product.currentPrice}</p>

        {/* 그래프 */}
        <div className="h-48 bg-gray-100 rounded-md">
          {bidHistory.length > 0 ? (
            <Line data={graphData} />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400">
              <p>가격그래프를 표시하려면 입찰을 진행하세요</p>
            </div>
          )}
        </div>

        {/* 입찰 버튼 */}
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          입찰하기
        </button>
      </div>

      {/* 모달 */}
      {isModalOpen && (
        <div
          id="modal-overlay"
          className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleModalClick}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">입찰 금액 입력</h2>
            <input
              type="number"
              value={bidAmount}
              onChange={(e) => setBidAmount(e.target.value)}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              placeholder="입찰 금액을 입력하세요"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsModalOpen(false)}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-400"
              >
                취소
              </button>
              <button
                onClick={handleBidSubmit}
                className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
              >
                입찰하기
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 설명 */}
      <div className="col-span-2 mt-6">
        <p className="text-gray-700">{product.description}</p>
      </div>
    </div>
  );
};

export default DetailPage;
