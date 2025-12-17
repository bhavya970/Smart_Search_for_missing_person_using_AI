// import React, { useContext, useState } from "react";
// import { useNavigate, Link } from "react-router-dom";
// import { ImageContext } from "../../context/ImageContext";
// import "./Home.css";
// import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
// import Component1 from "../../components/ImageCarousel/Component1";
// import Component2 from "../../components/ImageCarousel/Component2";
// import Component3 from "../../components/ImageCarousel/Component3";
// import Component4 from "../../components/ImageCarousel/Component4";
// import Gallery from "../../components/Gallery/Gallery";
// import Navbar from "../../components/Navbar";
// import TableView from "../../components/TableView";

// const Home = () => {
//   const navigate = useNavigate();
//   const { uploadedImages } = useContext(ImageContext);

//   // local state for likes & comments
//   const [likes, setLikes] = useState({});
//   const [showCommentBox, setShowCommentBox] = useState({});
//   const [comments, setComments] = useState({});
//   const [commentInput, setCommentInput] = useState({});
//   const [activeTab, setActiveTab] = useState("gallery");

//   const handleLike = (index) => {
//     setLikes((prev) => ({
//       ...prev,
//       [index]: prev[index] ? prev[index] - 1 : 1, // toggle
//     }));
//   };

//   const handleCommentToggle = (index) => {
//     setShowCommentBox((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const handleCommentChange = (index, value) => {
//     setCommentInput((prev) => ({
//       ...prev,
//       [index]: value,
//     }));
//   };

//   const handleAddComment = (index) => {
//     if (!commentInput[index]) return;
//     setComments((prev) => ({
//       ...prev,
//       [index]: [...(prev[index] || []), commentInput[index]],
//     }));
//     setCommentInput((prev) => ({ ...prev, [index]: "" }));
//   };

//   const handleShare = (item) => {
//     const shareText = `Missing Person Alert 🚨\n\n${item.description}\nReward: ₹${item.reward}`;
//     if (navigator.share) {
//       navigator
//         .share({
//           title: "AI Missing Person Matcher",
//           text: shareText,
//           url: window.location.href,
//         })
//         .catch((err) => console.log("Share failed:", err));
//     } else {
//       alert(
//         "Sharing not supported on this browser. Copy link: " +
//           window.location.href
//       );
//     }
//   };

//   return (
//     <div>
//       <section className="carousel-section">
//         <ImageCarousel
//           images={[
//             <Component1 />,
//             <Component2 />,
//             <Component3 />,
//             <Component4 />,
//           ]}
//         />
//       </section>
//       <section><div style={{ display: "flex", justifyContent: "center", margin: "24px 0 8px 0" }}>
//         <button
//           onClick={() => setActiveTab("gallery")}
//           style={{
//             padding: "10px 32px",
//             marginRight: "8px",
//             borderRadius: "6px 0 0 6px",
//             border: activeTab === "gallery" ? "2px solid #007bff" : "1px solid #ccc",
//             background: activeTab === "gallery" ? "#eaf4ff" : "#fff",
//             fontWeight: activeTab === "gallery" ? "bold" : "normal",
//             cursor: "pointer"
//           }}
//         >
//           Gallery View
//         </button>
//         <button onClick={() => setActiveTab("table")}
//           style={{
//             padding: "10px 32px",
//             borderRadius: "0 6px 6px 0",
//             border: activeTab === "table" ? "2px solid #007bff" : "1px solid #ccc",
//             background: activeTab === "table" ? "#eaf4ff" : "#fff",
//             fontWeight: activeTab === "table" ? "bold" : "normal",
//             cursor: "pointer"
//           }}
//         >
//           Table View
//         </button>
//       </div>
//       <section>
//         {activeTab === "gallery" ? <Gallery /> : <TableView />}
//       </section></section>
//     </div>
//   );
// };

// export default Home;
import React, { useContext, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ImageContext } from "../../context/ImageContext";
import "./Home.css";
import ImageCarousel from "../../components/ImageCarousel/ImageCarousel";
import Component1 from "../../components/ImageCarousel/Component1";
import Component2 from "../../components/ImageCarousel/Component2";
import Component3 from "../../components/ImageCarousel/Component3";
import Component4 from "../../components/ImageCarousel/Component4";
import Gallery from "../../components/Gallery/Gallery";
import Navbar from "../../components/Navbar";
import TableView from "../../components/TableView";

const Home = () => {
  const navigate = useNavigate();
  const { uploadedImages } = useContext(ImageContext);

  // local state for likes & comments
  const [likes, setLikes] = useState({});
  const [showCommentBox, setShowCommentBox] = useState({});
  const [comments, setComments] = useState({});
  const [commentInput, setCommentInput] = useState({});
  const [activeTab, setActiveTab] = useState("gallery");

  const handleLike = (index) => {
    setLikes((prev) => ({
      ...prev,
      [index]: prev[index] ? prev[index] - 1 : 1, // toggle
    }));
  };

  const handleCommentToggle = (index) => {
    setShowCommentBox((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleCommentChange = (index, value) => {
    setCommentInput((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleAddComment = (index) => {
    if (!commentInput[index]) return;
    setComments((prev) => ({
      ...prev,
      [index]: [...(prev[index] || []), commentInput[index]],
    }));
    setCommentInput((prev) => ({ ...prev, [index]: "" }));
  };

  const handleShare = (item) => {
    const shareText = `Missing Person Alert 🚨\n\n${item.description}\nReward: ₹${item.reward}`;
    if (navigator.share) {
      navigator
        .share({
          title: "AI Missing Person Matcher",
          text: shareText,
          url: window.location.href,
        })
        .catch((err) => console.log("Share failed:", err));
    } else {
      alert(
        "Sharing not supported on this browser. Copy link: " +
          window.location.href
      );
    }
  };

  return (
    <div>
      <section className="carousel-section">
        <ImageCarousel
          images={[
            <Component1 />,
            <Component2 />,
            <Component3 />,
            <Component4 />,
          ]}
        />
      </section>
      <section><div style={{ display: "flex", justifyContent: "center", margin: "24px 0 8px 0" }}>
        <button
          onClick={() => setActiveTab("gallery")}
          style={{
            padding: "10px 32px",
            marginRight: "8px",
            borderRadius: "6px 0 0 6px",
            border: activeTab === "gallery" ? "2px solid #007bff" : "1px solid #ccc",
            background: activeTab === "gallery" ? "#eaf4ff" : "#fff",
            fontWeight: activeTab === "gallery" ? "bold" : "normal",
            cursor: "pointer"
          }}
        >
          Gallery View
        </button>
        <button onClick={() => setActiveTab("table")}
          style={{
            padding: "10px 32px",
            borderRadius: "0 6px 6px 0",
            border: activeTab === "table" ? "2px solid #007bff" : "1px solid #ccc",
            background: activeTab === "table" ? "#eaf4ff" : "#fff",
            fontWeight: activeTab === "table" ? "bold" : "normal",
            cursor: "pointer"
          }}
        >
          Table View
        </button>
      </div>
      <section>
        {activeTab === "gallery" ? <Gallery /> : <TableView />}
      </section></section>
    </div>
  );
};

export default Home;