import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import { formatDate, isArray, truncateText } from '../../../utils';
import TagList from '../../Global/Tag/TagList';
import Link from '../../Global/Link/Link';
import { ReactSVG } from 'react-svg';
import arrowIcon from '../../Icons/resource-arrow.svg';

import './styles.scss';

const ResourceCard = ({ resource, className = '' }) => {
  const { title, slug, date, introduction, tags = [] } = resource;

  return (
    <article className={`resource-card ${className}`}>
      <Link to={resource}>
        {isArray(tags) ? <TagList tags={tags} /> : <div className="tags-list" />}
        {date && <span className="date">{formatDate(date)}</span>}
        <div className="basic-information">
          <h4>{title}</h4>
        </div>
        {introduction && <div className="resource-introduction tk-neue" dangerouslySetInnerHTML={{ __html: introduction }} />}
        <ReactSVG src={arrowIcon} className='btn-img' />
        <div className="custom-btn custom-btn-primary">Read and download</div>
      </Link>
    </article>
  );
};

export default ResourceCard;
