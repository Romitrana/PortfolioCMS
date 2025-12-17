import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./SignIn.module.css";
import Loader from "../../UtilComponents/Loader";
const API_URL = import.meta.env.VITE_API_URL;
export default function SignIn() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill in both email and password.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_URL}/portfolio/user/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
        setLoading(false);
        return;
      }

      localStorage.setItem("admin_token", data.token);
      localStorage.setItem("admin_user", JSON.stringify(data.user));

      navigate("/admin");
    } catch (error) {
      setError("Something went wrong. Please try again.");
      console.error("Login Error:", error);
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.form} noValidate>
        <h2 className={styles.title}>Sign In</h2>

        {error && <div className={styles.error}>{error}</div>}

        <label htmlFor="email" className={styles.label}>
          Email
          <input
            id="email"
            type="email"
            className={styles.input}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            required
            autoComplete="email"
          />
        </label>

        <label htmlFor="password" className={styles.label}>
          Password
          <div className={styles.passwordWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              className={styles.input}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
              autoComplete="current-password"
            />

            {/* Eye Icon */}
            <span
              className={styles.eyeIcon}
              onClick={() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? (
                <i className="fa-solid fa-eye-slash"></i>
              ) : (
                <i className="fa-solid fa-eye"></i>
              )}
            </span>
          </div>
        </label>

        <button type="submit" className={styles.submitBtn} disabled={loading}>
          {loading ? <Loader /> : "Sign In"}
        </button>
      </form>
    </div>
  );
}
