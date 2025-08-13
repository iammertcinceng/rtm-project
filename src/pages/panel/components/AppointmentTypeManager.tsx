import React, { useState } from 'react';
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../../../firebase/config';

interface AppointmentTypeManagerProps {
  isOpen: boolean;
  onClose: () => void;
  onAdded: () => void;
}

const AppointmentTypeManager: React.FC<AppointmentTypeManagerProps> = ({ isOpen, onClose, onAdded }) => {
  const [name, setName] = useState('');
  const [duration, setDuration] = useState<number>(30);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const stepDuration = (delta: number) => {
    let next = duration + delta;
    if (next < 15) next = 15;
    if (next > 90) next = 90;
    // 15 dk katına yuvarla
    const remainder = next % 15;
    if (remainder !== 0) next = next - remainder + (remainder >= 8 ? 15 : 0);
    setDuration(next);
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
      onAdded();
      onClose();
    } catch (err) {
      console.error(err);
      setError('Kaydetme sırasında bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-xl w-full max-w-md">
        <div className="px-5 py-4 border-b">
          <h3 className="text-lg font-semibold">Randevu Tipi Ekle</h3>
        </div>
        <form onSubmit={handleSubmit} className="p-5 space-y-5">
          {error && <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-lg">{error}</div>}
          <div>
            <label className="block text-sm text-gray-700 mb-1">Ad</label>
            <input value={name} onChange={e=>setName(e.target.value)} className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded-lg" placeholder="Örn. İlk Muayene" />
          </div>
          <div>
            <label className="block text-sm text-gray-700 mb-1">Süre (dk)</label>
            <div className="flex items-center gap-3">
              <button type="button" onClick={()=>stepDuration(-15)} className="px-3 py-2 border rounded-lg bg-white hover:bg-gray-50">◀</button>
              <div className="flex-1 text-center font-semibold">{duration} dk</div>
              <button type="button" onClick={()=>stepDuration(15)} className="px-3 py-2 border rounded-lg bg-white hover:bg-gray-50">▶</button>
            </div>
            <div className="text-xs text-gray-500 mt-1">15, 30, 45, 60, 75, 90</div>
          </div>
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 rounded-lg border">İptal</button>
            <button type="submit" disabled={loading} className="px-4 py-2 rounded-lg bg-green-600 text-white disabled:opacity-50">{loading?'Kaydediliyor...':'Kaydet'}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentTypeManager;
