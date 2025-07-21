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
      navigate('/profile');
    } catch (err: any) {
      setError('Giriş başarısız: ' + (err?.message || 'Bilinmeyen hata'));
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5 animate-fade-in">
      <div>
        <label className="block text-gray-700 font-semibold mb-1">E-posta</label>
        <input
          type="email"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/80"
          value={email}
          onChange={e => setEmail(e.target.value)}
          required
        />
      </div>
      <div>
        <label className="block text-gray-700 font-semibold mb-1">Şifre</label>
        <input
          type="password"
          className="w-full px-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-cyan-400 focus:outline-none text-base bg-white/80"
          value={password}
          onChange={e => setPassword(e.target.value)}
          required
        />
      </div>
      {error && <div className="text-red-500 text-sm font-medium">{error}</div>}
      <button
        type="submit"
        className="w-full py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-bold text-base shadow-lg hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-400"
        disabled={loading}
      >
        {loading ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
      </button>
    </form>
  );
};

export default LoginForm; 