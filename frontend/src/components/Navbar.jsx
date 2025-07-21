import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '1rem 2rem',
      backgroundColor: '#2ecc71',
      color: 'white',
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
    }}>
      <div style={{ fontWeight: 'bold', fontSize: '1.2rem' }}>
        CustomFIT
      </div>
      <div style={{ display: 'flex', gap: '1rem' }}>
        <Link to="/dashboard/suggested" style={linkStyle}>Suggested</Link>
        <Link to="/dashboard/saved" style={linkStyle}>Saved</Link>
        <Link to="/dashboard/upcoming" style={linkStyle}>Upcoming</Link>
        <Link to="/dashboard/completed" style={linkStyle}>Completed</Link>
        <div className="profile-dropdown" style={{ marginLeft: '2rem' }}>
          <span style={{ cursor: 'pointer' }}>Profile ⌄</span>
          {/* You can later build a dropdown menu here */}
        </div>
      </div>
    </nav>
  );
};

const linkStyle = {
  color: 'white',
  textDecoration: 'none',
  fontWeight: '500',
};

export default Navbar;
