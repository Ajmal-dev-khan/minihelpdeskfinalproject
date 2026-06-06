import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import LoginPage from './pages/LoginPage';
import { ToastContainer, useToast } from './components/Toast';
import './index.css';

function App() {
  const { toasts, showToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <BrowserRouter>
      <div className="app-wrapper">

        {/* ── Header ─────────────────────────────── */}
        <header className="app-header">
          <div className="header-left">
            <div className="app-logo">
              <div className="logo-icon">🎫</div>
              <h1 className="app-title">MiniHelpDesk</h1>
            </div>
            <p className="app-subtitle">Support ticket management system</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div className="header-badge">BSCS 6B • Group 5</div>
            <button onClick={handleLogout}
              style={{ padding: '8px 16px', background: '#e74c3c', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' }}>
              Logout
            </button>
          </div>
        </header>

        {/* ── Routes ─────────────────────────────── */}
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                onSuccess={(msg) => showToast(msg, 'success')}
                onError={(msg) => showToast(msg, 'error')}
              />
            }
          />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>

      </div>

      {/* ── Toast Notifications ─────────────────── */}
      <ToastContainer toasts={toasts} />
    </BrowserRouter>
  );
}

export default App;