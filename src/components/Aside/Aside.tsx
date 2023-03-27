import React from 'react'

import Menu from '../Menu/Menu'
import styles from './Aside.module.css'

const Aside: React.FC = () => {

  return (
    <>
      <aside className={styles.aside}>
        <Menu />

      </aside>
    </>
  );
}

export default React.memo(Aside)
