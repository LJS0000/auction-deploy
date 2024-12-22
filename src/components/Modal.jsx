// Modal.jsx
import React from 'react';

const Modal = ({ isOpen, bidAmount, setBidAmount, onClose, onSubmit }) => {
  if (!isOpen) return null;

  return (
    <div
      id="modal-overlay"
      className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50"
      onClick={(e) => e.target.id === 'modal-overlay' && onClose()}
    >
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-xl font-bold mb-4">입찰하시겠습니까?</h2>
        <input
          type="number"
          value={bidAmount}
          onChange={(e) => setBidAmount(e.target.value)}
          className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
          placeholder="금액"
        />
        <div className="flex justify-end gap-4">
          <button
            onClick={onSubmit}
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            입찰
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
