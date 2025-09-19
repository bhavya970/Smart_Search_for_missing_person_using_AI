import About from "./pages/About/about";
import "./App.css";
import { ImageProvider } from "./context/ImageContext";
import Home from "./pages/Home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Faqs from "./components/Faqs";
import Upload from "./components/Upload";
import Logout from "./components/Logout";
import Match from "./components/Matches"
import Profile from "./components/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <ImageProvider>
    <Router>
      <div className="App">
        {/* <header className="App-header"> */}
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/upload" element={<Upload />} />
            <Route path="/matches" element={<Match />} />
            <Route path="/faqs" element={<Faqs />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        {/* </header> */}
      </div>
    </Router>
    </ImageProvider>
  );
}

export default App;
