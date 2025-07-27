import React, { useState, useEffect } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import DoctorLoginForm from './DoctorLoginForm';
import DoctorRegisterForm from './DoctorRegisterForm';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import SimpleFooter from '../../components/Layout/SimpleFooter';

type UserType = 'patient' | 'doctor';
type AuthMode = 'login' | 'register';

const AuthTabs: React.FC = () => {
  const [userType, setUserType] = useState<UserType>('patient');
  const [authMode, setAuthMode] = useState<AuthMode>('login');
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      // Check if user is a doctor or patient and redirect accordingly
      // For now, redirect to profile page
      navigate('/profile');
    }
  }, [user, navigate]);

  const renderForm = () => {
    if (userType === 'patient') {
      return authMode === 'login' 
        ? <LoginForm onSwitchTab={() => setAuthMode('register')} /> 
        : <RegisterForm onSwitchTab={() => setAuthMode('login')} />;
    } else {
      return authMode === 'login' 
        ? <DoctorLoginForm onSwitchTab={() => setAuthMode('register')} /> 
        : <DoctorRegisterForm onSwitchTab={() => setAuthMode('login')} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 relative overflow-hidden">
      {/* Enhanced Background Effects */}
      <div className="absolute inset-0">
        {/* Animated gradient orbs */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-blue-400/30 to-purple-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute top-40 right-20 w-96 h-96 bg-gradient-to-br from-cyan-400/30 to-blue-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-80 h-80 bg-gradient-to-br from-purple-400/30 to-pink-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-1/3 w-64 h-64 bg-gradient-to-br from-green-400/30 to-cyan-400/30 rounded-full mix-blend-multiply filter blur-xl opacity-60 animate-blob animation-delay-6000"></div>

        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-grid-pattern"></div>
        </div>

        {/* Floating particles */}
        <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-white/20 rounded-full animate-ping"></div>
        <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-cyan-300/30 rounded-full animate-bounce"></div>
        <div className="absolute bottom-1/3 left-1/2 w-1.5 h-1.5 bg-blue-300/40 rounded-full animate-pulse"></div>
      </div>

      {/* Main Content - Fixed positioning to avoid navbar overlap */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4 py-12" style={{ paddingTop: '8rem' }}>
        <div className="w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-6">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                <span className="text-white text-sm">🏥</span>
              </div>
              <span className="text-white font-semibold">Sağlık Sistemi</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Hoş Geldiniz
            </h1>
            <p className="text-lg text-white/80 max-w-md mx-auto">
              Güvenli ve hızlı giriş yaparak sağlık hizmetlerinize erişin
            </p>
          </div>

          {/* Main Auth Container */}
          <div className="bg-white/95 backdrop-blur-xl border border-white/40 shadow-2xl rounded-[2rem] overflow-hidden">
            {/* User Type Selector */}
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200/50 p-6">
              <div className="flex items-center justify-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${userType === 'patient' ? 'bg-gradient-to-br from-blue-500 to-purple-500 scale-110' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                    <span className="text-white text-lg">👤</span>
                  </div>
                  <span className={`font-semibold transition-colors duration-300 ${userType === 'patient' ? 'text-gray-800' : 'text-gray-500'}`}>Hasta</span>
                </div>
                <div className="relative">
                  <input
                    type="checkbox"
                    id="userTypeToggle"
                    className="sr-only"
                    checked={userType === 'doctor'}
                    onChange={() => setUserType(userType === 'patient' ? 'doctor' : 'patient')}
                  />
                  <label
                    htmlFor="userTypeToggle"
                    className="relative inline-flex items-center w-20 h-10 bg-gray-200 rounded-full cursor-pointer transition-all duration-300 hover:bg-gray-300 shadow-inner"
                  >
                    {/* Toggle Track - Patient State */}
                    <div className={`absolute inset-1 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full transition-all duration-300 ${userType === 'patient' ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    {/* Toggle Track - Doctor State */}
                    <div className={`absolute inset-1 bg-gradient-to-r from-green-400 to-emerald-400 rounded-full transition-all duration-300 ${userType === 'doctor' ? 'opacity-100' : 'opacity-0'}`}></div>
                    
                    {/* Toggle Handle */}
                    <div className={`absolute w-8 h-8 bg-white rounded-full shadow-lg transition-all duration-300 ease-in-out ${userType === 'doctor' ? 'translate-x-10' : 'translate-x-0'}`}>
                      <div className="w-full h-full flex items-center justify-center">
                        <span className="text-xs">{userType === 'doctor' ? '👨‍⚕️' : '👤'}</span>
                      </div>
                    </div>
                  </label>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`font-semibold transition-colors duration-300 ${userType === 'doctor' ? 'text-gray-800' : 'text-gray-500'}`}>Doktor</span>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300 ${userType === 'doctor' ? 'bg-gradient-to-br from-green-500 to-emerald-500 scale-110' : 'bg-gradient-to-br from-gray-400 to-gray-500'}`}>
                    <span className="text-white text-lg">👨‍⚕️</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Auth Mode Tabs */}
            <div className="p-6">
              <div className="flex w-full mb-8 bg-gray-100 rounded-2xl p-1">
                <button
                  className={`flex-1 py-3 px-6 rounded-xl text-base font-semibold transition-all duration-300 ${
                    authMode === 'login' 
                      ? 'bg-white text-gray-800 shadow-lg scale-105' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setAuthMode('login')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">🔐</span>
                    <span>Giriş Yap</span>
                  </div>
                </button>
                <button
                  className={`flex-1 py-3 px-6 rounded-xl text-base font-semibold transition-all duration-300 ${
                    authMode === 'register' 
                      ? 'bg-white text-gray-800 shadow-lg scale-105' 
                      : 'text-gray-600 hover:text-gray-800'
                  }`}
                  onClick={() => setAuthMode('register')}
                >
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-lg">📝</span>
                    <span>Kayıt Ol</span>
                  </div>
                </button>
              </div>

              {/* Form Container */}
              <div className="space-y-6">
                {renderForm()}
              </div>

              {/* Additional Info */}
              <div className="mt-8 pt-6 border-t border-gray-200/50">
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">
                    {userType === 'patient' ? 'Hasta hesabınız mı yok?' : 'Doktor hesabınız mı yok?'}
                  </p>
                  <button
                    type="button"
                    onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                    className="text-blue-600 hover:text-blue-700 font-semibold text-sm transition-colors duration-200"
                  >
                    {authMode === 'login' ? 'Hemen kayıt olun' : 'Giriş yapın'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Info */}
          <div className="text-center mt-8">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              <span className="text-white/80 text-sm">Güvenli ve şifreli bağlantı</span>
            </div>
          </div>
        </div>
      </div>

      <SimpleFooter />
    </div>
  );
};

export default AuthTabs; 