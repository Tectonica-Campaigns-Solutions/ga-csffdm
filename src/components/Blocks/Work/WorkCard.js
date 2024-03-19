import React from 'react';
import Link from '../../Global/Link/Link';

import './styles.scss';

const WorkCard = ({ work }) => {
  const { title, introduction, icon } = work;

  return (
    <article className="work-card">
      <Link to={work}>
        <div className="content">
          {title && <h3>{title}</h3>}
          {introduction && <div className="work-introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}
          {icon && <img src={icon.url} />}
        </div>
      </Link>
    </article>
  );
};

export default WorkCard;
