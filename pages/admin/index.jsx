import axios from "axios";
import { useFormik } from "formik";
import Link from "next/link";
import { adminSchema } from "../../schema/admin";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";

const Login = () => {
  const { push } = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const onSubmit = async (values, actions) => {
    setIsLoading(true);
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/admin`,
        values
      );
      if (res.status === 200) {
        actions.resetForm();
        toast.success("Admin Login Success!");
        push("/admin/profile");
      }
    } catch (err) {
      toast.error("Invalid credentials. Please try again.");
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  const { values, errors, touched, handleSubmit, handleChange, handleBlur } =
    useFormik({
      initialValues: {
        username: "",
        password: "",
      },
      onSubmit,
      validationSchema: adminSchema,
    });

  return (
    <>
      <style jsx global>{`

        .admin-login-wrapper {
          display: flex;
          min-height: 100vh;
          font-family: 'Inter', sans-serif;
          overflow: hidden;
        }

        /* ─── Left Visual Panel ─── */
        .admin-left-panel {
          flex: 1;
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #1a1a2e 0%, #16213e 40%, #0f3460 100%);
          overflow: hidden;
        }

        .admin-left-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(255, 190, 51, 0.12) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 107, 53, 0.08) 0%, transparent 40%),
            radial-gradient(circle at 60% 80%, rgba(255, 190, 51, 0.06) 0%, transparent 40%);
        }

        /* Animated Grid */
        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(255, 190, 51, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 190, 51, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridDrift 20s linear infinite;
        }

        @keyframes gridDrift {
          from { transform: translate(0, 0); }
          to { transform: translate(60px, 60px); }
        }

        /* Floating Orbs */
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(40px);
          animation: orbFloat 8s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          background: rgba(255, 190, 51, 0.15);
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 200px;
          height: 200px;
          background: rgba(255, 107, 53, 0.1);
          bottom: 20%;
          right: 15%;
          animation-delay: -3s;
        }

        .orb-3 {
          width: 150px;
          height: 150px;
          background: rgba(255, 190, 51, 0.08);
          top: 60%;
          left: 50%;
          animation-delay: -5s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.05); }
          66% { transform: translate(-20px, 20px) scale(0.95); }
        }

        /* Branding Content */
        .brand-content {
          position: relative;
          z-index: 2;
          text-align: center;
          padding: 3rem;
          max-width: 480px;
        }

        .brand-icon-ring {
          width: 120px;
          height: 120px;
          border-radius: 50%;
          border: 2px solid rgba(255, 190, 51, 0.3);
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 2rem;
          position: relative;
          animation: ringPulse 3s ease-in-out infinite;
        }

        .brand-icon-ring::before {
          content: '';
          position: absolute;
          inset: -8px;
          border-radius: 50%;
          border: 1px solid rgba(255, 190, 51, 0.1);
          animation: ringPulse 3s ease-in-out infinite reverse;
        }

        @keyframes ringPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.05); opacity: 0.8; }
        }

        .brand-icon-inner {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: linear-gradient(135deg, #ffbe33 0%, #ff6b35 100%);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 36px;
          box-shadow: 0 8px 32px rgba(255, 190, 51, 0.3);
        }

        .brand-title {
          font-size: 2.5rem;
          font-weight: 800;
          color: #fff;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .brand-title span {
          background: linear-gradient(135deg, #ffbe33, #ff6b35);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-subtitle {
          color: rgba(255, 255, 255, 0.5);
          font-size: 1rem;
          font-weight: 400;
          margin-bottom: 3rem;
          line-height: 1.6;
        }

        /* Stats Row */
        .brand-stats {
          display: flex;
          justify-content: center;
          gap: 3rem;
        }

        .stat-item {
          text-align: center;
        }

        .stat-number {
          font-size: 1.75rem;
          font-weight: 700;
          color: #ffbe33;
          display: block;
        }

        .stat-label {
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.4);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 0.25rem;
        }

        /* Floating food items */
        .float-food {
          position: absolute;
          font-size: 2rem;
          opacity: 0.15;
          animation: floatUp 12s linear infinite;
          z-index: 1;
        }

        .float-food:nth-child(1) { left: 10%; animation-delay: 0s; animation-duration: 14s; }
        .float-food:nth-child(2) { left: 25%; animation-delay: -3s; animation-duration: 11s; }
        .float-food:nth-child(3) { left: 45%; animation-delay: -6s; animation-duration: 16s; }
        .float-food:nth-child(4) { left: 65%; animation-delay: -2s; animation-duration: 13s; }
        .float-food:nth-child(5) { left: 80%; animation-delay: -8s; animation-duration: 15s; }
        .float-food:nth-child(6) { left: 35%; animation-delay: -10s; animation-duration: 12s; }

        @keyframes floatUp {
          from {
            transform: translateY(100vh) rotate(0deg);
            opacity: 0;
          }
          10% { opacity: 0.15; }
          90% { opacity: 0.15; }
          to {
            transform: translateY(-100px) rotate(360deg);
            opacity: 0;
          }
        }

        /* ─── Right Login Panel ─── */
        .admin-right-panel {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #0d0d0d;
          position: relative;
          padding: 2rem;
        }

        .admin-right-panel::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(ellipse at 0% 50%, rgba(255, 190, 51, 0.03) 0%, transparent 60%);
        }

        .login-card {
          width: 100%;
          max-width: 420px;
          position: relative;
          z-index: 2;
        }

        .login-card-header {
          margin-bottom: 2.5rem;
        }

        .login-badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(255, 190, 51, 0.1);
          border: 1px solid rgba(255, 190, 51, 0.2);
          color: #ffbe33;
          font-size: 0.7rem;
          font-weight: 600;
          padding: 6px 14px;
          border-radius: 100px;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          margin-bottom: 1.5rem;
        }

        .login-badge svg {
          width: 12px;
          height: 12px;
        }

        .login-heading {
          font-size: 2rem;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 0.5rem;
          letter-spacing: -0.02em;
        }

        .login-subheading {
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.9rem;
          font-weight: 400;
        }

        /* Form Elements */
        .admin-form-group {
          margin-bottom: 1.25rem;
        }

        .admin-form-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 500;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 0.5rem;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .admin-input-wrapper {
          position: relative;
        }

        .admin-input-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: rgba(255, 255, 255, 0.25);
          transition: color 0.3s ease;
          pointer-events: none;
        }

        .admin-input-icon svg {
          width: 18px;
          height: 18px;
        }

        .admin-input {
          width: 100%;
          height: 52px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          padding: 0 16px 0 48px;
          font-size: 0.9rem;
          color: #fff;
          font-family: 'Inter', sans-serif;
          transition: all 0.3s ease;
          outline: none;
        }

        .admin-input::placeholder {
          color: rgba(255, 255, 255, 0.2);
        }

        .admin-input:focus {
          border-color: rgba(255, 190, 51, 0.5);
          background: rgba(255, 190, 51, 0.04);
          box-shadow: 0 0 0 3px rgba(255, 190, 51, 0.08);
        }

        .admin-input:focus ~ .admin-input-icon,
        .admin-input:focus + .admin-input-icon {
          color: #ffbe33;
        }

        .admin-input.has-error {
          border-color: rgba(255, 70, 70, 0.5);
          background: rgba(255, 70, 70, 0.04);
        }

        .password-toggle {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.25);
          cursor: pointer;
          padding: 4px;
          transition: color 0.2s;
        }

        .password-toggle:hover {
          color: rgba(255, 255, 255, 0.6);
        }

        .password-toggle svg {
          width: 18px;
          height: 18px;
        }

        .error-text {
          font-size: 0.75rem;
          color: #ff4646;
          margin-top: 6px;
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .error-text svg {
          width: 12px;
          height: 12px;
          flex-shrink: 0;
        }

        /* Login Button */
        .admin-login-btn {
          width: 100%;
          height: 52px;
          background: linear-gradient(135deg, #ffbe33 0%, #ff9500 100%);
          border: none;
          border-radius: 12px;
          color: #1a1a2e;
          font-size: 0.9rem;
          font-weight: 700;
          font-family: 'Inter', sans-serif;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 2rem;
          position: relative;
          overflow: hidden;
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        .admin-login-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #ff9500 0%, #ffbe33 100%);
          opacity: 0;
          transition: opacity 0.3s;
        }

        .admin-login-btn:hover::before {
          opacity: 1;
        }

        .admin-login-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(255, 190, 51, 0.3);
        }

        .admin-login-btn:active {
          transform: translateY(0);
        }

        .admin-login-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .admin-login-btn span {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        /* Loading Spinner */
        .btn-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(26, 26, 46, 0.2);
          border-top-color: #1a1a2e;
          border-radius: 50%;
          animation: spin 0.6s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Footer */
        .login-footer {
          margin-top: 2rem;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .login-footer-link {
          color: rgba(255, 255, 255, 0.35);
          font-size: 0.8rem;
          text-decoration: none;
          transition: color 0.2s;
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .login-footer-link:hover {
          color: #ffbe33;
        }

        .login-footer-link svg {
          width: 14px;
          height: 14px;
        }

        .login-divider {
          width: 1px;
          height: 14px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Animated appearance */
        .fade-in {
          opacity: 0;
          transform: translateY(20px);
          transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .fade-in.visible {
          opacity: 1;
          transform: translateY(0);
        }

        .fade-in-delay-1 { transition-delay: 0.1s; }
        .fade-in-delay-2 { transition-delay: 0.2s; }
        .fade-in-delay-3 { transition-delay: 0.3s; }
        .fade-in-delay-4 { transition-delay: 0.4s; }
        .fade-in-delay-5 { transition-delay: 0.5s; }

        /* ─── Responsive ─── */
        @media (max-width: 900px) {
          .admin-left-panel {
            display: none;
          }
          .admin-right-panel {
            min-height: 100vh;
          }
        }

        @media (max-width: 480px) {
          .login-card {
            padding: 0 0.5rem;
          }
          .login-heading {
            font-size: 1.6rem;
          }
        }
      `}</style>

      <div className="admin-login-page">
        <div className="admin-login-wrapper">
          {/* ═══════ Left Visual Panel ═══════ */}
          <div className="admin-left-panel">
            <div className="grid-pattern" />
            <div className="orb orb-1" />
            <div className="orb orb-2" />
            <div className="orb orb-3" />

            {/* Floating food emojis */}
            <div className="float-food">🍕</div>
            <div className="float-food">🍔</div>
            <div className="float-food">🍝</div>
            <div className="float-food">🥗</div>
            <div className="float-food">🍰</div>
            <div className="float-food">🍜</div>

            <div className="brand-content">
              <div className="brand-icon-ring">
                <div className="brand-icon-inner">
                  <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2L2 7l10 5 10-5-10-5z"/>
                    <path d="M2 17l10 5 10-5"/>
                    <path d="M2 12l10 5 10-5"/>
                  </svg>
                </div>
              </div>
              <h1 className="brand-title">
                <span>Feane</span> Admin
              </h1>
              <p className="brand-subtitle">
                Manage your restaurant operations, menu items, orders, and customer experience — all from one place.
              </p>
              <div className="brand-stats">
                <div className="stat-item">
                  <span className="stat-number">150+</span>
                  <span className="stat-label">Menu Items</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">2.4K</span>
                  <span className="stat-label">Orders</span>
                </div>
                <div className="stat-item">
                  <span className="stat-number">98%</span>
                  <span className="stat-label">Satisfaction</span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════ Right Login Panel ═══════ */}
          <div className="admin-right-panel">
            <div className="login-card">
              {/* Badge */}
              <div className={`fade-in ${mounted ? 'visible' : ''}`}>
                <div className="login-badge">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                  Secure Access
                </div>
              </div>

              {/* Header */}
              <div className={`login-card-header fade-in fade-in-delay-1 ${mounted ? 'visible' : ''}`}>
                <h2 className="login-heading">Welcome back</h2>
                <p className="login-subheading">Enter your credentials to access the dashboard</p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit}>
                {/* Username */}
                <div className={`admin-form-group fade-in fade-in-delay-2 ${mounted ? 'visible' : ''}`}>
                  <label className="admin-form-label" htmlFor="admin-username">Username</label>
                  <div className="admin-input-wrapper">
                    <input
                      id="admin-username"
                      name="username"
                      type="text"
                      className={`admin-input ${touched.username && errors.username ? 'has-error' : ''}`}
                      placeholder="Enter your username"
                      value={values.username}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="username"
                    />
                    <div className="admin-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                        <circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                  </div>
                  {touched.username && errors.username && (
                    <div className="error-text">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      {errors.username}
                    </div>
                  )}
                </div>

                {/* Password */}
                <div className={`admin-form-group fade-in fade-in-delay-3 ${mounted ? 'visible' : ''}`}>
                  <label className="admin-form-label" htmlFor="admin-password">Password</label>
                  <div className="admin-input-wrapper">
                    <input
                      id="admin-password"
                      name="password"
                      type={showPassword ? 'text' : 'password'}
                      className={`admin-input ${touched.password && errors.password ? 'has-error' : ''}`}
                      placeholder="Enter your password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      autoComplete="current-password"
                    />
                    <div className="admin-input-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                      </svg>
                    </div>
                    <button
                      type="button"
                      className="password-toggle"
                      onClick={() => setShowPassword(!showPassword)}
                      tabIndex={-1}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94"/>
                          <path d="M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19"/>
                          <line x1="1" y1="1" x2="23" y2="23"/>
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      )}
                    </button>
                  </div>
                  {touched.password && errors.password && (
                    <div className="error-text">
                      <svg viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z"/>
                      </svg>
                      {errors.password}
                    </div>
                  )}
                </div>

                {/* Submit */}
                <div className={`fade-in fade-in-delay-4 ${mounted ? 'visible' : ''}`}>
                  <button
                    type="submit"
                    className="admin-login-btn"
                    disabled={isLoading}
                  >
                    <span>
                      {isLoading ? (
                        <div className="btn-spinner" />
                      ) : (
                        <>
                          Sign In
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <line x1="5" y1="12" x2="19" y2="12"/>
                            <polyline points="12 5 19 12 12 19"/>
                          </svg>
                        </>
                      )}
                    </span>
                  </button>
                </div>
              </form>

              {/* Footer Links */}
              <div className={`login-footer fade-in fade-in-delay-5 ${mounted ? 'visible' : ''}`}>
                <Link href="/">
                  <a className="login-footer-link">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12"/>
                      <polyline points="12 19 5 12 12 5"/>
                    </svg>
                    Back to Home
                  </a>
                </Link>
                <div className="login-divider" />
                <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '0.75rem' }}>
                  © {new Date().getFullYear()} Feane
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export const getServerSideProps = (ctx) => {
  const myCookie = ctx.req?.cookies || "";
  if (myCookie.token === process.env.ADMIN_TOKEN) {
    return {
      redirect: {
        destination: "/admin/profile",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
};

export default Login;
