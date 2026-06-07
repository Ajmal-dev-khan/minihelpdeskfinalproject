import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import NotFoundPage from './pages/NotFoundPage';
import { ToastContainer, useToast } from './components/Toast';
import './index.css';

function App() {
  const { toasts, showToast } = useToast();
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );

  const handleLogin = () => setIsLoggedIn(true);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn');
    setIsLoggedIn(false);
  };

  return (
    <BrowserRouter>
      {!isLoggedIn ? (
        <LoginPage onLogin={handleLogin} />
      ) : (
        <div className="app-wrapper">
          <header className="app-header">
            <div className="header-left">
              <div className="app-logo">
                <div className="logo-icon">🎫</div>
                <h1 className="app-title">MiniHelpDesk</h1>
              </div>
              <p className="app-subtitle">Support ticket management system</p>
            </div>
            <div className="header-right">
              <div className="header-badge">BSCS 6B • Group 5</div>
              <button className="logout-btn" onClick={handleLogout}>
                🚪 Logout
              </button>
            </div>
          </header>
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
      )}
      <ToastContainer toasts={toasts} />
    </BrowserRouter>
  );
}

export default App;
