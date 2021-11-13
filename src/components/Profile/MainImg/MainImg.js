import React from 'react'

import mainImgStyles from './MainImg.module.css'

const MainImg = () => {
  return (
    <div className={mainImgStyles.img}>
      <img src="https://oboitd.ru/images/goods/big/20200125110231_Priroda_10-344.jpg" alt="nature" />
    </div>
  );
}

export default MainImg
