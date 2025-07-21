import React, { useState, useEffect } from 'react'
import styles from '../../style'

type HeroSectionProps = {
  onShowModal: () => void;
}

type Feature = { icon: string; text: string };
type Patient = { name: string; age: number; condition: string; risk: string; color: string };

const Hero: React.FC<HeroSectionProps> = ({ onShowModal }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [currentFeature, setCurrentFeature] = useState<number>(0);
  const [activePatient, setActivePatient] = useState<number>(0);
  const [analysisProgress, setAnalysisProgress] = useState<number>(0);

  const features: Feature[] = [
    { icon: '🧬', text: 'Yapay Zeka Destekli Analiz' },
    { icon: '💊', text: 'Kişiselleştirilmiş Protokoller' },
    { icon: '📊', text: 'Merkezi Veri Yönetimi' },
    { icon: '🤖', text: 'Akıllı Karar Destek' }
  ];

  const patients: Patient[] = [
    { name: 'Ahmet K.', age: 45, condition: 'Diabetes Tip 2', risk: 'Düşük', color: 'green' },
    { name: 'Fatma S.', age: 62, condition: 'Hipertansiyon', risk: 'Orta', color: 'yellow' }
  ];

  const treatments: string[] = [
    'Metformin 500mg 2x1',
    'Diyet Programı',
    'HbA1c Takibi'
  ];

  useEffect(() => {
    setIsLoaded(true);
    
    const featureInterval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 4000);

    const patientInterval = setInterval(() => {
      setActivePatient((prev) => (prev + 1) % patients.length);
    }, 3000);

    const progressInterval = setInterval(() => {
      setAnalysisProgress((prev) => (prev >= 100 ? 0 : prev + 2));
    }, 100);

    return () => {
      clearInterval(featureInterval);
      clearInterval(patientInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById('stats') || document.querySelector('section[id]:not(#home)');
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id='home' 
      className="relative min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800"
    >
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-cyan-500/8 rounded-full blur-3xl"></div>
        <div className="absolute inset-0 opacity-5">
          <div className="h-full w-full bg-grid-pattern"></div>
        </div>
      </div>

      {/* Main content container */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-screen pt-32 pb-20">
          
          {/* Left content */}
          <div className={`space-y-8 transition-all duration-1000 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Status badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 shadow-lg">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-white font-medium text-sm">
                <span className="text-cyan-300 font-semibold">Yapay Zeka Destekli</span> Kişiselleştirilmiş Tedavi Platformu
              </span>
            </div>

            {/* Main heading */}
            <div className="space-y-4">
              <h1 className="text-6xl sm:text-7xl lg:text-8xl font-black leading-none tracking-tight text-white">
                RTM <span className="block bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">Klinik</span>
              </h1>
              
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white/90 leading-tight">
                RRTM Tedavi Platformu
              </h2>
            </div>

            {/* Description */}
            <p className="text-xl text-white/80 leading-relaxed max-w-2xl font-light">
              Remember Regeneration Therapy Method ile hastaların tedavi süreçlerini dijitalleştiren, 
              <span className="text-cyan-300 font-medium"> yapay zeka destekli </span>
              kişiselleştirilmiş tedavi önerileri sunan yenilikçi sağlık platformu.
            </p>

            {/* Simplified features */}
            <div className="space-y-6">
              <div className="flex items-center gap-3 text-white/70 text-sm font-medium">
                <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                <span>Platform Özellikleri</span>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div
                    key={index}
                    className={`flex items-center gap-3 p-4 rounded-xl border transition-all duration-300 ${
                      currentFeature === index
                        ? 'bg-white/15 backdrop-blur-sm border-white/30 shadow-lg'
                        : 'bg-white/5 backdrop-blur-sm border-white/10 hover:bg-white/10'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all duration-300 ${
                      currentFeature === index 
                        ? 'bg-gradient-to-br from-cyan-500 to-blue-500 shadow-md' 
                        : 'bg-white/20'
                    }`}>
                      <span className="text-lg">{feature.icon}</span>
                    </div>
                    <span className={`font-medium text-sm transition-colors duration-300 ${
                      currentFeature === index ? 'text-white' : 'text-white/70'
                    }`}>
                      {feature.text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-8">
              <button
                onClick={onShowModal}
                className="group px-8 py-4 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold text-lg shadow-xl hover:shadow-cyan-500/25 transition-all duration-300 hover:scale-105"
              >
                <div className="flex items-center gap-2">
                  <span>🚀</span>
                  <span>Canlı Demo</span>
                </div>
              </button>

              <button className="px-8 py-4 bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <span>📋</span>
                  <span>Daha Fazla Bilgi</span>
                </div>
              </button>
            </div>
          </div>

          {/* Right visual content - Interactive Medical Dashboard */}
          <div className={`relative transition-all duration-1000 delay-300 ${
            isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            
            {/* Main dashboard container - more compact */}
            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-5 shadow-2xl max-w-md">
              
              {/* Dashboard Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-lg flex items-center justify-center">
                    <span className="text-white text-sm">🏥</span>
                  </div>
                  <div>
                    <h3 className="text-white font-semibold text-base">RRTM Dashboard</h3>
                    <p className="text-white/60 text-xs">Gerçek Zamanlı Analiz</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-xs font-medium">Aktif</span>
                </div>
              </div>

              {/* Patient Cards - more compact */}
              <div className="space-y-3 mb-4">
                <h4 className="text-white/80 font-medium text-xs">Aktif Hastalar</h4>
                <div className="space-y-2">
                  {patients.map((patient, index) => (
                    <div
                      key={index}
                      className={`p-3 rounded-lg border transition-all duration-500 ${
                        activePatient === index
                          ? 'bg-white/20 border-white/40 shadow-lg scale-105'
                          : 'bg-white/5 border-white/10'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full flex items-center justify-center">
                            <span className="text-white text-xs font-semibold">{patient.name.charAt(0)}</span>
                          </div>
                          <div>
                            <div className="text-white font-medium text-xs">{patient.name}</div>
                            <div className="text-white/60 text-xs">{patient.age} yaş • {patient.condition}</div>
                          </div>
                        </div>
                        <div className={`px-2 py-1 rounded-full text-xs font-medium ${
                          patient.color === 'green' ? 'bg-green-500/20 text-green-400' :
                          patient.color === 'yellow' ? 'bg-yellow-500/20 text-yellow-400' :
                          'bg-red-500/20 text-red-400'
                        }`}>
                          {patient.risk}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Analysis & Treatment combined */}
              <div className="bg-white/5 rounded-xl p-3 mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-base">🤖</span>
                  <span className="text-white font-medium text-xs">AI Protokol Oluşturuluyor</span>
                  <span className="text-cyan-400 text-xs font-medium ml-auto">{analysisProgress}%</span>
                </div>
                <div className="w-full bg-white/10 rounded-full h-1.5 mb-3">
                  <div 
                    className="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${analysisProgress}%` }}
                  ></div>
                </div>
                
                {/* Treatment list - inline */}
                <div className="space-y-1">
                  {treatments.map((treatment, index) => (
                    <div 
                      key={index}
                      className="flex items-center gap-2 text-xs"
                    >
                      <div className="w-1.5 h-1.5 bg-green-400 rounded-full"></div>
                      <span className="text-white/70">{treatment}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Stats - more compact */}
              <div className="grid grid-cols-3 gap-3 pt-3 border-t border-white/10">
                <div className="text-center">
                  <div className="text-lg font-bold text-green-400">99.9%</div>
                  <div className="text-white/60 text-xs">Uptime</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-blue-400">&lt;2ms</div>
                  <div className="text-white/60 text-xs">Response</div>
                </div>
                <div className="text-center">
                  <div className="text-lg font-bold text-purple-400">150+</div>
                  <div className="text-white/60 text-xs">Doctors</div>
                </div>
              </div>
            </div>

            {/* Floating notification */}
            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-xl p-3 shadow-xl animate-bounce">
              <div className="flex items-center gap-2">
                <span className="text-white text-sm">✅</span>
                <span className="text-white text-sm font-medium">Yeni Protokol Hazır</span>
              </div>
            </div>

            {/* Data flow indicators */}
            <div className="absolute top-1/2 -left-8 space-y-2">
              {[1, 2, 3].map((_, index) => (
                <div
                  key={index}
                  className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                  style={{ animationDelay: `${index * 0.5}s` }}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
        isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      }`}>
        <button
          onClick={scrollToNext}
          className="flex flex-col items-center gap-2 text-white/60 hover:text-white/90 transition-colors duration-300"
        >
          <span className="text-sm font-medium">Keşfetmeye Devam Et</span>
          <div className="w-6 h-10 border-2 border-current rounded-full flex justify-center">
            <div className="w-1 h-3 bg-current rounded-full mt-2 animate-bounce"></div>
          </div>
        </button>
      </div>
    </section>
  )
}

export default Hero
