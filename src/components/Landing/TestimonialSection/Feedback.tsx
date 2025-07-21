import React from 'react'
import styles from '../../../style'

type FeedbackProps = {
  content: string;
  name: string;
  title: string;
  img: string;
  isActive: boolean;
  index: number;
}

const Feedback: React.FC<FeedbackProps> = ({ content, name, title, img, isActive, index }) => {
  const getDoctorIcon = () => {
    switch (index) {
      case 0: return '👩‍⚕️';
      case 1: return '👨‍⚕️';
      case 2: return '👩‍⚕️';
      default: return '👨‍⚕️';
    }
  };

  const getSpecialtyColor = () => {
    switch (index) {
      case 0: return 'from-blue-500 to-cyan-400';
      case 1: return 'from-green-500 to-emerald-400';
      case 2: return 'from-purple-500 to-pink-400';
      default: return 'from-blue-500 to-cyan-400';
    }
  };

  const getSpecialtyBg = () => {
    switch (index) {
      case 0: return 'bg-blue-50';
      case 1: return 'bg-green-50';
      case 2: return 'bg-purple-50';
      default: return 'bg-blue-50';
    }
  };

  return (
    <div className={`${styles.medicalCard} max-w-[400px] flex-1 min-w-[300px] group relative transition-all duration-500 ${
      isActive ? 'ring-2 ring-blue-400 ring-opacity-50 shadow-2xl transform scale-105' : 'hover:shadow-xl hover:-translate-y-1'
    }`}>
      {/* Active indicator glow */}
      {isActive && (
        <div className={`absolute inset-0 bg-gradient-to-br ${getSpecialtyColor()} opacity-5 rounded-2xl transition-opacity duration-500`}></div>
      )}
      
      {/* Quote decoration */}
      <div className="absolute -top-2 -left-2 w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center opacity-80">
        <span className="text-blue-500 text-lg font-bold">"</span>
      </div>

      {/* Active pulse effect */}
      {isActive && (
        <div className="absolute top-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-ping"></div>
      )}
      
      {/* Quote icon with gradient */}
      <div className={`w-14 h-14 bg-gradient-to-br ${getSpecialtyColor()} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
        <span className="text-white text-2xl font-bold filter drop-shadow-sm">"</span>
      </div>
      
      {/* Testimonial content */}
      <p className={`${styles.paragraph} text-gray-700 mb-8 italic leading-relaxed relative z-10`}>
        "{content}"
      </p>
      
      {/* Doctor info with enhanced styling */}
      <div className='flex items-center pt-6 border-t border-gray-100 relative z-10'>
        <div className={`w-16 h-16 bg-gradient-to-br ${getSpecialtyColor()} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <span className="text-white text-2xl">{getDoctorIcon()}</span>
        </div>
        <div className='ml-4 flex-1'>
          <h4 className={`font-inter font-bold text-lg text-gray-800 mb-1 group-hover:text-gray-900 transition-colors duration-300`}>
            {name}
          </h4>
          <div className={`${getSpecialtyBg()} px-3 py-1 rounded-full inline-block mb-2`}>
            <p className={`text-sm font-medium ${
              index === 0 ? 'text-blue-700' : 
              index === 1 ? 'text-green-700' : 
              'text-purple-700'
            }`}>
              {title}
            </p>
          </div>
          
          {/* Enhanced rating */}
          <div className="flex items-center gap-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span 
                  key={i} 
                  className={`text-sm transition-all duration-300 ${
                    isActive ? 'animate-pulse' : ''
                  }`}
                  style={{ animationDelay: `${i * 0.1}s` }}
                >
                  ⭐
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500 font-medium">5.0</span>
          </div>
        </div>
      </div>

      {/* Specialty badge */}
      <div className="absolute bottom-4 right-4 opacity-20 group-hover:opacity-40 transition-opacity duration-300">
        <div className={`w-8 h-8 bg-gradient-to-br ${getSpecialtyColor()} rounded-lg flex items-center justify-center`}>
          <span className="text-white text-xs">
            {index === 0 ? '🏥' : index === 1 ? '🔬' : '💊'}
          </span>
        </div>
      </div>

      {/* Hover effect particles */}
      <div className="absolute top-2 right-8 w-1 h-1 bg-blue-400 rounded-full opacity-0 group-hover:opacity-60 transition-opacity duration-300 animate-ping"></div>
      <div className="absolute bottom-8 left-6 w-0.5 h-0.5 bg-purple-400 rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-300 animate-pulse"></div>
    </div>
  )
}

export default Feedback

