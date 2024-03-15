import React from 'react';
import CtaList from '../Cta/CtaList';

import './index.scss';

function HomeHero({ title, subtitle, image, mobileImage = null, ctas = [] }) {
  const bgImageUrl = image?.gatsbyImageData?.images?.fallback?.src;

  const css = `
    @media (max-width: 767px) {
      .hero-home {
        background-image: url("${mobileImage?.gatsbyImageData?.images?.fallback?.src}");
        background-position: center;
      }
    }
  `;

  return (
    <div className="wrapper-hero">
      <style scoped>{css}</style>

      <div className="hero-home" style={{ backgroundImage: `url(${bgImageUrl})` }}>
        <div className="container">
          <div className="content">
            {title && <h1 dangerouslySetInnerHTML={{ __html: title }} />}
            {subtitle && <div className="introduction" dangerouslySetInnerHTML={{ __html: subtitle }} />}

            {ctas && <CtaList ctas={ctas} />}
          </div>
        </div>

        <div className="overlay" />
      </div>
    </div>
  );
}

export default HomeHero;
