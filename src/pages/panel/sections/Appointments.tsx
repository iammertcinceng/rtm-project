import React, { useState } from 'react';

const Appointments: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<'day' | 'week' | 'month'>('day');

  const appointments = [
    {
      id: 1,
      patientName: 'Ahmet Yılmaz',
      time: '09:00',
      duration: 30,
      type: 'Kontrol',
      status: 'confirmed',
      notes: 'Rutin kontrol'
    },
    {
      id: 2,
      patientName: 'Fatma Demir',
      time: '10:30',
      duration: 45,
      type: 'İlk Muayene',
      status: 'confirmed',
      notes: 'Yeni hasta'
    },
    {
      id: 3,
      patientName: 'Mehmet Kaya',
      time: '12:00',
      duration: 30,
      type: 'Kontrol',
      status: 'pending',
      notes: 'Laboratuvar sonuçları'
    },
    {
      id: 4,
      patientName: 'Ayşe Özkan',
      time: '14:30',
      duration: 60,
      type: 'Laboratuvar',
      status: 'confirmed',
      notes: 'Kan testi'
    },
    {
      id: 5,
      patientName: 'Ali Veli',
      time: '16:00',
      duration: 30,
      type: 'Kontrol',
      status: 'cancelled',
      notes: 'İptal edildi'
    }
  ];

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
    '16:00', '16:30', '17:00', '17:30'
  ];

  const getAppointmentForTime = (time: string) => {
    return appointments.find(app => app.time === time);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'cancelled': return 'bg-red-500/20 text-red-300 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-300 border-gray-500/30';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Randevu Yönetimi</h1>
          <p className="text-white/70">Randevu takvimi ve planlama</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-200 shadow-lg">
          + Yeni Randevu
        </button>
      </div>

      {/* Calendar Controls */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setViewMode('day')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                viewMode === 'day' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Günlük
            </button>
            <button
              onClick={() => setViewMode('week')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                viewMode === 'week' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Haftalık
            </button>
            <button
              onClick={() => setViewMode('month')}
              className={`px-4 py-2 rounded-xl font-semibold transition-all duration-200 ${
                viewMode === 'month' 
                  ? 'bg-green-500 text-white' 
                  : 'bg-white/10 text-white/70 hover:bg-white/20'
              }`}
            >
              Aylık
            </button>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-200">
              ←
            </button>
            <div className="text-white font-semibold">
              {selectedDate.toLocaleDateString('tr-TR', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </div>
            <button className="p-2 bg-white/10 hover:bg-white/20 rounded-lg text-white transition-all duration-200">
              →
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {[
            { title: 'Bugünkü Randevular', value: '8', icon: '📅', color: 'from-blue-500 to-cyan-500' },
            { title: 'Onaylanan', value: '6', icon: '✅', color: 'from-green-500 to-emerald-500' },
            { title: 'Beklemede', value: '1', icon: '⏳', color: 'from-yellow-500 to-orange-500' },
            { title: 'İptal', value: '1', icon: '❌', color: 'from-red-500 to-pink-500' }
          ].map((stat, index) => (
            <div key={index} className="bg-white/5 rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center`}>
                  <span className="text-white text-lg">{stat.icon}</span>
                </div>
                <div>
                  <div className="text-xl font-bold text-white">{stat.value}</div>
                  <div className="text-white/70 text-sm">{stat.title}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Daily Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Time Slots */}
        <div className="lg:col-span-2 bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Günlük Program</h2>
          
          <div className="space-y-3">
            {timeSlots.map((time) => {
              const appointment = getAppointmentForTime(time);
              return (
                <div key={time} className="flex items-center gap-4 p-4 bg-white/5 rounded-xl hover:bg-white/10 transition-all duration-200">
                  <div className="w-20 text-center">
                    <div className="text-white font-semibold">{time}</div>
                    <div className="text-white/60 text-xs">Saat</div>
                  </div>
                  
                  {appointment ? (
                    <div className="flex-1 bg-white/10 rounded-xl p-4 border border-white/20">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-white font-semibold">{appointment.patientName}</div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                          {appointment.status === 'confirmed' ? 'Onaylandı' :
                           appointment.status === 'pending' ? 'Beklemede' : 'İptal'}
                        </span>
                      </div>
                      <div className="text-white/70 text-sm mb-1">{appointment.type} • {appointment.duration} dk</div>
                      <div className="text-white/60 text-xs">{appointment.notes}</div>
                    </div>
                  ) : (
                    <div className="flex-1 text-center py-4">
                      <div className="text-white/40 text-sm">Boş</div>
                    </div>
                  )}
                  
                  <div className="flex flex-col gap-2">
                    {appointment ? (
                      <>
                        <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 hover:text-blue-200 transition-all duration-200">
                          👁️
                        </button>
                        <button className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 hover:text-green-200 transition-all duration-200">
                          ✏️
                        </button>
                      </>
                    ) : (
                      <button className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 hover:text-green-200 transition-all duration-200">
                        +
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Appointments */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Yaklaşan Randevular</h2>
          
          <div className="space-y-4">
            {appointments.slice(0, 5).map((appointment) => (
              <div key={appointment.id} className="bg-white/5 rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-white font-semibold">{appointment.patientName}</div>
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${getStatusColor(appointment.status)}`}>
                    {appointment.status === 'confirmed' ? 'Onaylandı' :
                     appointment.status === 'pending' ? 'Beklemede' : 'İptal'}
                  </span>
                </div>
                <div className="text-white/70 text-sm mb-1">{appointment.time} • {appointment.type}</div>
                <div className="text-white/60 text-xs">{appointment.notes}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointments; 