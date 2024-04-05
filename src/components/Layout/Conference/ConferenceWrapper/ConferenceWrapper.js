import React from 'react';
import ConferenceSidebar from '../ConferenceSidebar/ConferenceSidebar';

import './styles.scss';

const ConferenceWrapper = ({ themes, children }) => {
  console.log({ themes });

  return (
    <section className="conference-wrapper">
      <div className="container">
        <div className="grid">
          <ConferenceSidebar items={themes} />
          <div className="custom-content">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceWrapper;
