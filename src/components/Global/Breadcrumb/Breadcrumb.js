import React from 'react';
import Link from '../Link/Link';
import separatorIcon from '../../Icons/breadcrumb-separator.svg';

import './index.scss';

const Breadcrumb = ({ breadcrumb = null, currentPage }) => {
  const renderSeparator = (index = 1) => {
    if (index === 0) {
      return null;
    }

    return (
      <span>
        <img src={separatorIcon} alt="Separator icon" />
      </span>
    );
  };

  return (
    <div className={`breadcrumb d-none d-lg-block`} data-datocms-noindex>
      <ul>
        <li>
          <Link to="/">Home</Link>
          {renderSeparator()}
        </li>
        {breadcrumb && (
          <>
            <li>
              <Link to={breadcrumb.url}>{breadcrumb.title}</Link>
            </li>
            {renderSeparator()}
          </>
        )}
        <li className="active">{currentPage.substring(0, 50) + '...'}</li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
