import React from 'react';
import ConferenceSidebar from '../ConferenceSidebar/ConferenceSidebar';

import './styles.scss';

const ConferenceWrapper = ({ themes, themeFirstActive = false, slug, parentSlug, children }) => {
  return (
    <section className="conference-wrapper">
      <div className="container">
        <div className="grid">
          <ConferenceSidebar items={themes} themeFirstActive={themeFirstActive} slug={slug} parentSlug={parentSlug} />
          <div className="custom-content">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceWrapper;
