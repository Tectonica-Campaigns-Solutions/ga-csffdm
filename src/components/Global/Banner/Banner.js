import React, { useState } from 'react';
import './Banner.scss';
import Icon from '../../Icons/ico-launch.svg';

const Banner = ({ message }) => {
    const [isVisible, setIsVisible] = useState(true);
  
    const handleClose = () => {
      setIsVisible(false);
    };
  
    if (!isVisible) {
      return null;
    }
  
    return (
      <div className="banner">
        <p><img src={Icon} alt="Launch" /> {message}</p>
        <button onClick={handleClose} className="close-button" />
      </div>
    );
  };

export default Banner;