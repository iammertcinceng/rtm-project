import React, { useState, useRef, useEffect } from 'react'
import { features } from '../../constants'
import styles, { layout } from '../../style'
import Button from '../UI/DiscoverButton'

type Feature = {
  id: string;
  icon: string;
  title: string;
  content: string;
}

type FeatureCardProps = {
  icon: string;
  title: string;
  content: string;
  index: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, content, index }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, []);

  const getIcon = () => {
    switch (index) {
      case 0: return '🧠';
      case 1: return '🛡️';
      case 2: return '📊';
      default: return '💡';
    }
  };

  const getGradient = () => {
    switch (index) {
      case 0: return 'from-blue-500 via-purple-500 to-indigo-600';
      case 1: return 'from-green-500 via-emerald-500 to-teal-600';
      case 2: return 'from-orange-500 via-red-500 to-pink-600';
      default: return 'from-blue-500 to-cyan-500';
    }
  };

  const getAccentColor = () => {
    switch (index) {
      case 0: return 'blue';
      case 1: return 'emerald';
      case 2: return 'rose';
      default: return 'blue';
    }
  };

  return (
    <div 
      ref={cardRef}
      className={`${index !== features.length - 1 ? 'mb-8' : 'mb-0'} group transition-all duration-700 ${
        isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
      }`}
      style={{ transitionDelay: `${index * 0.2}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative bg-white/80 backdrop-blur-xl rounded-[2rem] p-8 shadow-lg border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-1 overflow-hidden">
        {/* Animated background pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-100 to-purple-100 transform rotate-12 scale-150"></div>
        </div>
        
        {/* Glow effect on hover */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-0 group-hover:opacity-5 transition-opacity duration-500 rounded-3xl`}></div>
        
        {/* Floating particles */}
        <div className="absolute top-4 right-4 w-1 h-1 bg-blue-400 rounded-full animate-ping opacity-60"></div>
        <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-purple-400 rounded-full animate-pulse opacity-40"></div>
        <div className="absolute bottom-6 right-6 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce opacity-50"></div>

        <div className="flex items-start gap-6 relative z-10">
          {/* Enhanced icon container */}
          <div className="relative group/icon">
            <div className={`w-20 h-20 rounded-2xl ${styles.flexCenter} bg-gradient-to-br ${getGradient()} shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-6 relative overflow-hidden`}>
              {/* Icon shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <span className="text-white text-3xl filter drop-shadow-sm relative z-10 group-hover:scale-110 transition-transform duration-300">
                {getIcon()}
              </span>
              
              {/* Ripple effect */}
              {isHovered && (
                <div className="absolute inset-0 rounded-2xl border-2 border-white/50 animate-ping"></div>
              )}
            </div>
            
            {/* Glow effect around icon */}
            <div className={`absolute inset-0 w-20 h-20 bg-gradient-to-br ${getGradient()} rounded-2xl blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
          </div>

          {/* Content area */}
          <div className='flex-1 space-y-4'>
            <div className="relative">
              <h4 className={`${styles.heading3} text-gray-800 mb-3 group-hover:text-gray-900 transition-colors duration-300`}>
                {title}
                {/* Animated underline */}
                <div className={`absolute -bottom-1 left-0 h-0.5 bg-gradient-to-r ${getGradient()} transition-all duration-500 ${
                  isHovered ? 'w-full' : 'w-0'
                }`}></div>
              </h4>
            </div>
            
            <p className={`${styles.paragraph} text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300`}>
              {content}
            </p>
            
            {/* Feature highlights */}
            <div className="flex flex-wrap gap-2 mt-4">
              {index === 0 && (
                <>
                  <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-xs font-medium">AI Algoritması</span>
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-medium">Makine Öğrenmesi</span>
                </>
              )}
              {index === 1 && (
                <>
                  <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs font-medium">ISO 27001</span>
                  <span className="px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-xs font-medium">KVKK Uyumlu</span>
                </>
              )}
              {index === 2 && (
                <>
                  <span className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs font-medium">Gerçek Zamanlı</span>
                  <span className="px-3 py-1 bg-red-100 text-red-700 rounded-full text-xs font-medium">Otomatik Analiz</span>
                </>
              )}
            </div>
            
            {/* Progress indicator */}
            <div className="flex items-center gap-2 mt-4">
              <div className="w-full bg-gray-200 rounded-full h-1 overflow-hidden">
                <div 
                  className={`h-1 bg-gradient-to-r ${getGradient()} rounded-full transition-all duration-1000 ease-out`}
                  style={{ 
                    width: isVisible ? '100%' : '0%',
                    transitionDelay: `${index * 0.3 + 0.5}s`
                  }}
                ></div>
              </div>
              <span className="text-xs text-gray-500 whitespace-nowrap">%100</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const Business = () => {
  const [activeFeature, setActiveFeature] = useState(0);
  const sectionRef = useRef(null);

  const benefits = [
    { icon: '✅', text: 'KVKK Uyumlu', color: 'text-green-600' },
    { icon: '🚀', text: '7/24 Erişim', color: 'text-blue-600' },
    { icon: '☁️', text: 'Bulut Tabanlı', color: 'text-purple-600' },
    { icon: '📱', text: 'Mobil Uyumlu', color: 'text-orange-600' }
  ];

  return (
    <section id='features' className={`${layout.section} rounded-[9rem]  bg-gradient-to-br from-white via-blue-50/30 to-purple-50/20 relative `}
    style={{boxShadow: '-1px -6px 6px -5px rgba(0, 0, 0, 0.025)'}}>
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/4 w-36 h-36 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className={`${layout.sectionInfo} relative z-10`}>
        {/* Section badge */}
        <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg mb-6">
          <span>🏥</span>
          <span>Dijital Dönüşüm</span>
        </div>

        <h2 className={`${styles.heading2} text-gray-800 mb-6 relative`}>
          RRTM ile Sağlık <br className='sm:block hidden'/>
          <span className="text-gradient relative">
            Hizmetlerini
            <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transform scale-x-0 animate-pulse"></div>
          </span> Dönüştürün
        </h2>
        
        <p className={`${styles.paragraphLarge} max-w-[500px] text-gray-600 mb-8 leading-relaxed`}>
          Remember Regeneration Therapy Method (RRTM) platformu ile hasta tedavi süreçlerinizi 
          dijitalleştirin, yapay zeka destekli analiz ile kişiselleştirilmiş protokoller oluşturun 
          ve tedavi etkinliğini artırın.
        </p>

        {/* Enhanced benefits grid */}
        <div className="grid grid-cols-2 gap-4 mb-10">
          {benefits.map((benefit, index) => (
            <div key={index} className="group">
              <div className="flex items-center gap-3 p-4 bg-white/80 backdrop-blur-sm rounded-2xl shadow-sm border border-white/40 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <div className="w-8 h-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-lg">{benefit.icon}</span>
                </div>
                <span className={`text-sm font-medium ${benefit.color} group-hover:text-gray-800 transition-colors duration-300`}>
                  {benefit.text}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced CTA button */}
        <div className="relative group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl blur opacity-0 group-hover:opacity-75 transition-opacity duration-500"></div>
          <Button styles='relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl' />
        </div>
      </div>
      
      <div className={`${layout.sectionImg} flex-col relative z-10`}>
        {/* Section title for features */}
        <div className="text-center mb-8">
          <h3 className={`${styles.heading3} text-gray-800 mb-2`}>
            Platform <span className="text-gradient">Özellikleri</span>
          </h3>
          <p className="text-gray-600 text-sm">Gelişmiş teknoloji ile desteklenen özellikler</p>
        </div>

        {/* Feature cards with enhanced design */}
        <div className="space-y-6">
          {features.map((feature, index) => (
            <FeatureCard 
              key={feature.id} 
              {...feature} 
              index={index}
            />
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-12 grid grid-cols-3 gap-4 text-center">
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
            <div className="text-2xl font-bold text-blue-600 mb-1">99.9%</div>
            <div className="text-xs text-gray-600">Uptime</div>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
            <div className="text-2xl font-bold text-green-600 mb-1">24/7</div>
            <div className="text-xs text-gray-600">Destek</div>
          </div>
          <div className="p-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/30">
            <div className="text-2xl font-bold text-purple-600 mb-1">AI</div>
            <div className="text-xs text-gray-600">Destekli</div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Business
