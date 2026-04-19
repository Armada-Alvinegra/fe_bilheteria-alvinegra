import { useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import LoginScreen from './screens/LoginScreen.jsx';
import HomeScreen from './screens/HomeScreen.jsx';
import ProfileScreen from './screens/ProfileScreen.jsx';
import RequestScreen from './screens/RequestScreen.jsx';
import { initTelegram } from './telegram.js';
import { usePersistedState } from './hooks/usePersistedState.js';

function AppRoutes() {
  const [user,   setUser]   = usePersistedState('aa:user',   null);
  const [theme,  setTheme]  = usePersistedState('aa:theme',  'dark');
  const [status, setStatus] = usePersistedState('aa:status', 'upcoming');
  const navigate = useNavigate();

  useEffect(() => { initTelegram(); }, []);
  useEffect(() => { document.documentElement.setAttribute('data-theme', theme); }, [theme]);

  if (!user) {
    return (
      <Routes>
        <Route path="/login" element={
          <LoginScreen onLogin={(u) => { setUser(u); navigate('/'); }}/>
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
          onLogout={() => { setUser(null); navigate('/login'); }}
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