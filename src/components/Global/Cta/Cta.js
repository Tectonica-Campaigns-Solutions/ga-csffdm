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

  return (
    <Link
      className={`custom-btn ${isCtaPrimaryButton ? `custom-btn-${cta?.style}` : ''} ${cta?.style} ${
        customVariant ? customVariant : ''
      }`}
      to={cta || url}
      target={url ? '_blank' : ''}
    >
      {externalTitle || cta?.title}
    </Link>
  );
}
