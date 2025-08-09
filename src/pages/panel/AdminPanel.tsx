import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { db } from '../../firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Sidebar from './components/Sidebar';
import Dashboard from './sections/Dashboard';
import Patients from './sections/Patients';
import Appointments from './sections/Appointments';
import Settings from './sections/Settings';

type PanelSection = 'dashboard' | 'patients' | 'appointments' | 'settings';

interface DoctorProfile {
  fullName: string;
  email: string;
  specialization: string;
  hospital: string;
  department: string;
  userType: string;
}

export default function AdminPanel() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const [currentSection, setCurrentSection] = useState<PanelSection>('dashboard');
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const [isDoctor, setIsDoctor] = useState(false);
  const [panelLoading, setPanelLoading] = useState(true);

  useEffect(() => {
    const checkUserAccess = async () => {
      if (!loading && user) {
        try {
          // Check if user is a doctor
          const doctorRef = doc(db, "doctors", user.uid);
          const doctorSnap = await getDoc(doctorRef);
          
          if (doctorSnap.exists()) {
            const data = doctorSnap.data() as DoctorProfile;
            setDoctorProfile(data);
            setIsDoctor(true);
            console.log("✅ Doctor access confirmed:", data.fullName);
          } else {
            console.log("❌ User is not a doctor, redirecting to home");
            navigate('/');
            return;
          }
        } catch (error) {
          console.error("❌ Error checking doctor access:", error);
          navigate('/');
          return;
        }
      } else if (!loading && !user) {
        console.log("❌ No user logged in, redirecting to login");
        navigate('/login');
        return;
      }
      setPanelLoading(false);
    };

    checkUserAccess();
  }, [user, loading, navigate]);

  const renderSection = () => {
    switch (currentSection) {
      case 'dashboard':
        return <Dashboard doctorProfile={doctorProfile} />;
      case 'patients':
        return <Patients />;
      case 'appointments':
        return <Appointments />;
      case 'settings':
        return <Settings doctorProfile={doctorProfile} />;
      default:
        return <Dashboard doctorProfile={doctorProfile} />;
    }
  };

  if (loading || panelLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <div className="text-xl font-semibold text-white">Admin Panel Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (!isDoctor) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gradient-to-br from-cyan-400/20 to-blue-400/20 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative z-10 flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Sidebar 
          currentSection={currentSection}
          onSectionChange={setCurrentSection}
          doctorProfile={doctorProfile}
        />

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white/10 backdrop-blur-xl border-b border-white/20 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">👨‍⚕️</span>
                </div>
                <div>
                  <h1 className="text-xl font-bold text-white">
                    {currentSection === 'dashboard' && 'Dashboard'}
                    {currentSection === 'patients' && 'Hastalar'}
                    {currentSection === 'appointments' && 'Randevular'}
                    {currentSection === 'settings' && 'Ayarlar'}
                  </h1>
                  <p className="text-white/70 text-sm">
                    {doctorProfile?.specialization} • {doctorProfile?.hospital}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                  <span className="text-white/80 text-sm">Çevrimiçi</span>
                </div>
                <button
                  onClick={() => navigate('/home')}
                  className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white hover:bg-white/20 transition-all duration-200"
                >
                  Ana Sayfa
                </button>
              </div>
            </div>
          </header>

          {/* Content Area */}
          <main className="flex-1 overflow-auto p-6 admin-panel-scrollbar">
            <div className="max-w-7xl mx-auto">
              {renderSection()}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
} 