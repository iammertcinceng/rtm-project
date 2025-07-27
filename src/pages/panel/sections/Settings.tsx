import React, { useState } from 'react';

interface SettingsProps {
  doctorProfile: any;
}

const Settings: React.FC<SettingsProps> = ({ doctorProfile }) => {
  const [activeTab, setActiveTab] = useState<'profile' | 'security' | 'notifications' | 'billing'>('profile');
  const [isEditing, setIsEditing] = useState(false);

  const tabs = [
    { id: 'profile', label: 'Profil', icon: '👤' },
    { id: 'security', label: 'Güvenlik', icon: '🔒' },
    { id: 'notifications', label: 'Bildirimler', icon: '🔔' },
    { id: 'billing', label: 'Faturalama', icon: '💰' }
  ];

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-bold text-white">Profil Bilgileri</h3>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-green-200 transition-all duration-200"
        >
          {isEditing ? 'İptal' : 'Düzenle'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-white/80 font-semibold mb-2">Ad Soyad</label>
          <input
            type="text"
            defaultValue={doctorProfile?.fullName || ''}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-white/80 font-semibold mb-2">E-posta</label>
          <input
            type="email"
            defaultValue={doctorProfile?.email || ''}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-white/80 font-semibold mb-2">Uzmanlık</label>
          <input
            type="text"
            defaultValue={doctorProfile?.specialization || ''}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-white/80 font-semibold mb-2">Hastane</label>
          <input
            type="text"
            defaultValue={doctorProfile?.hospital || ''}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-white/80 font-semibold mb-2">Bölüm</label>
          <input
            type="text"
            defaultValue={doctorProfile?.department || ''}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          />
        </div>
        <div>
          <label className="block text-white/80 font-semibold mb-2">Telefon</label>
          <input
            type="tel"
            defaultValue={doctorProfile?.phone || ''}
            disabled={!isEditing}
            className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50"
          />
        </div>
      </div>

      {isEditing && (
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-200">
            Kaydet
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl text-white transition-all duration-200"
          >
            İptal
          </button>
        </div>
      )}
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Güvenlik Ayarları</h3>
      
      <div className="space-y-4">
        <div className="bg-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-white font-semibold">Şifre Değiştir</h4>
              <p className="text-white/70 text-sm">Hesap güvenliğiniz için şifrenizi güncelleyin</p>
            </div>
            <button className="px-4 py-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-xl text-blue-300 hover:text-blue-200 transition-all duration-200">
              Değiştir
            </button>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-white font-semibold">İki Faktörlü Doğrulama</h4>
              <p className="text-white/70 text-sm">Ek güvenlik için SMS doğrulaması ekleyin</p>
            </div>
            <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-green-200 transition-all duration-200">
              Aktifleştir
            </button>
          </div>
        </div>

        <div className="bg-white/10 rounded-xl p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h4 className="text-white font-semibold">Oturum Geçmişi</h4>
              <p className="text-white/70 text-sm">Son giriş yapılan cihazları görüntüleyin</p>
            </div>
            <button className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/30 rounded-xl text-purple-300 hover:text-purple-200 transition-all duration-200">
              Görüntüle
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Bildirim Ayarları</h3>
      
      <div className="space-y-4">
        {[
          { title: 'Yeni Randevu Bildirimleri', description: 'Yeni randevu oluşturulduğunda bildirim al', enabled: true },
          { title: 'Randevu Hatırlatmaları', description: 'Randevulardan 1 saat önce hatırlatma al', enabled: true },
          { title: 'Hasta Mesajları', description: 'Hastalardan gelen mesajları bildir', enabled: false },
          { title: 'Sistem Güncellemeleri', description: 'Sistem güncellemeleri hakkında bilgilendir', enabled: true },
          { title: 'E-posta Bildirimleri', description: 'Önemli olaylar için e-posta al', enabled: true }
        ].map((notification, index) => (
          <div key={index} className="bg-white/10 rounded-xl p-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-white font-semibold">{notification.title}</h4>
                <p className="text-white/70 text-sm">{notification.description}</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" defaultChecked={notification.enabled} className="sr-only peer" />
                <div className="w-11 h-6 bg-white/20 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderBillingTab = () => (
    <div className="space-y-6">
      <h3 className="text-xl font-bold text-white">Faturalama ve Ödemeler</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white/10 rounded-xl p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">₺24,500</div>
            <div className="text-white/70 text-sm">Bu Ay Gelir</div>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">156</div>
            <div className="text-white/70 text-sm">Toplam Hasta</div>
          </div>
        </div>
        <div className="bg-white/10 rounded-xl p-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-2">₺157</div>
            <div className="text-white/70 text-sm">Ortalama Hasta Başı</div>
          </div>
        </div>
      </div>

      <div className="bg-white/10 rounded-xl p-6">
        <h4 className="text-white font-semibold mb-4">Son İşlemler</h4>
        <div className="space-y-3">
          {[
            { date: '2024-01-15', description: 'Ahmet Yılmaz - Kontrol', amount: '₺200' },
            { date: '2024-01-14', description: 'Fatma Demir - İlk Muayene', amount: '₺300' },
            { date: '2024-01-13', description: 'Mehmet Kaya - Laboratuvar', amount: '₺150' }
          ].map((transaction, index) => (
            <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg">
              <div>
                <div className="text-white font-semibold">{transaction.description}</div>
                <div className="text-white/60 text-sm">{transaction.date}</div>
              </div>
              <div className="text-green-400 font-semibold">{transaction.amount}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfileTab();
      case 'security':
        return renderSecurityTab();
      case 'notifications':
        return renderNotificationsTab();
      case 'billing':
        return renderBillingTab();
      default:
        return renderProfileTab();
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-white">Ayarlar</h1>
        <p className="text-white/70">Hesap ve sistem ayarlarınızı yönetin</p>
      </div>

      {/* Tabs */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <div className="flex flex-wrap gap-2 mb-6">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === tab.id
                  ? 'bg-green-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="border-t border-white/20 pt-6">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default Settings; 