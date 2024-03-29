import React from 'react';
import Link from '../Link/Link';
import Cta from '../Cta/Cta';

import './styles.scss';

const BasicCard = ({ title, introduction, cta }) => {
  return (
    <article className="basic-card">
      <Link to={cta}>
        <div>
          <h3>{title}</h3>
          {introduction && <div className="bc-introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}
        </div>

        {cta && <Cta cta={cta} />}
      </Link>
    </article>
  );
};

export default BasicCard;
