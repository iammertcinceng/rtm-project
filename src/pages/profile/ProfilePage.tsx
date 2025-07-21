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
    <div className="min-h-screen pt-32 pb-20 px-4 relative bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 bg-gradient-to-br from-green-400/30 to-cyan-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-6000"></div>
        
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-grid-pattern"></div>
        </div>
      </div>
      
      {/* Ana Container */}
      <div className="max-w-4xl mx-auto relative z-10">
        {/* Enhanced Header */}
        <div className="relative mb-12">
          {/* Çıkış butonu - Sağ üst köşe */}
          <div className="absolute top-0 right-0 z-20">
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex cursor-pointer items-center gap-2 px-4 py-2 rounded-xl font-semibold text-sm bg-red-500/20 backdrop-blur-sm border border-red-400/40 text-red-200 shadow-lg hover:bg-red-500/40 hover:border-red-400/60 hover:text-red-100 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <span>🚪</span>
              Çıkış Yap
            </button>
          </div>
          
          {/* Merkezi içerik */}
          <div className="text-center pt-8">
            <div className="relative inline-block mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 relative drop-shadow-lg">
                Hasta <span className="text-gradient bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Profili</span>
              </h1>
              
              {/* Welcome Badge - Başlığın tam altında */}
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg transform hover:scale-105 transition-all duration-300">
                <span>👋</span>
                <span>Hoş Geldiniz</span>
              </div>
              
              {/* Decorative elements around title */}
              <div className="absolute -top-3 -left-3 w-2 h-2 bg-blue-400 rounded-full animate-pulse opacity-60"></div>
              <div className="absolute -top-1 -right-4 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-ping opacity-50"></div>
              <div className="absolute -bottom-3 left-1/4 w-1 h-1 bg-purple-400 rounded-full animate-bounce opacity-70"></div>
            </div>
            
            <p className="text-lg text-white/90 font-medium leading-relaxed max-w-xl mx-auto drop-shadow-sm">
              Kişisel bilgilerinizi güncelleyerek sağlık hizmetlerimizden
              <br className="hidden sm:block" />
              en iyi şekilde yararlanabilirsiniz.
            </p>
          </div>
        </div>

        {/* Premium Form Container */}
        <div className="bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] overflow-hidden relative">
          {/* Enhanced Form background pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 transform rotate-12 scale-150"></div>
            <div className="absolute bottom-0 right-0 w-1/2 h-1/2 bg-gradient-to-tl from-cyan-100 to-blue-100 transform -rotate-12 scale-150"></div>
          </div>
          
          {/* Form Header */}
          <div className="relative z-10 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200/50 p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-xl">📋</span>
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">Profil Bilgileri</h2>
                  <p className="text-gray-600 text-sm">Bilgilerinizi güncel tutun</p>
                </div>
              </div>
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                Güvenli Form
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSave} className="p-8 md:p-12 relative z-10 font-inter">
            {/* Kişisel Bilgiler Bölümü */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">👤</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Kişisel Bilgiler
                </h2>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-blue-200 via-purple-200 to-transparent mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">Ad Soyad *</label>
                  <input 
                    name="fullName" 
                    value={profile.fullName || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
                    required 
                    placeholder="Adınızı ve soyadınızı giriniz"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">TC Kimlik No *</label>
                  <input 
                    name="tcNo" 
                    value={profile.tcNo || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
                    required 
                    maxLength={11}
                    placeholder="11 haneli TC kimlik numaranız"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">Baba Adı *</label>
                  <input 
                    name="fatherName" 
                    value={profile.fatherName || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
                    required 
                    placeholder="Babanızın adı"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">Doğum Tarihi *</label>
                  <input 
                    name="birthDate" 
                    value={profile.birthDate || ''} 
                    onChange={handleChange} 
                    type="date" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">Cinsiyet *</label>
                  <select 
                    name="gender" 
                    value={profile.gender || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
                    required
                  >
                    <option value="">Seçiniz</option>
                    <option value="Erkek">Erkek</option>
                    <option value="Kadın">Kadın</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">Doğum Yeri *</label>
                  <select 
                    name="birthPlace" 
                    value={profile.birthPlace || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
                    required
                  >
                    <option value="">Seçiniz</option>
                    {TURKIYE_CITIES.map(city => (
                      <option key={city.id} value={city.name}>{city.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">Kayıtlı İl (Nüfus) *</label>
                  <select 
                    name="registeredProvince" 
                    value={profile.registeredProvince || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
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
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">📞</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  İletişim Bilgileri
                </h2>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-green-200 via-emerald-200 to-transparent mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">Telefon *</label>
                  <input 
                    name="phone" 
                    value={profile.phone || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
                    required 
                    placeholder="05XX XXX XX XX"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">Acil Durum Telefonu *</label>
                  <input 
                    name="emergencyPhone" 
                    value={profile.emergencyPhone || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
                    required 
                    placeholder="05XX XXX XX XX"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">E-posta *</label>
                  <input 
                    name="email" 
                    value={profile.email || ''} 
                    onChange={handleChange} 
                    type="email" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
                    required 
                    placeholder="ornek@email.com"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">Adres *</label>
                  <input 
                    name="address" 
                    value={profile.address || ''} 
                    onChange={handleChange} 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
                    required 
                    placeholder="Tam adresinizi giriniz"
                  />
                </div>
              </div>
            </div>

            {/* Başvuru Bilgileri Bölümü */}
            <div className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white text-lg">📋</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">
                  Başvuru Bilgileri
                </h2>
              </div>
              <div className="w-full h-px bg-gradient-to-r from-orange-200 via-red-200 to-transparent mb-8"></div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2 text-sm font-inter">Kayıt Tarihi *</label>
                  <input 
                    name="registrationDate" 
                    value={profile.registrationDate || ''} 
                    onChange={handleChange} 
                    type="date" 
                    className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 font-inter hover:shadow-md" 
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

            {/* Enhanced Save Button */}
            <div className="pt-8 border-t border-gray-200/50">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="text-sm text-gray-600 flex items-center gap-2">
                  <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                  Tüm bilgiler güvenli şekilde saklanır
                </div>
                <button
                  type="submit"
                  className="w-full sm:w-auto min-w-[200px] py-4 px-8 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-lg shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden"
                  disabled={saving}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  {saving ? (
                    <div className="flex items-center justify-center relative z-10">
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
                      Kaydediliyor...
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-2 relative z-10">
                      <span>💾</span>
                      Profili Kaydet
                    </div>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 