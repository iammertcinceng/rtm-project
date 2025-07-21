import React from 'react'
import styles from '../../style'

const CTA = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.marginY} ${styles.padding} sm:flex-row flex-col bg-gradient-to-r from-blue-600 to-cyan-500 rounded-3xl shadow-2xl text-white`} id="contact">
      <div className='flex-1 flex flex-col'>
        <h2 className={`${styles.heading2} text-white mb-4`}>
          RTM Klinik RRTM Platformu ile Başlayın!
        </h2>
        <p className={`${styles.paragraphLarge} max-w-[600px] text-blue-50 leading-relaxed`}>
          Yapay zeka destekli kişiselleştirilmiş tedavi protokolleri ile hasta bakım kalitesini artırın. 
          Hemen ücretsiz demo talep edin ve sağlık hizmetlerinizi dijital dönüşüme hazırlayın.
        </p>
        
        <div className="flex flex-wrap gap-6 mt-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-blue-50 text-sm">Ücretsiz Demo</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-blue-50 text-sm">24/7 Teknik Destek</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            <span className="text-blue-50 text-sm">Kolay Entegrasyon</span>
          </div>
        </div>
      </div>
      
      <div className={`${styles.flexCenter} sm:ml-10 ml-0 mt-8 sm:mt-0`}>
        <div className="flex flex-col gap-4">
          <button className={`${styles.secondaryButton} bg-white text-blue-600 border-white hover:bg-blue-50`}>
            Demo Talep Et
          </button>
          <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white hover:text-blue-600 transition-all duration-300">
            İletişime Geç
          </button>
        </div>
      </div>
    </section>
  )
}

export default CTA
