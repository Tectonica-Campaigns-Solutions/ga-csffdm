import React from 'react';
import { formatDate, isArray } from '../../../utils';
import TagList from '../../Global/Tag/TagList';
import Link from '../../Global/Link/Link';
import { ReactSVG } from 'react-svg';
import arrowIcon from '../../Icons/resource-arrow.svg';

import './styles.scss';

const ResourceCard = ({ resource, className = '' }) => {
  const { title, date, introduction, externalUrl, tags = [] } = resource;

  //const intro = introduction.length > 0 ? introduction : title;
  const intro = introduction.length > 0 ? introduction.substring(0, 200) + '...' : title;

  let link = '';
  externalUrl != null ?
    //console.log('externalUrl', externalUrl);
    link = externalUrl.length > 0 ? externalUrl : resource
  :
    link = resource;

  return (
    <article className={`resource-card ${className}`}>
      <Link to={link}>
        {isArray(tags) ? <TagList tags={tags} /> : <div className="tags-list" />}
        {date && <span className="date">{formatDate(date)}</span>}
        <div className="basic-information">
          <h4>{title}</h4>
        </div>
        {intro && (
          <div className="resource-introduction tk-neue" dangerouslySetInnerHTML={{ __html: intro }} />
        )}
        <ReactSVG src={arrowIcon} className="btn-img" />
        <div className="custom-btn custom-btn-primary">Read and download</div>
      </Link>
    </article>
  );
};

export default ResourceCard;
