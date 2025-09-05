// src/context/ImageContext.js
import React, { createContext, useState } from "react";

export const ImageContext = createContext();

export const ImageProvider = ({ children }) => {
  const [uploadedImages, setUploadedImages] = useState([]);

  const addImage = (imageData) => {
    setUploadedImages((prev) => [...prev, imageData]);
  };

  return (
    <ImageContext.Provider value={{ uploadedImages, addImage }}>
      {children}
    </ImageContext.Provider>
  );
};
