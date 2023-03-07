import React from 'react'

import styles from './Footer.module.css'

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
        <div className={styles.footer__copyright}>© 2022 vvliumanov</div>
    </footer>
  )
}

export default React.memo(Footer)
