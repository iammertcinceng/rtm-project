import React, { useState, useEffect } from 'react';
import { addDoc, collection, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';
import { toast } from 'react-toastify';
import { db } from '../../../firebase/config';

interface AppointmentTypeManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
}

interface AppointmentType {
  id: string;
  name: string;
  durationMinutes: number;
  status?: 'active' | 'passive';
  createdAt?: string;
  updatedAt?: string;
}

const AppointmentTypeManager: React.FC<AppointmentTypeManagerProps> = ({ isOpen, onClose, onAdded }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState<number>(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [existingTypes, setExistingTypes] = useState<AppointmentType[]>([]);
  const [fetchingTypes, setFetchingTypes] = useState(false);
  const [isTypesExpanded, setIsTypesExpanded] = useState(false);
  const [editingType, setEditingType] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [editDuration, setEditDuration] = useState(30);
  const [updateLoading, setUpdateLoading] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [reactivateLoading, setReactivateLoading] = useState<string | null>(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState<{isOpen: boolean, type: AppointmentType | null, futureAppointmentCount?: number}>({isOpen: false, type: null});
  const [checkingAppointments, setCheckingAppointments] = useState(false);

  useEffect(() => {
    if (isOpen) {
      fetchExistingTypes();
    }
  }, [isOpen]);

  const fetchExistingTypes = async () => {
    setFetchingTypes(true);
    try {
      const typesSnap = await getDocs(collection(db, 'appointment_types'));
      const allTypes = typesSnap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as AppointmentType[];
      
      const typesList = allTypes; // Show all appointment types (active and passive) with visual distinction
      setExistingTypes(typesList);
    } catch (err) {
      console.error('Error fetching appointment types:', err);
    } finally {
      setFetchingTypes(false);
    }
  };

  if (!isOpen) return null;

  const stepDuration = (delta: number, isEdit = false) => {
    const currentDuration = isEdit ? editDuration : duration;
    const setCurrentDuration = isEdit ? setEditDuration : setDuration;
    
    let next = currentDuration + delta;
    if (next < 15) next = 15;
    if (next > 90) next = 90;
    // 15 dk katına yuvarla
    const remainder = next % 15;
    if (remainder !== 0) next = next - remainder + (remainder >= 8 ? 15 : 0);
    setCurrentDuration(next);
  };

  const startEditing = (type: AppointmentType) => {
    setEditingType(type.id);
    setEditName(type.name);
    setEditDuration(type.durationMinutes);
  };

  const cancelEditing = () => {
    setEditingType(null);
    setEditName('');
    setEditDuration(30);
  };

  const handleUpdate = async (typeId: string) => {
    if (!editName.trim()) return;
    if (editDuration < 15 || editDuration > 90 || editDuration % 15 !== 0) return;
    
    setUpdateLoading(typeId);
    try {
      await updateDoc(doc(db, 'appointment_types', typeId), {
        name: editName.trim(),
        durationMinutes: editDuration,
        updatedAt: new Date().toISOString(),
      });
      
      toast.success(`✏️ "${editName.trim()}" randevu tipi başarıyla güncellendi!`);
      
      await fetchExistingTypes();
      cancelEditing();
    } catch (err) {
      console.error('Error updating appointment type:', err);
      toast.error('❌ Randevu tipi güncellenirken bir hata oluştu!');
    } finally {
      setUpdateLoading(null);
    }
  };

  const checkFutureAppointments = async (typeId: string) => {
    const today = new Date().toISOString().slice(0, 10); // Today in YYYY-MM-DD format
    const currentTime = new Date();
    const currentTimeString = `${currentTime.getHours().toString().padStart(2, '0')}:${currentTime.getMinutes().toString().padStart(2, '0')}`;
    
    // Get all appointments with this typeId
    const appointmentsQuery = query(
      collection(db, 'appointments'),
      where('typeId', '==', typeId)
    );
    
    const snapshot = await getDocs(appointmentsQuery);
    let futureAppointmentCount = 0;
    
    snapshot.forEach(doc => {
      const data = doc.data();
      const appointmentDate = data.dateISO;
      const appointmentTime = data.start;
      
      // Check if appointment is in the future
      if (appointmentDate > today || (appointmentDate === today && appointmentTime > currentTimeString)) {
        futureAppointmentCount++;
      }
    });
    
    return futureAppointmentCount;
  };

  const openDeleteModal = async (type: AppointmentType) => {
    setCheckingAppointments(true);
    try {
      const futureAppointmentCount = await checkFutureAppointments(type.id);
      setDeleteConfirmModal({isOpen: true, type, futureAppointmentCount});
    } catch (error) {
      console.error('Error checking future appointments:', error);
      toast.error('❌ Randevu kontrolü yapılırken bir hata oluştu!');
    } finally {
      setCheckingAppointments(false);
    }
  };

  const closeDeleteModal = () => {
    setDeleteConfirmModal({isOpen: false, type: null});
  };

  const confirmDeactivate = async () => {
    const typeToDeactivate = deleteConfirmModal.type;
    const futureAppointmentCount = deleteConfirmModal.futureAppointmentCount;
    if (!typeToDeactivate) return;
    
    // Check if there are future appointments
    if (futureAppointmentCount && futureAppointmentCount > 0) {
      toast.error(`❌ Bu randevu tipi ile ${futureAppointmentCount} adet gelecek tarihli randevu bulunmaktadır. Önce bu randevuları iptal edin veya başka bir tipe aktarın.`);
      closeDeleteModal();
      return;
    }
    
    setDeleteLoading(typeToDeactivate.id);
    try {
      await updateDoc(doc(db, 'appointment_types', typeToDeactivate.id), {
        status: 'passive',
        updatedAt: new Date().toISOString(),
      });
      
      toast.success(`📦 "${typeToDeactivate.name}" randevu tipi başarıyla pasif duruma alındı!`);
      
      await fetchExistingTypes();
      closeDeleteModal();
    } catch (err) {
      console.error('Error deactivating appointment type:', err);
      toast.error('❌ Randevu tipi pasife alınırken bir hata oluştu!');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleReactivate = async (typeId: string) => {
    const typeToReactivate = existingTypes.find(type => type.id === typeId);
    if (!typeToReactivate) return;
    
    setReactivateLoading(typeId);
    try {
      await updateDoc(doc(db, 'appointment_types', typeId), {
        status: 'active',
        updatedAt: new Date().toISOString(),
      });
      
      toast.success(`✅ "${typeToReactivate.name}" randevu tipi başarıyla aktif duruma alındı!`);
      
      await fetchExistingTypes();
    } catch (err) {
      console.error('Error reactivating appointment type:', err);
      toast.error('❌ Randevu tipi aktifleştirilirken bir hata oluştu!');
    } finally {
      setReactivateLoading(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) {
      setError('Lütfen geçerli bir ad ve süre girin.');
      return;
    }
    if (duration < 15 || duration > 90 || duration % 15 !== 0) {
      setError('Süre 15-90 dk aralığında ve 15 dk katında olmalı.');
      return;
    }
    setLoading(true);
    try {
      await addDoc(collection(db, 'appointment_types'), {
        name: name.trim(),
        durationMinutes: duration,
        createdAt: new Date().toISOString(),
      });
      
      toast.success(`🎉 "${name.trim()}" randevu tipi başarıyla eklendi!`);
      
      setName('');
      setDuration(30);
      cancelEditing(); // Clear any editing state
      await fetchExistingTypes();
      setIsTypesExpanded(true); // Expand to show the newly added type
      onAdded();
      onClose();
    } catch (err) {
      console.error(err);
      toast.error('❌ Randevu tipi eklenirken bir hata oluştu!');
      setError('Kaydetme sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-slate-900/80 via-blue-900/80 to-slate-800/80 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
      <div className="bg-gradient-to-br from-white/95 to-gray-50/95 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl w-full max-w-lg transform animate-scaleIn">
        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-200/50">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
              <span className="text-white text-xl">📋</span>
            </div>
            <div>
              <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Randevu Tipi Ekle</h3>
              <p className="text-gray-600 text-sm">Yeni bir randevu tipi oluşturun</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 space-y-8">
          {error && (
            <div className="p-4 bg-gradient-to-r from-red-50 to-red-100 border border-red-200 text-red-700 rounded-2xl shadow-sm animate-slideDown">
              <div className="flex items-center gap-2">
                <span className="text-red-500">⚠️</span>
                {error}
              </div>
            </div>
          )}
          
          {/* Existing Appointment Types - Collapsible */}
          <div className="space-y-4">
            <button
              type="button"
              onClick={() => setIsTypesExpanded(!isTypesExpanded)}
              className="w-full flex items-center justify-between p-4 bg-gradient-to-r from-blue-50/80 to-purple-50/80 backdrop-blur-sm border border-blue-200/50 rounded-2xl hover:from-blue-100/80 hover:to-purple-100/80 transition-all duration-300 group"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-200">
                  <span className="text-white text-lg">📚</span>
                </div>
                <div className="text-left">
                  <h4 className="text-lg font-semibold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                    Mevcut Randevu Tipleri
                  </h4>
                  <p className="text-sm text-gray-500">
                    {existingTypes.length > 0 ? `${existingTypes.length} tip mevcut` : 'Henüz tip eklenmemiş'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-500 font-medium">
                  {isTypesExpanded ? 'Gizle' : 'Göster'}
                </span>
                <div className={`transform transition-transform duration-300 ${
                  isTypesExpanded ? 'rotate-180' : 'rotate-0'
                }`}>
                  <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
            </button>
            
            <div className={`overflow-hidden transition-all duration-500 ease-in-out ${
              isTypesExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
            }`}>
              <div className="bg-gradient-to-br from-gray-50/80 to-white/80 backdrop-blur-sm border border-gray-200/50 rounded-2xl p-4 max-h-80 overflow-y-auto custom-scrollbar">
                {fetchingTypes ? (
                  <div className="text-center py-6">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-3"></div>
                    <div className="text-gray-500 text-sm">Yükleniyor...</div>
                  </div>
                ) : existingTypes.length === 0 ? (
                  <div className="text-center py-6">
                    <div className="text-4xl mb-3">🔍</div>
                    <div className="text-gray-500 text-sm">Henüz randevu tipi eklenmemiş</div>
                    <div className="text-xs text-gray-400 mt-2">İlk randevu tipinizi aşağıdaki formla ekleyebilirsiniz</div>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {existingTypes.map((type, index) => {
                      const isPassive = type.status === 'passive';
                      return (
                      <div 
                        key={type.id} 
                        className={`backdrop-blur-sm rounded-xl border shadow-sm transition-all duration-300 animate-slideIn ${
                          isPassive 
                            ? 'bg-gray-100/80 border-gray-300/50 opacity-60' 
                            : editingType === type.id 
                            ? 'bg-white/80 border-blue-300 shadow-lg bg-gradient-to-r from-blue-50/80 to-purple-50/80' 
                            : 'bg-white/80 border-gray-200/50 hover:shadow-md hover:bg-gradient-to-r hover:from-blue-50/50 hover:to-purple-50/50'
                        }`}
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        {editingType === type.id ? (
                          // Edit Mode - Modern Design
                          <div className="p-6 bg-gradient-to-br from-blue-50/50 to-purple-50/50 rounded-xl border border-blue-200/30 shadow-inner">
                            {/* Edit Header */}
                            <div className="flex items-center gap-4 mb-6">
                              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                                <span className="text-white text-xl">✏️</span>
                              </div>
                              <div>
                                <h4 className="text-lg font-bold bg-gradient-to-r from-blue-800 to-purple-800 bg-clip-text text-transparent">
                                  Randevu Tipi Düzenleniyor
                                </h4>
                                <div className="flex items-center gap-2">
                                  <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse"></div>
                                  <span className="text-sm font-medium text-green-700">Düzenleme Modu Aktif</span>
                                </div>
                              </div>
                            </div>
                            
                            {/* Form Fields */}
                            <div className="space-y-6">
                              <div className="space-y-3">
                                <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                                  <span className="text-blue-500">📝</span>
                                  Randevu Tipi Adı
                                </label>
                                <input 
                                  value={editName}
                                  onChange={e => setEditName(e.target.value)}
                                  className="w-full px-4 py-3 bg-white/90 backdrop-blur-sm border border-blue-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md font-medium"
                                  placeholder="Randevu tipi adını girin..."
                                />
                              </div>
                              
                              <div className="space-y-3">
                                <label className="block text-sm font-bold text-gray-700 flex items-center gap-2">
                                  <span className="text-purple-500">⏱️</span>
                                  Süre (dakika)
                                </label>
                                <div className="flex items-center gap-3 bg-white/90 backdrop-blur-sm border border-purple-300/50 rounded-xl p-3 shadow-sm">
                                  <button 
                                    type="button" 
                                    onClick={() => stepDuration(-15, true)} 
                                    className="p-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-lg border border-gray-300 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
                                  >
                                    <span className="text-gray-700 font-bold">−</span>
                                  </button>
                                  <div className="flex-1 text-center">
                                    <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                      {editDuration}
                                    </div>
                                    <div className="text-xs text-gray-500 font-medium">dakika</div>
                                  </div>
                                  <button 
                                    type="button" 
                                    onClick={() => stepDuration(15, true)} 
                                    className="p-2.5 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-lg border border-gray-300 transition-all duration-200 hover:scale-110 active:scale-95 shadow-sm"
                                  >
                                    <span className="text-gray-700 font-bold">+</span>
                                  </button>
                                </div>
                                <div className="text-xs text-center text-gray-500 bg-white/50 rounded-lg p-2">
                                  💡 Seçenekler: 15, 30, 45, 60, 75, 90 dakika
                                </div>
                              </div>
                            </div>
                            
                            {/* Action Buttons */}
                            <div className="flex justify-end gap-3 pt-6 mt-6 border-t border-blue-200/50">
                              <button 
                                type="button"
                                onClick={cancelEditing}
                                className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-300 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
                              >
                                İptal
                              </button>
                              <button 
                                type="button"
                                onClick={() => handleUpdate(type.id)}
                                disabled={updateLoading === type.id || !editName.trim()}
                                className="px-8 py-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 min-w-[140px] justify-center"
                              >
                                {updateLoading === type.id ? (
                                  <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Güncelleniyor...</span>
                                  </>
                                ) : (
                                  <>
                                    <span className="text-lg">💾</span>
                                    <span>Kaydet</span>
                                  </>
                                )}
                              </button>
                            </div>
                          </div>
                        ) : (
                          // View Mode
                          <div className="flex justify-between items-center px-4 py-3 group">
                            <div className="flex items-center gap-3">
                              <div className={`w-2 h-2 rounded-full transition-transform duration-200 ${
                                isPassive 
                                  ? 'bg-gray-400 group-hover:scale-125' 
                                  : 'bg-gradient-to-r from-blue-500 to-purple-600 group-hover:scale-150'
                              }`}></div>
                              <span className={`font-medium transition-colors duration-200 ${
                                isPassive 
                                  ? 'text-gray-500 group-hover:text-gray-600' 
                                  : 'text-gray-800 group-hover:text-gray-900'
                              }`}>
                                {type.name}
                                {isPassive && <span className="ml-2 text-xs text-gray-400 bg-gray-200 px-2 py-0.5 rounded-full">Pasif</span>}
                              </span>
                            </div>
                            <div className="flex items-center gap-3">
                              <div className={`flex items-center gap-1 transition-opacity duration-200 ${
                                isPassive ? 'opacity-40 group-hover:opacity-60' : 'opacity-0 group-hover:opacity-100'
                              }`}>
                                <button
                                  onClick={() => startEditing(type)}
                                  disabled={isPassive}
                                  className={`p-1.5 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed ${
                                    isPassive 
                                      ? 'bg-gray-200 hover:bg-gray-300 text-gray-500' 
                                      : 'bg-blue-100 hover:bg-blue-200 text-blue-600'
                                  }`}
                                  title={isPassive ? 'Pasif randevu tipi düzenlenemez' : 'Düzenle'}
                                >
                                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                  </svg>
                                </button>
                                {isPassive ? (
                                  <button
                                    onClick={() => handleReactivate(type.id)}
                                    disabled={reactivateLoading === type.id}
                                    className="p-1.5 bg-green-100 hover:bg-green-200 text-green-600 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Aktif Duruma Al"
                                  >
                                    {reactivateLoading === type.id ? (
                                      <div className="animate-spin rounded-full h-3 w-3 border-b border-green-600"></div>
                                    ) : (
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                      </svg>
                                    )}
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => openDeleteModal(type)}
                                    disabled={deleteLoading === type.id || checkingAppointments}
                                    className="p-1.5 bg-orange-100 hover:bg-orange-200 text-orange-600 rounded-lg transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
                                    title="Pasife Al"
                                  >
                                    {deleteLoading === type.id || checkingAppointments ? (
                                      <div className="animate-spin rounded-full h-3 w-3 border-b border-orange-600"></div>
                                    ) : (
                                      <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14l-1 9a2 2 0 01-2 2H8a2 2 0 01-2-2L5 8zm0 0V6a2 2 0 012-2h4l2 2h4a2 2 0 012 2v2M10 12h4" />
                                      </svg>
                                    )}
                                  </button>
                                )}
                              </div>
                              <span className={`text-xs px-3 py-1 rounded-full font-semibold transition-colors duration-200 ${
                                isPassive 
                                  ? 'text-gray-500 bg-gray-200 group-hover:bg-gray-300' 
                                  : 'text-blue-600 bg-blue-100 group-hover:bg-blue-200'
                              }`}>
                                {type.durationMinutes} dk
                              </span>
                            </div>
                          </div>
                        )}
                      </div>
                    )
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-green-500">✏️</span>
                Randevu Tipi Adı
              </label>
              <input 
                value={name} 
                onChange={e=>setName(e.target.value)} 
                className="w-full px-4 py-3 bg-white/80 backdrop-blur-sm border border-gray-300/50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 shadow-sm hover:shadow-md" 
                placeholder="Örn. İlk Muayene, Kontrol, Ameliyat..." 
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 flex items-center gap-2">
                <span className="text-purple-500">⏰</span>
                Süre (dakika)
              </label>
              <div className="flex items-center gap-4 bg-white/80 backdrop-blur-sm border border-gray-300/50 rounded-xl p-2">
                <button 
                  type="button" 
                  onClick={()=>stepDuration(-15)} 
                  className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-lg border border-gray-300 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <span className="text-gray-600 font-bold">−</span>
                </button>
                <div className="flex-1 text-center">
                  <div className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {duration}
                  </div>
                  <div className="text-xs text-gray-500 font-medium">dakika</div>
                </div>
                <button 
                  type="button" 
                  onClick={()=>stepDuration(15)} 
                  className="p-3 bg-gradient-to-r from-gray-100 to-gray-200 hover:from-gray-200 hover:to-gray-300 rounded-lg border border-gray-300 transition-all duration-200 hover:scale-105 active:scale-95"
                >
                  <span className="text-gray-600 font-bold">+</span>
                </button>
              </div>
              <div className="text-xs text-gray-500 text-center bg-gray-50 rounded-lg p-2">
                💡 Seçenekler: 15, 30, 45, 60, 75, 90 dakika
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-4 pt-4 border-t border-gray-200/50">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold rounded-xl border border-gray-300 transition-all duration-200 hover:scale-105 active:scale-95"
            >
              İptal
            </button>
            <button 
              type="submit" 
              disabled={loading} 
              className="px-8 py-3 bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <span>💾</span>
                  Kaydet
                </>
              )}
            </button>
          </div>
        </form>
      </div>
      
      {/* Delete Confirmation Modal */}
      {deleteConfirmModal.isOpen && deleteConfirmModal.type && (
        <div className="fixed inset-0 bg-gradient-to-br from-slate-900/90 via-orange-900/60 to-slate-800/90 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl shadow-2xl w-full max-w-md mx-4 transform animate-scaleIn overflow-hidden">
            {/* Header */}
            <div className="px-8 py-6 bg-gradient-to-r from-orange-50 to-amber-50 border-b border-orange-100">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg animate-pulse">
                  <span className="text-white text-2xl">📦</span>
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-orange-800">Pasife Al</h3>
                  <p className="text-orange-600 text-sm">Randevu tipi gizlenecek</p>
                </div>
              </div>
            </div>

            {/* Content */}
            <div className="px-8 py-8">
              <div className="text-center space-y-4">
                <div className="text-lg font-semibold text-gray-800">
                  <span className="text-orange-600">"</span>
                  <span className="bg-gradient-to-r from-orange-600 to-amber-600 bg-clip-text text-transparent font-bold">
                    {deleteConfirmModal.type.name}
                  </span>
                  <span className="text-orange-600">"</span>
                  <span className="text-gray-700"> randevu tipini pasife almak istediğinize emin misiniz?</span>
                </div>
                
                {deleteConfirmModal.futureAppointmentCount !== undefined && deleteConfirmModal.futureAppointmentCount > 0 && (
                  <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-2xl">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                        <span className="text-red-600 text-lg">⚠️</span>
                      </div>
                      <div>
                        <div className="text-red-800 font-semibold">Dikkat!</div>
                        <div className="text-red-700 text-sm">
                          Bu randevu tipi ile <span className="font-bold">{deleteConfirmModal.futureAppointmentCount} adet</span> gelecek tarihli randevu bulunmaktadır.
                        </div>
                        <div className="text-red-600 text-xs mt-1">
                          Bu randevu tipi pasife alınamaz. Önce randevuları iptal edin veya başka bir tipe aktarın.
                        </div>
                      </div>
                    </div>
                  </div>
                )}
                
                <div className="bg-gradient-to-r from-orange-50 to-amber-50 rounded-2xl p-4 border border-orange-100">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 text-sm">ℹ️</span>
                    </div>
                    <div className="text-left">
                      <div className="text-sm font-semibold text-orange-800">Pasife Alınacak:</div>
                      <div className="text-xs text-orange-600 space-y-1">
                        <div>• Randevu Tipi: {deleteConfirmModal.type.name}</div>
                        <div>• Süre: {deleteConfirmModal.type.durationMinutes} dakika</div>
                        <div>• Bu tip listede görünmeyecek</div>
                        <div>• Veriler korunacak, geri getirilebilir</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="px-8 py-6 bg-gray-50 border-t border-gray-100 flex justify-end gap-4">
              <button 
                onClick={closeDeleteModal}
                className="px-6 py-3 bg-white hover:bg-gray-50 text-gray-700 font-semibold rounded-xl border border-gray-300 transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm hover:shadow-md"
              >
                İptal
              </button>
              <button 
                onClick={confirmDeactivate}
                disabled={deleteLoading === deleteConfirmModal.type.id || (deleteConfirmModal.futureAppointmentCount !== undefined && deleteConfirmModal.futureAppointmentCount > 0)}
                className={`px-8 py-3 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2 min-w-[140px] justify-center ${
                  deleteConfirmModal.futureAppointmentCount !== undefined && deleteConfirmModal.futureAppointmentCount > 0
                    ? 'bg-gradient-to-r from-gray-400 to-gray-500 cursor-not-allowed'
                    : 'bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700'
                }`}
              >
                {deleteLoading === deleteConfirmModal.type.id ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    <span>İşleniyor...</span>
                  </>
                ) : (
                  <>
                    <span className="text-lg">
                      {deleteConfirmModal.futureAppointmentCount !== undefined && deleteConfirmModal.futureAppointmentCount > 0 ? '🚫' : '📦'}
                    </span>
                    <span>
                      {deleteConfirmModal.futureAppointmentCount !== undefined && deleteConfirmModal.futureAppointmentCount > 0 ? 'Pasife Alınamaz' : 'Pasife Al'}
                    </span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentTypeManager;
