import React from 'react';
import Link from '../Link/Link';
import { ReactSVG } from 'react-svg';

import facebookIcon from '../../Icons/social-media-icons-facebook.svg';
import twitterIcon from '../../Icons/social-media-icons-x.svg';
import linkedinIcon from '../../Icons/social-media-icons-linkedin.svg';
import instagramIcon from '../../Icons/social-media-icons-instagram.svg';
import youtubeIcon from '../../Icons/social-media-icons-youtube.svg';

const SocialMap = {
  linkedin: linkedinIcon,
  twitter: twitterIcon,
  facebook: facebookIcon,
  instagram: instagramIcon,
  youtube: youtubeIcon
};

const SocialLink = ({ name, url }) => {
  const socialImg = SocialMap[name];

  return (
    <a href={url} target="_blank">
      <ReactSVG height={70} src={socialImg} alt={name} />
    </a>
  );
};

export default SocialLink;
