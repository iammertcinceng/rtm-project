import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import HipokratLandingPage from './pages/HipokratLandingPage';
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
        <Routes>
          <Route path="/" element={<HipokratLandingPage />} />
          <Route path="/home" element={
            <Layout>
              <Home />
            </Layout>
          } />
          <Route path="/login" element={
            <Layout>
              <AuthTabs />
            </Layout>
          } />
          <Route path="/profile" element={
            <Layout>
              <ProfilePage />
            </Layout>
          } />
          <Route path="/doctor-register" element={
            <Layout>
              <DoctorRegisterPage />
            </Layout>
          } />
          <Route path="/panel" element={
            <Layout>
              <AdminPanel />
            </Layout>
          } />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
