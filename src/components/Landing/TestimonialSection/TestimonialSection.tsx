import React, { useState, useEffect, useRef } from 'react'
import Feedback from './Feedback'
import styles from '../../../style';
import { feedback } from '../../../constants';

const Testimonials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
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
      setActiveTestimonial((prev) => (prev + 1) % feedback.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section
      ref={sectionRef}
      id='testimonials'
      className={`${styles.paddingY} ${styles.flexCenter} flex-col relative`}

    >
      {/* Enhanced animated background */}
      <div
        style={{
          WebkitMaskImage:
            'radial-gradient(ellipse 120% 100% at center, black 70%, transparent 100%)',
          maskImage:
            'radial-gradient(ellipse 120% 100% at center, black 70%, transparent 100%)',
        }}>
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50/30 to-cyan-50"></div>
      </div>

      {/* Dynamic background blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-48 h-48 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-br from-cyan-200 to-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-56 h-56 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-40 right-1/4 w-32 h-32 bg-gradient-to-br from-green-200 to-cyan-200 rounded-full mix-blend-multiply filter blur-xl opacity-15 animate-blob animation-delay-6000"></div>
      </div>

      {/* Floating medical icons */}
      <div className="absolute top-20 right-1/4 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center floating opacity-60">
        <span className="text-xl">🩺</span>
      </div>
      <div className="absolute bottom-32 left-1/4 w-10 h-10 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center floating opacity-50" style={{ animationDelay: '2s' }}>
        <span className="text-lg">💊</span>
      </div>
      <div className="absolute top-1/2 right-20 w-8 h-8 bg-white/80 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center floating opacity-40" style={{ animationDelay: '4s' }}>
        <span className="text-sm">🧬</span>
      </div>

      <div className="relative z-10 w-full">
        {/* Enhanced header section */}
        <div className={`w-full text-center mb-20 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          {/* Section badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg mb-6 transform hover:scale-105 transition-all duration-300">
            <span>👥</span>
            <span>Hekim Deneyimleri</span>
          </div>

          <div className="relative inline-block">
            <h2 className={`${styles.heading2} text-gray-800 mb-6 relative`}>
              Hekimlerimiz <br className='sm:block hidden' />
              <span className="text-gradient relative">
                Ne Diyor
                <div className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"></div>
              </span>
            </h2>

            {/* Decorative elements around title */}
            <div className="absolute -top-4 -left-4 w-3 h-3 bg-purple-400 rounded-full animate-pulse opacity-60"></div>
            <div className="absolute -top-2 -right-6 w-2 h-2 bg-blue-400 rounded-full animate-ping opacity-50"></div>
            <div className="absolute -bottom-4 left-1/3 w-1.5 h-1.5 bg-cyan-400 rounded-full animate-bounce opacity-70"></div>
          </div>

          <p className={`${styles.paragraphLarge} max-w-2xl mx-auto text-gray-600 leading-relaxed`}>
            RTM Klinik RRTM platformunu kullanan hekimlerimizin deneyimleri ve
            <br className="hidden sm:block" />
            tedavi süreçlerindeki başarı hikayeleri.
          </p>

          {/* Interactive indicators */}
          <div className="flex justify-center gap-3 mt-8">
            {feedback.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-500 ${activeTestimonial === index
                  ? 'bg-gradient-to-r from-purple-500 to-blue-500 scale-125 shadow-lg'
                  : 'bg-gray-300 hover:bg-gray-400'
                  }`}
              />
            ))}
          </div>
        </div>

        {/* Enhanced testimonials grid */}
        <div className="relative">
          {/* Background glow for active testimonial */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-r from-purple-200/30 via-blue-200/20 to-cyan-200/30 rounded-3xl blur-3xl transform scale-110 opacity-50"></div>
          </div>

          <div className={`flex flex-wrap justify-center w-full gap-8 relative z-10 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
            {feedback.map((card, index) => (
              <div
                key={card.id}
                className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                style={{
                  transitionDelay: `${index * 0.2}s`,
                  transform: activeTestimonial === index ? 'scale(1.02)' : 'scale(1)'
                }}
              >
                <Feedback
                  {...card}
                  isActive={activeTestimonial === index}
                  index={index}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Bottom statistics section */}
        <div className={`mt-20 transition-all duration-1000 delay-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="text-center mb-8">
            <h3 className={`${styles.heading3} text-gray-800 mb-2`}>
              Platform <span className="text-gradient">Güvenilirliği</span>
            </h3>
            <p className="text-gray-600 text-sm">Hekimlerimizden gelen geri bildirimler</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">⭐</span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">4.9/5</div>
                <div className="text-sm text-gray-600">Hekim Memnuniyeti</div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">👨‍⚕️</span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">150+</div>
                <div className="text-sm text-gray-600">Aktif Hekim</div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">📈</span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">%92</div>
                <div className="text-sm text-gray-600">Tedavi Başarısı</div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 text-center shadow-lg border border-white/40 hover:shadow-xl transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-2xl mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <span className="text-white text-2xl">🚀</span>
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">24/7</div>
                <div className="text-sm text-gray-600">Platform Erişimi</div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to action */}
        <div className={`text-center mt-16 transition-all duration-1000 delay-900 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-6 py-3 rounded-full text-gray-600 text-sm border border-gray-200/50 shadow-sm">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Siz de bu başarıya ortak olun</span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Testimonials
