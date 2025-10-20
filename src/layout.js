import "./App.css";
import Navbar from "./components/Navbar";
export function Layout({ children }) {
  return (
    <div className="app" style={{ minHeight: "100vh", width: "100vw" }}>
      <Navbar />
      {children}
    </div>
  );
}
