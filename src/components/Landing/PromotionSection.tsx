import React from 'react'
import styles, { layout } from '../../style'
import { rtmLogo } from '../../assets';

const Promotion = () => {
  return (
    <section id='platform' className={`${layout.sectionReverse} bg-gradient-to-br from-slate-50 to-blue-50`}>
      <div className={`${layout.sectionImgReverse}`}>
        <div className="relative w-full h-96 flex items-center justify-center">
          {/* Main platform mockup */}
          <div className="w-80 h-80 bg-white rounded-3xl shadow-2xl p-6 transform rotate-3 hover:rotate-0 transition-transform duration-500">
            <div className="w-full h-full bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-4 flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2">
                  <img 
                    src={rtmLogo} 
                    alt="RTM Logo" 
                    className="w-8 h-8 object-contain"
                  />
                  <span className="font-semibold text-gray-800">RRTM</span>
                </div>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              </div>
              
              {/* Dashboard mockup */}
              <div className="space-y-3 flex-1">
                <div className="h-8 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-lg"></div>
                <div className="h-6 bg-gray-200 rounded-lg w-3/4"></div>
                <div className="h-6 bg-gray-200 rounded-lg w-1/2"></div>
                
                <div className="grid grid-cols-2 gap-2 mt-4">
                  <div className="h-12 bg-gradient-to-br from-green-100 to-green-200 rounded-lg flex items-center justify-center">
                    <span className="text-lg">📊</span>
                  </div>
                  <div className="h-12 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center">
                    <span className="text-lg">🧬</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Floating elements */}
          <div className="absolute top-4 right-8 w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center floating">
            <span className="text-2xl">💊</span>
          </div>
          <div className="absolute bottom-8 left-4 w-14 h-14 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl shadow-lg flex items-center justify-center floating" style={{animationDelay: '1s'}}>
            <span className="text-xl">👨‍⚕️</span>
          </div>
        </div>
        
        {/* Background gradients */}
        <div className='absolute z-[0] -left-1/4 top-0 w-[40%] h-[40%] rounded-full medical-blue-gradient opacity-30 blur-3xl'/>
        <div className='absolute z-[0] -left-1/4 bottom-0 w-[40%] h-[40%] rounded-full medical-green-gradient opacity-20 blur-3xl'/>
      </div>
      
      <div className={layout.sectionInfo}>
        <h2 className={`${styles.heading2} text-gray-800 mb-6`}>
          Her Cihazdan <br className='sm:block hidden'/> 
          <span className="text-gradient">Erişilebilir</span> Platform
        </h2>
        <p className={`${styles.paragraphLarge} max-w-[500px] text-gray-600 mb-8`}>
          RRTM platformuna web, tablet ve mobil cihazlarınızdan 7/24 erişim sağlayın. 
          Hasta verilerinizi güvenle yönetin, tedavi protokollerini takip edin ve 
          yapay zeka destekli öneriler alın.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className={`${styles.medicalCard} p-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <span className="text-blue-600">💻</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Web Platform</h4>
                <p className="text-sm text-gray-600">Tam özellikli masaüstü deneyimi</p>
              </div>
            </div>
          </div>
          
          <div className={`${styles.medicalCard} p-4`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <span className="text-green-600">📱</span>
              </div>
              <div>
                <h4 className="font-semibold text-gray-800">Mobil Uygulama</h4>
                <p className="text-sm text-gray-600">Hareket halinde erişim</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className='flex flex-row flex-wrap gap-4'>
          <button className={`${styles.primaryButton}`}>
            Web Platformu
          </button>
          <button className={`${styles.secondaryButton}`}>
            Mobil İndir
          </button>
        </div>
      </div>  
    </section>
  )
}

export default Promotion
