import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
type RegisterFormProps = {
  onSwitchTab: () => void;
};

const RegisterForm: React.FC<RegisterFormProps> = ({ onSwitchTab }) => {



  const { register } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== password2) {
      setError('Şifreler eşleşmiyor!');
      return;
    }
    setLoading(true);
    try {
      await register(email, password);
      navigate('/profile');
    } catch (err: any) {
      setError('Kayıt başarısız: ' + (err?.message || 'Bilinmeyen hata'));
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">E-posta</label>
        <input
          type="email"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base bg-white/80"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Şifre</label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base bg-white/80"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Şifre Tekrar</label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-blue-400 focus:outline-none text-base bg-white/80"
          value={password2}
          onChange={e => setPassword2(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-base shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
        disabled={loading}
      >
        {loading ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
      </button>
    </form>
  );
};

export default RegisterForm; 