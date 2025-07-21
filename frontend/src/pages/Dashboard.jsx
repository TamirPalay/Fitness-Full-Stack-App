import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import DashboardLayout from "../components/DashboardLayout"; // make sure this path is correct
import "../styles/dashboard.css";
import DashboardTabs from "../components/DashboardTabs";

const Dashboard = () => {
  const location = useLocation();
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    if (location.state?.showProfilePopup) {
      setShowPopup(true);
    }
  }, [location.state]);

  const closePopup = () => setShowPopup(false);

  const startProfileSetup = () => {
    // For now just close popup, later can navigate to profile form
    setShowPopup(false);
    // e.g., navigate('/profile-setup')
  };

  return (
    <DashboardLayout>
      <h1 style={{ marginBottom: "1rem", color: "#2ecc71" }}>Welcome to your Dashboard</h1>
      <p>Start exploring your workouts or create your own custom plan.</p>
      <DashboardTabs />
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Welcome to CustomFIT!</h2>
            <p>
              Let’s personalize your fitness journey. Tell us a bit about yourself to get started.
            </p>
            <div className="popup-buttons">
              <button className="primary-btn" onClick={startProfileSetup}>
                Let's Start
              </button>
              <button className="secondary-btn" onClick={closePopup}>
                Maybe Later
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
