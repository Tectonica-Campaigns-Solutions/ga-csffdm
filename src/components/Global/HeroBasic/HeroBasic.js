import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

import './index.scss';

function HeroBasic({ title, image = null, currentPage }) {
  return (
    <div className={`hero-basic`}>
      <div className="container">
        <Breadcrumb currentPage={currentPage} />
        <h1>{title}</h1>
      </div>

      {image && <img className="fixed-img" src={image?.url} />}
    </div>
  );
}

export default HeroBasic;
