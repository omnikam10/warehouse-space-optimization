import { useEffect, useState } from "react";

import type { FormEvent } from "react";

import {
  Eye,
  EyeOff,
  LockKeyhole,
  ShieldCheck,
  UserRound,
  Warehouse,
} from "lucide-react";

import { useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../auth/AuthContext";

import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  const { login, isAuthenticated, isLoading } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);

  const [rememberMe, setRememberMe] = useState(false);

  const [error, setError] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  /*
   * If the user is already logged in and
   * manually opens /login, send them back
   * to the dashboard.
   */
  useEffect(() => {
    if (!isLoading && isAuthenticated) {
      navigate("/", { replace: true });
    }
  }, [isAuthenticated, isLoading, navigate]);

  /*
   * Handle login form submission.
   */
  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");

    const cleanUsername = username.trim();

    /*
     * Basic validation
     */
    if (!cleanUsername) {
      setError("Please enter your username.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    setIsSubmitting(true);

    /*
     * Small delay to provide a natural
     * authentication/loading experience.
     */
    setTimeout(() => {
      const success = login(cleanUsername, password, rememberMe);

      if (!success) {
        setError("Invalid username or password.");

        setIsSubmitting(false);
        return;
      }

      /*
       * If the user was redirected to login
       * from another protected page, return
       * them to that page after successful login.
       *
       * Otherwise go to Dashboard.
       */
      const state = location.state as {
        from?: {
          pathname?: string;
          search?: string;
          hash?: string;
        };
      } | null;

      const destination = state?.from?.pathname || "/";

      navigate(destination, {
        replace: true,
      });

      setIsSubmitting(false);
    }, 500);
  };

  return (
    <div className="login-page">
      {/* ================================== */}
      {/* BACKGROUND */}
      {/* ================================== */}

      <div className="login-background">
        <div className="login-background-overlay" />

        <div className="login-glow login-glow-one" />

        <div className="login-glow login-glow-two" />
      </div>

      {/* ================================== */}
      {/* MAIN LOGIN CONTAINER */}
      {/* ================================== */}

      <div className="login-container">
        {/* ================================== */}
        {/* LEFT INFORMATION PANEL */}
        {/* ================================== */}

        <div className="login-info-panel">
          {/* Brand */}

          <div className="login-brand">
            <div className="login-brand-icon">
              <Warehouse size={27} />
            </div>

            <div>
              <h1>Warehouse Monitor</h1>

              <p>Space Optimization System</p>
            </div>
          </div>

          {/* Main information */}

          <div className="login-info-content">
            <div className="login-badge">
              <ShieldCheck size={15} />

              <span>Intelligent Warehouse Monitoring</span>
            </div>

            <h2>
              Optimize every
              <br />
              <span>square meter.</span>
            </h2>

            <p>
              Monitor warehouse utilization, analyze space, track activity and
              make data-driven optimization decisions from one centralized
              platform.
            </p>

            {/* Features */}

            <div className="login-features">
              <div className="login-feature">
                <div className="login-feature-icon">
                  <Warehouse size={17} />
                </div>

                <div>
                  <strong>Real-time Monitoring</strong>

                  <span>Track warehouse activity and utilization.</span>
                </div>
              </div>

              <div className="login-feature">
                <div className="login-feature-icon">
                  <ShieldCheck size={17} />
                </div>

                <div>
                  <strong>Intelligent Insights</strong>

                  <span>
                    Identify opportunities to optimize available space.
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}

          <div className="login-info-footer">
            <span>Warehouse Space Optimization</span>

            <span>v1.0</span>
          </div>
        </div>

        {/* ================================== */}
        {/* RIGHT LOGIN PANEL */}
        {/* ================================== */}

        <div className="login-form-panel">
          <div className="login-form-wrapper">
            {/* Mobile brand */}

            <div className="login-mobile-brand">
              <div className="login-brand-icon">
                <Warehouse size={24} />
              </div>

              <div>
                <h1>Warehouse Monitor</h1>

                <p>Space Optimization System</p>
              </div>
            </div>

            {/* Heading */}

            <div className="login-heading">
              <h2>Welcome Back</h2>

              <p>Sign in to access your dashboard</p>
            </div>

            {/* Error message */}

            {error && (
              <div className="login-error">
                <span className="login-error-icon">!</span>

                <p>{error}</p>
              </div>
            )}

            {/* ================================== */}
            {/* LOGIN FORM */}
            {/* ================================== */}

            <form onSubmit={handleSubmit} className="login-form">
              {/* Username */}

              <div className="login-field">
                <label htmlFor="username">Username</label>

                <div className="login-input-wrapper">
                  <UserRound size={18} className="login-input-icon" />

                  <input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    placeholder="Enter your username"
                    autoComplete="username"
                    autoFocus
                  />
                </div>
              </div>

              {/* Password */}

              <div className="login-field">
                <label htmlFor="password">Password</label>

                <div className="login-input-wrapper">
                  <LockKeyhole size={18} className="login-input-icon" />

                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your password"
                    autoComplete="current-password"
                  />

                  <button
                    type="button"
                    className="password-toggle"
                    onClick={() => setShowPassword((previous) => !previous)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Remember me */}

              <div className="login-options">
                <label className="remember-me">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(event) => setRememberMe(event.target.checked)}
                  />

                  <span>Remember me</span>
                </label>
              </div>

              {/* Sign in button */}

              <button
                type="submit"
                className="login-submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <span className="login-spinner" />

                    <span>Signing in...</span>
                  </>
                ) : (
                  <span>Sign In</span>
                )}
              </button>
            </form>

            {/* Security message */}

            <div className="login-security">
              <LockKeyhole size={14} />

              <span>Secure warehouse access</span>
            </div>

            <div className="login-register-link">
              <span>Don't have an account?</span>

              <a href="/register">Create New User</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
