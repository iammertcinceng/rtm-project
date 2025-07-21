import React from 'react'
import styles from '../../style'

const Button = ({ styles: customStyles }) => {
  return (
    <button type='button' className={`${styles.primaryButton} ${customStyles}`}>
      Platformu Keşfet
    </button>
  )
}

export default Button
