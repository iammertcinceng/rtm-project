import React, { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import AddPatientModal from './AddPatientModal';
import EditPatientModal from './EditPatientModal';
import PatientDetailsModal from './PatientDetailsModal';

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

const Patients: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [selectedPatientForDetails, setSelectedPatientForDetails] = useState<Patient | null>(null);

  // Fetch patients from Firestore
  const fetchPatients = async () => {
    try {
      setLoading(true);
      const patientsRef = collection(db, 'patients');
      const q = query(patientsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const patientsData: Patient[] = [];
      querySnapshot.forEach((doc) => {
        patientsData.push({
          id: doc.id,
          ...doc.data()
        } as Patient);
      });
      
      setPatients(patientsData);
    } catch (error) {
      console.error('Error fetching patients:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

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

  const filteredPatients = patients.filter(patient => {
    const matchesSearch = patient.fullName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         patient.tcNo.includes(searchTerm) ||
                         patient.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = filterStatus === 'all' || 
                         (filterStatus === 'active' && patient.registrationDate) ||
                         (filterStatus === 'inactive' && !patient.registrationDate);
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-white text-xl">Yükleniyor...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Hasta Yönetimi</h1>
          <p className="text-white/70">Hasta listesi ve bilgileri</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:scale-105 transition-all duration-200 shadow-lg"
        >
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
                placeholder="Hasta adı, TC No veya email ile ara..."
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
              <option value="active">Kayıtlı</option>
              <option value="inactive">Kayıtsız</option>
            </select>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { title: 'Toplam Hasta', value: patients.length.toString(), icon: '👥', color: 'from-blue-500 to-cyan-500' },
          { title: 'Kayıtlı Hasta', value: patients.filter(p => p.registrationDate).length.toString(), icon: '✅', color: 'from-green-500 to-emerald-500' },
          { title: 'Bu Ay Yeni', value: patients.filter(p => {
            const createdAt = new Date(p.createdAt);
            const now = new Date();
            return createdAt.getMonth() === now.getMonth() && createdAt.getFullYear() === now.getFullYear();
          }).length.toString(), icon: '🆕', color: 'from-yellow-500 to-orange-500' },
          { title: 'Kayıtsız Hasta', value: patients.filter(p => !p.registrationDate).length.toString(), icon: '📅', color: 'from-purple-500 to-pink-500' }
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
                <th className="px-6 py-4 text-left text-white/80 font-semibold">Email</th>
                <th className="px-6 py-4 text-left text-white/80 font-semibold">Kayıt Tarihi</th>
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
                          {patient.fullName.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">{patient.fullName}</div>
                        <div className="text-white/60 text-sm">{calculateAge(patient.birthDate)} yaş, {patient.gender}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-white">{patient.tcNo}</td>
                  <td className="px-6 py-4 text-white">{patient.phone}</td>
                  <td className="px-6 py-4 text-white">{patient.email}</td>
                  <td className="px-6 py-4 text-white">
                    {patient.registrationDate ? formatDate(patient.registrationDate) : '-'}
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                      patient.registrationDate 
                        ? 'bg-green-500/20 text-green-300' 
                        : 'bg-red-500/20 text-red-300'
                    }`}>
                      {patient.registrationDate ? 'Kayıtlı' : 'Kayıtsız'}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                                         <div className="flex items-center gap-2">
                       <button 
                         onClick={() => {
                           setSelectedPatientForDetails(patient);
                           setIsDetailsModalOpen(true);
                         }}
                         className="p-2 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/30 rounded-lg text-blue-300 hover:text-blue-200 transition-all duration-200"
                       >
                         👁️
                       </button>
                                             <button 
                         onClick={() => {
                           setSelectedPatient(patient);
                           setIsEditModalOpen(true);
                         }}
                         className="p-2 bg-green-500/20 hover:bg-green-500/30 border border-green-500/30 rounded-lg text-green-300 hover:text-green-200 transition-all duration-200"
                       >
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
        
        {filteredPatients.length === 0 && (
          <div className="p-8 text-center">
            <div className="text-white/60">Hasta bulunamadı</div>
          </div>
        )}
      </div>

      {/* Add Patient Modal */}
      <AddPatientModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onPatientAdded={fetchPatients}
      />

             {/* Edit Patient Modal */}
       <EditPatientModal
         isOpen={isEditModalOpen}
         onClose={() => {
           setIsEditModalOpen(false);
           setSelectedPatient(null);
         }}
         onPatientUpdated={fetchPatients}
         patient={selectedPatient}
       />

       {/* Patient Details Modal */}
       <PatientDetailsModal
         isOpen={isDetailsModalOpen}
         onClose={() => {
           setIsDetailsModalOpen(false);
           setSelectedPatientForDetails(null);
         }}
         patient={selectedPatientForDetails}
       />
     </div>
   );
 };

export default Patients; 