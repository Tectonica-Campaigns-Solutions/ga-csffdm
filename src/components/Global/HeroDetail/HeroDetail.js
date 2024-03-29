import React from 'react';
import ImageWrapper from '../Image/ImageWrapper';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

import './styles.scss';

const HeroDetail = ({ currentPage, title, description, image }) => {
  return (
    <div className="hero-detail">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Breadcrumb currentPage={currentPage} />
          </div>

          <div className="col-lg-6">
            <h1>{title}</h1>
            <p>{description}</p>
          </div>
          <div className="col-lg-6">
            <ImageWrapper image={image} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroDetail;
