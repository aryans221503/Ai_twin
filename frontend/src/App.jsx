import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/onboarding/Welcome';
import SignUp from './pages/onboarding/signup';
import Login from './pages/onboarding/login';
import ConnectPlatform from './pages/onboarding/connect-platform';
import UploadChats from './pages/onboarding/upload-chats';
import { useAuthStore } from './store/authStore';
import { useEffect } from 'react';

function App() {
  const { loadUser, isAuthenticated } = useAuthStore();

  useEffect(() => {
    loadUser(); // Load user on app start
  }, [loadUser]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/onboarding/signup" element={<SignUp />} />
        <Route path="/onboarding/login" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/onboarding/connect-platform" element={<ConnectPlatform />} />
        <Route path="/onboarding/upload-chats" element={<UploadChats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;