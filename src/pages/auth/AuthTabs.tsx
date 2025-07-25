import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SimpleFooter from '../../components/Layout/SimpleFooter';

const AuthTabs: React.FC = () => {
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/profile');
    }
  }, [user, navigate]);

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <div className="flex flex-grow items-start justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative pt-24">
        {/* Arka plan efektleri */}
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-500/20 rounded-full blur-3xl -z-10"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-cyan-500/10 rounded-full blur-3xl -z-10"></div>
        <div className="absolute inset-0 opacity-10 -z-10">
          <div className="h-full w-full bg-grid-pattern"></div>
        </div>
        <div className="bg-white/90 backdrop-blur-xl border border-white/30 shadow-2xl rounded-3xl mt-16 p-6 max-w-md w-full mx-auto flex flex-col ">
          <div className="flex w-full mb-6 ">
            <button
              className={`flex-1 py-2 rounded-l-2xl text-base font-semibold transition-all duration-300 ${tab === 'login' ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg scale-105' : 'bg-white/60 text-gray-700 hover:bg-cyan-100'}`}
              onClick={() => setTab('login')}
            >
              Giriş Yap
            </button>
            <button
              className={`flex-1 py-2 rounded-r-2xl text-base font-semibold transition-all duration-300 ${tab === 'register' ? 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg scale-105' : 'bg-white/60 text-gray-700 hover:bg-blue-100'}`}
              onClick={() => setTab('register')}
            >
              Kayıt Ol
            </button>
          </div>
          <div className="w-full">
            {tab === 'login' ? <LoginForm onSwitchTab={() => setTab('register')} /> : <RegisterForm onSwitchTab={() => setTab('login')} />}
          </div>
        </div>
      </div>
      <SimpleFooter />
    </div>
  );
};

export default AuthTabs; 