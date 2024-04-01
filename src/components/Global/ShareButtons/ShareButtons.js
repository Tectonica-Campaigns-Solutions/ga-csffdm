import React, { useEffect, useState } from 'react';
import Link from '../Link/Link';
import telegram from '../../Icons/wp-share.svg';
import facebook from '../../Icons/facebook-share.svg';
import twitter from '../../Icons/x-share.svg';
import linkedin from '../../Icons/linkedin-share.svg';
import mail from '../../Icons/mail-share.svg';

import './index.scss';

function ShareButtons() {
  const [isFixed, setIsFixed] = useState('');
  const [shareUrl, setShareUrl] = useState('');

  useEffect(() => {
    typeof window !== 'undefined' ? setShareUrl(window.location.href) : setShareUrl('');
    window.addEventListener('scroll', isSticky);

    return () => {
      window.removeEventListener('scroll', isSticky);
    };
  }, []);

  const isSticky = (e) => {
    const topHero = document.querySelector('.header')?.offsetHeight;
    const topContent = document.querySelector('.main-content')?.offsetHeight;
    const scrollTop = window.scrollY;

    if (scrollTop >= topHero && scrollTop <= topContent) {
      setIsFixed('show');
    } else {
      setIsFixed('');
    }
  };

  return (
    <div className={`share-buttons-fixed ${isFixed}`}>

      <span>Share</span>

      <div className="twitter">
        <Link target={'_blank'} to={`http://twitter.com/share?url=${shareUrl}`}>
          <img src={twitter} alt="Twitter icon" />
        </Link>
      </div>

      <div className="facebook">
        <Link target={'_blank'} to={`http://www.facebook.com/share.php?u=${shareUrl}`}>
          <img src={facebook} alt="Facebook icon" />
        </Link>
      </div>

      <div className="mail">
        <Link target={'_blank'} to={`"mailto:?body=Hello! Check this ${shareUrl}`}>
          <img src={mail} alt="Mail icon" />
        </Link>
      </div>

      <div className="linkedin">
        <Link target={'_blank'} to={`https://www.linkedin.com/sharing/share-offsite/?url=${shareUrl}`}>
          <img src={linkedin} alt="LinkedIn icon" />
        </Link>
      </div>

      <div className="whatsapp">
        <Link target={'_blank'} to={`https://wa.me/?text=${shareUrl}`}>
          <img src={telegram} alt="Whatsapp icon" />
        </Link>
      </div>

    </div>
  );
}

export default ShareButtons;
