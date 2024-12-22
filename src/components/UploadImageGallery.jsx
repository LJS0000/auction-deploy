const UploadImageGallery = ({ images, onImageChange, onImageRemove }) => (
  <div className="mb-6">
    <div className="flex gap-4 flex-wrap mb-4">
      {images.map((image, index) => (
        <div key={index} className="relative w-32 h-32">
          <img
            src={URL.createObjectURL(image)}
            alt={`이미지 ${index + 1}`}
            className="w-full h-full object-cover rounded-md"
          />
          <button
            type="button"
            className="absolute top-1 right-1 p-1 rounded-full"
            onClick={() => onImageRemove(index)}
          >
            &times;
          </button>
        </div>
      ))}
    </div>
    {images.length < 5 && (
      <label className="border rounded-md cursor-pointer text-gray-500 hover:bg-gray-100 px-2 py-1 flex items-center justify-center text-[20px]">
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={onImageChange}
        />
        +
      </label>
    )}
  </div>
);

export default UploadImageGallery;
