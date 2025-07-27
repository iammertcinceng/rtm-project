import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './pages/Landingpage';
import AuthTabs from './pages/auth/AuthTabs';
import ProfilePage from './pages/ProfilePage';
import DoctorRegisterPage from './pages/DoctorRegisterPage';
import AdminPanel from './pages/panel/AdminPanel';
import { AuthProvider } from './context/AuthContext';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<AuthTabs />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/doctor-register" element={<DoctorRegisterPage />} />
            <Route path="/panel" element={<AdminPanel />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
