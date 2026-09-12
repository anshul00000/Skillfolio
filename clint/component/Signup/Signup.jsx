import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from '../../src/context/context_api.jsx';
import { toast } from 'react-toastify';
import './Signup.css';

function Signup() {
  const { save_tooken, backend_url } = useContext(Context);
  const navigate = useNavigate();

  // Signup state
  const [signupData, setSignupData] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [signupErrors, setSignupErrors] = useState({
    username: "",
    email: "",
    password: "",
    phone: ""
  });

  // OTP state
  const [showOtpModal, setShowOtpModal] = useState(false);
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);

  // Loading states
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSignupData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (signupErrors[name]) {
      setSignupErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate signup form
  const validateSignupForm = () => {
    const errors = {
      username: "",
      email: "",
      password: "",
      phone: ""
    };
    let isValid = true;

    if (!signupData.username) {
      errors.username = "Username is required";
      isValid = false;
    } else if (signupData.username.length < 3) {
      errors.username = "Username must be at least 3 characters";
      isValid = false;
    }

    if (!signupData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(signupData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!signupData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (signupData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    if (!signupData.phone) {
      errors.phone = "Phone number is required";
      isValid = false;
    } else if (!/^\d{10}$/.test(signupData.phone)) {
      errors.phone = "Please enter a valid 10-digit phone number";
      isValid = false;
    }

    setSignupErrors(errors);
    return isValid;
  };

  // Send OTP
  const sendOtp = async (e) => {
    e.preventDefault();

    if (!validateSignupForm()) {
      return;
    }

    setIsSendingOtp(true);

    try {
      const response = await fetch(`${backend_url}/sendotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupData.email }),
      });

      const data = await response.json();

      if (data.status === 200) {
        toast.success(data.message);
        setShowOtpModal(true);
        setTimeLeft(5 * 60);
        setIsTimerActive(true);
      } else {
        const errorMsg = data.message || "Failed to send OTP";
        toast.error(errorMsg);
        setSignupErrors(prev => ({ ...prev, email: errorMsg }));
      }
    } catch (error) {
      toast.error("Error sending OTP");
      setSignupErrors(prev => ({ ...prev, email: "Connection error. Please try again." }));
    } finally {
      setIsSendingOtp(false);
    }
  };

  // Register user
  const registerUser = async () => {
    try {
      const response = await fetch(`${backend_url}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(signupData),
      });

      const data = await response.json();

      if (data.tooken) {
        save_tooken(data.tooken);
        setSignupData({ username: "", email: "", password: "", phone: "" });
        toast.success("Registration successful!");
        navigate("/");
      } else {
        const errorMsg = data.message || data.msg || "Registration failed";
        toast.error(errorMsg);
        throw new Error(errorMsg);
      }
    } catch (error) {
      throw error;
    }
  };

  // Verify OTP
  const verifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      setOtpError("OTP is required!");
      return;
    }

    if (otp.length < 4) {
      setOtpError("Please enter a valid OTP");
      return;
    }

    setOtpError("");
    setIsVerifyingOtp(true);

    try {
      const response = await fetch(`${backend_url}/verifyotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: signupData.email, otp }),
      });

      const data = await response.json();

      if (data.status === 200) {
        toast.success(data.message);
        await registerUser();
        closeOtpModal();
      } else {
        const errorMsg = data.message || "Invalid OTP";
        toast.error(errorMsg);
        setOtpError(errorMsg);
      }
    } catch (error) {
      toast.error("Error verifying OTP");
      setOtpError("Connection error. Please try again.");
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const closeOtpModal = () => {
    setShowOtpModal(false);
    setOtp("");
    setOtpError("");
    setIsTimerActive(false);
    setTimeLeft(0);
  };

  // Timer effect
  useEffect(() => {
    let timer;
    if (isTimerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isTimerActive) {
      setIsTimerActive(false);
      toast.error("OTP expired!");
      closeOtpModal();
    }
    return () => clearInterval(timer);
  }, [isTimerActive, timeLeft]);

  const formatTime = () => {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <>
      <div className="signup-container">
        <div className="signup-card">
          <div className="signup-header">
            <div className="signup-icon">
              <i className="fa-solid fa-user-plus"></i>
            </div>
            <h1>Create Account</h1>
            <p>Join SKILLFOLIO and showcase your skills</p>
          </div>

          <form onSubmit={sendOtp} className="signup-form">
            <div className="input-group">
              <label htmlFor="username">
                <i className="fa-solid fa-user"></i>
                Username
              </label>
              <input
                type="text"
                id="username"
                name="username"
                value={signupData.username}
                onChange={handleInputChange}
                placeholder="Enter your username"
                className={signupErrors.username ? 'input-error' : ''}
                autoFocus
              />
              {signupErrors.username && (
                <span className="error-message">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {signupErrors.username}
                </span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="email">
                <i className="fa-solid fa-envelope"></i>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={signupData.email}
                onChange={handleInputChange}
                placeholder="Enter your email"
                className={signupErrors.email ? 'input-error' : ''}
              />
              {signupErrors.email && (
                <span className="error-message">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {signupErrors.email}
                </span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="password">
                <i className="fa-solid fa-lock"></i>
                Password
              </label>
              <div className="password-input-wrapper">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  value={signupData.password}
                  onChange={handleInputChange}
                  placeholder="Enter your password"
                  className={signupErrors.password ? 'input-error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {signupErrors.password && (
                <span className="error-message">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {signupErrors.password}
                </span>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="phone">
                <i className="fa-solid fa-phone"></i>
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={signupData.phone}
                onChange={handleInputChange}
                placeholder="Enter your phone number"
                className={signupErrors.phone ? 'input-error' : ''}
                maxLength="10"
              />
              {signupErrors.phone && (
                <span className="error-message">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {signupErrors.phone}
                </span>
              )}
            </div>

            <button type="submit" className="signup-btn" disabled={isSendingOtp}>
              {isSendingOtp ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Sending OTP...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-paper-plane"></i>
                  Sign Up
                </>
              )}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="login-link">
              <p>Already have an account?</p>
              <NavLink to="/login" className="login-btn-link">
                <i className="fa-solid fa-right-to-bracket"></i>
                Login
              </NavLink>
            </div>
          </form>
        </div>

        {/* Decorative elements */}
        <div className="signup-bg-circle signup-bg-circle-1"></div>
        <div className="signup-bg-circle signup-bg-circle-2"></div>
        <div className="signup-bg-circle signup-bg-circle-3"></div>
      </div>

      {/* OTP Modal */}
      {showOtpModal && (
        <div className="modal-overlay" onClick={closeOtpModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeOtpModal}>
              <i className="fa-solid fa-times"></i>
            </button>

            <div className="modal-header">
              <div className="modal-icon">
                <i className="fa-solid fa-shield-halved"></i>
              </div>
              <h2>Verify OTP</h2>
              <p>OTP sent to {signupData.email}</p>
            </div>

            <form onSubmit={verifyOtp} className="modal-body">
              <div className="input-group">
                <label htmlFor="otp">
                  <i className="fa-solid fa-key"></i>
                  Enter OTP
                </label>
                <input
                  type="text"
                  id="otp"
                  value={otp}
                  onChange={(e) => {
                    setOtp(e.target.value);
                    if (otpError) setOtpError("");
                  }}
                  placeholder="Enter 6-digit OTP"
                  maxLength="6"
                  className={otpError ? 'input-error' : ''}
                  autoFocus
                />
                {otpError && (
                  <span className="error-message">
                    <i className="fa-solid fa-circle-exclamation"></i>
                    {otpError}
                  </span>
                )}
              </div>

              <div className="timer">
                <i className="fa-solid fa-clock"></i>
                OTP expires in: <strong>{formatTime()}</strong>
              </div>

              <button type="submit" className="modal-btn" disabled={isVerifyingOtp}>
                {isVerifyingOtp ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Verifying...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-check-circle"></i>
                    Verify & Register
                  </>
                )}
              </button>

              <button
                type="button"
                className="link-btn"
                onClick={(e) => {
                  e.preventDefault();
                  sendOtp(e);
                }}
                disabled={isSendingOtp}
              >
                {isSendingOtp ? (
                  <>
                    <i className="fa-solid fa-spinner fa-spin"></i>
                    Sending...
                  </>
                ) : (
                  <>
                    <i className="fa-solid fa-rotate"></i>
                    Resend OTP
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default Signup;
