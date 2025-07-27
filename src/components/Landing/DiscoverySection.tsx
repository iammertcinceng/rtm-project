import React, { useRef, useState, useEffect } from 'react'
import styles, { layout } from '../../style'
import Button from '../UI/DiscoverButton';
import { rtmLogo } from '../../assets';

type Step = {
  icon: string;
  title: string;
  description: string;
  color: string;
  bgColor: string;
}

const DiscoverySection: React.FC = () => {
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(0);
  const sectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % 3);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const steps: Step[] = [
    {
      icon: '🩺',
      title: 'Hasta Verisi',
      description: 'Biyobelirteç ölçümlerini girin',
      color: 'from-blue-500 to-cyan-400',
      bgColor: 'bg-blue-50'
    },
    {
      icon: '🧠',
      title: 'AI Analizi',
      description: 'Yapay zeka verilerinizi analiz eder',
      color: 'from-purple-500 to-pink-400',
      bgColor: 'bg-purple-50'
    },
    {
      icon: '📋',
      title: 'Kişisel Protokol',
      description: 'Özelleştirilmiş tedavi planı oluşturulur',
      color: 'from-green-500 to-emerald-400',
      bgColor: 'bg-green-50'
    }
  ];

  return (
    <section ref={sectionRef} className={`${layout.section} bg-gradient-to-br from-slate-50 to-blue-50 relative rounded-[6rem]`}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-20 left-20 w-40 h-40 bg-gradient-to-br from-green-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/3 w-24 h-24 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`${layout.sectionInfo} relative z-10`}>
        {/* Section badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg mb-6">
          <span>⚡</span>
          <span>Hızlı Protokol</span>
        </div>

        <h2 className={`${styles.heading2} text-gray-800 mb-6 relative`}>
          Kişiselleştirilmiş tedavi <br className='sm:block hidden'/>
          <span className="text-gradient relative">
            protokollerini dakikalar içinde
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-blue-500 rounded-full"></div>
          </span> oluşturun.
        </h2>
        
        <p className={`${styles.paragraphLarge} max-w-[500px] text-gray-600 mb-8 leading-relaxed`}>
          Yapay zeka teknolojimiz hasta verilerini, biyobelirteç ölçümlerini ve sağlık geçmişini 
          analiz ederek size özel tedavi protokolleri oluşturur. Anlık öneriler alın ve 
          tedavi etkinliğini artırın.
        </p>

        {/* Process steps */}
        <div className="space-y-4 mb-10">
          {steps.map((step, index) => (
            <div 
              key={index}
              className={`flex items-center gap-4 p-4 rounded-2xl transition-all duration-500 ${
                activeStep === index 
                  ? `${step.bgColor} shadow-lg transform scale-105` 
                  : 'bg-white/50 hover:bg-white/80'
              }`}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${step.color} flex items-center justify-center shadow-lg ${
                activeStep === index ? 'animate-pulse' : ''
              }`}>
                <span className="text-white text-xl">{step.icon}</span>
              </div>
              <div className="flex-1">
                <h4 className="font-semibold text-gray-800 mb-1">{step.title}</h4>
                <p className="text-sm text-gray-600">{step.description}</p>
              </div>
              <div className={`w-3 h-3 rounded-full transition-all duration-300 ${
                activeStep === index ? 'bg-blue-500 animate-ping' : 'bg-gray-300'
              }`}></div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
          <Button styles='relative bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl' />
        </div>
      </div>

      <div className={`${layout.sectionImg} relative z-10`}>
        {/* Interactive medical dashboard mockup */}
        <div className={`relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="relative w-full max-w-lg mx-auto">
            {/* Main dashboard container */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-white/20 transform hover:scale-105 transition-all duration-500">
              {/* Dashboard header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <img 
                    src={rtmLogo} 
                    alt="RTM Logo" 
                    className="w-16 h-16 object-contain"
                  />
                  <div>
                    <h3 className="font-bold text-gray-800">RRTM Dashboard</h3>
                    <p className="text-xs text-gray-500">Hasta: Ahmet Y.</p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-xs text-gray-500">Aktif</span>
                </div>
              </div>

              {/* Patient data visualization */}
              <div className="space-y-4 mb-6">
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-blue-600">🩺</span>
                    <span className="text-sm font-medium text-gray-700">Biyobelirteçler</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-blue-200 rounded-full overflow-hidden">
                      <div className="w-3/4 h-full bg-blue-500 rounded-full animate-pulse"></div>
                    </div>
                    <span className="text-xs text-blue-600">Analiz edildi</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-purple-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-purple-600">🧠</span>
                    <span className="text-sm font-medium text-gray-700">AI Değerlendirme</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-purple-200 rounded-full overflow-hidden">
                      <div className="w-full h-full bg-purple-500 rounded-full"></div>
                    </div>
                    <span className="text-xs text-purple-600">Tamamlandı</span>
                  </div>
                </div>

                <div className="flex items-center justify-between p-3 bg-green-50 rounded-xl">
                  <div className="flex items-center gap-2">
                    <span className="text-green-600">📋</span>
                    <span className="text-sm font-medium text-gray-700">Tedavi Protokolü</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-12 h-2 bg-green-200 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-green-500 rounded-full transition-all duration-2000 ease-out"
                        style={{ width: activeStep >= 2 ? '100%' : '60%' }}
                      ></div>
                    </div>
                    <span className="text-xs text-green-600">Hazırlanıyor</span>
                  </div>
                </div>
              </div>

              {/* Generated protocol preview */}
              <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-2xl p-4 border border-green-200/50">
                <h4 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                  <span className="text-green-600">✨</span>
                  Önerilen Protokol
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span className="text-gray-700">Vitamin D3 takviyesi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                    <span className="text-gray-700">Omega-3 kompleksi</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                    <span className="text-gray-700">Kişiselleştirilmiş diyet</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating elements around dashboard */}
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center floating">
              <span className="text-2xl">⚡</span>
            </div>
            <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl shadow-lg flex items-center justify-center floating" style={{animationDelay: '1s'}}>
              <span className="text-lg">🎯</span>
            </div>
            <div className="absolute top-1/2 -right-8 w-10 h-10 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg shadow-lg flex items-center justify-center floating" style={{animationDelay: '2s'}}>
              <span className="text-sm">📊</span>
            </div>
          </div>
        </div>


      </div>
    </section>
  )
}

export default DiscoverySection
