// import { useState } from "react";
// import "../styles/dashboardTabs.css"; 

// const tabs = [
//   { key: "all", label: "All Workouts" },
//   { key: "saved", label: "Saved" },
//   { key: "upcoming", label: "Upcoming" },
//   { key: "history", label: "History" },
// ];

// const DashboardTabs = () => {
//   const [activeTab, setActiveTab] = useState("all");

//   const renderContent = () => {
//     switch (activeTab) {
//       case "all":
//         return <div>Suggested workouts will appear here.</div>;
//       case "saved":
//         return <div>Your saved workouts.</div>;
//       case "upcoming":
//         return <div>Upcoming scheduled workouts.</div>;
//       case "history":
//         return <div>Your completed workouts.</div>;
//       default:
//         return null;
//     }
//   };

//   return (
//     <div className="dashboard-wrapper">
//       <div className="tabs-container">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             className={`tab-btn ${activeTab === tab.key ? "active" : ""}`}
//             onClick={() => setActiveTab(tab.key)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       <div className="tab-content">
//         {renderContent()}
//       </div>

//       {/* Mobile bottom nav */}
//       <div className="mobile-nav">
//         {tabs.map((tab) => (
//           <button
//             key={tab.key}
//             className={`mobile-nav-btn ${activeTab === tab.key ? "active" : ""}`}
//             onClick={() => setActiveTab(tab.key)}
//           >
//             {tab.label}
//           </button>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default DashboardTabs;

// src/components/DashboardTabs.jsx
import { useState, useEffect } from "react";
import { db } from "../services/firebase"; // <-- FIXED path
import { collection, getDocs } from "firebase/firestore";
import "../styles/dashboardTabs.css";

const DashboardTabs = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [workouts, setWorkouts] = useState([]);
  const [filteredWorkouts, setFilteredWorkouts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [difficultyFilter, setDifficultyFilter] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  useEffect(() => {
    const fetchWorkouts = async () => {
      const querySnapshot = await getDocs(collection(db, "Workouts"));
      const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setWorkouts(data);
      setFilteredWorkouts(data);
    };
    fetchWorkouts();
  }, []);

  useEffect(() => {
    let filtered = [...workouts];
    if (searchTerm) {
      filtered = filtered.filter((w) =>
        w.Name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (categoryFilter) {
      filtered = filtered.filter((w) => w.Category === categoryFilter);
    }
    if (difficultyFilter) {
      filtered = filtered.filter((w) => w.Difficulty === difficultyFilter);
    }
    if (sortOrder === "asc") {
      filtered.sort((a, b) => a.Name.localeCompare(b.Name));
    } else {
      filtered.sort((a, b) => b.Name.localeCompare(a.Name));
    }
    setFilteredWorkouts(filtered);
  }, [searchTerm, categoryFilter, difficultyFilter, sortOrder, workouts]);

  const renderWorkouts = () => (
    <>
      <div className="filters">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
        </select>
        <select value={difficultyFilter} onChange={(e) => setDifficultyFilter(e.target.value)}>
          <option value="">All Difficulty</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Advanced">Advanced</option>
        </select>
        <select value={sortOrder} onChange={(e) => setSortOrder(e.target.value)}>
          <option value="asc">Sort A-Z</option>
          <option value="desc">Sort Z-A</option>
        </select>
      </div>
      <div className="workout-grid">
        {filteredWorkouts.map((w) => (
          <div className="workout-card" key={w.id}>
            <h3>{w.Name}</h3>
            <p><strong>Category:</strong> {w.Category}</p>
            <p><strong>Difficulty:</strong> {w.Difficulty}</p>
            <p><strong>Duration:</strong> {w.DurationMinutes} minutes</p>
          </div>
        ))}
      </div>
    </>
  );

  const renderContent = () => {
    switch (activeTab) {
      case "all":
        return renderWorkouts();
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
      <div className="tab-content">{renderContent()}</div>
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

const tabs = [
  { key: "all", label: "All Workouts" },
  { key: "saved", label: "Saved" },
  { key: "upcoming", label: "Upcoming" },
  { key: "history", label: "History" },
];

export default DashboardTabs;

