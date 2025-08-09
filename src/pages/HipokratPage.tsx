import React, { useState, useEffect, useRef } from 'react';
import { Heart, Shield, Brain, Users, Star, ChevronRight, Menu, X, Activity, Database, Cloud, Lock, ArrowRight, Phone, Mail, MapPin, Check } from 'lucide-react';

const HipokratPage = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const statsRef = useRef(null);
  const [statsVisible, setStatsVisible] = useState(false);
  const [counts, setCounts] = useState({ hospitals: 0, patients: 0, doctors: 0, uptime: 0 });

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStatsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (statsRef.current) {
      observer.observe(statsRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (statsVisible) {
      const duration = 2000;
      const steps = 60;
      const interval = duration / steps;
      
      const targets = { hospitals: 150, patients: 500000, doctors: 3000, uptime: 99.9 };
      let step = 0;

      const timer = setInterval(() => {
        step++;
        const progress = step / steps;
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        
        setCounts({
          hospitals: Math.floor(targets.hospitals * easeOutQuart),
          patients: Math.floor(targets.patients * easeOutQuart),
          doctors: Math.floor(targets.doctors * easeOutQuart),
          uptime: Math.floor(targets.uptime * easeOutQuart * 10) / 10
        });

        if (step >= steps) clearInterval(timer);
      }, interval);

      return () => clearInterval(timer);
    }
  }, [statsVisible]);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTestimonial((prev) => (prev + 1) % 3);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const features = [
    { icon: Heart, title: 'Hasta Yönetimi', desc: 'Kapsamlı hasta kayıtları ve takip sistemi' },
    { icon: Shield, title: 'Güvenlik', desc: 'KVKK uyumlu, end-to-end şifreleme' },
    { icon: Brain, title: 'AI Destekli', desc: 'Akıllı teşhis ve tedavi önerileri' },
    { icon: Database, title: 'Veri Analitiği', desc: 'Detaylı raporlama ve içgörüler' },
    { icon: Cloud, title: 'Bulut Tabanlı', desc: 'Her yerden güvenli erişim' },
    { icon: Lock, title: 'Yedekleme', desc: 'Otomatik yedekleme ve kurtarma' }
  ];

  const services = [
    { title: 'Hastane Yönetim Sistemi', desc: 'Tüm hastane süreçlerinizi dijitalleştirin', price: 'Özel Fiyat' },
    { title: 'Klinik Yönetimi', desc: 'Küçük ve orta ölçekli klinikler için', price: '₺2,999/ay' },
    { title: 'Laboratuvar Sistemi', desc: 'Test ve sonuç yönetimi', price: '₺1,999/ay' }
  ];

  const testimonials = [
    { name: 'Dr. Ayşe Yılmaz', role: 'Başhekim', text: 'Hipokrat Yazılım sayesinde hastane süreçlerimizi %70 hızlandırdık.' },
    { name: 'Prof. Dr. Mehmet Öz', role: 'Kardiyoloji Uzmanı', text: 'AI destekli teşhis özelliği gerçekten etkileyici ve güvenilir.' },
    { name: 'Dr. Elif Kaya', role: 'Klinik Sahibi', text: 'Kullanımı kolay arayüzü ile personelimiz hemen adapte oldu.' }
  ];

  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-blue-50" />
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000" />
        </div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-500 ${scrollY > 50 ? 'bg-white/80 backdrop-blur-xl shadow-lg' : 'bg-transparent'}`}>
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center transform hover:rotate-12 transition-transform">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Hipokrat</span>
            </div>

            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="hover:text-blue-600 transition-colors relative group">
                Özellikler
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
              </a>
              <a href="#services" className="hover:text-blue-600 transition-colors relative group">
                Hizmetler
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
              </a>
              <a href="#contact" className="hover:text-blue-600 transition-colors relative group">
                İletişim
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full" />
              </a>
              <button className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-2 group">
                Demo İste
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden">
              {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Mobile Menu */}
          <div className={`md:hidden absolute top-full left-0 w-full bg-white/95 backdrop-blur-xl shadow-xl transition-all duration-500 ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
            <div className="p-6 space-y-4">
              <a href="#features" className="block py-2 hover:text-blue-600 transition-colors">Özellikler</a>
              <a href="#services" className="block py-2 hover:text-blue-600 transition-colors">Hizmetler</a>
              <a href="#contact" className="block py-2 hover:text-blue-600 transition-colors">İletişim</a>
              <button className="w-full px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full">
                Demo İste
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        <div className="container mx-auto text-center">
          <div className="inline-block mb-6 px-4 py-2 bg-blue-100 rounded-full text-blue-700 text-sm font-medium animate-bounce">
            🚀 Yeni AI özelliklerimiz yayında!
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Sağlık Teknolojisinde
            <span className="block bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent animate-gradient">
              Geleceği Yaşayın
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Hipokrat Yazılım ile hastane ve klinik yönetiminizi dijitalleştirin, 
            verimliliğinizi artırın ve hasta memnuniyetini zirveye taşıyın.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2">
              Ücretsiz Demo
              <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
            </button>
            <button className="px-8 py-4 bg-white/80 backdrop-blur-sm border-2 border-blue-600 text-blue-600 rounded-full hover:bg-blue-50 transition-all duration-300">
              Tanıtım Videosu
            </button>
          </div>

          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent z-10" />
            <img 
              src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=600&fit=crop" 
              alt="Dashboard"
              className="rounded-2xl shadow-2xl mx-auto transform hover:scale-105 transition-transform duration-700"
            />
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <Activity className="w-6 h-6 text-blue-600" />
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-20 px-6">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {counts.hospitals}+
              </div>
              <div className="text-gray-600 mt-2 group-hover:text-blue-600 transition-colors">Hastane</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {counts.patients.toLocaleString()}+
              </div>
              <div className="text-gray-600 mt-2 group-hover:text-blue-600 transition-colors">Hasta Kaydı</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                {counts.doctors}+
              </div>
              <div className="text-gray-600 mt-2 group-hover:text-blue-600 transition-colors">Doktor</div>
            </div>
            <div className="text-center group">
              <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                %{counts.uptime}
              </div>
              <div className="text-gray-600 mt-2 group-hover:text-blue-600 transition-colors">Uptime</div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Güçlü <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Özellikler</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Modern teknoloji ile donatılmış, kullanımı kolay özellikleri keşfedin
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="group p-8 bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="w-14 h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 group-hover:text-blue-600 transition-colors">{feature.title}</h3>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-gradient-to-b from-blue-50/50 to-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Size Özel <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Çözümler</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              İhtiyacınıza uygun paketi seçin, hemen kullanmaya başlayın
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="relative group overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl" />
                <div className="relative p-8 bg-white rounded-2xl border border-gray-100 group-hover:border-transparent transition-all duration-500 h-full">
                  <div className="space-y-4 group-hover:text-white transition-colors">
                    <h3 className="text-2xl font-semibold">{service.title}</h3>
                    <p className="text-gray-600 group-hover:text-blue-100">{service.desc}</p>
                    <div className="text-3xl font-bold">{service.price}</div>
                    <ul className="space-y-2 pt-4">
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-blue-600 group-hover:text-white" />
                        <span className="text-gray-600 group-hover:text-blue-100">7/24 Destek</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-blue-600 group-hover:text-white" />
                        <span className="text-gray-600 group-hover:text-blue-100">Ücretsiz Kurulum</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <Check className="w-5 h-5 text-blue-600 group-hover:text-white" />
                        <span className="text-gray-600 group-hover:text-blue-100">Sınırsız Kullanıcı</span>
                      </li>
                    </ul>
                    <button className="w-full mt-6 px-6 py-3 bg-blue-600 group-hover:bg-white group-hover:text-blue-600 text-white rounded-full font-medium transition-all duration-300">
                      Başla
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-6">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Müşterilerimizin <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Görüşleri</span>
            </h2>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-gray-100 shadow-xl">
              <div className="flex justify-center mb-6">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-6 h-6 text-yellow-400 fill-current" />
                ))}
              </div>
              
              <p className="text-xl md:text-2xl text-gray-700 text-center mb-8 italic">
                "{testimonials[activeTestimonial].text}"
              </p>
              
              <div className="text-center">
                <p className="font-semibold text-lg">{testimonials[activeTestimonial].name}</p>
                <p className="text-gray-600">{testimonials[activeTestimonial].role}</p>
              </div>

              <div className="flex justify-center mt-8 space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setActiveTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === activeTestimonial ? 'w-8 bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-6 bg-gradient-to-b from-white to-blue-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              Hemen <span className="bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">İletişime Geçin</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Size özel çözümlerimiz hakkında bilgi almak için bizimle iletişime geçin
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div className="space-y-8">
              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Telefon</h3>
                  <p className="text-gray-600">+90 232 123 45 67</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">E-posta</h3>
                  <p className="text-gray-600">info@hipokratyazilim.com</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-1">Adres</h3>
                  <p className="text-gray-600">İzmir Teknoloji Geliştirme Bölgesi<br />Urla, İzmir</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Adınız Soyadınız"
                className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
              <input 
                type="email" 
                placeholder="E-posta Adresiniz"
                className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors"
              />
              <textarea 
                placeholder="Mesajınız"
                rows={4}
                className="w-full px-6 py-4 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
              <button className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:shadow-xl transform hover:scale-105 transition-all duration-300 font-medium">
                Gönder
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-400 to-blue-600 rounded-xl flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold">Hipokrat Yazılım</span>
            </div>
            
            <p className="text-gray-400">© 2025 Tüm hakları saklıdır.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HipokratPage;