import { useState } from "react";
import "../styles/dashboardTabs.css"; // we'll define this next

const tabs = [
  { key: "all", label: "All Workouts" },
  { key: "saved", label: "Saved" },
  { key: "upcoming", label: "Upcoming" },
  { key: "history", label: "History" },
];

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("all");

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return <div>Suggested workouts will appear here.</div>;
      case "saved":
        return <div>Your saved workouts.</div>;
      case "upcoming":
        return <div>Upcoming scheduled workouts.</div>;
      case "history":
        return <div>Your completed workouts.</div>;
      default:
        return null;
    }
  };

  return (
    <div className="dashboard-wrapper">
      <div className="tabs-container">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <div className="tab-content">
        {renderContent()}
      </div>

      {/* Mobile bottom nav */}
      <div className="mobile-nav">
        {tabs.map((tab) => (
          <button
            key={tab.key}
            className={`mobile-nav-btn ${activeTab === tab.key ? "active" : ""}`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default DashboardTabs;
