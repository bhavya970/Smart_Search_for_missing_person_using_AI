// ProfileUploader.js
import React, { useState } from "react";
import "./ProfileUploader.css";
import { FaUserLarge } from "react-icons/fa6";

const ProfileUploader = ({ setFile, file }) => {
  const [image, setImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    console.log(file);
    if (file) {
      setFile(file); // Pass the file back to parent component
      const reader = new FileReader();
      console.log(reader.result);
      reader.onload = () => {
        setImage(reader.result);
        sessionStorage.setItem("profilePhoto", reader.result);
        // setFile(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile-container">
      <div className="profile-wrapper">
        {(!image && !file) || file === "undefined" ? (
          <>
            <label htmlFor="fileInput" className="upload-btn">
              <FaUserLarge
                className="avatar-icon"
                style={{ height: "75px", width: "75px", color: "lightgrey" }}
              />
            </label>
            <input
              type="file"
              name="profilePhoto"
              id="fileInput"
              accept="image/*"
              onChange={handleImageChange}
              style={{ display: "none" }}
            />
          </>
        ) : (
          <img
            src={image || file}
            alt="Profile"
            className="profile-image"
            style={{ height: "120px", width: "150px", borderRadius: "50%" }}
          />
        )}
      </div>
    </div>
  );
};

export default ProfileUploader;
