import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Welcome from './pages/onboarding/welcome';
import SignUp from './pages/onboarding/signup';
import ConnectPlatform from './pages/onboarding/connect-platform';
import UploadChats from './pages/onboarding/upload-chats';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/welcome" replace />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/onboarding/signup" element={<SignUp />} />
        <Route path="/onboarding/connect-platform" element={<ConnectPlatform />} />
        <Route path="/onboarding/upload-chats" element={<UploadChats />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;