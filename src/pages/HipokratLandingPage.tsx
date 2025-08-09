import React, { useState, useEffect } from 'react';
import type { FC } from 'react';
import { Menu, X, Heart, ArrowRight, Shield, Clock, Users, Award, Brain, Eye, Stethoscope, Activity, Calendar, User, Send, MapPin, Phone, Mail, Facebook, Twitter, Instagram, Linkedin, Search, Star, Play, ChevronDown, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import hipokratLogo from '../assets/hipokrat_logo.png';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navItems = [
    { name: 'Anasayfa', href: '#home' },
    { name: 'Hakkımızda', href: '#about' },
    { name: 'Hizmetler', href: '#services' },
    { name: 'Blog', href: '#blog' },
    { name: 'İletişim', href: '#contact' },
  ];
  return (
    <header className="bg-white/95 backdrop-blur-sm shadow-sm fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <img src={hipokratLogo} alt="Hipokrat Logo" className="h-10 w-10 rounded-lg object-contain bg-white" />
            <span className="text-xl font-bold text-gray-800">Hipokrat</span>
          </div>
          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200 relative group"
              >
                {item.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all duration-200 group-hover:w-full"></span>
              </a>
            ))}
          </nav>
          {/* CTA Button */}
          <div className="hidden md:block">
            <button 
              onClick={() => window.location.href = '/home'}
              className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200"
            >
              RTMSoft
            </button>
          </div>
          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </button>
        </div>
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg border-t animate-fadeIn">
            <nav className="px-4 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="block text-gray-600 hover:text-blue-600 font-medium transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
              <button 
                onClick={() => { setIsMenuOpen(false); window.location.href = '/home'; }}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full font-medium hover:shadow-lg transition-all duration-200"
              >
                RTMSoft
              </button>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

// AppointmentModal için prop tipi
interface AppointmentModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AppointmentModal: FC<AppointmentModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-8 shadow-2xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">RTMSoft</h2>
        <p className="mb-6">Randevu alma modali buraya gelecek.</p>
        <button
          onClick={onClose}
          className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-2 rounded-full font-medium"
        >
          Kapat
        </button>
      </div>
    </div>
  );
};

const Hero = () => {
  const [showAppointmentModal, setShowAppointmentModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 50, y: 50 });
  const [statsVisible, setStatsVisible] = useState(false);
  const [counters, setCounters] = useState({ doctors: 0, patients: 0, rating: 0 });

  const quickActions = [
    { icon: Calendar, title: 'RTMSoft', subtitle: 'Online ziyaretinizi planlayın', color: 'from-green-500 to-green-600' },
    { icon: Headphones, title: '7/24 Destek', subtitle: 'Anında tıbbi tavsiye alın', color: 'from-purple-500 to-purple-600' }
  ];

  const floatingElements = [
    { icon: Heart, color: 'text-red-400', delay: '0s', position: 'top-20 left-10', size: 'h-6 w-6' },
    { icon: Activity, color: 'text-blue-400', delay: '0.5s', position: 'top-32 right-20', size: 'h-8 w-8' },
    { icon: Shield, color: 'text-green-400', delay: '1s', position: 'bottom-40 left-16', size: 'h-7 w-7' },
    { icon: Award, color: 'text-yellow-400', delay: '1.5s', position: 'bottom-20 right-10', size: 'h-6 w-6' },
    { icon: Star, color: 'text-pink-400', delay: '2s', position: 'top-1/2 left-8', size: 'h-5 w-5' },
    { icon: Users, color: 'text-cyan-400', delay: '2.5s', position: 'top-3/4 right-16', size: 'h-6 w-6' }
  ];

  const animateCounters = () => {
    const targetValues = { doctors: 150, patients: 50000, rating: 4.9 };
    const duration = 2000;
    const steps = 60;
    const increment = {
      doctors: targetValues.doctors / steps,
      patients: targetValues.patients / steps,
      rating: targetValues.rating / steps
    };

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      setCounters(prev => ({
        doctors: Math.min(Math.round(increment.doctors * currentStep), targetValues.doctors),
        patients: Math.min(Math.round(increment.patients * currentStep), targetValues.patients),
        rating: Math.min(Number((increment.rating * currentStep).toFixed(1)), targetValues.rating)
      }));

      if (currentStep >= steps) {
        clearInterval(timer);
      }
    }, duration / steps);
  };

  useEffect(() => {
    setIsVisible(true);
    
    const handleMouseMove = (e: MouseEvent) => {
      // Throttle mouse movement updates and normalize coordinates
      const x = Math.max(0, Math.min(100, (e.clientX / window.innerWidth) * 100));
      const y = Math.max(0, Math.min(100, (e.clientY / window.innerHeight) * 100));
      setMousePosition({ x, y });
    };
    
    // Throttle the event listener
    let ticking = false;
    const throttledMouseMove = (e: MouseEvent) => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleMouseMove(e);
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('mousemove', throttledMouseMove);

    // Setup intersection observer for stats animation
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !statsVisible) {
          setStatsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.5 }
    );

    const statsElement = document.querySelector('#stats-section');
    if (statsElement) {
      observer.observe(statsElement);
    }

    return () => {
      window.removeEventListener('mousemove', throttledMouseMove);
      if (statsElement) {
        observer.unobserve(statsElement);
      }
    };
  }, [statsVisible]);


  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-300 via-blue-200 to-cyan-300 pt-16">
      {/* Animated Video Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 via-cyan-300/15 to-slate-400/25 z-10"></div>
        
        {/* Animated Medical Particles */}
        <div className="absolute inset-0 z-5">
          {Array.from({ length: 50 }).map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`
              }}
            />
          ))}
        </div>

        {/* Interactive Mouse Follower */}
        <div 
          className="absolute w-96 h-96 bg-gradient-to-r from-blue-400/10 to-cyan-400/10 rounded-full blur-3xl pointer-events-none transition-all duration-500 ease-out z-5"
          style={{
            left: `${mousePosition.x}%`,
            top: `${mousePosition.y}%`,
            transform: 'translate(-50%, -50%)',
          }}
        />

        {/* Floating Medical Icons */}
        {floatingElements.map((element, index) => (
          <div
            key={index}
            className={`absolute ${element.position} animate-float z-20`}
            style={{ 
              animationDelay: element.delay,
              animationDuration: '4s'
            }}
          >
            <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 shadow-2xl hover:scale-110 transition-transform duration-300 cursor-pointer">
              <element.icon className={`${element.size} ${element.color}`} />
            </div>
          </div>
        ))}

        {/* Animated Grid Pattern */}
        <div className="absolute inset-0 opacity-5 z-5">
          <div 
            className="grid grid-cols-20 gap-1 h-full transform transition-transform duration-1000"
            style={{ transform: `translate(${mousePosition.x * 0.05}px, ${mousePosition.y * 0.05}px)` }}
          >
            {Array.from({ length: 400 }).map((_, i) => (
              <div
                key={i}
                className="bg-white rounded-sm animate-pulse"
                style={{ 
                  animationDelay: `${i * 0.01}s`, 
                  animationDuration: `${2 + Math.random() * 2}s` 
                }}
              />
            ))}
          </div>
        </div>

        {/* Large Gradient Orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 rounded-full blur-3xl animate-pulse z-5" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl animate-pulse z-5" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-full blur-3xl animate-pulse z-5" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 z-30">
        <div className="grid lg:grid-cols-3 gap-12 items-center min-h-[85vh] lg:-ml-8 xl:-ml-12">
          
          {/* Left Content - Badge, Logo, and Stats */}
          <div className={`lg:col-span-2 flex flex-col items-center space-y-8 transform transition-all duration-1000 lg:-ml-24 xl:-ml-32 ${isVisible ? 'translate-x-0 opacity-100' : '-translate-x-10 opacity-0'}`}>
            
            {/* Premium Badge */}
            <div className="inline-flex items-center bg-white/20 backdrop-blur-sm border border-blue-400/30 rounded-full px-6 py-3 text-sm font-medium text-blue-800 animate-fadeInUp">
              <Star className="h-4 w-4 mr-2 text-yellow-500 animate-pulse" />
              RTM Klinik - Sağlık Platformu
              <div className="ml-2 px-2 py-1 bg-gradient-to-r from-yellow-400 to-orange-400 text-white rounded-full text-xs font-bold shadow-lg">YENİ</div>
            </div>

            {/* Hipokrat Logo */}
            <div className="relative">
              <img
                src={hipokratLogo}
                alt="Hipokrat Logo"
                className="w-96 h-96 lg:w-[28rem] lg:h-[28rem] xl:w-[32rem] xl:h-[32rem] object-contain animate-fadeIn"
              />
              
              {/* Subtle glow effect behind logo */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-400/20 to-cyan-400/20 rounded-full blur-3xl -z-10 animate-pulse"></div>
            </div>

            {/* Enhanced Animated Stats */}
            <div id="stats-section" className="grid grid-cols-3 gap-6 animate-fadeInUp" style={{ animationDelay: '1.0s' }}>
              <div className={`relative text-center group transform transition-all duration-700 hover:scale-110 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
                <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-2xl hover:bg-white/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/20 to-cyan-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-slate-800 mb-2 font-mono">
                      {counters.doctors}+
                    </div>
                    <div className="text-sm font-medium text-slate-600 uppercase tracking-wide">Uzman Doktor</div>
                    <div className="mt-2 w-12 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full mx-auto"></div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div className={`relative text-center group transform transition-all duration-700 hover:scale-110 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
                <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-2xl hover:bg-white/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/20 to-emerald-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-slate-800 mb-2 font-mono">
                      {counters.patients >= 1000 ? `${Math.round(counters.patients / 1000)}K` : counters.patients}+
                    </div>
                    <div className="text-sm font-medium text-slate-600 uppercase tracking-wide">Mutlu Hasta</div>
                    <div className="mt-2 w-12 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto"></div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>

              <div className={`relative text-center group transform transition-all duration-700 hover:scale-110 ${statsVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`} style={{ transitionDelay: '0.4s' }}>
                <div className="relative bg-white/20 backdrop-blur-sm rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-2xl hover:bg-white/30 transition-all duration-300">
                  <div className="absolute inset-0 bg-gradient-to-br from-yellow-400/20 to-orange-400/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10">
                    <div className="text-3xl font-bold text-slate-800 mb-2 font-mono flex items-center justify-center">
                      {counters.rating}
                      <Star className="ml-1 h-5 w-5 text-yellow-500 fill-current" />
                    </div>
                    <div className="text-sm font-medium text-slate-600 uppercase tracking-wide">Ortalama Puan</div>
                    <div className="mt-2 w-12 h-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full mx-auto"></div>
                  </div>
                  <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-full animate-pulse opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Text and Actions */}
          <div className={`space-y-8 transform transition-all duration-1000 lg:-ml-16 xl:-ml-20 ${isVisible ? 'translate-x-0 opacity-100' : 'translate-x-10 opacity-0'}`} style={{ transitionDelay: '0.3s' }}>

            {/* Main Heading */}
            <div className="space-y-4">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                <span className="block text-slate-800 mb-2 animate-fadeInUp">
                  Sağlığınızı
                </span>
                <span className="block bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-500 bg-clip-text text-transparent animate-fadeInUp" style={{ animationDelay: '0.2s' }}>
                  Dijitalleştirin
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg animate-fadeInUp" style={{ animationDelay: '0.4s' }}>
                Remember Regeneration Therapy Method ile sağlık sürecinizi kolaylaştırın. 
                Yapay zeka destekli kişiselleştirilmiş tedavi deneyimi.
              </p>
            </div>

            {/* Feature Points */}
            <div className="space-y-3 animate-fadeInUp" style={{ animationDelay: '0.6s' }}>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                <span className="text-slate-700 font-medium">Yapay Zeka Destekli Analiz</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"></div>
                <span className="text-slate-700 font-medium">Kişiselleştirilmiş Tedavi Planları</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
                <span className="text-slate-700 font-medium">7/24 Sağlık Takibi</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 animate-fadeInUp" style={{ animationDelay: '0.8s' }}>
              <button 
                onClick={() => window.location.href = '/home'}
                className="group bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
              >
                <span className="flex items-center">
                  Platformu Keşfet
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
                </span>
              </button>
              
              <button className="group border-2 border-slate-400 text-slate-700 px-8 py-4 rounded-2xl font-semibold text-lg hover:border-blue-400 hover:text-blue-600 transition-all duration-300 flex items-center justify-center">
                <Play className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                Demo İzle
              </button>
            </div>

          </div>

        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce z-30">
          <div className="flex flex-col items-center text-white/60">
            <span className="text-sm mb-2">Keşfetmek için kaydırın</span>
            <ChevronDown className="h-6 w-6 animate-pulse" />
          </div>
        </div>
      </div>
      
      <AppointmentModal 
        isOpen={showAppointmentModal} 
        onClose={() => setShowAppointmentModal(false)} 
      />
    </section>
  );
};

const About = () => {
  const stats = [
    { icon: Award, number: '25+', text: 'Yıllık Deneyim' },
    { icon: Users, number: '50K+', text: 'Mutlu Hasta' },
    { icon: Clock, number: '7/24', text: 'Acil Servis' },
    { icon: Heart, number: '98%', text: 'Başarı Oranı' }
  ];
  const team = [
    {
      name: 'Dr. Sude Kürkçü',
      role: 'Başhekim',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2',
      specialization: 'Kardiyoloji'
    },
    {
      name: 'Dr. Nurullah Hilcan',
      role: 'Cerrahi Bölüm Başkanı',
      image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2',
      specialization: 'Beyin ve Sinir Cerrahisi'
    },
    {
      name: 'Dr. Ahmet Demirci',
      role: 'Acil Tıp Uzmanı',
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=400&h=600&dpr=2',
      specialization: 'Acil Servis'
    }
  ];
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Hipokrat Hakkında
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Yenilik, şefkat ve mükemmellik ile üstün sağlık hizmeti sunmaya adanmış bir ekibiz.
          </p>
        </div>
        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-gray-800">
              Sağlıkta Yenilikte Lider
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Hipokrat’ta, en son tıbbi teknolojiyi şefkatli bakım ile birleştiriyoruz. Çok disiplinli sağlık profesyonelleri ekibimiz, hasta bakımının her alanında mükemmelliğe kendini adamıştır.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Biz sadece hastalığı değil, bütün insanı tedavi etmeye inanıyoruz. Hasta odaklı yaklaşımımız, her bireyin kendine özgü ihtiyaçlarına göre kişiselleştirilmiş bakım almasını sağlar.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transform hover:-translate-y-0.5 transition-all duration-200">
                Misyonumuz
              </button>
              <button className="border-2 border-blue-500 text-blue-500 px-6 py-3 rounded-full font-medium hover:bg-blue-500 hover:text-white transition-all duration-300">
                Sertifikalarımız
              </button>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Medical Team"
              className="rounded-2xl shadow-2xl w-full h-[400px] object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-900/20 to-transparent rounded-2xl"></div>
          </div>
        </div>
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20">
          {stats.map((stat, index) => (
            <div
              key={stat.text}
              className="text-center p-6 bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="flex justify-center mb-4">
                <div className="bg-gradient-to-r from-blue-500 to-cyan-500 p-3 rounded-2xl">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-2">{stat.number}</div>
              <div className="text-gray-600 font-medium">{stat.text}</div>
            </div>
          ))}
        </div>
        {/* Team */}
        <div className="text-center mb-12">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            Uzman Ekibimizle Tanışın
          </h3>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Alanında uzman sağlık profesyonellerimiz, yılların deneyimi ve hasta bakımına olan sarsılmaz bağlılıklarıyla hizmetinizde.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {team.map((member, index) => (
            <div
              key={member.name}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-6">
                <h4 className="text-xl font-semibold text-gray-800 mb-1">{member.name}</h4>
                <p className="text-blue-600 font-medium mb-2">{member.role}</p>
                <p className="text-gray-600 text-sm">{member.specialization}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Comprehensive heart care with advanced diagnostics and treatments for cardiovascular health.',
      color: 'from-red-400 to-red-600'
    },
    {
      icon: Brain,
      title: 'Neurology',
      description: 'Expert neurological care for brain, spine, and nervous system disorders.',
      color: 'from-purple-400 to-purple-600'
    },
    {
      icon: Eye,
      title: 'Ophthalmology',
      description: 'Complete eye care services from routine exams to advanced surgical procedures.',
      color: 'from-green-400 to-green-600'
    },
    {
      icon: Stethoscope,
      title: 'General Medicine',
      description: 'Primary care services for all ages with focus on preventive healthcare.',
      color: 'from-blue-400 to-blue-600'
    },
    {
      icon: Activity,
      title: 'Emergency Care',
      description: '24/7 emergency services with rapid response and critical care capabilities.',
      color: 'from-orange-400 to-orange-600'
    },
    {
      icon: Shield,
      title: 'Preventive Care',
      description: 'Comprehensive health screenings and wellness programs for optimal health.',
      color: 'from-teal-400 to-teal-600'
    }
  ];
  return (
    <section id="services" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Tıbbi Hizmetlerimiz
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Kapsamlı sağlık hizmetlerimizle, en son teknolojiyi ve şefkatli bakımı bir araya getiriyoruz.
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={service.title}
              className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 group animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className={`w-16 h-16 bg-gradient-to-r ${service.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <service.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {service.title === 'Cardiology' ? 'Kardiyoloji' : service.title === 'Neurology' ? 'Nöroloji' : service.title === 'Ophthalmology' ? 'Göz Hastalıkları' : service.title === 'General Medicine' ? 'Dahiliye' : service.title === 'Emergency Care' ? 'Acil Servis' : service.title === 'Preventive Care' ? 'Koruyucu Sağlık' : service.title}
              </h3>
              <p className="text-gray-600 leading-relaxed mb-6">
                {service.title === 'Cardiology' ? 'Gelişmiş tanı ve tedavi yöntemleriyle kapsamlı kalp sağlığı hizmetleri.' : service.title === 'Neurology' ? 'Beyin, omurga ve sinir sistemi hastalıklarında uzman bakım.' : service.title === 'Ophthalmology' ? 'Göz muayenesinden ileri cerrahi işlemlere kadar eksiksiz göz sağlığı hizmetleri.' : service.title === 'General Medicine' ? 'Her yaşa uygun birinci basamak sağlık hizmetleri ve koruyucu hekimlik.' : service.title === 'Emergency Care' ? '7/24 acil müdahale ve kritik bakım hizmetleri.' : service.title === 'Preventive Care' ? 'Sağlığınız için kapsamlı taramalar ve koruyucu programlar.' : service.description}
              </p>
              <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200 flex items-center group">
                Detaylı Bilgi
                <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Blog = () => {
  const posts = [
    {
      title: 'Yeni Teknoloji ve Sağlık',
      date: '2023-09-20',
      image: 'https://images.pexels.com/photos/4173624/pexels-photo-4173624.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '#'
    },
    {
      title: 'Sağlıkta Yenilikler',
      date: '2023-09-15',
      image: 'https://images.pexels.com/photos/5327585/pexels-photo-5327585.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '#'
    },
    {
      title: 'Koronavirüs ve Sağlık',
      date: '2023-09-10',
      image: 'https://images.pexels.com/photos/6129967/pexels-photo-6129967.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
      link: '#'
    }
  ];
  return (
    <section id="blog" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Blog
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Sağlık alanındaki en son gelişmeleri ve haberleri takip edin.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div
              key={post.title}
              className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 animate-fadeInUp"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{post.date}</p>
                <button className="text-blue-600 font-medium hover:text-blue-700 transition-colors duration-200">
                  Devamını Oku
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                İletişim
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Bizimle iletişime geçin ve sağlık hizmetlerimiz hakkında bilgi alın.
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Adres</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <MapPin className="inline-block mr-2 h-5 w-5 text-blue-500" />
                  İstanbul, Türkiye
                </p>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <Phone className="inline-block mr-2 h-5 w-5 text-blue-500" />
                  +90 555 123 4567
                </p>
                <p className="text-gray-600 leading-relaxed">
                  <Mail className="inline-block mr-2 h-5 w-5 text-blue-500" />
                  info@hipokrat.com
                </p>
              </div>
              <div className="bg-white p-6 rounded-2xl shadow-lg">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Çalışma Saatleri</h3>
                <p className="text-gray-600 leading-relaxed mb-4">
                  <Clock className="inline-block mr-2 h-5 w-5 text-blue-500" />
                  Pazartesi - Cuma: 09:00 - 18:00
                </p>
                <p className="text-gray-600 leading-relaxed">
                  <Clock className="inline-block mr-2 h-5 w-5 text-blue-500" />
                  Cumartesi: 10:00 - 16:00
                </p>
              </div>
            </div>
            <div className="flex justify-center">
              <button 
                onClick={() => window.location.href = '/home'}
                className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-8 py-4 rounded-full font-semibold hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center group"
              >
                RTMSoft
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform duration-200" />
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-cyan-400 rounded-3xl transform rotate-3 opacity-20"></div>
            <img
              src="https://images.pexels.com/photos/4173251/pexels-photo-4173251.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="Healthcare Professional"
              className="relative rounded-3xl shadow-2xl w-full h-[400px] object-cover"
            />
            <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl">
              <div className="text-2xl font-bold text-gray-800">4.9/5</div>
              <div className="text-sm text-gray-600">Hasta Puanı</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'LinkedIn', icon: Linkedin, href: '#' }
  ];
  return (
    <footer className="bg-gray-900 text-gray-300 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-16">
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <img src={hipokratLogo} alt="Hipokrat Logo" className="h-10 w-10 rounded-lg object-contain bg-white/10 p-1" />
            <span className="text-xl font-bold text-white">Hipokrat</span>
          </div>
          <p className="text-gray-400 leading-relaxed">
            Hipokrat, sağlık alanında en güvenilir ve profesyonel hizmetleri sunan bir hastane.
          </p>
          <div className="flex space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-gray-400 hover:text-white transition-colors duration-200"
                target="_blank"
                rel="noopener noreferrer"
              >
                <link.icon className="h-6 w-6" />
              </a>
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Hizmetler</h3>
          <ul className="space-y-4">
            <li>
              <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-200">
                Kardiyoloji
              </a>
            </li>
            <li>
              <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-200">
                Nöroloji
              </a>
            </li>
            <li>
              <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-200">
                Göz Hastalıkları
              </a>
            </li>
            <li>
              <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-200">
                Dahiliye
              </a>
            </li>
            <li>
              <a href="#services" className="text-gray-400 hover:text-white transition-colors duration-200">
                Acil Servis
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">Hakkımızda</h3>
          <ul className="space-y-4">
            <li>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">
                Misyonumuz
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">
                Uzmanlık Alanları
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">
                Çalışma Ortamı
              </a>
            </li>
            <li>
              <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">
                Sertifikalarımız
              </a>
            </li>
          </ul>
        </div>
        <div className="space-y-6">
          <h3 className="text-xl font-semibold text-white mb-4">İletişim</h3>
          <ul className="space-y-4">
            <li>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                Adresimiz
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                Çalışma Saatleri
              </a>
            </li>
            <li>
              <a href="/home" className="text-gray-400 hover:text-white transition-colors duration-200">
                RTMSoft
              </a>
            </li>
            <li>
              <a href="#contact" className="text-gray-400 hover:text-white transition-colors duration-200">
                Blog
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="mt-16 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Hipokrat. Tüm hakları saklıdır.
      </div>
    </footer>
  );
};

const LandingPage: FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <About />
      <Services />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
};

export default LandingPage; 