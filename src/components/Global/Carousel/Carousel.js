import React, { useRef } from 'react';
import Slider from 'react-slick';
import CarouselActions from './CarouselActions';

import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import './styles.scss';

const Carousel = ({ customRef, items = [], renderItem, showDefaultActions = false, ...rest }) => {
  const sliderRef = useRef();

  const responsiveSettings = [
    { breakpoint: 1250, settings: { slidesToShow: 3 } },
    {
      breakpoint: 1000,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
        centerMode: true,
      },
    },
    {
      breakpoint: 767,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        arrows: false,
        dots: true,
        centerMode: true,
      },
    },
  ];

  return (
    <>
      <Slider
        ref={customRef || sliderRef}
        arrows={false}
        infinite={false}
        slidesToShow={3}
        className={'carousel'}
        responsive={responsiveSettings}
        {...rest}
      >
        {items.map((item, index) => renderItem(item, index))}
      </Slider>

      {!customRef && showDefaultActions && (
        <CarouselActions
          onPrevSlide={() => sliderRef.current?.slickPrev()}
          onNextSlide={() => sliderRef.current?.slickNext()}
        />
      )}
    </>
  );
};

export default Carousel;
