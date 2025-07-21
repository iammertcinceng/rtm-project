import React, { useState, useEffect, useRef } from 'react'
import { stats } from '../../constants'
import styles from '../../style'

type Stat = {
  id: string;
  value: string;
  title: string;
}

type StatItemProps = {
  stat: Stat;
  index: number;
}

const StatItem: React.FC<StatItemProps> = ({ stat, index }) => {
  const [count, setCount] = useState<number>(0);
  const [suffix, setSuffix] = useState<string>('');
  const [isInView, setIsInView] = useState<boolean>(false);
  const countRef = useRef<number | null>(null);
  const elementRef = useRef<HTMLDivElement | null>(null);
  const finalValueRef = useRef<number>(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isInView) {
          setIsInView(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [isInView]);

  useEffect(() => {
    if (!isInView) return;

    // Parse the value to get number and suffix
    const parseValue = (value: string) => {
      let suffix = '';
      let numericValue = value;

      if (value.includes('%')) {
        suffix = '%';
        numericValue = value.replace('%', '');
      } else if (value.includes('+')) {
        suffix = '+';
        numericValue = value.replace('+', '');
      }

      return {
        numericValue: parseFloat(numericValue.replace(',', '')),
        suffix
      };
    };

    const { numericValue, suffix: valueSuffix } = parseValue(stat.value);
    finalValueRef.current = numericValue;
    setSuffix(valueSuffix);

    // Start animation when component becomes visible
    const duration = 2000; // 2 seconds for the counting animation
    const startTime = Date.now();
    const endValue = numericValue;

    const animateCount = () => {
      const now = Date.now();
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);

      // Easing function for a smoother animation
      const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);
      const easedProgress = easeOutCubic(progress);

      // Calculate current count
      const currentCount = Math.floor(easedProgress * endValue);
      setCount(currentCount);

      if (progress < 1) {
        // Continue animation
        countRef.current = requestAnimationFrame(animateCount);
      } else {
        // Ensure we end at exactly the target value
        setCount(endValue);
      }
    };

    countRef.current = requestAnimationFrame(animateCount);

    // Cleanup animation on unmount
    return () => {
      if (countRef.current) {
        cancelAnimationFrame(countRef.current);
      }
    };
  }, [stat.value, isInView]);

  const formatNumber = (num: number) => {
    return num.toLocaleString('tr-TR');
  };

  const getIcon = () => {
    switch (stat.id) {
      case 'stats-1': return '👥';
      case 'stats-2': return '✅';
      case 'stats-3': return '📈';
      case 'stats-4': return '👨‍⚕️';
      default: return '📊';
    }
  };

  const getGradientColors = () => {
    switch (stat.id) {
      case 'stats-1': return 'from-blue-500 to-cyan-400';
      case 'stats-2': return 'from-green-500 to-emerald-400';
      case 'stats-3': return 'from-purple-500 to-pink-400';
      case 'stats-4': return 'from-orange-500 to-red-400';
      default: return 'from-blue-500 to-cyan-400';
    }
  };

  return (
    <div
      ref={elementRef}
      className="flex-1 min-w-[280px] mx-4 mb-8 group"
      style={{ animationDelay: `${index * 0.1}s` }}
    >
      <div className="relative bg-white/70 backdrop-blur-lg rounded-3xl p-8 shadow-xl border border-white/20 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden">
        {/* Animated background gradient */}
        <div className={`absolute inset-0 bg-gradient-to-br ${getGradientColors()} opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-3xl`}></div>

        {/* Floating particles effect */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-blue-400 rounded-full animate-bounce opacity-60"></div>
        <div className="absolute top-8 right-8 w-1 h-1 bg-cyan-400 rounded-full animate-ping opacity-40"></div>
        <div className="absolute bottom-6 left-6 w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse opacity-50"></div>

        {/* Icon with improved design */}
        <div className="relative mb-6">
          <div className={`w-20 h-20 bg-gradient-to-br ${getGradientColors()} rounded-2xl mx-auto flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-500 group-hover:scale-110 group-hover:rotate-3`}>
            <span className="text-white text-3xl filter drop-shadow-sm">
              {getIcon()}
            </span>
          </div>
          {/* Glow effect */}
          <div className={`absolute inset-0 w-20 h-20 mx-auto bg-gradient-to-br ${getGradientColors()} rounded-2xl blur-xl opacity-0 group-hover:opacity-30 transition-opacity duration-500`}></div>
        </div>

        {/* Counter with enhanced styling */}
        <div className="text-center relative z-10">
          <h4 className={`${styles.heading3} text-gray-800 mb-3 font-bold tracking-tight`}>
            <span className={`bg-gradient-to-r ${getGradientColors()} bg-clip-text text-transparent`}>
              {formatNumber(count)}{suffix}
            </span>
          </h4>
          <p className={`${styles.paragraph} text-gray-600 font-medium mb-4`}>
            {stat.title}
          </p>

          {/* Progress bar */}
          <div className="w-full bg-gray-200 rounded-full h-1 mb-4 overflow-hidden">
            <div
              className={`h-1 bg-gradient-to-r ${getGradientColors()} rounded-full transition-all duration-2000 ease-out`}
              style={{
                width: isInView ? '100%' : '0%',
                transitionDelay: `${index * 0.2}s`
              }}
            ></div>
          </div>

          {/* Additional info */}
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
            <span>Gerçek Zamanlı</span>
          </div>
        </div>
      </div>
    </div>
  );
};

const Stats = () => {
  return (
    <section className={`${styles.flexCenter} flex-wrap ${styles.paddingY} relative`} id="stats">
      {/* Enhanced background with animated gradients */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 rounded-bl-[9rem] rounded-br-[9rem] "
      style={{boxShadow: '-1px 6px 6px -5px rgba(0, 0, 0, 0.1)'}}></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-20 w-32 h-32 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-40 w-32 h-32 bg-cyan-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>
      
      <div className="relative z-10 w-full">
        <div className="w-full text-center mb-20">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full text-sm font-medium shadow-lg">
              📊 İstatistikler
            </span>
          </div>
          <h2 className={`${styles.heading2} mb-6 relative`}>
            Platform <span className="text-gradient">İstatistikleri</span>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
          </h2>
          <p className={`${styles.paragraph} max-w-2xl mx-auto text-gray-600 leading-relaxed`}>
            RTM Klinik RRTM platformu ile elde edilen başarı rakamları ve kullanım istatistikleri. 
            <br className="hidden sm:block" />
            Gerçek zamanlı verilerle desteklenen güvenilir sonuçlar.
          </p>
        </div>
        
        <div className="flex flex-wrap justify-center w-full">
          {stats.map((stat, index) => (
            <StatItem key={stat.id} stat={stat} index={index} />
          ))}
        </div>
        
        {/* Bottom decoration */}
        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-sm text-gray-500">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span>Son güncelleme: Bugün</span>
          </div>
        </div>
      </div>
    </section >
  )
}

export default Stats
