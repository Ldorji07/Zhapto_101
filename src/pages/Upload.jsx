import React, { useState } from "react";

const ImageUploadPage = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
    }
  };

  const handleUpload = () => {
    if (!selectedImage) return;
    // Here you can send the image to your server or API
    alert("Image uploaded successfully!");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-50 to-indigo-100 p-6">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Upload Your Image
        </h1>

        {/* Upload Box */}
        <label className="flex flex-col items-center justify-center w-full h-40 border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:border-blue-500 transition">
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
          <span className="text-gray-500">Click to select an image</span>
        </label>

        {/* Preview */}
        {selectedImage && (
          <div className="mt-6">
            <img
              src={selectedImage}
              alt="Preview"
              className="rounded-xl shadow-md mx-auto max-h-60 object-contain"
            />
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={handleUpload}
          className="mt-6 px-6 py-3 w-full bg-blue-600 text-white font-medium rounded-xl shadow-md hover:bg-blue-700 transition"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default ImageUploadPage;
