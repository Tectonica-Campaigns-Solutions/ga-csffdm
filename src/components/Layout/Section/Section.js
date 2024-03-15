import React from 'react';
import Cta from '../../Global/Cta/Cta';

import './styles.scss';

const Section = ({ headline, introduction, cta, children, bgImage }) => {
  return (
    <section className="app-section">
      <div className="container">
        <div className="header">
          {headline && <h3>{headline}</h3>}

          {cta && (
            <div className="desktop-ctas">
              <Cta ctas={cta} />
            </div>
          )}
        </div>

        {introduction && <div className="introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}

        <div className="content">{children}</div>
      </div>

      {bgImage && <img className="fixed-image" src={bgImage} alt="Updates banner image" />}
    </section>
  );
};

export default Section;
