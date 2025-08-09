import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

type LoginFormProps = {
  onSwitchTab: () => void;
};

const LoginForm: React.FC<LoginFormProps> = ({ onSwitchTab }) => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await login(email, password);
      navigate('/home');
    } catch (err: any) {
      setError('Giriş başarısız: ' + (err?.message || 'Bilinmeyen hata'));
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      {/* Welcome Message */}
      <div className="text-center">
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 border border-blue-200 rounded-full px-4 py-2 mb-4">
          <span className="text-lg">👤</span>
          <span className="text-blue-700 font-semibold text-sm">Hasta Girişi</span>
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Hoş Geldiniz</h2>
        <p className="text-gray-600 text-sm">Sağlık hizmetlerinize erişmek için giriş yapın</p>
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
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="hasta@email.com"
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
              className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:border-blue-400 focus:outline-none text-base bg-white/90 backdrop-blur-sm transition-all duration-200 hover:shadow-md"
              value={password}
              onChange={e => setPassword(e.target.value)}
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
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-600 text-white font-bold text-base shadow-lg hover:scale-105 hover:shadow-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden group"
          disabled={loading}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
          {loading ? (
            <div className="flex items-center justify-center relative z-10">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Giriş Yapılıyor...
            </div>
          ) : (
            <div className="flex items-center justify-center gap-2 relative z-10">
              <span>🚀</span>
              Giriş Yap
            </div>
          )}
        </button>
      </form>

      {/* Additional Features */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-sm">
          <label className="flex items-center cursor-pointer group">
            <input
              type="checkbox"
              className="mr-2 w-4 h-4 text-blue-600 focus:ring-blue-500 focus:ring-2 rounded"
            />
            <span className="text-gray-600 group-hover:text-gray-800 transition-colors">Beni hatırla</span>
          </label>
          <button
            type="button"
            className="text-blue-600 hover:text-blue-700 font-semibold transition-colors duration-200"
          >
            Şifremi unuttum
          </button>
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
            <span className="text-lg">📱</span>
            <span className="text-sm font-medium">SMS</span>
          </button>
          <button
            type="button"
            className="flex items-center justify-center gap-2 py-2 px-4 border border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-colors duration-200"
          >
            <span className="text-lg">📞</span>
            <span className="text-sm font-medium">Arama</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginForm; 