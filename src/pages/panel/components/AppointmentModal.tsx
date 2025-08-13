import React, { useEffect, useMemo, useRef, useState } from 'react';
import { collection, addDoc, getDocs, query, where, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase/config';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';

interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
  doctorId?: string;
  editedAppointment?: any | null;
}

interface PatientDoc { id: string; fullName: string; }
interface TypeDoc { id: string; name: string; durationMinutes: number; }

const WORK_START = '08:00';
const WORK_END = '17:30';

function timeToMinutes(t: string) { const [h, m] = t.split(':').map(Number); return h * 60 + m; }
function minutesToTime(mins: number) {
  const h = Math.floor(mins / 60).toString().padStart(2, '0');
  const m = (mins % 60).toString().padStart(2, '0');
  return `${h}:${m}`;
}
// generateTimes kaldırıldı (artık custom saat bileşeni var)

const AppointmentModal: React.FC<AppointmentModalProps> = ({ isOpen, onClose, onAdded, doctorId, editedAppointment }) => {
  const [patients, setPatients] = useState<PatientDoc[]>([]);
  const [types, setTypes] = useState<TypeDoc[]>([]);
  const [patientOpen, setPatientOpen] = useState<boolean>(false);
  const [typeOpen, setTypeOpen] = useState<boolean>(false);
  const [searchPatient, setSearchPatient] = useState('');
  const [searchType, setSearchType] = useState('');

  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedPatient, setSelectedPatient] = useState<string>('');
  const [selectedType, setSelectedType] = useState<string>('');
  const [hourOpen, setHourOpen] = useState(false);
  const [minuteOpen, setMinuteOpen] = useState(false);
  const [startHour, setStartHour] = useState<number>(9);
  const [startMinute, setStartMinute] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [dayAppointments, setDayAppointments] = useState<any[]>([]);

  // Refs for click-outside handling
  const patientRef = useRef<HTMLDivElement | null>(null);
  const typeRef = useRef<HTMLDivElement | null>(null);
  const timeRef = useRef<HTMLDivElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const startTime = useMemo(() => `${String(startHour).padStart(2,'0')}:${String(startMinute).padStart(2,'0')}`, [startHour, startMinute]);

  // Close overlays on outside click
  useEffect(() => {
    if (!isOpen) return;
    const onDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const insidePatient = patientRef.current?.contains(target);
      const insideType = typeRef.current?.contains(target);
      const insideTime = timeRef.current?.contains(target);
      if (!insidePatient) setPatientOpen(false);
      if (!insideType) setTypeOpen(false);
      if (!insideTime) { setHourOpen(false); setMinuteOpen(false); }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [isOpen]);

  // Focus container so ESC works reliably
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        containerRef.current?.focus();
      }, 0);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    (async () => {
      const ps = await getDocs(collection(db, 'patients'));
      const patientsList: PatientDoc[] = ps.docs.map(d => ({ id: d.id, fullName: (d.data() as any).fullName || 'İsimsiz' }));
      setPatients(patientsList);
      const tq = query(collection(db, 'appointment_types'));
      const ts = await getDocs(tq);
      const typeList: TypeDoc[] = ts.docs.map(d => ({ id: d.id, name: (d.data() as any).name, durationMinutes: (d.data() as any).durationMinutes || 30 }));
      setTypes(typeList);
      setError('');
    })();
  }, [isOpen]);

  // Edit modunda alanları doldur
  useEffect(() => {
    if (!isOpen) return;
    if (editedAppointment) {
      const s = editedAppointment.start ?? editedAppointment.time;
      if (s) {
        const [hh, mm] = String(s).split(':').map((n: string) => parseInt(n, 10));
        setStartHour(hh);
        setStartMinute(mm);
      }
      if (editedAppointment.dateISO) {
        const d = new Date(editedAppointment.dateISO);
        if (!isNaN(d.getTime())) setSelectedDate(d);
      }
      if (editedAppointment.patientId) setSelectedPatient(editedAppointment.patientId);
      if (editedAppointment.typeId) setSelectedType(editedAppointment.typeId);
    } else {
      // add moduna dönüşte temizleme
      setSelectedPatient('');
      setSelectedType('');
    }
  }, [isOpen, editedAppointment]);

  // Gün randevularını çek (disable için). Edit modda mevcut id'yi hariç tut.
  useEffect(() => {
    if (!isOpen) return;
    const dateISO = selectedDate.toISOString().slice(0,10);
    (async () => {
      const qDay = query(collection(db, 'appointments'), where('dateISO', '==', dateISO));
      const snap = await getDocs(qDay);
      const list = snap.docs.map(d => ({ id: d.id, ...(d.data() as any) }));
      const filtered = editedAppointment ? list.filter(x => x.id !== editedAppointment.id) : list;
      // start'a göre sırala
      filtered.sort((a,b)=>String(a.start||'').localeCompare(String(b.start||'')));
      setDayAppointments(filtered);
    })();
  }, [isOpen, selectedDate, editedAppointment]);

  const selectedTypeObj = useMemo(() => types.find(t => t.id === selectedType), [types, selectedType]);

  const endTime = useMemo(() => {
    if (!selectedTypeObj) return null;
    const dur = selectedTypeObj.durationMinutes || 0;
    const end = timeToMinutes(startTime) + dur;
    return minutesToTime(end);
  }, [startTime, selectedTypeObj]);

  const withinWorkHours = useMemo(() => {
    if (!endTime) return true; // tip seçilmeden uyarı göstermeyelim
    const startOk = timeToMinutes(startTime) >= timeToMinutes(WORK_START);
    const endOk = timeToMinutes(endTime) <= timeToMinutes(WORK_END);
    return startOk && endOk;
  }, [startTime, endTime]);

  // Başlangıç dakikasının dolu olup olmadığını kontrol et (segment başı engelleme)
  const isStartDisabled = (h: number, m: number) => {
    const startMin = h * 60 + m;
    // mesai sınırı
    if (startMin < timeToMinutes(WORK_START) || startMin > timeToMinutes(WORK_END)) return true;
    // bugün min saat
    if (minSelectableTimeToday) {
      const [mh, mm] = minSelectableTimeToday.split(':').map(Number);
      const minToday = mh * 60 + mm;
      if (selectedDate.toDateString() === new Date().toDateString() && startMin < minToday) return true;
    }
    // mevcut randevu aralıkları
    for (const a of dayAppointments) {
      const durA: number = (a.durationMinutes ?? a.duration ?? 0);
      const sA = timeToMinutes(a.start ?? a.time);
      const eA = sA + durA;
      if (startMin >= sA && startMin < eA) return true;
    }
    return false;
  };

  const filteredPatients = useMemo(() => {
    const s = searchPatient.trim().toLowerCase();
    if (!s) return patients;
    return patients.filter(p => p.fullName.toLowerCase().includes(s));
  }, [patients, searchPatient]);

  const filteredTypes = useMemo(() => {
    const s = searchType.trim().toLowerCase();
    if (!s) return types;
    return types.filter(t => t.name.toLowerCase().includes(s));
  }, [types, searchType]);

  // Min-time kontrolü (bugün için): şimdi + 5dk yuvarla
  const minSelectableTimeToday = useMemo(() => {
    const now = new Date();
    if (selectedDate.toDateString() !== new Date().toDateString()) return null;
    let mins = now.getHours() * 60 + now.getMinutes();
    mins = Math.ceil(mins / 5) * 5; // 5dk'ya yuvarla
    const bound = Math.max(mins, timeToMinutes(WORK_START));
    return minutesToTime(bound);
  }, [selectedDate]);

  useEffect(() => {
    // Eğer bugün ise, startTime en az minSelectableTimeToday olsun
    if (!minSelectableTimeToday) return;
    const cur = timeToMinutes(startTime);
    const minT = timeToMinutes(minSelectableTimeToday);
    if (cur < minT) {
      setStartHour(Math.floor(minT / 60));
      setStartMinute(minT % 60);
    }
  }, [minSelectableTimeToday]);

  const clampToWorkHours = (h: number, m: number) => {
    let total = h * 60 + m;
    const start = timeToMinutes(WORK_START);
    const end = timeToMinutes(WORK_END);
    if (total < start) total = start;
    if (total > end) total = end;
    // bugün min zaman altında kalmasın
    if (minSelectableTimeToday) {
      const minT = timeToMinutes(minSelectableTimeToday);
      if (total < minT) total = minT;
    }
    return { h: Math.floor(total/60), m: total%60 };
  };

  const stepMinutes = (delta: number) => {
    const total = timeToMinutes(startTime) + delta;
    const { h, m } = clampToWorkHours(Math.floor(total/60), total%60);
    setStartHour(h); setStartMinute(m);
  };

  const checkOverlap = async () => {
    // fetch same-day appointments to check overlap
    const dateISO = selectedDate.toISOString().slice(0, 10);
    const qDay = query(collection(db, 'appointments'), where('dateISO', '==', dateISO));
    const snap = await getDocs(qDay);
    const start = timeToMinutes(startTime);
    const dur = selectedTypeObj?.durationMinutes || 0;
    const end = start + dur;
    for (const d of snap.docs) {
      const s = timeToMinutes((d.data() as any).start);
      const e = timeToMinutes((d.data() as any).end);
      const overlap = Math.max(start, s) < Math.min(end, e);
      if (overlap) return true;
    }
    return false;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!selectedPatient) return setError('Lütfen hasta seçin.');
    if (!selectedTypeObj) return setError('Lütfen randevu tipi seçin.');
    if (!withinWorkHours) return setError('Seçilen saat mesai saatleri dışında.');

    setLoading(true);
    try {
      const overlap = await checkOverlap();
      if (overlap) {
        setError('Seçilen zaman aralığı dolu. Lütfen başka bir saat seçin.');
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        const dateISO = selectedDate.toISOString().slice(0,10);
        if (editedAppointment?.id) {
          // edit: hasta adı sabit, diğerleri güncellenebilir
          await updateDoc(doc(db, 'appointments', editedAppointment.id), {
            typeId: selectedTypeObj.id,
            typeName: selectedTypeObj.name,
            durationMinutes: selectedTypeObj.durationMinutes,
            dateISO,
            start: startTime,
            status: editedAppointment.status || 'confirmed',
            doctorId: doctorId || editedAppointment.doctorId || null,
          });
        } else {
          await addDoc(collection(db, 'appointments'), {
            patientId: selectedPatient,
            patientName: patients.find(p=>p.id===selectedPatient)?.fullName || 'Hasta',
            typeId: selectedTypeObj.id,
            typeName: selectedTypeObj.name,
            durationMinutes: selectedTypeObj.durationMinutes,
            dateISO,
            start: startTime,
            status: 'confirmed',
            doctorId: doctorId || null,
          });
        }
        onAdded();
        onClose();
      } catch (err: any) {
        setError('Kayıt sırasında hata oluştu.');
      } finally {
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError('Randevu eklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div ref={containerRef} className={`fixed inset-0 z-50 ${isOpen ? '' : 'hidden'}`}
      onClick={() => onClose()}
      onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
      tabIndex={-1}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
      <div className="absolute inset-0 flex items-center justify-center p-4" onClick={(e)=>e.stopPropagation()}>
        <form onSubmit={handleSubmit} className="w-full max-w-3xl bg-white rounded-2xl shadow-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-gray-800">{editedAppointment? 'Randevu Düzenle' : 'Randevu Ekle'}</h3>
            <button type="button" className="text-gray-500 hover:text-gray-700" onClick={onClose}>✕</button>
          </div>
          {error && (
            <div className="mb-4 p-3 rounded-lg border border-red-200 bg-red-50 text-red-700 text-sm">
              {error}
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Hasta seçimi (dar açılır panel) */}
            <div ref={patientRef}>
              <label className="block text-gray-700 text-sm font-medium mb-2">Hasta</label>
              <div className="relative">
                <button type="button" disabled={!!editedAppointment} onClick={()=>setPatientOpen(v=>!v)} className={`w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-left hover:border-gray-400 ${editedAppointment?'opacity-60 cursor-not-allowed':''}`}>
                  {patients.find(p=>p.id===selectedPatient)?.fullName || 'Hasta seçin'}
                </button>
                {patientOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                  <input value={searchPatient} onChange={e=>setSearchPatient(e.target.value)} placeholder="Ara" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md mb-2" />
                  <div className="max-h-[50vh] overflow-y-auto">
                    {filteredPatients.map(p => (
                      <button type="button" key={p.id} onClick={()=>{setSelectedPatient(p.id); setPatientOpen(false);}} className={`w-full text-left px-3 py-2 rounded-md hover:bg-green-50 cursor-pointer ${selectedPatient===p.id?'bg-green-100':''}`}>
                        {p.fullName}
                      </button>
                    ))}
                    {filteredPatients.length===0 && <div className="px-3 py-2 text-gray-500">Hasta bulunamadı</div>}
                  </div>
                </div>
                )}
              </div>
            </div>

            {/* Randevu tipi seçimi (dar açılır panel) */}
            <div ref={typeRef}>
              <label className="block text-gray-700 text-sm font-medium mb-2">Randevu Tipi</label>
              <div className="relative">
                <button type="button" onClick={()=>setTypeOpen(v=>!v)} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg text-left hover:border-gray-400">
                  {types.find(t=>t.id===selectedType)?.name || 'Tip seçin'}
                </button>
                {typeOpen && (
                <div className="absolute left-0 right-0 top-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-2 z-50">
                  <input value={searchType} onChange={e=>setSearchType(e.target.value)} placeholder="Ara" className="w-full px-3 py-2 bg-gray-50 border border-gray-200 rounded-md mb-2" />
                  <div className="max-h-[50vh] overflow-y-auto">
                    {filteredTypes.map(t => (
                      <button type="button" key={t.id} onClick={()=>{setSelectedType(t.id); setTypeOpen(false);}} className={`w-full text-left px-3 py-2 rounded-md hover:bg-green-50 cursor-pointer ${selectedType===t.id?'bg-green-100':''}`}>
                        {t.name} • {t.durationMinutes} dk
                      </button>
                    ))}
                    {filteredTypes.length===0 && <div className="px-3 py-2 text-gray-500">Tip bulunamadı</div>}
                  </div>
                </div>
                )}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">Tarih</label>
              <DayPicker mode="single" selected={selectedDate} onSelect={(d)=>d && setSelectedDate(d)} className="bg-white rounded-lg p-2 border border-gray-200" />
            </div>
            <div ref={timeRef}>
              <label className="block text-gray-700 text-sm font-medium mb-2">Başlangıç Saati</label>
              <div className="flex items-center gap-3 relative">
                {/* Saat kontrolü */}
                <div className="flex-1">
                  <div className="flex items-center justify-between bg-gray-50 border border-gray-300 rounded-lg px-3 py-2">
                    <button type="button" onClick={()=>stepMinutes(-5)} className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">◀</button>
                    <div className="flex items-center gap-2">
                      <button type="button" onClick={()=>setHourOpen(v=>!v)} className="font-mono text-lg hover:text-emerald-600 cursor-pointer">{String(startHour).padStart(2,'0')}</button>
                      :
                      <button type="button" onClick={()=>setMinuteOpen(v=>!v)} className="font-mono text-lg hover:text-emerald-600 cursor-pointer">{String(startMinute).padStart(2,'0')}</button>
                    </div>
                    <button type="button" onClick={()=>stepMinutes(5)} className="px-2 py-1 hover:bg-gray-100 rounded cursor-pointer">▶</button>
                  </div>
                  {/* Saat listesi */}
                  {hourOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 grid grid-cols-6 gap-2 bg-white border border-gray-200 rounded-lg p-2 shadow z-50">
                      {Array.from({length: (17-8)+1}, (_,i)=>i+8).map(h=> {
                        // Saatte en az bir geçerli dakika var mı?
                        const anyValid = Array.from({length:12},(_,k)=>k*5).some(m=>!isStartDisabled(h,m));
                        return (
                          <button type="button" key={h} disabled={!anyValid}
                            onClick={()=>{const {h:hh,m:mm}=clampToWorkHours(h,startMinute); setStartHour(hh); setStartMinute(mm); setHourOpen(false);}}
                            className={`px-2 py-1 rounded ${h===startHour?'bg-green-100':'hover:bg-gray-100'} ${!anyValid?'opacity-40 cursor-not-allowed':'cursor-pointer hover:ring-1 hover:ring-emerald-200'}`}>{String(h).padStart(2,'0')}</button>
                        );
                      })}
                    </div>
                  )}
                  {/* Dakika listesi */}
                  {minuteOpen && (
                    <div className="absolute left-0 right-0 top-full mt-2 grid grid-cols-6 gap-2 bg-white border border-gray-200 rounded-lg p-2 shadow z-50">
                      {Array.from({length:12},(_,i)=>i*5).map(m=> {
                        const dis = isStartDisabled(startHour, m);
                        return (
                          <button type="button" key={m} disabled={dis}
                            onClick={()=>{if(dis) return; const {h:hh,m:mm}=clampToWorkHours(startHour,m); setStartHour(hh); setStartMinute(mm); setMinuteOpen(false);}}
                            className={`px-2 py-1 rounded ${m===startMinute?'bg-green-100':'hover:bg-gray-100'} ${dis?'opacity-40 cursor-not-allowed':'cursor-pointer hover:ring-1 hover:ring-emerald-200'}`}>{String(m).padStart(2,'0')}</button>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
              <div className="mt-2 text-sm text-gray-600">Bitiş: {endTime ?? '-'}</div>
              {!withinWorkHours && <div className="mt-2 text-sm text-red-600">Mesai dışı seçim. 08:00-17:30 aralığında seçin.</div>}
              {minSelectableTimeToday && (
                <div className="mt-1 text-xs text-gray-500">Bugün için minimum saat: {minSelectableTimeToday}</div>
              )}
              {/* Aksiyon butonları: saat seçiminin hemen altında */}
              <div className="flex items-center justify-end gap-3 pt-4">
                <button type="button" onClick={onClose} className="px-5 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg">İptal</button>
                <button type="submit" disabled={loading} className="px-5 py-2 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg disabled:opacity-50 transform-gpu transition-transform duration-150 hover:scale-105">{loading?'Kaydediliyor...':'Randevu Ekle'}</button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentModal;
