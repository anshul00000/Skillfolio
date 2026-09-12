import { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from "react-router-dom";
import { Context } from '../../src/context/context_api.jsx';
import { toast } from 'react-toastify';
import './Login.css';

function Login() {
  const { save_tooken, backend_url } = useContext(Context);
  const navigate = useNavigate();

  // Login state
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loginErrors, setLoginErrors] = useState({ email: "", password: "" });

  // Forgot password state
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [forgotStep, setForgotStep] = useState('email'); // 'email', 'otp', 'password'
  const [forgotData, setForgotData] = useState({ email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [timeLeft, setTimeLeft] = useState(0);
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [forgotErrors, setForgotErrors] = useState({ email: "", password: "", otp: "" });
  const [isSendingOtp, setIsSendingOtp] = useState(false);
  const [isVerifyingOtp, setIsVerifyingOtp] = useState(false);
  const [isResettingPassword, setIsResettingPassword] = useState(false);

  // Handle login input changes
  const handleLoginChange = (e) => {
    const { name, value } = e.target;
    setLoginData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (loginErrors[name]) {
      setLoginErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  // Validate login form
  const validateLoginForm = () => {
    const errors = { email: "", password: "" };
    let isValid = true;

    if (!loginData.email) {
      errors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(loginData.email)) {
      errors.email = "Please enter a valid email address";
      isValid = false;
    }

    if (!loginData.password) {
      errors.password = "Password is required";
      isValid = false;
    } else if (loginData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
      isValid = false;
    }

    setLoginErrors(errors);
    return isValid;
  };

  // Handle login submit
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateLoginForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${backend_url}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(loginData),
      });

      const data = await response.json();

      if (data.tooken) {
        save_tooken(data.tooken);
        setLoginData({ email: "", password: "" });
        setLoginErrors({ email: "", password: "" });
        toast.success("Login successful! ✔️");
        navigate("/");
      } else {
        const errorMsg = data.message || data.msg || "Login failed";
        toast.error(errorMsg);
        // Set inline error for password field
        setLoginErrors(prev => ({ ...prev, password: errorMsg }));
      }
    } catch (error) {
      toast.error("Connection error. Please try again.");
      setLoginErrors(prev => ({ ...prev, password: "Connection error. Please try again." }));
    } finally {
      setIsLoading(false);
    }
  };

  // Forgot password handlers
  const handleForgotChange = (e) => {
    const { name, value } = e.target;
    setForgotData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (forgotErrors[name]) {
      setForgotErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const sendOtp = async () => {
    if (!forgotData.email) {
      setForgotErrors(prev => ({ ...prev, email: "Email is required!" }));
      return;
    }

    if (!/\S+@\S+\.\S+/.test(forgotData.email)) {
      setForgotErrors(prev => ({ ...prev, email: "Please enter a valid email address" }));
      return;
    }

    setForgotErrors(prev => ({ ...prev, email: "" }));
    setIsSendingOtp(true);

    try {
      const response = await fetch(`${backend_url}/sendotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotData.email, forget: true }),
      });

      const data = await response.json();

      if (data.status === 200) {
        toast.success(data.message);
        setForgotStep('otp');
        setTimeLeft(5 * 60);
        setIsTimerActive(true);
      } else {
        const errorMsg = data.message || "Failed to send OTP";
        toast.error(errorMsg);
        setForgotErrors(prev => ({ ...prev, email: errorMsg }));
      }
    } catch (error) {
      toast.error("Error sending OTP");
      setForgotErrors(prev => ({ ...prev, email: "Connection error. Please try again." }));
    } finally {
      setIsSendingOtp(false);
    }
  };

  const verifyOtp = async () => {
    if (!otp) {
      setForgotErrors(prev => ({ ...prev, otp: "OTP is required!" }));
      return;
    }

    if (otp.length < 4) {
      setForgotErrors(prev => ({ ...prev, otp: "Please enter a valid OTP" }));
      return;
    }

    setForgotErrors(prev => ({ ...prev, otp: "" }));
    setIsVerifyingOtp(true);

    try {
      const response = await fetch(`${backend_url}/verifyotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: forgotData.email, otp }),
      });

      const data = await response.json();

      if (data.status === 200) {
        toast.success(data.message);
        setForgotStep('password');
        setIsTimerActive(false);
      } else {
        const errorMsg = data.message || "Invalid OTP";
        toast.error(errorMsg);
        setForgotErrors(prev => ({ ...prev, otp: errorMsg }));
      }
    } catch (error) {
      toast.error("Error verifying OTP");
      setForgotErrors(prev => ({ ...prev, otp: "Connection error. Please try again." }));
    } finally {
      setIsVerifyingOtp(false);
    }
  };

  const resetPassword = async () => {
    if (!forgotData.password) {
      setForgotErrors(prev => ({ ...prev, password: "Password is required!" }));
      return;
    }

    if (forgotData.password.length < 6) {
      setForgotErrors(prev => ({ ...prev, password: "Password must be at least 6 characters" }));
      return;
    }

    setForgotErrors(prev => ({ ...prev, password: "" }));
    setIsResettingPassword(true);

    try {
      const response = await fetch(`${backend_url}/forget`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(forgotData),
      });

      const data = await response.json();

      if (data) {
        toast.success("Password changed successfully!");
        closeForgotModal();
      } else {
        const errorMsg = "Failed to change password";
        toast.error(errorMsg);
        setForgotErrors(prev => ({ ...prev, password: errorMsg }));
      }
    } catch (error) {
      toast.error("Error changing password");
      setForgotErrors(prev => ({ ...prev, password: "Connection error. Please try again." }));
    } finally {
      setIsResettingPassword(false);
    }
  };

  const closeForgotModal = () => {
    setShowForgotModal(false);
    setForgotStep('email');
    setForgotData({ email: "", password: "" });
    setOtp("");
    setIsTimerActive(false);
    setTimeLeft(0);
    setForgotErrors({ email: "", password: "", otp: "" });
    setIsSendingOtp(false);
    setIsVerifyingOtp(false);
    setIsResettingPassword(false);
  };

  const changeEmail = () => {
    setForgotStep('email');
    setIsTimerActive(false);
    setOtp("");
    setForgotErrors({ email: "", password: "", otp: "" });
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
      setForgotStep('email');
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
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <div className="login-icon">
              <i className="fa-solid fa-user-lock"></i>
            </div>
            <h1>Welcome Back</h1>
            <p>Login to continue to SKILLFOLIO</p>
          </div>

          <form onSubmit={handleLoginSubmit} className="login-form">
            <div className="input-group">
              <label htmlFor="email">
                <i className="fa-solid fa-envelope"></i>
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="Enter your email"
                className={loginErrors.email ? 'input-error' : ''}
                autoFocus
              />
              {loginErrors.email && (
                <span className="error-message">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {loginErrors.email}
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
                  value={loginData.password}
                  onChange={handleLoginChange}
                  placeholder="Enter your password"
                  className={loginErrors.password ? 'input-error' : ''}
                />
                <button
                  type="button"
                  className="toggle-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                </button>
              </div>
              {loginErrors.password && (
                <span className="error-message">
                  <i className="fa-solid fa-circle-exclamation"></i>
                  {loginErrors.password}
                </span>
              )}
            </div>

            <button
              type="button"
              className="forgot-password-link"
              onClick={() => setShowForgotModal(true)}
            >
              Forgot Password?
            </button>

            <button type="submit" className="login-btn" disabled={isLoading}>
              {isLoading ? (
                <>
                  <i className="fa-solid fa-spinner fa-spin"></i>
                  Logging in...
                </>
              ) : (
                <>
                  <i className="fa-solid fa-right-to-bracket"></i>
                  Login
                </>
              )}
            </button>

            <div className="divider">
              <span>OR</span>
            </div>

            <div className="signup-link">
              <p>Don't have an account?</p>
              <NavLink to="/signup" className="signup-btn">
                <i className="fa-solid fa-user-plus"></i>
                Create Account
              </NavLink>
            </div>
          </form>
        </div>

        {/* Decorative elements */}
        <div className="login-bg-circle login-bg-circle-1"></div>
        <div className="login-bg-circle login-bg-circle-2"></div>
        <div className="login-bg-circle login-bg-circle-3"></div>
      </div>

      {/* Forgot Password Modal */}
      {showForgotModal && (
        <div className="modal-overlay" onClick={closeForgotModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={closeForgotModal}>
              <i className="fa-solid fa-times"></i>
            </button>

            <div className="modal-header">
              <div className="modal-icon">
                <i className="fa-solid fa-key"></i>
              </div>
              <h2>
                {forgotStep === 'email' && 'Reset Password'}
                {forgotStep === 'otp' && 'Verify OTP'}
                {forgotStep === 'password' && 'New Password'}
              </h2>
              <p>
                {forgotStep === 'email' && 'Enter your email to receive OTP'}
                {forgotStep === 'otp' && `OTP sent to ${forgotData.email}`}
                {forgotStep === 'password' && 'Enter your new password'}
              </p>
            </div>

            <div className="modal-body">
              {forgotStep === 'email' && (
                <>
                  <div className="input-group">
                    <label htmlFor="forgot-email">
                      <i className="fa-solid fa-envelope"></i>
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="forgot-email"
                      name="email"
                      value={forgotData.email}
                      onChange={handleForgotChange}
                      placeholder="Enter your email"
                      className={forgotErrors.email ? 'input-error' : ''}
                      autoFocus
                    />
                    {forgotErrors.email && (
                      <span className="error-message">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        {forgotErrors.email}
                      </span>
                    )}
                  </div>
                  <button className="modal-btn" onClick={sendOtp} disabled={isSendingOtp}>
                    {isSendingOtp ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        Sending OTP...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-paper-plane"></i>
                        Send OTP
                      </>
                    )}
                  </button>
                </>
              )}

              {forgotStep === 'otp' && (
                <>
                  <div className="input-group">
                    <label htmlFor="otp">
                      <i className="fa-solid fa-shield-halved"></i>
                      Enter OTP
                    </label>
                    <input
                      type="text"
                      id="otp"
                      value={otp}
                      onChange={(e) => {
                        setOtp(e.target.value);
                        if (forgotErrors.otp) {
                          setForgotErrors(prev => ({ ...prev, otp: "" }));
                        }
                      }}
                      placeholder="Enter 6-digit OTP"
                      maxLength="6"
                      className={forgotErrors.otp ? 'input-error' : ''}
                      autoFocus
                    />
                    {forgotErrors.otp && (
                      <span className="error-message">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        {forgotErrors.otp}
                      </span>
                    )}
                  </div>
                  <div className="timer">
                    <i className="fa-solid fa-clock"></i>
                    OTP expires in: <strong>{formatTime()}</strong>
                  </div>
                  <button className="modal-btn" onClick={verifyOtp} disabled={isVerifyingOtp}>
                    {isVerifyingOtp ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        Verifying...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-check-circle"></i>
                        Verify OTP
                      </>
                    )}
                  </button>
                  <div className="modal-actions">
                    <button className="link-btn" onClick={sendOtp} disabled={isSendingOtp}>
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
                    <button className="link-btn" onClick={changeEmail}>
                      <i className="fa-solid fa-envelope"></i>
                      Change Email
                    </button>
                  </div>
                </>
              )}

              {forgotStep === 'password' && (
                <>
                  <div className="input-group">
                    <label htmlFor="new-password">
                      <i className="fa-solid fa-lock"></i>
                      New Password
                    </label>
                    <input
                      type="password"
                      id="new-password"
                      name="password"
                      value={forgotData.password}
                      onChange={handleForgotChange}
                      placeholder="Enter new password (min 6 characters)"
                      className={forgotErrors.password ? 'input-error' : ''}
                      autoFocus
                    />
                    {forgotErrors.password && (
                      <span className="error-message">
                        <i className="fa-solid fa-circle-exclamation"></i>
                        {forgotErrors.password}
                      </span>
                    )}
                  </div>
                  <button className="modal-btn" onClick={resetPassword} disabled={isResettingPassword}>
                    {isResettingPassword ? (
                      <>
                        <i className="fa-solid fa-spinner fa-spin"></i>
                        Resetting...
                      </>
                    ) : (
                      <>
                        <i className="fa-solid fa-check"></i>
                        Reset Password
                      </>
                    )}
                  </button>
                  <button className="link-btn" onClick={changeEmail}>
                    <i className="fa-solid fa-envelope"></i>
                    Change Email
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Login;
