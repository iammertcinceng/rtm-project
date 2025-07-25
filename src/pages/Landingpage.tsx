import { useState } from 'react'
import {
  HeroSection,
  StatsSection,
  FeaturesSection,
  PromotionSection,
  DiscoverySection,
  CTASection,
  TestimonialSection
} from '../components/Landing'
import styles from '../style'
import ScrollAnimation from '../components/UI/ScrollAnimation'
import RobotModal from '../components/UI/RobotModal/RobotModal'

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <HeroSection onShowModal={() => setIsModalOpen(true)} />
      <div className={`bg-gradient-to-br from-slate-50 to-blue-50 ${styles.paddingX} ${styles.flexStart} relative z-10`}>
        <div className={`${styles.boxWidth} space-y-24 mb-24`}>
          <ScrollAnimation>
            <StatsSection />
          </ScrollAnimation>

          <ScrollAnimation>
            <FeaturesSection />
          </ScrollAnimation>
          
          <ScrollAnimation>
            <PromotionSection />
          </ScrollAnimation>
          
          <ScrollAnimation>
            <DiscoverySection />
          </ScrollAnimation>
          
          <ScrollAnimation>
            <TestimonialSection />
          </ScrollAnimation>
          
          <ScrollAnimation>
            <CTASection />
          </ScrollAnimation>
        </div>
      </div>

      <RobotModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  )
}

export default Home 