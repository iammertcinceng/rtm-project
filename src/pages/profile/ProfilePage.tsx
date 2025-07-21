import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";
import { doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { TURKIYE_CITIES } from "../../types/TurkiyeCities";

interface Profile {
  fullName: string;
  tcNo: string;
  fatherName: string;
  address: string;
  phone: string;
  registeredProvince: string;
  registrationDate: string;
  visitReason: string;
  birthDate: string;
  gender: string;
  birthPlace: string;
  email: string;
  emergencyPhone: string;
}

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [profileLoading, setProfileLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [fetchError, setFetchError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("🔄 ProfilePage useEffect çalıştı", { loading, user: user?.uid });
    
    if (!loading && user) {
      const fetchProfile = async () => {
        console.log("📥 Profil çekme işlemi başladı", { userId: user.uid });
        try {
          const ref = doc(db, "patients", user.uid);
          console.log("🔍 Firestore referansı oluşturuldu:", ref.path);
          
          const snap = await getDoc(ref);
          console.log("📄 Firestore sorgusu tamamlandı", { exists: snap.exists() });
          
          if (snap.exists()) {
            const data = snap.data() as Profile;
            setProfile(data);
            console.log("✅ Profil başarıyla yüklendi:", data);
          } else {
            console.log("⚠️ Profil bulunamadı, yeni profil oluşturuluyor...");
            const newProfile: Profile = {
              fullName: '',
              tcNo: '',
              fatherName: '',
              address: '',
              phone: '',
              registeredProvince: '',
              registrationDate: '',
              visitReason: '',
              birthDate: '',
              gender: '',
              birthPlace: '',
              email: user.email || '',
              emergencyPhone: '',
            };
            
            await setDoc(ref, newProfile);
            setProfile(newProfile);
            console.log("✅ Yeni profil oluşturuldu ve kaydedildi");
          }
        } catch (err) {
          console.error("❌ Profil çekme hatası:", err);
          setFetchError(`Profil çekilemedi: ${err instanceof Error ? err.message : 'Bilinmeyen hata'}`);
        }
        setProfileLoading(false);
        console.log("🏁 Profil yükleme işlemi tamamlandı");
      };
      fetchProfile();
    } else if (!loading && !user) {
      console.log("🚫 Kullanıcı giriş yapmamış, login sayfasına yönlendiriliyor");
      navigate("/login");
    }
  }, [user, loading, navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    console.log("📝 Input değişikliği:", { name: e.target.name, value: e.target.value });
    
    if (!profile) return;
    
    let value = e.target.value;
    const name = e.target.name;

    // Özel formatlamalar
    if (name === 'fullName' || name === 'fatherName') {
      value = value.split(' ').map(word => 
        word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
      ).join(' ');
    } else if (name === 'phone' || name === 'emergencyPhone') {
      const cleaned = value.replace(/\D/g, '');
      if (cleaned.length === 11 && cleaned.startsWith('0')) {
        value = cleaned.replace(/(\d{4})(\d{3})(\d{2})(\d{2})/, '$1 $2 $3 $4');
      }
    } else if (name === 'tcNo') {
      value = value.replace(/\D/g, '').slice(0, 11);
    }

    setProfile({ ...profile, [name]: value });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("💾 Kaydetme işlemi başladı");
    console.log("📊 Mevcut profil verisi:", profile);
    console.log("👤 Kullanıcı bilgisi:", { uid: user?.uid, email: user?.email });
    
    setSaving(true);
    setError("");
    
    try {
      if (user && profile) {
        console.log("🔄 Firestore güncelleme başladı", { userId: user.uid });
        const ref = doc(db, "patients", user.uid);
        
        const updateData = {
          ...profile,
          updatedAt: new Date().toISOString()
        };
        
        console.log("📤 Gönderilecek veri:", updateData);
        await updateDoc(ref, updateData);
        console.log("✅ Profil başarıyla güncellendi");
        
        alert("Profil başarıyla güncellendi!");
      } else {
        console.log("❌ Kullanıcı veya profil verisi eksik", { user: !!user, profile: !!profile });
        throw new Error("Kullanıcı veya profil verisi eksik");
      }
    } catch (err) {
      console.error("❌ Kaydetme hatası:", err);
      setError(`Kaydetme sırasında bir hata oluştu: ${err instanceof Error ? err.message : 'Bilinmeyen hata'}`);
    }
    setSaving(false);
    console.log("🏁 Kaydetme işlemi tamamlandı");
  };

  const handleLogout = async () => {
    console.log("🚪 Çıkış işlemi başladı");
    await logout();
    navigate("/");
  };

  if (loading || profileLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
          <div className="text-lg font-semibold text-gray-600">Yükleniyor...</div>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-6xl mb-4">⚠️</div>
          <div className="text-lg font-semibold text-red-500">{fetchError}</div>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="text-center">
          <div className="text-6xl mb-4">❌</div>
          <div className="text-lg font-semibold text-red-500">Profil bulunamadı. Otomatik çıkış yapılıyor...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-24 pb-16 px-4 relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Arka plan efektleri */}
      <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
      <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
      <div className="absolute inset-0 opacity-10 -z-10">
        <div className="h-full w-full bg-grid-pattern"></div>
      </div>
      
      {/* Ana Container */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Hasta Profili
          </h1>
          <p className="text-lg text-gray-600">
            Profil bilgilerinizi güncelleyebilirsiniz
          </p>
          
          {/* Çıkış butonu */}
          <div className="flex justify-end mt-6">
            <button
              type="button"
              onClick={handleLogout}
              className="px-6 py-2 rounded-xl font-semibold text-base bg-gradient-to-r from-red-500 to-red-600 text-white shadow-lg hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Çıkış Yap
            </button>
          </div>
        </div>

        {/* Form Container */}
        <div className="bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl overflow-hidden">
          <form onSubmit={handleSave} className="p-8 md:p-12">
            {/* Kişisel Bilgiler Bölümü */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                Kişisel Bilgiler
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Ad Soyad *</label>
                  <input 
                    name="fullName" 
                    value={profile.fullName || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required 
                    placeholder="Adınızı ve soyadınızı giriniz"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">TC Kimlik No *</label>
                  <input 
                    name="tcNo" 
                    value={profile.tcNo || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required 
                    maxLength={11}
                    placeholder="11 haneli TC kimlik numaranız"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Baba Adı *</label>
                  <input 
                    name="fatherName" 
                    value={profile.fatherName || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required 
                    placeholder="Babanızın adı"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Doğum Tarihi *</label>
                  <input 
                    name="birthDate" 
                    value={profile.birthDate || ''} 
                    onChange={handleChange} 
                    type="date" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Cinsiyet *</label>
                  <select 
                    name="gender" 
                    value={profile.gender || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required
                  >
                    <option value="">Seçiniz</option>
                    <option value="Erkek">Erkek</option>
                    <option value="Kadın">Kadın</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Doğum Yeri *</label>
                  <select 
                    name="birthPlace" 
                    value={profile.birthPlace || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required
                  >
                    <option value="">Seçiniz</option>
                    {TURKIYE_CITIES.map(city => (
                      <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Kayıtlı İl (Nüfus) *</label>
                  <select 
                    name="registeredProvince" 
                    value={profile.registeredProvince || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required
                  >
                    <option value="">Seçiniz</option>
                    {TURKIYE_CITIES.map(city => (
                      <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* İletişim Bilgileri Bölümü */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                İletişim Bilgileri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Telefon *</label>
                  <input 
                    name="phone" 
                    value={profile.phone || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required 
                    placeholder="05XX XXX XX XX"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Acil Durum Telefonu *</label>
                  <input 
                    name="emergencyPhone" 
                    value={profile.emergencyPhone || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required 
                    placeholder="05XX XXX XX XX"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">E-posta *</label>
                  <input 
                    name="email" 
                    value={profile.email || ''} 
                    onChange={handleChange} 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required 
                    placeholder="ornek@email.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Adres *</label>
                  <input 
                    name="address" 
                    value={profile.address || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required 
                    placeholder="Tam adresinizi giriniz"
                  />
                </div>
              </div>
            </div>

            {/* Başvuru Bilgileri Bölümü */}
            <div className="mb-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 pb-3 border-b border-gray-200">
                Başvuru Bilgileri
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Kayıt Tarihi *</label>
                  <input 
                    name="registrationDate" 
                    value={profile.registrationDate || ''} 
                    onChange={handleChange} 
                    type="date" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white transition-all duration-200" 
                    required 
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm">Başvuru Nedeni *</label>
                  <div className="flex gap-8 mt-3">
                    <label className="flex items-center cursor-pointer group">
                      <input 
                        type="radio" 
                        name="visitReason" 
                        value="muayene" 
                        checked={profile.visitReason === 'muayene'} 
                        onChange={handleChange} 
                        className="mr-3 w-5 h-5 text-cyan-600 focus:ring-cyan-500 focus:ring-2" 
                        required 
                      />
                      <span className="text-gray-700 font-medium group-hover:text-cyan-600 transition-colors">Muayene</span>
                    </label>
                    <label className="flex items-center cursor-pointer group">
                      <input 
                        type="radio" 
                        name="visitReason" 
                        value="kontrol" 
                        checked={profile.visitReason === 'kontrol'} 
                        onChange={handleChange} 
                        className="mr-3 w-5 h-5 text-cyan-600 focus:ring-cyan-500 focus:ring-2" 
                        required 
                      />
                      <span className="text-gray-700 font-medium group-hover:text-cyan-600 transition-colors">Kontrol</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Hata mesajı */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-xl p-4">
                <div className="flex items-center">
                  <div className="text-red-500 text-xl mr-3">⚠️</div>
                  <div className="text-red-700 font-medium">{error}</div>
                </div>
              </div>
            )}

            {/* Kaydet butonu */}
            <div className="pt-6">
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                disabled={saving}
              >
                {saving ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                    Kaydediliyor...
                  </div>
                ) : (
                  'Profili Kaydet'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 