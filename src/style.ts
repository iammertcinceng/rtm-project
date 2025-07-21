const styles = {
  boxWidth: 'xl:max-w-[1280px] w-full',

  heading1: 'font-inter font-bold ss:text-[72px] text-[52px] text-gray-900 ss:leading-[84px] leading-[62px] w-full',
  heading2: 'font-inter font-semibold xs:text-[48px] text-[40px] text-gray-800 xs:leading-[56px] leading-[48px] w-full',
  heading3: 'font-inter font-semibold text-[32px] text-gray-800 leading-[40px] w-full',
  paragraph: 'font-inter font-normal text-gray-600 text-[18px] leading-[32px]',
  paragraphLarge: 'font-inter font-normal text-gray-700 text-[20px] leading-[36px]',

  flexCenter: 'flex justify-center items-center',
  flexStart: 'flex justify-center items-start',

  paddingX: 'sm:px-16 px-6',
  paddingY: 'sm:py-20 py-12',
  padding: 'sm:px-16 px-6 sm:py-16 py-8',

  marginX: 'sm:mx-16 mx-6',
  marginY: 'sm:my-20 my-12',

  // Medical theme specific styles
  medicalCard: 'bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300',
  primaryButton: 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:from-blue-700 hover:to-cyan-600 transition-all duration-300 shadow-lg hover:shadow-xl',
  secondaryButton: 'bg-white text-blue-600 border-2 border-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-300',
}

export const layout = {
  section: `flex md:flex-row flex-col ${styles.paddingY}`,
  sectionReverse: `flex md:flex-row flex-col-reverse ${styles.paddingY}`,

  sectionImgReverse: `flex-1 flex ${styles.flexCenter} md:mr-10 mr-0 md:mt-0 mt-10 relative`,
  sectionImg: `flex-1 flex ${styles.flexCenter} md:ml-10 ml-0 md:mt-0 mt-10 relative`,

  sectionInfo: `flex-1 ${styles.flexStart} flex-col`,
}

export default styles; 