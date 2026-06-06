import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import NotFoundPage from './pages/NotFoundPage';
import { ToastContainer, useToast } from './components/Toast';
import './index.css';

function App() {
  const { toasts, showToast } = useToast();

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
          <div className="header-badge">BSCS 6B • Group 5</div>
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
