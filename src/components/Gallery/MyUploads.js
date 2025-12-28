import React, { useEffect, useState } from "react";
import "./Gallery.css";
import GalleryCard from "./GalleryCard";
import UploadedCard from "./UploadedCard";

const MyUploads = () => {
  const [cases, setCases] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likes, setLikes] = useState(0);
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});

  useEffect(() => {
    fetch(`http://localhost:5000/api/mycases/${sessionStorage.getItem("userId")}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("fetched cases", data);
        setCases(data);
        // setLikes(data.likeCount || 0);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);


  return (
    <div className="gallery-section">
      <h2>My Uploads</h2>
      {loading ? (
        <p>Loading...</p>
      ) : cases.length === 0 ? (
        <p>No cases found.</p>
      ) : (
        <div className="gallery-grid">
          {cases.map((item) => (
            <UploadedCard key={item._id} item={item} />
           
          ))}
        </div>
      )}
    </div>
  );
};

export default MyUploads;