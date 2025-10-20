import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./../pages/Home/Home.css";
import ProfileUploader from "./ProfileUploader/ProfileUploader";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    city: "",
    state: "",
    zipcode: "",
    country: "India",
  });
  const [user, setUser] = useState(null);
  const [file, setFile] = useState(null);
  const userId = sessionStorage.getItem("userId");
  const navigate=useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Collect form data
    const updatedData = {
      email: user?.email, // Assuming email is already in the formData
      phoneNumber: formData.phoneNumber,
      zipcode: formData.zipcode,
      state: formData.state,
      city: formData.city,
      profilePhoto: file,
      // profilePhoto: formData.profilePhoto, // URL or file upload logic
    };

    const fData = new FormData();
    fData.append("email", user?.email);
    fData.append("phoneNumber", formData.phoneNumber);
    fData.append("zipcode", formData.zipcode);
    fData.append("state", formData.state);
    fData.append("city", formData.city);
    if (file) fData.append("profilePhoto", file);

    console.log(JSON.stringify(fData));
    const response = await fetch("http://localhost:5000/update-profile", {
      method: "PATCH",
      body: fData,
    });
    const result = await response.json();
    console.log("Update response:", result);
    if (result.success) {
      const data = result.user;
      setUser(data);
      navigate("/home")
      sessionStorage.setItem("profilePhoto", data.profilePhoto);
    } else {
      console.error("Error updating profile:", response.message);
      alert("Failed to update profile.");
    }
  };

  useEffect(() => {
    if (userId) {
      fetch(`http://localhost:5000/api/user/${userId}`)
        .then((res) => res.json())
        .then((data) => {
          if (data?.profilePhoto) setFile(data.profilePhoto);
          setUser(data);
        })
        .catch((err) => {
          console.error("Failed to fetch user details:", err);
        });
    }
  }, [userId]);

  return (
    <div>
      <section className="details-section">
        <div
          style={{
            background: "#f9f9f9",
            borderRadius: "8px",
            padding: "36px",
            maxWidth: "600px",
            margin: "20px auto",
            boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
          }}
        >
          <h2 style={{ textAlign: "center", marginBottom: "20px" }}>
            Enter Your Details
          </h2>
          <form onSubmit={handleSubmit}>
            <ProfileUploader setFile={setFile} file={file} />
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  textAlign: "left",
                  marginLeft: "10px",
                }}
              >
                Full Name:
              </label>
              <input
                type="text"
                name="fullName"
                value={user?.username}
                disabled
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "6px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
                placeholder="Enter your full name"
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  textAlign: "left",
                  marginLeft: "10px",
                }}
              >
                Email:
              </label>
              <input
                type="email"
                name="email"
                value={user?.email}
                disabled
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "6px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
                placeholder="Enter your email"
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  textAlign: "left",
                  marginLeft: "10px",
                }}
              >
                Phone Number:
              </label>
              <input
                type="tel"
                name="phoneNumber"
                value={user?.phoneNumber || formData.phoneNumber}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "6px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
                placeholder="Enter your phone number"
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  textAlign: "left",
                  marginLeft: "10px",
                }}
              >
                City:
              </label>
              <input
                type="text"
                name="city"
                value={user?.city || formData.city}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "6px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
                placeholder="Enter your city"
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  textAlign: "left",
                  marginLeft: "10px",
                }}
              >
                State:
              </label>
              <select
                name="state"
                value={user?.state || formData.state}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "6px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
              >
                <option value="">Select State</option>
                <option value="Andhra Pradesh">Andhra Pradesh</option>
                <option value="Arunachal Pradesh">Arunachal Pradesh</option>
                <option value="Assam">Assam</option>
                <option value="Bihar">Bihar</option>
                <option value="Chhattisgarh">Chhattisgarh</option>
                <option value="Goa">Goa</option>
                <option value="Gujarat">Gujarat</option>
                <option value="Haryana">Haryana</option>
                <option value="Himachal Pradesh">Himachal Pradesh</option>
                <option value="Jharkhand">Jharkhand</option>
                <option value="Karnataka">Karnataka</option>
                <option value="Kerala">Kerala</option>
                <option value="Madhya Pradesh">Madhya Pradesh</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Manipur">Manipur</option>
                <option value="Meghalaya">Meghalaya</option>
                <option value="Mizoram">Mizoram</option>
                <option value="Nagaland">Nagaland</option>
                <option value="Odisha">Odisha</option>
                <option value="Punjab">Punjab</option>
                <option value="Rajasthan">Rajasthan</option>
                <option value="Sikkim">Sikkim</option>
                <option value="Tamil Nadu">Tamil Nadu</option>
                <option value="Telangana">Telangana</option>
                <option value="Tripura">Tripura</option>
                <option value="Uttar Pradesh">Uttar Pradesh</option>
                <option value="Uttarakhand">Uttarakhand</option>
                <option value="West Bengal">West Bengal</option>
              </select>
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  textAlign: "left",
                  marginLeft: "10px",
                }}
              >
                Zipcode:
              </label>
              <input
                type="text"
                name="zipcode"
                value={user?.zipcode || formData.zipcode}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "6px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                }}
                placeholder="Enter your zipcode"
              />
            </div>

            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  display: "block",
                  marginBottom: "5px",
                  textAlign: "left",
                  marginLeft: "10px",
                }}
              >
                Country:
              </label>
              <input
                type="text"
                name="country"
                value="India"
                disabed
                readOnly
                style={{
                  width: "100%",
                  padding: "6px",
                  fontSize: "14px",
                  borderRadius: "6px",
                  border: "1px solid #ccc",
                  background: "#e9ecef",
                }}
              />
            </div>

            <button
              type="submit"
              style={{
                padding: "10px 20px",
                background: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer",
                width: "100%",
              }}
            >
              Save Changes
            </button>
          </form>
        </div>
      </section>
      <footer
        style={{
          background: "#222",
          color: "#fff",
          textAlign: "center",
          padding: "32px 0",
        }}
      >
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <p style={{ fontSize: "1.2rem", fontWeight: "300", marginTop: 24 }}>
            Subscribe to get updates, important news, and alerts about missing
            persons.
          </p>
          <form
            style={{
              display: "flex",
              justifyContent: "center",
              gap: "8px",
              margin: "16px 0",
            }}
          >
            <input
              type="email"
              style={{
                padding: "8px 12px",
                borderRadius: "6px",
                border: "1px solid #ccc",
                fontSize: "1rem",
              }}
              placeholder="Your email"
            />
            <button
              type="submit"
              style={{
                background: "#4a90e2",
                color: "#fff",
                border: "none",
                borderRadius: "6px",
                marginTop: "6px",
                height: "40px",
                padding: "8px 20px",
                fontSize: "1rem",
                cursor: "pointer",
              }}
            >
              Subscribe
            </button>
          </form>
          <h2 style={{ fontSize: "1.4rem", fontWeight: "400", marginTop: 16 }}>
            &copy; {new Date().getFullYear()} AI Missing Person Finder. All
            rights reserved.
          </h2>
        </div>
      </footer>
    </div>
  );
};

export default Profile;
