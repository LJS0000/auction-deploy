import React from 'react';
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const ProductPriceChart = ({ bidHistory }) => {
  // recharts에 맞는 데이터 변환 및 날짜 형식 지정
  const chartData = bidHistory.map((bid) => {
    if (!bid.time) {
      console.error('Missing time field in bidHistory:', bid);
      return { time: 'Invalid Date', price: bid.price };
    }

    const date = new Date(bid.time);

    if (isNaN(date.getTime())) {
      console.error('Invalid date format in bidHistory:', bid.time);
      return { time: 'Invalid Date', price: bid.price };
    }

    const formattedDate = `${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}/${date.getDate().toString().padStart(2, '0')}`;

    return {
      time: formattedDate,
      price: bid.price,
    };
  });

  return (
    <div className="h-48 bg-gray-100 rounded-md">
      {chartData.length > 0 ? (
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={chartData}
            margin={{ top: 20, right: 30, left: 20, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis
              dataKey="time"
              label={{
                value: '날짜',
                position: 'insideBottomRight',
                offset: -10,
              }}
            />
            <YAxis
              label={{ value: '가격', angle: -90, position: 'insideLeft' }}
            />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="price"
              stroke="#8884d8"
              strokeWidth={2}
              isAnimationActive={false}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="flex items-center justify-center h-full text-gray-400">
          <p>가격그래프를 표시하려면 입찰을 진행하세요</p>
        </div>
      )}
    </div>
  );
};

export default ProductPriceChart;
