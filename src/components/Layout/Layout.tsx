import Navbar from './Navbar'
import Footer from './Footer'
import React from 'react'
import { useLocation } from 'react-router-dom'
import styles from '../../style'
import ScrollAnimation from '../UI/ScrollAnimation'

const Layout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const systemPaths = ['/login', '/register']; // Basit footer eklenecek sistem sayfaları
  const isSystemPage = systemPaths.includes(location.pathname);
  return (
    <div className='bg-gradient-to-br from-slate-50 to-blue-50 w-full overflow-hidden min-h-screen'>
      {/* Navbar */}
      <div className={`${styles.paddingX} ${styles.flexCenter} absolute top-0 left-0 right-0 z-50`}>
        <div className={`${styles.boxWidth}`}>
          <Navbar />
        </div>
      </div>
      {/* İçerik */}
      <main>
        {children}
      </main>
      {/* Footer */}

      {!isSystemPage && (
        <div className={`bg-white ${styles.paddingX} ${styles.flexStart}`}>
          <div className={`${styles.boxWidth}`}>
            <ScrollAnimation>
              <Footer />
            </ScrollAnimation>
          </div>
        </div>
      )}
    </div>
  )
}

export default Layout 