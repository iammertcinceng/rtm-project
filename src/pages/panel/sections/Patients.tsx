import React, { useState } from 'react';

const Patients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  const patients = [
    {
      id: 1,
      name: 'Ahmet Yılmaz',
      tcNo: '12345678901',
      phone: '0532 123 45 67',
      lastVisit: '2024-01-15',
      status: 'active',
      age: 35,
      gender: 'Erkek'
    },
    {
      id: 2,
      name: 'Fatma Demir',
      tcNo: '98765432109',
      phone: '0533 987 65 43',
      lastVisit: '2024-01-10',
      status: 'active',
      age: 28,
      gender: 'Kadın'
    },
    {
      id: 3,
      name: 'Mehmet Kaya',
      tcNo: '45678912345',
      phone: '0534 456 78 90',
      lastVisit: '2024-01-08',
      status: 'inactive',
      age: 42,
      gender: 'Erkek'
    },
    {
      id: 4,
      name: 'Ayşe Özkan',
      tcNo: '78912345678',
      phone: '0535 789 12 34',
      lastVisit: '2024-01-12',
      status: 'active',
      age: 31,
      gender: 'Kadın'
    }
  ];

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.tcNo.includes(searchTerm);
    const matchesFilter = filterStatus === 'all' || patient.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Hasta Yönetimi</h1>
          <p className="text-white/70">Hasta listesi ve bilgileri</p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-200 shadow-lg">
          + Yeni Hasta Ekle
        </button>
      </div>

      {/* Filters and Search */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <span className="text-white/60">🔍</span>
              </div>
              <input
                type="text"
                placeholder="Hasta adı veya TC No ile ara..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">Tüm Hastalar</option>
              <option value="active">Aktif</option>
              <option value="inactive">Pasif</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Toplam Hasta', value: '156', icon: '👥', color: 'from-blue-500 to-cyan-500' },
          { title: 'Aktif Hasta', value: '142', icon: '✅', color: 'from-green-500 to-emerald-500' },
          { title: 'Bu Ay Yeni', value: '23', icon: '🆕', color: 'from-yellow-500 to-orange-500' },
          { title: 'Bugün Randevu', value: '8', icon: '📅', color: 'from-purple-500 to-pink-500' }
        ].map((stat, index) => (
          <div key={index} className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6">
            <div className="flex items-center gap-4">
              <div className={`w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl flex items-center justify-center shadow-lg`}>
                <span className="text-white text-xl">{stat.icon}</span>
              </div>
              <div>
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-white/70 text-sm">{stat.title}</div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Patients Table */}
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/20">
          <h2 className="text-xl font-bold text-white">Hasta Listesi</h2>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-white/5">
              <tr>
                <th className="px-6 py-4 text-left text-white/80 font-semibold">Hasta</th>
                <th className="px-6 py-4 text-left text-white/80 font-semibold">TC No</th>
                <th className="px-6 py-4 text-left text-white/80 font-semibold">Telefon</th>
                <th className="px-6 py-4 text-left text-white/80 font-semibold">Son Ziyaret</th>
                <th className="px-6 py-4 text-left text-white/80 font-semibold">Durum</th>
                <th className="px-6 py-4 text-left text-white/80 font-semibold">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/10">
              {filteredPatients.map((patient) => (
                <tr key={patient.id} className="hover:bg-white/5 transition-colors duration-200">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {patient.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{patient.name}</div>
                        <div className="text-white/60 text-sm">{patient.age} yaş, {patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{patient.tcNo}</td>
                  <td className="px-6 py-4 text-white">{patient.phone}</td>
                  <td className="px-6 py-4 text-white">{patient.lastVisit}</td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      patient.status === 'active' 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {patient.status === 'active' ? 'Aktif' : 'Pasif'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <button className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 hover:text-blue-200 transition-all duration-200">
                        👁️
                      </button>
                      <button className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 hover:text-green-200 transition-all duration-200">
                        ✏️
                      </button>
                      <button className="p-2 bg-red-500/20 hover:bg-red-500/30 border border-red-500/30 rounded-lg text-red-300 hover:text-red-200 transition-all duration-200">
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Patients; 