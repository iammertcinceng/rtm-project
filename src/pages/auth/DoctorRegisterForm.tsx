import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ConsentFormModal from '../../components/UI/ConsentFormModal';

type DoctorRegisterFormProps = {
  onSwitchTab: () => void;
};

const DoctorRegisterForm: React.FC<DoctorRegisterFormProps> = ({ onSwitchTab }) => {
  const { registerDoctor } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConsentModal, setShowConsentModal] = useState(false);
  const [consentAccepted, setConsentAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== password2) {
      setError('Şifreler eşleşmiyor!');
      return;
    }
    if (!consentAccepted) {
      setError('Onam formunu kabul etmelisiniz!');
      return;
    }
    setLoading(true);
    try {
      await registerDoctor(email, password);
      navigate('/doctor-register');
    } catch (err: any) {
      setError('Doktor kayıt başarısız: ' + (err?.message || 'Bilinmeyen hata'));
    }
    setLoading(false);
  };

  const handleConsentCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setShowConsentModal(true);
    } else {
      setConsentAccepted(false);
    }
  };

  const handleConsentAccept = () => {
    setConsentAccepted(true);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 rounded-full px-4 py-2 mb-4">
          <span className="text-lg">👨‍⚕️</span>
          <span className="text-green-700 font-semibold text-sm">Doktor Kaydı</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Doktor Hesabı Oluşturun</h2>
        <p className="text-gray-600 text-sm">Hasta hizmetlerinizi yönetmek için hesap oluşturun</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold text-sm">E-posta Adresi</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-sm">📧</span>
            </div>
            <input
              type="email"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="doktor@hastane.com"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold text-sm">Şifre</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-sm">🔒</span>
            </div>
            <input
              type="password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
          <p className="text-xs text-gray-500 mt-1">En az 6 karakter olmalıdır</p>
        </div>

        <div className="space-y-2">
          <label className="block text-gray-700 font-semibold text-sm">Şifre Tekrar</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-400 text-sm">🔐</span>
            </div>
            <input
              type="password"
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-green-400 focus:border-green-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
              value={password2}
              onChange={e => setPassword2(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4">
            <div className="flex items-center">
              <div className="text-red-500 text-xl mr-3">⚠️</div>
              <div className="text-red-700 font-medium text-sm">{error}</div>
            </div>
          </div>
        )}

        <button
          type="submit"
          className="w-full py-3 rounded-xl bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold text-base shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-green-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
          disabled={loading}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          {loading ? (
            <div className="flex items-center justify-center relative z-10">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Doktor Hesabı Oluşturuluyor...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 relative z-10">
              <span>✨</span>
              Doktor Hesabı Oluştur
            </div>
          )}
        </button>
      </form>

      {/* Terms and Conditions */}
      <div className="space-y-4">
        <div className="flex items-center gap-3 text-sm">
          <div className="relative flex items-center">
            <input
              type="checkbox"
              checked={consentAccepted}
              onChange={handleConsentCheckboxChange}
              className="w-5 h-5 appearance-none focus:ring-cyan-500 focus:ring-2 rounded-lg border-2 border-gray-300 checked:border-cyan-600 checked:bg-cyan-600 transition-all duration-200 cursor-pointer"
              style={{
                accentColor: '#0891b2', // cyan-600
                backgroundColor: consentAccepted ? '#0891b2' : 'transparent',
                borderColor: consentAccepted ? '#0891b2' : '#d1d5db'
              }}
              required
            />
            {consentAccepted && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ transform: 'translateY(-1px)' }}>
                <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              </div>
            )}
          </div>
          <div className="text-gray-600">
            <span className={consentAccepted ? "text-green-600 font-medium" : ""}>
              {consentAccepted ? "Onam formunu okudum ve kabul ediyorum" : "Onam formunu okudum ve kabul ediyorum"}
            </span>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">veya</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-lg">🏥</span>
            <span className="text-sm font-medium">Hastane</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-lg">📱</span>
            <span className="text-sm font-medium">SMS ile</span>
          </button>
        </div>
      </div>

      {/* Consent Form Modal */}
      <ConsentFormModal
        isOpen={showConsentModal}
        onClose={() => setShowConsentModal(false)}
        onAccept={handleConsentAccept}
      />
    </div>
  );
};

export default DoctorRegisterForm; 