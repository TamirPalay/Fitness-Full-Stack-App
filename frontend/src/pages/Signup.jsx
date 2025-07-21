import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../services/firebase";
import BaseLayout from "../components/BaseLayout";
import "../styles/signup.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";



const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Sign up successful!");
      navigate("/dashboard", { state: { showProfilePopup: true } });
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <BaseLayout>
      <div className="signup-container">
        <h2>Welcome to CustomFIT!</h2>
        <p>Let's get you started on your fitness journey.</p>
        <form onSubmit={handleSignup}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {error && <p className="error">{error}</p>}
          <button type="submit">Sign Up</button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1rem" }}>
  Already have an account? <Link to="/login">Login</Link>
</p>

      </div>
    </BaseLayout>
  );
};

export default Signup;
