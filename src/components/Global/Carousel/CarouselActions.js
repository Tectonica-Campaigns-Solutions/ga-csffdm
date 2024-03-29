import React from 'react';
import { ReactSVG } from 'react-svg';
import prevIcon from '../../Icons/carousel-prev.svg';
import nextIcon from '../../Icons/carousel-next.svg';

import './styles.scss';

const CarouselActions = ({ onPrevSlide, onNextSlide }) => {
  return (
    <div className="carousel-actions">
      <span onClick={onPrevSlide}>
        <ReactSVG src={prevIcon} />
      </span>
      <span onClick={onNextSlide}>
        <ReactSVG src={nextIcon} />
      </span>
    </div>
  );
};

export default CarouselActions;
