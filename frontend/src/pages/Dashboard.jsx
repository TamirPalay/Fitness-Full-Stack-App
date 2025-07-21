import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

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
    <div>
      <h1>Dashboard</h1>
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>Welcome to CustomFIT!</h2>
            <p>Let’s personalize your fitness journey. Tell us a bit about yourself to get started.</p>
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
      {/* Rest of your dashboard */}
    </div>
  );
};

export default Dashboard;
