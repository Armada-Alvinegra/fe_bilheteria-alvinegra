import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import RequestScreen from './screens/RequestScreen.jsx';
import { initTelegram, getTelegramUser, tg } from './telegram.js';
import { usePersistedState } from './hooks/usePersistedState.js';

function AppRoutes() {
  const [user,   setUser]   = usePersistedState('aa:user',   null);
  const [theme,  setTheme]  = usePersistedState('aa:theme',  'dark');
  const [status, setStatus] = usePersistedState('aa:status', 'upcoming');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    initTelegram();
    if (!user) {
      const tgUser = getTelegramUser();
      if (tgUser) setUser({ name: tgUser.name, tgHandle: tgUser.tgHandle, memberId: null, since: null });
    }
  }, []);

  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  // Show Telegram BackButton on sub-pages; hide on home/login so the OS back closes the app
  useEffect(() => {
    if (!tg?.BackButton) return;
    const atRoot = location.pathname === '/' || location.pathname === '/login';
    atRoot ? tg.BackButton.hide() : tg.BackButton.show();
  }, [location.pathname]);

  // Wire Telegram BackButton (and Android hardware back / iOS swipe) to React Router
  useEffect(() => {
    if (!tg?.BackButton) return;
    const handleBack = () => navigate(-1);
    tg.BackButton.onClick(handleBack);
    return () => tg.BackButton.offClick(handleBack);
  }, [navigate]);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={
          <LoginScreen onLogin={(u) => { setUser(u); navigate('/', { replace: true }); }}/>
        }/>
        <Route path="*" element={<Navigate to="/login" replace/>}/>
      </Routes>
    );
  }

  return (
    <Routes>
      <Route path="/" element={
        <HomeScreen
          user={user}
          theme={theme}
          status={status}
          onRequest={() => navigate('/request')}
          onPending={() => navigate('/request', { state: { submitted: true } })}
          onProfile={() => navigate('/profile')}
        />
      }/>
      <Route path="/request" element={
        <RequestScreen
          user={user}
          status={status}
          onBack={() => navigate(-1)}
          onSubmit={() => setStatus('pending')}
          onHome={() => navigate('/')}
        />
      }/>
      <Route path="/profile" element={
        <ProfileScreen
          user={user}
          theme={theme}
          onToggleTheme={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
          onBack={() => navigate(-1)}
          onLogout={() => { setUser(null); navigate('/login', { replace: true }); }}
          onUpdateUser={(u) => setUser(u)}
        />
      }/>
      <Route path="*" element={<Navigate to="/" replace/>}/>
    </Routes>
  );
}

export default function App() {
  return (
    <HashRouter>
      <div className="screen-wrap" style={{ minHeight: '100vh', position: 'relative', zIndex: 1 }}>
        <AppRoutes/>
      </div>
    </HashRouter>
  );
}
