import React from 'react';
import Link from '../Link/Link';

import './index.scss';

export default function Cta({
  cta = null,
  url = '',
  externalTitle = '',
  isButton = false,
  customVariant = null,
  off = false,
}) {
  const isCtaPrimaryButton = cta?.isButton || isButton;

  //console.log('CTA', cta);

  if (off) {
    return (
      <span
        className={`custom-btn ${isCtaPrimaryButton ? 'custom-btn-primary' : ''} ${
          customVariant ? customVariant : ''
        }`}
      >
        {externalTitle || cta?.title}
      </span>
    );
  }

  if (cta?.isCta) {
    return (
      <Link className={`custom-btn ${cta.customVariant}`} to={cta.url}>{cta.externalTitle}</Link>
    );
  }

  return (
      <Link
        className={`custom-btn ${isCtaPrimaryButton ? `custom-btn-${cta?.style}` : ''} custom-btn-${cta?.style} ${
          customVariant ? customVariant : ''
        }`}
        to={url ? url : cta}
        target={url ? '_blank' : ''}
      >
        {externalTitle || cta?.title}
      </Link>
  );
}
