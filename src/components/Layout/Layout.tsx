import Navbar from './Navbar'
import Footer from './Footer'
import React from 'react'
import styles from '../../style'
import ScrollAnimation from '../UI/ScrollAnimation'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='bg-gradient-to-br from-slate-50 to-blue-50 w-full overflow-hidden min-h-screen'>
      {/* Navbar */}
      <div className={`${styles.paddingX} ${styles.flexCenter} absolute top-0 left-0 right-0 z-50`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar/>
        </div>
      </div>
      {/* İçerik */}
      <main 
      // className='flex-1 w-full max-w-7xl mx-auto px-4 sm:px-8 py-8'
      >
        {children}
      </main>
      {/* Footer */}
      <div className={`bg-white ${styles.paddingX} ${styles.flexStart} mt-24`}>
        <div className={`${styles.boxWidth}`}>
          <ScrollAnimation>
            <Footer/>
          </ScrollAnimation>
        </div>
      </div>
    </div>
  )
}

export default Layout 