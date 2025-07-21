// src/pages/Home.jsx
import BaseLayout from "../components/BaseLayout";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <BaseLayout>
      <h2 style={{ textAlign: "center", color: "#2ecc71" }}>Welcome to CustomFIT</h2>
      <p style={{ textAlign: "center", marginBottom: "1.5rem", color: "#34495e" }}>
        Your personalized fitness journey starts here.
      </p>
      <div style={{ textAlign: "center" }}>
      <Link to="/signup" className="button primary">Sign Up</Link>
      <Link to="/login" className="button secondary">Login</Link>
      </div>
    </BaseLayout>
  );
};

export default Home;
