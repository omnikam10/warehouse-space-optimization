import { useState } from "react";

import type { FormEvent } from "react";

import {
  ArrowLeft,
  CheckCircle2,
  Eye,
  EyeOff,
  LockKeyhole,
  UserRound,
  UserPlus,
  Warehouse,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { createUser, type UserRole } from "../auth/authService";

import "./Register.css";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [confirmPassword, setConfirmPassword] = useState("");

  const [role, setRole] = useState<UserRole>("operator");

  const [showPassword, setShowPassword] = useState(false);

  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const [success, setSuccess] = useState("");

  const [isSubmitting, setIsSubmitting] = useState(false);

  /* =====================================================
     FORM SUBMIT
  ===================================================== */

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const cleanName = name.trim();

    const cleanUsername = username.trim();

    /*
     * Basic validation
     */

    if (!cleanName) {
      setError("Please enter your full name.");
      return;
    }

    if (!cleanUsername) {
      setError("Please enter a username.");
      return;
    }

    if (!password) {
      setError("Please enter a password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setIsSubmitting(true);

    /*
     * Create the account.
     */

    setTimeout(() => {
      const result = createUser(cleanUsername, password, cleanName, role);

      if (!result.success) {
        setError(result.message);

        setIsSubmitting(false);

        return;
      }

      /*
       * Account created.
       */

      setSuccess("Account created successfully. Redirecting to login...");

      /*
       * Give the user a moment to see
       * the success message.
       */

      setTimeout(() => {
        navigate("/login", {
          replace: true,
          state: {
            registeredUsername: cleanUsername,
          },
        });
      }, 1000);
    }, 500);
  };

  return (
    <div className="register-page">
      {/* =========================================
          BACKGROUND
      ========================================= */}

      <div className="register-background">
        <div className="register-background-overlay" />

        <div className="register-glow register-glow-one" />

        <div className="register-glow register-glow-two" />
      </div>

      {/* =========================================
          MAIN CONTAINER
      ========================================= */}

      <div className="register-container">
        {/* =======================================
            HEADER
        ======================================= */}

        <div className="register-header">
          <Link to="/login" className="register-back">
            <ArrowLeft size={17} />

            <span>Back to Sign In</span>
          </Link>

          <div className="register-brand">
            <div className="register-brand-icon">
              <Warehouse size={25} />
            </div>

            <div>
              <h1>Warehouse Monitor</h1>

              <p>Space Optimization System</p>
            </div>
          </div>
        </div>

        {/* =======================================
            FORM
        ======================================= */}

        <div className="register-content">
          <div className="register-title">
            <div className="register-title-icon">
              <UserPlus size={20} />
            </div>

            <div>
              <h2>Create New User</h2>

              <p>
                Create an account to access the warehouse monitoring system.
              </p>
            </div>
          </div>

          {/* Error */}

          {error && (
            <div className="register-error">
              <span>!</span>

              <p>{error}</p>
            </div>
          )}

          {/* Success */}

          {success && (
            <div className="register-success">
              <CheckCircle2 size={17} />

              <p>{success}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="register-form">
            {/* Full Name */}

            <div className="register-field">
              <label htmlFor="name">Full Name</label>

              <div className="register-input-wrapper">
                <UserRound size={18} className="register-input-icon" />

                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Enter your full name"
                  autoComplete="name"
                  autoFocus
                />
              </div>
            </div>

            {/* Username */}

            <div className="register-field">
              <label htmlFor="username">Username</label>

              <div className="register-input-wrapper">
                <UserRound size={18} className="register-input-icon" />

                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  placeholder="Choose a username"
                  autoComplete="username"
                />
              </div>
            </div>

            {/* Role */}

            <div className="register-field">
              <label htmlFor="role">User Role</label>

              <div className="register-input-wrapper">
                <select
                  id="role"
                  value={role}
                  onChange={(event) => setRole(event.target.value as UserRole)}
                >
                  <option value="operator">Operator</option>

                  <option value="manager">Manager</option>

                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            {/* Password */}

            <div className="register-field">
              <label htmlFor="password">Password</label>

              <div className="register-input-wrapper">
                <LockKeyhole size={18} className="register-input-icon" />

                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="Create a password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() => setShowPassword((current) => !current)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Confirm Password */}

            <div className="register-field">
              <label htmlFor="confirmPassword">Confirm Password</label>

              <div className="register-input-wrapper">
                <LockKeyhole size={18} className="register-input-icon" />

                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  placeholder="Confirm your password"
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="register-password-toggle"
                  onClick={() => setShowConfirmPassword((current) => !current)}
                  aria-label={
                    showConfirmPassword ? "Hide password" : "Show password"
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* Submit */}

            <button
              type="submit"
              className="register-submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <span className="register-spinner" />

                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <UserPlus size={17} />

                  <span>Create Account</span>
                </>
              )}
            </button>
          </form>

          {/* Login link */}

          <div className="register-login-link">
            Already have an account?
            <Link to="/login">Sign In</Link>
          </div>
        </div>

        {/* =======================================
            FOOTER
        ======================================= */}

        <div className="register-footer">
          <span>Warehouse Space Optimization</span>

          <span>v1.0</span>
        </div>
      </div>
    </div>
  );
}

export default Register;
