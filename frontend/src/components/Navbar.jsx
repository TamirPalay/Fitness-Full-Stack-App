import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.link}>Home</Link>
      <Link to="/signup" style={styles.link}>Sign Up</Link>
      <Link to="/login" style={styles.link}>Log In</Link>
    </nav>
  );
};

const styles = {
  nav: {
    padding: "1rem",
    backgroundColor: "#2ecc71",
    display: "flex",
    justifyContent: "center",
    gap: "2rem"
  },
  link: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold"
  }
};

export default Navbar;
