import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./../../components/Home.css";

const styles = {
  inputButtonStyle: {
    width: "100%",
    padding: "10px",
    borderRadius: "0px",
    height: "40px",
    fontSize: "14px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "12px",
    gap: "2px",
    alignItems: "flex-start",
  },
  label: {
    fontStyle: "italic",
    fontFamily: "cursive",
    marginLeft: "8px",
  },
  uploadContainer: {
    width: "65%",
  },
};

const Upload = () => {
  const [image, setImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [formState, setFormState] = useState({
    name: "",
    age: "",
    gender: "",
    landMark: "",
    city: "",
    postalCode: "",
    state: "",
    description: "",
    reward: "",
  });
  const [formErrors, setFormErrors] = useState({
    nameError: "",
    ageError: "",
    genderError: "",
    landMarkError: "",
    cityError: "",
    postalCodeError: "",
    stateError: "",
    descriptionError: "",
    rewardError: "",
    photoError: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleImageChange = (e) => {
    setFormErrors({ ...formErrors, photoError: "" });
    const file = e.target.files[0];
    setImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    let errors = {};
    if (!image || !previewUrl) errors.photoError = "Photo is required.";
    if (!formState.name.trim()) errors.nameError = "Name is required.";
    if (!formState.age.trim()) errors.ageError = "Age is required.";
    else if (isNaN(formState.age) || Number(formState.age) <= 0)
      errors.ageError = "Enter a valid age.";
    if (!formState.gender.trim()) errors.genderError = "Gender is required.";
    if (!formState.landMark.trim())
      errors.landMarkError = "Landmark is required.";
    if (!formState.city.trim()) errors.cityError = "City is required.";
    if (!formState.postalCode.trim())
      errors.postalCodeError = "Postal code is required.";
    else if (!/^\d{6}$/.test(formState.postalCode))
      errors.postalCodeError = "Enter a valid 6-digit postal code.";
    if (!formState.state.trim()) errors.stateError = "State is required.";
    if (!formState.reward.trim()) errors.rewardError = "Reward is required.";
    else if (isNaN(formState.reward) || Number(formState.reward) < 0)
      errors.rewardError = "Reward must be a valid number (Rupees).";
    if (!image) errors.photoError = "Photo is required.";

    setFormErrors(errors);

    if (Object.keys(errors).length > 0) {
      setError("⚠ Please fix the errors above.");
      return;
    }

    setError("");
    setLoading(true);

    const formData = new FormData();
    formData.append("image", image);
    formData.append("description", formState.description);
    formData.append("reward", formState.reward);
    formData.append("name", formState.name);
    formData.append("age", formState.age);
    formData.append("gender", formState.gender);
    formData.append("landMark", formState.landMark);
    formData.append("city", formState.city);
    formData.append("postalCode", formState.postalCode);
    formData.append("state", formState.state);
    formData.append("uploadedUserId", sessionStorage.getItem("userId") || null);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.success) {
        alert("✅ Image uploaded successfully!");
        navigate("/home");
      } else {
        setFormErrors({
          ...formErrors,
          photoError: data.error || "Upload failed.",
        });
      }
    } catch (err) {
      setError("Server error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <section className="carousel-section">
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row",
            margin: "10px 0px",
          }}
        >
          <div
            style={{
              background: "linear-gradient(4deg, black, #710707)",
              borderRadius: "8px",
              height: "350px",
              width: "100vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "space-around",
              padding: "36px 100px",
              marginBottom: "24px",
            }}
          >
            <h1
              style={{
                color: "white",
                fontSize: "2.6rem",
                fontWeight: "800",
                marginBottom: 24,
              }}
            >
              Upload Missing Person Information
            </h1>
            <h3
              style={{
                fontSize: "1.4rem",
                color: "white",
                fontWeight: "400",
                marginBottom: 16,
              }}
            >
              Help us reunite families by submitting details and a photo of a
              missing person.
            </h3>
            <p
              style={{ fontSize: "1.1rem", color: "white", fontWeight: "300" }}
            >
              Your submission will be securely stored and matched using
              AI-powered face recognition. Please provide clear images and
              accurate information to improve search results.
            </p>
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section
        style={{
          background: "rgba(255,255,255,0.22)",
          borderRadius: "18px",
          margin: "30px auto",
          width: "40%",
          padding: "30px 25px",
          boxShadow: "0 4px 24px 0 rgba(31, 38, 135, 0.10)",
          color: "#222",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            color: "white",
            fontWeight: "500",
            marginBottom: 16,
            color: "black",
          }}
        >
          Upload Missing Person Info
        </h2>
        <p style={{ fontSize: "1rem", color: "#444" }}>
          Upload a photo and provide details. Add a reward (in Rupees) for
          finding this person.
        </p>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Name*</label>
          <input
            name="name"
            id="name"
            placeholder="Enter Name"
            value={formState.name}
            onChange={(e) => {
              setFormState({ ...formState, name: e.target.value });
              setFormErrors({ ...formErrors, nameError: "" });
            }}
            style={{
              ...styles.inputButtonStyle,
              border: formErrors.nameError
                ? "2px solid red"
                : styles.inputButtonStyle.border,
            }}
          />
          {formErrors.nameError && (
            <span
              style={{
                color: "red",
                fontSize: "0.95em",
                marginTop: "2px",
                marginLeft: "4px",
              }}
            >
              {formErrors.nameError}
            </span>
          )}
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
          }}
        >
          <div style={styles.inputContainer}>
            <label style={styles.label}>Age*</label>
            <input
              name="age"
              id="age"
              value={formState.age}
              placeholder="Enter Age"
              onChange={(e) => {
                setFormState({ ...formState, age: e.target.value });
                setFormErrors({ ...formErrors, ageError: "" });
              }}
              style={{
                ...styles.inputButtonStyle,
                border: formErrors.ageError
                  ? "2px solid red"
                  : styles.inputButtonStyle.border,
              }}
            />
            {formErrors.ageError && (
              <span
                style={{
                  color: "red",
                  fontSize: "0.95em",
                  marginTop: "2px",
                  marginLeft: "4px",
                }}
              >
                {formErrors.ageError}
              </span>
            )}
          </div>
          <div style={{ ...styles.inputContainer, gap: "6px" }}>
            <label style={styles.label}>Gender*</label>
            <select
              name="gender"
              value={formState.gender}
              placeholder="Select Gender"
              style={{
                ...styles.inputButtonStyle,

                border: formErrors.genderError
                  ? "2px solid red"
                  : styles.inputButtonStyle.border,

                margin: "5px",
                border: "1px solid #ccc",
                textSizeAdjust: "100%",
                width: "187px",
              }}
              onChange={(e) => {
                setFormState({ ...formState, gender: e.target.value });
                setFormErrors({ ...formErrors, genderError: "" });
              }}
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {formErrors.genderError && (
              <span
                style={{
                  color: "red",
                  fontSize: "0.95em",
                  marginTop: "2px",
                  marginLeft: "4px",
                }}
              >
                {formErrors.genderError}
              </span>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={styles.inputContainer}>
            <label style={styles.label}>LandMark*</label>
            <input
              name="landMark"
              id="landmark"
              value={formState.landMark}
              placeholder="Enter Nearest Landmark"
              onChange={(e) => {
                setFormState({ ...formState, landMark: e.target.value });
                setFormErrors({ ...formErrors, landMarkError: "" });
              }}
              style={{
                ...styles.inputButtonStyle,
                border: formErrors.landMarkError
                  ? "2px solid red"
                  : styles.inputButtonStyle.border,
              }}
            />
            {formErrors.landMarkError && (
              <span
                style={{
                  color: "red",
                  fontSize: "0.95em",
                  marginTop: "2px",
                  marginLeft: "4px",
                }}
              >
                {formErrors.landMarkError}
              </span>
            )}
          </div>
          <div style={{ ...styles.inputContainer }}>
            <label style={styles.label}>City*</label>
            <input
              name="city"
              id="city"
              value={formState.city}
              placeholder="Enter City"
              onChange={(e) => {
                setFormState({ ...formState, city: e.target.value });
                setFormErrors({ ...formErrors, cityError: "" });
              }}
              style={{
                ...styles.inputButtonStyle,
                border: formErrors.cityError
                  ? "2px solid red"
                  : styles.inputButtonStyle.border,
              }}
            />
            {formErrors.cityError && (
              <span
                style={{
                  color: "red",
                  fontSize: "0.95em",
                  marginTop: "2px",
                  marginLeft: "4px",
                }}
              >
                {formErrors.cityError}
              </span>
            )}
          </div>
        </div>
        <div
          style={{
            display: "flex",
            gap: "16px",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={styles.inputContainer}>
            <label style={styles.label}>State*</label>
            <select
              name="state"
              placeholder="Select State"
              value={formState.state}
              style={{
                ...styles.inputButtonStyle,
                border: formErrors.stateError
                  ? "2px solid red"
                  : styles.inputButtonStyle.border,
                margin: "5px",
                border: "1px solid #ccc",
                textSizeAdjust: "100%",
                width: "187px",
              }}
              onChange={(e) => {
                setFormState({ ...formState, state: e.target.value });
                setFormErrors({ ...formErrors, stateError: "" });
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
            {formErrors.stateError && (
              <span
                style={{
                  color: "red",
                  fontSize: "0.95em",
                  marginTop: "2px",
                  marginLeft: "4px",
                }}
              >
                {formErrors.stateError}
              </span>
            )}
          </div>
          <div style={{ ...styles.inputContainer }}>
            <label style={styles.label}>Pincode*</label>
            <input
              name="pincode"
              id="pincode"
              value={formState.postalCode}
              placeholder="Enter Postal Code"
              onChange={(e) => {
                setFormState({ ...formState, postalCode: e.target.value });
                setFormErrors({ ...formErrors, postalCodeError: "" });
              }}
              style={{
                ...styles.inputButtonStyle,
                border: formErrors.rewardError
                  ? "2px solid red"
                  : styles.inputButtonStyle.border,
              }}
            />
            {formErrors.postalCodeError && (
              <span
                style={{
                  color: "red",
                  fontSize: "0.95em",
                  marginTop: "2px",
                  marginLeft: "4px",
                }}
              >
                {formErrors.postalCodeError}
              </span>
            )}
          </div>
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Reward*</label>
          <input
            name="reward"
            id="reward"
            placeholder="Enter Reward Amount (in Rupees)"
            value={formState.reward}
            onChange={(e) => {
              setFormState({ ...formState, reward: e.target.value });
              setFormErrors({ ...formErrors, rewardError: "" });
            }}
            style={{
              ...styles.inputButtonStyle,
              border: formErrors.rewardError
                ? "2px solid red"
                : styles.inputButtonStyle.border,
            }}
          />
          {formErrors.rewardError && (
            <span
              style={{
                color: "red",
                fontSize: "0.95em",
                marginTop: "2px",
                marginLeft: "4px",
              }}
            >
              {formErrors.rewardError}
            </span>
          )}
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Photo*</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            style={{
              ...styles.inputButtonStyle,
              padding: "8px",

              border: formErrors.photoError
                ? "2px solid red"
                : styles.inputButtonStyle.border,
            }}
          />
          {formErrors.photoError && (
            <span
              style={{
                color: "red",
                fontSize: "0.95em",
                marginTop: "2px",
                marginLeft: "4px",
              }}
            >
              Photo is required.
            </span>
          )}
          {previewUrl && (
            <div
              className="preview"
              style={{
                margin: "auto",
                textAlign: "center",
              }}
            >
              <img
                src={previewUrl}
                alt="Preview"
                style={{
                  width: "120px",
                  height: "120px",
                  objectFit: "cover",
                  borderRadius: "12px",
                  border: "2px solid #4a90e2",
                }}
              />
            </div>
          )}
        </div>
        <div style={styles.inputContainer}>
          <label style={styles.label}>Description (Optionl)</label>
          <textarea
            placeholder="Enter description about the person..."
            value={formState.description}
            onChange={(e) =>
              setFormState({ ...formState, description: e.target.value })
            }
            style={{
              ...styles.inputButtonStyle,

              resize: "none",
              minHeight: "60px",
            }}
          />
        </div>
        {/* Upload Button */}
        <button
          className="upload-btn"
          onClick={handleUpload}
          disabled={loading}
          style={{
            width: "100%",
            padding: "12px",
            borderRadius: "8px",
            height: "48px",
            background: loading
              ? "#aaa"
              : "linear-gradient(90deg, #4a90e2 0%, #9013fe 100%)",
            color: "#fff",
            border: "none",
            fontWeight: "bold",
            fontSize: "1rem",
            cursor: loading ? "not-allowed" : "pointer",
          }}
        >
          {loading ? "Processing..." : "Upload"}
        </button>
      </section>
    </div>
  );
};

export default Upload;
