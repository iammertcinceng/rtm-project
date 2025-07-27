import React from 'react';

interface DashboardProps {
  doctorProfile: any;
}

const Dashboard: React.FC<DashboardProps> = ({ doctorProfile }) => {
  const stats = [
    {
      title: 'Bugünkü Randevular',
      value: '8',
      change: '+2',
      changeType: 'positive',
      icon: '📅',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      title: 'Toplam Hasta',
      value: '156',
      change: '+12',
      changeType: 'positive',
      icon: '👥',
      color: 'from-green-500 to-emerald-500'
    },
    {
      title: 'Bekleyen Raporlar',
      value: '3',
      change: '-1',
      changeType: 'negative',
      icon: '📋',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      title: 'Aylık Gelir',
      value: '₺24,500',
      change: '+8%',
      changeType: 'positive',
      icon: '💰',
      color: 'from-purple-500 to-pink-500'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'appointment',
      title: 'Yeni randevu oluşturuldu',
      description: 'Ahmet Yılmaz - 14:30',
      time: '2 saat önce',
      icon: '📅'
    },
    {
      id: 2,
      type: 'patient',
      title: 'Yeni hasta kaydı',
      description: 'Fatma Demir eklendi',
      time: '4 saat önce',
      icon: '👤'
    },
    {
      id: 3,
      type: 'report',
      title: 'Rapor tamamlandı',
      description: 'Mehmet Kaya - Laboratuvar sonuçları',
      time: '6 saat önce',
      icon: '📋'
    },
    {
      id: 4,
      type: 'payment',
      title: 'Ödeme alındı',
      description: '₺500 - Ayşe Özkan',
      time: '1 gün önce',
      icon: '💰'
    }
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Hoş Geldiniz, {doctorProfile?.fullName || 'Doktor'}! 👨‍⚕️
            </h1>
            <p className="text-white/70 text-lg">
              {doctorProfile?.specialization} • {doctorProfile?.hospital}
            </p>
          </div>
          <div className="text-right">
            <div className="text-white/60 text-sm">Bugün</div>
            <div className="text-2xl font-bold text-white">
              {new Date().toLocaleDateString('tr-TR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <span className="text-white text-xl">{stat.icon}</span>
              </div>
              <div className={`text-sm font-semibold ${
                stat.changeType === 'positive' ? 'text-green-400' : 'text-red-400'
              }`}>
                {stat.change}
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-white mb-1">{stat.value}</div>
              <div className="text-white/70 text-sm">{stat.title}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Appointments */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white">Bugünkü Randevular</h2>
            <button className="px-4 py-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-xl text-green-300 hover:text-green-200 transition-all duration-200">
              Tümünü Gör
            </button>
          </div>
          
          <div className="space-y-4">
            {[
              { time: '09:00', patient: 'Ahmet Yılmaz', type: 'Kontrol', status: 'confirmed' },
              { time: '10:30', patient: 'Fatma Demir', type: 'İlk Muayene', status: 'confirmed' },
              { time: '12:00', patient: 'Mehmet Kaya', type: 'Kontrol', status: 'pending' },
              { time: '14:30', patient: 'Ayşe Özkan', type: 'Laboratuvar', status: 'confirmed' },
              { time: '16:00', patient: 'Ali Veli', type: 'Kontrol', status: 'cancelled' }
            ].map((appointment, index) => (
              <div key={index} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl">
                <div className="text-center">
                  <div className="text-white font-semibold">{appointment.time}</div>
                  <div className="text-white/60 text-xs">Saat</div>
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold">{appointment.patient}</div>
                  <div className="text-white/70 text-sm">{appointment.type}</div>
                </div>
                <div className={`px-3 py-1 rounded-full text-xs font-semibold ${
                  appointment.status === 'confirmed' ? 'bg-green-500/20 text-green-300' :
                  appointment.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                  'bg-red-500/20 text-red-300'
                }`}>
                  {appointment.status === 'confirmed' ? 'Onaylandı' :
                   appointment.status === 'pending' ? 'Beklemede' : 'İptal'}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Activities */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Son Aktiviteler</h2>
          
          <div className="space-y-4">
            {recentActivities.map((activity) => (
              <div key={activity.id} className="flex items-start gap-3 p-3 bg-white/5 rounded-xl">
                <div className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center">
                  <span className="text-sm">{activity.icon}</span>
                </div>
                <div className="flex-1">
                  <div className="text-white font-semibold text-sm">{activity.title}</div>
                  <div className="text-white/70 text-xs">{activity.description}</div>
                  <div className="text-white/50 text-xs mt-1">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Hızlı İşlemler</h2>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: '👤', label: 'Yeni Hasta', color: 'from-blue-500 to-cyan-500' },
            { icon: '📅', label: 'Randevu Oluştur', color: 'from-green-500 to-emerald-500' },
            { icon: '📋', label: 'Rapor Yaz', color: 'from-yellow-500 to-orange-500' },
            { icon: '💰', label: 'Fatura Oluştur', color: 'from-purple-500 to-pink-500' }
          ].map((action, index) => (
            <button
              key={index}
              className="flex flex-col items-center gap-3 p-4 bg-white/5 hover:bg-white/10 rounded-xl transition-all duration-200 group"
            >
              <div className={`w-12 h-12 bg-gradient-to-br ${action.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200`}>
                <span className="text-white text-xl">{action.icon}</span>
              </div>
              <span className="text-white font-semibold text-sm">{action.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 