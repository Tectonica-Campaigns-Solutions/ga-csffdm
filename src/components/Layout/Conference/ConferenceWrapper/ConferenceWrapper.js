import React, { useState } from 'react';
import ConferenceSidebar from '../ConferenceSidebar/ConferenceSidebar';
import { ReactSVG } from 'react-svg';
import toggleSidebarIcon from '../../../Icons/sidebar_toggle.svg';

import './styles.scss';

const ConferenceWrapper = ({ themes, themeFirstActive = false, slug, parentSlug, children }) => {
  const [toggleMobileSidebar, setToggleMobileSidebar] = useState(false);

  return (
    <section className="conference-wrapper">
      <div className="container">
        <div className="mobile-toggle-sidebar">
          <button onClick={() => setToggleMobileSidebar((prev) => !prev)}>
            <ReactSVG src={toggleSidebarIcon} />
          </button>
        </div>

        <div className="grid">
          <ConferenceSidebar
            items={themes}
            themeFirstActive={themeFirstActive}
            slug={slug}
            parentSlug={parentSlug}
            isMobileOpen={toggleMobileSidebar}
            toggleMobileOpen={setToggleMobileSidebar}
          />
          <div className="custom-content">{children}</div>
        </div>
      </div>
    </section>
  );
};

export default ConferenceWrapper;
