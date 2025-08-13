import React from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { rtmLogo } from '../../../assets';

interface SidebarProps {
  currentSection: 'dashboard' | 'patients' | 'appointments' | 'settings';
  onSectionChange: (section: 'dashboard' | 'patients' | 'appointments' | 'settings') => void;
  doctorProfile: any;
}

const Sidebar: React.FC<SidebarProps> = ({ currentSection, onSectionChange, doctorProfile }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      console.log("🚪 Sidebar logout başladı");
      console.log("👤 Mevcut doktor kullanıcı:", doctorProfile?.email);
      
      await logout();
      console.log("✅ Doktor logout başarılı, ana sayfaya yönlendiriliyor");
      
      navigate('/');
    } catch (error) {
      console.error("❌ Doktor logout hatası:", error);
      // Even if logout fails, try to navigate to home
      navigate('/');
    }
  };

  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: '📊',
      description: 'Genel bakış ve istatistikler'
    },
    {
      id: 'patients',
      label: 'Hastalar',
      icon: '👥',
      description: 'Hasta listesi ve yönetimi'
    },
    {
      id: 'appointments',
      label: 'Randevular',
      icon: '📅',
      description: 'Randevu takvimi ve yönetimi'
    },
    {
      id: 'settings',
      label: 'Ayarlar',
      icon: '⚙️',
      description: 'Profil ve sistem ayarları'
    }
  ];

  return (
    <div className="w-80 bg-white/10 backdrop-blur-xl border-r border-white/20 flex flex-col h-screen">
      {/* Logo and Brand */}
      <div className="px-6 border-b border-white/20">
        <div className="flex items-center gap-4">
          <img 
            src={rtmLogo} 
            alt="RTM Logo" 
            className="w-20 h-20 object-contain"
          />
          <div>
            <h2 className="text-lg font-bold text-white">RTM Panel</h2>
            <p className="text-white/70 text-xs">Doktor Yönetim Sistemi</p>
          </div>
        </div>
      </div>

      {/* Doctor Profile */}
      <div className="p-6 border-b border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center shadow-lg">
            <span className="text-white text-lg">👨‍⚕️</span>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-semibold">{doctorProfile?.fullName || 'Doktor'}</h3>
            <p className="text-white/70 text-sm">{doctorProfile?.specialization || 'Uzmanlık'}</p>
            <p className="text-white/60 text-xs">{doctorProfile?.hospital || 'Hastane'}</p>
          </div>
        </div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 p-4 overflow-y-auto admin-panel-scrollbar">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onSectionChange(item.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all duration-200 group ${
                  currentSection === item.id
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white shadow-lg'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span className="text-lg">{item.icon}</span>
                <div className="flex-1">
                  <div className="font-semibold">{item.label}</div>
                  <div className={`text-xs ${
                    currentSection === item.id ? 'text-white/80' : 'text-white/60'
                  }`}>
                    {item.description}
                  </div>
                </div>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Quick Stats */}
      <div className="p-3 border-t border-white/20">
        <div className="bg-white/5 backdrop-blur-sm rounded-xl p-3">
          <h4 className="text-white/80 text-xs font-semibold mb-2">Hızlı İstatistikler</h4>
          <div className="space-y-1">
            <div className="flex justify-between text-xs">
              <span className="text-white/70">Bugünkü Randevular</span>
              <span className="text-green-400 font-semibold">8</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/70">Bekleyen Hastalar</span>
              <span className="text-yellow-400 font-semibold">3</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-white/70">Toplam Hasta</span>
              <span className="text-blue-400 font-semibold">156</span>
            </div>
          </div>
        </div>
      </div>

      {/* Logout Button */}
      <div className="p-3 border-t border-white/20">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("🔴 Sidebar çıkış butonu tıklandı!");
            handleLogout();
          }}
          className="w-full flex items-center gap-2 px-4 py-2 bg-red-900 hover:bg-red-950 border border-red-800 rounded-xl text-white hover:text-red-100 transition-all duration-200 active:scale-95 shadow-lg hover:shadow-xl"
          style={{ pointerEvents: 'auto' }}
        >
          <span className="text-lg">🚪</span>
          <span className="font-semibold">Çıkış Yap</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;