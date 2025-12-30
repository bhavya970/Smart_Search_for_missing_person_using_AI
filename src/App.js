import About from "./pages/About/About";
import "./App.css";
import { ImageProvider } from "./context/ImageContext";
import Home from "./pages/Home/Home";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Faqs from "./pages/FAQs/Faqs";
import Upload from "./pages/Upload/Upload";
import Logout from "./components/Logout";
import Match from "./components/Matches";
import Profile from "./components/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Layout } from "./layout";
import NGOSupport from "./components/NGOSupport";

function App() {
  return (
    <ImageProvider>
      <Router>
        <div className="App">
          <Layout>
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
              <Route path="/ngo-support" element={<NGOSupport />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </ImageProvider>
  );
}

export default App;
