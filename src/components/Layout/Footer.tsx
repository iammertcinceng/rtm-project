import React from 'react'
import styles from '../../style'
import { footerLinks, socialMedia } from '../../constants'

const Footer = () => {
  return (
    <section className={`${styles.flexCenter} ${styles.paddingY} flex-col border-t border-gray-200`}>
      <div className={`${styles.flexStart} md:flex-row flex-col mb-8 w-full`}>
        <div className='flex-1 flex flex-col justify-start mr-10'>
          <div className="flex items-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
              <span className="text-white text-2xl font-bold">R</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-800">RTM Klinik</h2>
              <p className="text-gray-500">RRTM Platform</p>
            </div>
          </div>
          <p className={`${styles.paragraph} text-gray-600 max-w-[350px]`}>
            Remember Regeneration Therapy Method ile sağlık hizmetlerini dijitalleştiren, 
            yapay zeka destekli kişiselleştirilmiş tedavi platformu.         
          </p>
          
          <div className="flex items-center mt-6 gap-4">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-sm text-gray-600">KVKK Uyumlu</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              <span className="text-sm text-gray-600">ISO 27001</span>
            </div>
          </div>
        </div>
        
        <div className='flex-[1.5] w-full flex flex-row justify-between flex-wrap md:mt-0 mt-10'>
          {footerLinks.map((link) => (
            <div key={link.title} className='flex flex-col ss:my-0 my-4 min-w-[150px]'>
              <h4 className={`font-inter font-semibold text-lg text-gray-800 mb-4`}>
                {link.title}
              </h4>
              <ul className='list-none'>
                {link.links.map((item, index) => (
                  <li 
                    key={item.name} 
                    className={`font-inter font-normal text-gray-600 hover:text-blue-600 cursor-pointer transition-colors duration-300 ${index !== link.links.length - 1 ? 'mb-3' : 'mb-0'}`}
                  >
                    <a href={item.link}>{item.name}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
      
      <div className='w-full flex justify-between items-center md:flex-row flex-col pt-6 border-t border-gray-200'>
        <p className={`font-inter font-normal text-center text-gray-600`}>
          © 2025 RTM Klinik. Tüm hakları saklıdır.
        </p>  
        <div className='flex flex-row md:mt-0 mt-6'>
          {socialMedia.map((social, index) => (
            <a 
              href={social.link}
              key={social.id}
              className={`w-10 h-10 bg-gray-100 hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors duration-300 ${index !== socialMedia.length - 1 ? 'mr-3' : 'mr-0'}`}
            >
              <img
                src={social.icon}
                alt={social.id}
                className='w-5 h-5 object-contain'
              />
            </a>
          ))}
        </div>    
      </div>
    </section>
  )
}

export default Footer
