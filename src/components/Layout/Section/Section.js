import React from 'react';
import Cta from '../../Global/Cta/Cta';

import './styles.scss';

const Section = ({
  headline,
  introduction,
  cta,
  children,
  bgImage,
  extraClassNames = '',
  hClass = 'h3',
  headerChildren = null,
}) => {
  console.log('CTA', cta);
  return (
    <section className={`app-section ${extraClassNames ? extraClassNames : ''}`}>
      <div className="container">
        <div className="header">
          {headline && <h3 className={`${hClass}`}>{headline}</h3>}

          {cta && (
            <div className="desktop-ctas">
              <Cta cta={cta} />
            </div>
          )}
        </div>

        {introduction && (
          <div className="intro-wrapper">
            <div className="introduction" dangerouslySetInnerHTML={{ __html: introduction }} />

            {headerChildren && <div>{headerChildren}</div>}
          </div>
        )}

        <div className="content">{children}</div>
      </div>

      {bgImage && <img className="fixed-image" src={bgImage} alt="Updates banner image" />}
    </section>
  );
};

export default Section;
