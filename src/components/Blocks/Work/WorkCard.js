import React from 'react';
import Link from '../../Global/Link/Link';

import './styles.scss';

const WorkCard = ({ work }) => {
  const { title, introduction, description, icon } = work;

  return (
    <article className="work-card">
      <Link to={work}>
        <div className="content">
          {title && <h3>{title}</h3>}
          {description && <div className="work-introduction" dangerouslySetInnerHTML={{ __html: description }} />}
          {icon && <img src={icon.url} className='workIcon' />}
        </div>
      </Link>
    </article>
  );
};

export default WorkCard;
