import React, { useState } from 'react';

interface Patient {
  id: string;
  fullName: string;
  tcNo: string;
  phone: string;
  email: string;
  birthDate: string;
  gender: string;
  address: string;
  emergencyPhone: string;
  fatherName: string;
  birthPlace: string;
  registeredProvince: string;
  registrationDate: string;
  visitReason: string;
  createdAt: string;
  updatedAt: string;
}

interface PatientDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  patient: Patient | null;
}

const PatientDetailsModal: React.FC<PatientDetailsModalProps> = ({ isOpen, onClose, patient }) => {
  const [activeTab, setActiveTab] = useState('personal');

  if (!isOpen || !patient) return null;

  // Calculate age from birth date
  const calculateAge = (birthDate: string) => {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    
    return age;
  };

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('tr-TR');
  };

  const tabs = [
    { id: 'personal', label: 'Kişisel Bilgi', icon: '👤' },
    { id: 'contact', label: 'İletişim', icon: '📞' },
    { id: 'medical', label: 'Tıbbi Bilgi', icon: '🏥' },
    { id: 'address', label: 'Adres', icon: '📍' },
    { id: 'files', label: 'Hasta Dosyaları', icon: '📁' },
    { id: 'notes', label: 'Notlar', icon: '📝' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
             <div className="bg-white/95 backdrop-blur-xl border border-gray-200 rounded-2xl max-w-6xl w-full max-h-[95vh] overflow-hidden shadow-2xl flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-t-2xl">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-white text-2xl font-bold">
                  {patient.fullName.split(' ').map(n => n[0]).join('')}
                </span>
              </div>
              <div>
                <h2 className="text-3xl font-bold text-gray-800">{patient.fullName}</h2>
                <p className="text-gray-600">Hasta No: {patient.id}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 transition-colors text-2xl font-bold p-2 hover:bg-gray-100 rounded-lg"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Quick Info Bar */}
        <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-200">
          <div className="p-4">
            <div className="grid grid-cols-2 md:grid-cols-6 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Cinsiyet:</span>
                <span className="font-semibold text-gray-800">{patient.gender}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Yaş:</span>
                <span className="font-semibold text-gray-800">{calculateAge(patient.birthDate)} yaş</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">TC No:</span>
                <span className="font-semibold text-gray-800">{patient.tcNo}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Doğum Tarihi:</span>
                <span className="font-semibold text-gray-800">{formatDate(patient.birthDate)}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Kayıt Tarihi:</span>
                <span className="font-semibold text-gray-800">
                  {patient.registrationDate ? formatDate(patient.registrationDate) : 'Kayıtsız'}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-gray-600">Durum:</span>
                <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  patient.registrationDate 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-red-100 text-red-700'
                }`}>
                  {patient.registrationDate ? 'Kayıtlı' : 'Kayıtsız'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 bg-gray-50">
          <div className="flex overflow-x-auto">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-4 text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  activeTab === tab.id
                    ? 'text-purple-600 border-b-2 border-purple-600 bg-white'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

                 {/* Content */}
         <div className="flex-1 overflow-y-auto min-h-0">
           <div className="p-6">
            {/* Personal Information Tab */}
            {activeTab === 'personal' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      👤 Temel Bilgiler
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Ad Soyad:</span>
                        <span className="font-semibold text-gray-800">{patient.fullName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">TC Kimlik No:</span>
                        <span className="font-semibold text-gray-800">{patient.tcNo}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doğum Tarihi:</span>
                        <span className="font-semibold text-gray-800">{formatDate(patient.birthDate)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Yaş:</span>
                        <span className="font-semibold text-gray-800">{calculateAge(patient.birthDate)} yaş</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cinsiyet:</span>
                        <span className="font-semibold text-gray-800">{patient.gender}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      👨‍👩‍👧‍👦 Aile Bilgileri
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Baba Adı:</span>
                        <span className="font-semibold text-gray-800">{patient.fatherName}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doğum Yeri:</span>
                        <span className="font-semibold text-gray-800">{patient.birthPlace}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Kayıtlı İl:</span>
                        <span className="font-semibold text-gray-800">{patient.registeredProvince}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    📅 Kayıt Bilgileri
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Kayıt Tarihi:</span>
                      <span className="font-semibold text-gray-800">
                        {patient.registrationDate ? formatDate(patient.registrationDate) : 'Kayıtsız'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Oluşturulma:</span>
                      <span className="font-semibold text-gray-800">{formatDate(patient.createdAt)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Son Güncelleme:</span>
                      <span className="font-semibold text-gray-800">{formatDate(patient.updatedAt)}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Contact Information Tab */}
            {activeTab === 'contact' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      📞 İletişim Bilgileri
                    </h3>
                    <div className="space-y-4">
                      <div>
                        <label className="text-sm text-gray-600">Telefon</label>
                        <p className="font-semibold text-gray-800">{patient.phone}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Email</label>
                        <p className="font-semibold text-gray-800">{patient.email}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Acil Telefon</label>
                        <p className="font-semibold text-gray-800">
                          {patient.emergencyPhone || 'Belirtilmemiş'}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      🔔 Bildirim Ayarları
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">SMS Bildirimleri:</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Aktif
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600">Email Bildirimleri:</span>
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                          Aktif
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Medical Information Tab */}
            {activeTab === 'medical' && (
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      🏥 Tıbbi Bilgiler
                    </h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Yaş:</span>
                        <span className="font-semibold text-gray-800">{calculateAge(patient.birthDate)} yaş</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Cinsiyet:</span>
                        <span className="font-semibold text-gray-800">{patient.gender}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Doğum Tarihi:</span>
                        <span className="font-semibold text-gray-800">{formatDate(patient.birthDate)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                      📋 Ziyaret Bilgileri
                    </h3>
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm text-gray-600">Ziyaret Nedeni</label>
                        <p className="font-semibold text-gray-800">
                          {patient.visitReason || 'Belirtilmemiş'}
                        </p>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Son Ziyaret:</span>
                        <span className="font-semibold text-gray-800">
                          {patient.registrationDate ? formatDate(patient.registrationDate) : 'Henüz ziyaret yok'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    📊 İstatistikler
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">0</div>
                      <div className="text-sm text-gray-600">Toplam Ziyaret</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">0</div>
                      <div className="text-sm text-gray-600">Bu Ay</div>
                    </div>
                    <div className="text-center p-4 bg-yellow-50 rounded-lg">
                      <div className="text-2xl font-bold text-yellow-600">0</div>
                      <div className="text-sm text-gray-600">Bu Hafta</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">0</div>
                      <div className="text-sm text-gray-600">Bekleyen</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Address Information Tab */}
            {activeTab === 'address' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    📍 Adres Bilgileri
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600">Tam Adres</label>
                      <p className="font-semibold text-gray-800 mt-1">{patient.address}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm text-gray-600">Kayıtlı İl</label>
                        <p className="font-semibold text-gray-800">{patient.registeredProvince}</p>
                      </div>
                      <div>
                        <label className="text-sm text-gray-600">Doğum Yeri</label>
                        <p className="font-semibold text-gray-800">{patient.birthPlace}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    🗺️ Harita
                  </h3>
                  <div className="h-64 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="text-center text-gray-500">
                      <div className="text-4xl mb-2">🗺️</div>
                      <p>Harita görünümü burada olacak</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

                         {/* Patient Files Tab */}
             {activeTab === 'files' && (
               <div className="space-y-6">
                 {/* File Summary */}
                 <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                     📊 Dosya Özeti
                   </h3>
                   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                     <div className="p-4 bg-blue-50 rounded-lg">
                       <div className="text-2xl font-bold text-blue-600">13</div>
                       <div className="text-sm text-gray-600">Toplam Geliş Kaydı</div>
                     </div>
                     <div className="p-4 bg-green-50 rounded-lg">
                       <div className="text-2xl font-bold text-green-600">7</div>
                       <div className="text-sm text-gray-600">Toplam Geliş Gün Sayısı</div>
                     </div>
                     <div className="p-4 bg-purple-50 rounded-lg">
                       <div className="text-2xl font-bold text-purple-600">Ayakta</div>
                       <div className="text-sm text-gray-600">Tedavi Tipi</div>
                     </div>
                   </div>
                 </div>

                 {/* Visit Details */}
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                   <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                       🏥 Ziyaret Detayları
                     </h3>
                     <div className="space-y-3">
                       <div>
                         <label className="text-sm text-gray-600">İlk Geliş</label>
                         <p className="font-semibold text-gray-800">04 Mar 2025, Ayakta tedavi, Getat, Mustafa Yaşar</p>
                       </div>
                       <div>
                         <label className="text-sm text-gray-600">Son Geliş</label>
                         <p className="font-semibold text-gray-800">08 Tem 2025, Ayakta tedavi, Getat, Mustafa Yaşar</p>
                       </div>
                       <div>
                         <label className="text-sm text-gray-600">Şube</label>
                         <p className="font-semibold text-gray-800">Maslak</p>
                       </div>
                       <div>
                         <label className="text-sm text-gray-600">T Klinik</label>
                         <p className="font-semibold text-gray-800">Getat</p>
                       </div>
                       <div>
                         <label className="text-sm text-gray-600">Doktoru</label>
                         <p className="font-semibold text-gray-800">Mustafa Yaşar</p>
                       </div>
                       <div>
                         <label className="text-sm text-gray-600">Geliş Nedeni</label>
                         <p className="font-semibold text-gray-800">Tedavi</p>
                       </div>
                       <div>
                         <label className="text-sm text-gray-600">Geliş No</label>
                         <p className="font-semibold text-gray-800">39335</p>
                       </div>
                     </div>
                   </div>

                   <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                     <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                       💰 Finansal Bilgiler
                     </h3>
                     <div className="space-y-3">
                       <div>
                         <label className="text-sm text-gray-600">Bakiye</label>
                         <p className="text-2xl font-bold text-green-600">16,760.00 TL</p>
                       </div>
                       <div>
                         <label className="text-sm text-gray-600">Son Ödeme</label>
                         <p className="font-semibold text-gray-800">08 Tem 2025</p>
                       </div>
                       <div>
                         <label className="text-sm text-gray-600">Ödeme Durumu</label>
                         <span className="px-2 py-1 bg-green-100 text-green-700 rounded-full text-xs font-semibold">
                           Güncel
                         </span>
                       </div>
                     </div>
                   </div>
                 </div>

                 {/* Procedures List */}
                 <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                     🏥 Muayene, Girişim ve Operasyonlar
                   </h3>
                   <div className="max-h-96 overflow-y-auto">
                     <div className="space-y-2">
                       {[
                         { date: '04.03.2025', name: 'Muayene', performer: 'Mustafa Yaşar' },
                         { date: '04.03.2025', name: 'Meridyen Tarama Tek Seans', performer: 'Hatice Çalış Erden' },
                         { date: '04.03.2025', name: 'Termal Tarama (IRIS-XP)', performer: 'Hatice Çalış Erden' },
                         { date: '04.03.2025', name: 'Enjekte Ozon 3 Bölge ve Üzeri', performer: 'Hatice Çalış Erden' },
                         { date: '04.03.2025', name: 'Kupa Tedavisi', performer: 'Hatice Çalış Erden' },
                         { date: '04.03.2025', name: 'Magnetoterapi', performer: 'Hatice Çalış Erden' },
                         { date: '04.03.2025', name: 'Major Ozon', performer: 'Hatice Çalış Erden' },
                         { date: '04.03.2025', name: 'Minör Ozon', performer: 'Hatice Çalış Erden' },
                         { date: '04.03.2025', name: 'Rektal Ozon', performer: 'Hatice Çalış Erden' },
                         { date: '04.03.2025', name: 'Reçete Yazılımı (Eski hastalar için)', performer: 'Mustafa Yaşar' },
                         { date: '20.03.2025', name: 'Tedavi Görüşmesi', performer: 'Mustafa Yaşar' },
                         { date: '20.03.2025', name: 'Termal Tarama (IRIS-XP)', performer: 'Hatice Çalış Erden' },
                         { date: '20.03.2025', name: 'Enjekte Ozon 3 Bölge ve Üzeri', performer: 'Hatice Çalış Erden' },
                         { date: '15.04.2025', name: 'Kontrol Muayenesi', performer: 'Mustafa Yaşar' },
                         { date: '15.04.2025', name: 'Meridyen Tarama Tek Seans', performer: 'Hatice Çalış Erden' },
                         { date: '15.04.2025', name: 'Termal Tarama (IRIS-XP)', performer: 'Hatice Çalış Erden' },
                         { date: '15.04.2025', name: 'Enjekte Ozon 3 Bölge ve Üzeri', performer: 'Hatice Çalış Erden' },
                         { date: '15.04.2025', name: 'Kupa Tedavisi', performer: 'Hatice Çalış Erden' },
                         { date: '15.04.2025', name: 'Magnetoterapi', performer: 'Hatice Çalış Erden' },
                         { date: '15.04.2025', name: 'Major Ozon', performer: 'Hatice Çalış Erden' },
                         { date: '15.04.2025', name: 'Minör Ozon', performer: 'Hatice Çalış Erden' },
                         { date: '15.04.2025', name: 'Rektal Ozon', performer: 'Hatice Çalış Erden' },
                         { date: '15.04.2025', name: 'Reçete Yazılımı (Eski hastalar için)', performer: 'Mustafa Yaşar' },
                         { date: '08.07.2025', name: 'Kontrol Muayenesi', performer: 'Mustafa Yaşar' },
                         { date: '08.07.2025', name: 'Meridyen Tarama Tek Seans', performer: 'Hatice Çalış Erden' },
                         { date: '08.07.2025', name: 'Termal Tarama (IRIS-XP)', performer: 'Hatice Çalış Erden' },
                         { date: '08.07.2025', name: 'Enjekte Ozon 3 Bölge ve Üzeri', performer: 'Hatice Çalış Erden' },
                         { date: '08.07.2025', name: 'Kupa Tedavisi', performer: 'Hatice Çalış Erden' },
                         { date: '08.07.2025', name: 'Magnetoterapi', performer: 'Hatice Çalış Erden' },
                         { date: '08.07.2025', name: 'Major Ozon', performer: 'Hatice Çalış Erden' },
                         { date: '08.07.2025', name: 'Minör Ozon', performer: 'Hatice Çalış Erden' },
                         { date: '08.07.2025', name: 'Rektal Ozon', performer: 'Hatice Çalış Erden' },
                         { date: '08.07.2025', name: 'Reçete Yazılımı (Eski hastalar için)', performer: 'Mustafa Yaşar' }
                       ].map((proc, index) => (
                         <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                           <div className="flex items-center gap-3">
                             <span className="text-sm font-medium text-gray-700 bg-white px-2 py-1 rounded">
                               {proc.date}
                             </span>
                             <span className="text-gray-800 font-medium">{proc.name}</span>
                           </div>
                           <span className="text-sm text-gray-600 bg-blue-50 px-2 py-1 rounded">
                             {proc.performer}
                           </span>
                         </div>
                       ))}
                     </div>
                   </div>
                 </div>

                 {/* Diagnosis */}
                 <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                   <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                     🔍 Teşhis ve Notlar
                   </h3>
                   <div className="space-y-3">
                     <div>
                       <label className="text-sm text-gray-600">Ana Teşhis</label>
                       <p className="font-semibold text-gray-800 text-lg">PANKREASTA KİTLE - DM</p>
                     </div>
                     <div>
                       <label className="text-sm text-gray-600">Tedavi Durumu</label>
                       <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-semibold">
                         Devam Ediyor
                       </span>
                     </div>
                   </div>
                 </div>
               </div>
             )}

             {/* Notes Tab */}
             {activeTab === 'notes' && (
              <div className="space-y-6">
                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    📝 Hasta Notları
                  </h3>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm text-gray-600">Ziyaret Nedeni</label>
                      <p className="font-semibold text-gray-800 mt-1">
                        {patient.visitReason || 'Not eklenmemiş'}
                      </p>
                    </div>
                    <div>
                      <label className="text-sm text-gray-600">Genel Notlar</label>
                      <textarea
                        className="w-full mt-1 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                        rows={4}
                        placeholder="Hasta hakkında notlar ekleyin..."
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    📋 Not Geçmişi
                  </h3>
                  <div className="space-y-3">
                    <div className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex justify-between items-start">
                        <p className="text-sm text-gray-800">Hasta kaydı oluşturuldu</p>
                        <span className="text-xs text-gray-500">{formatDate(patient.createdAt)}</span>
                      </div>
                    </div>
                    {patient.updatedAt !== patient.createdAt && (
                      <div className="p-3 bg-gray-50 rounded-lg">
                        <div className="flex justify-between items-start">
                          <p className="text-sm text-gray-800">Hasta bilgileri güncellendi</p>
                          <span className="text-xs text-gray-500">{formatDate(patient.updatedAt)}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-600">
              Son güncelleme: {formatDate(patient.updatedAt)}
            </div>
            <div className="flex gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-lg text-gray-700 font-medium transition-all duration-200"
              >
                Kapat
              </button>
              <button className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white font-medium rounded-lg transition-all duration-200">
                Yazdır
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetailsModal;
