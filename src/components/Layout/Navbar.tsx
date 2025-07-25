import React, { useState, useEffect } from "react";
import menu from '../../assets/menu.svg'
import close from '../../assets/close.svg'
import { navLinks } from '../../constants'
import styles from '../../style'
import { useAuth } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { db } from "../../firebase/config";
import { doc, getDoc } from "firebase/firestore";

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [userProfile, setUserProfile] = useState<any>(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavClick = (sectionId: string) => {
    // Eğer ana sayfada değilsek, önce ana sayfaya git
    if (window.location.pathname !== '/') {
      navigate('/');
      // Ana sayfa yüklendikten sonra scroll yap
      setTimeout(() => {
        const element = document.getElementById(sectionId);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      // Ana sayfadaysak direkt scroll yap
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        try {
          const ref = doc(db, "patients", user.uid);
          const snap = await getDoc(ref);
          if (snap.exists()) {
            setUserProfile(snap.data());
          }
        } catch (error) {
          console.error("Profil çekme hatası:", error);
        }
      }
    };
    fetchUserProfile();
  }, [user]);

  const getUserDisplay = () => {
    if (!user) return null;
    if (userProfile?.fullName) return userProfile.fullName;
    if (userProfile?.email) return userProfile.email.split('@')[0];
    return 'Hesabım';
  };

  return (
    <nav className={`w-full flex py-8 justify-between items-center navbar ${styles.boxWidth}`}>
      <div className="flex items-center">
        <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center mr-3 shadow-lg">
          <span className="text-white font-bold text-xl">R</span>
        </div>
        <div>
          <h2 className="text-xl font-bold text-white">RTM Klinik</h2>
          <p className="text-sm text-white/70">RRTM Platform</p>
        </div>
      </div>

      <ul className='list-none sm:flex hidden justify-end items-center flex-1'>
        {navLinks.map((nav, i) => (
          <li 
            key={nav.id}
            className={`font-inter font-medium cursor-pointer text-[16px] ${i === navLinks.length - 1 ? 'mr-0' : 'mr-10'} text-white hover:text-cyan-400 transition-colors duration-300`}
            onClick={() => handleNavClick(nav.id)}
          >
            <span className="nav-link">
              {nav.title}
            </span>
          </li>        
        ))}
      </ul>

      <div className='flex items-center gap-4 ml-6'>
        {!user ? (
          <button
            onClick={() => navigate('/login')}
            className="px-5 py-2 rounded-xl font-inter font-semibold text-base bg-white/10 text-white border border-cyan-400/40 shadow hover:bg-cyan-500/20 hover:text-cyan-200 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-cyan-400 cursor-pointer"
          >
            Giriş Yap
          </button>
        ) : (
          <div className="px-5 py-2 rounded-xl font-inter font-semibold text-base bg-white/10 text-white border border-cyan-400/40 shadow flex items-center gap-2 cursor-pointer hover:bg-cyan-500/20 transition-all duration-200" onClick={() => navigate('/profile')}>
            <span className="inline-block w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></span>
            Merhaba, {getUserDisplay()}
          </div>
        )}
      </div>

      <div className='sm:hidden flex flex-1 justify-end items-center'>
        <img
          src={toggle ? close : menu}
          alt='menu'
          className='w-[28px] h-[28px] object-contain cursor-pointer filter invert'
          onClick={() => setToggle((previous) => !previous)}
        />
        <div className={`${toggle ? 'flex' : 'hidden'} p-6 bg-slate-900/95 backdrop-blur-sm border border-white/20 shadow-xl absolute top-20 right-0 mx-4 my-2 min-w-[200px] rounded-xl sidebar`}>
          <ul className='list-none flex flex-col justify-end items-start flex-1'>
            {navLinks.map((nav, i) => (
              <li 
                key={nav.id}
                className={`font-inter font-medium cursor-pointer text-[16px] ${i === navLinks.length - 1 ? 'mb-0' : 'mb-4'} text-white hover:text-cyan-400 transition-colors duration-300`}
                onClick={() => {
                  handleNavClick(nav.id);
                  setToggle(false);
                }}
              >
                <span className="nav-link">
                  {nav.title}
                </span>
              </li>        
            ))}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
