import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import { formatDate, isArray, truncateText } from '../../../utils';
import TagList from '../../Global/Tag/TagList';
import Link from '../../Global/Link/Link';
import { ReactSVG } from 'react-svg';
import arrowIcon from '../../Icons/resource-arrow.svg';

import './styles.scss';

const ResourceCard = ({ resource }) => {
  const { title, slug, introduction, tags = [] } = resource;

  return (
    <article className="resource-card">
      <Link to={slug}>
        <div className="basic-information">
          <h4>{title}</h4>
        </div>
        {isArray(tags) ? <TagList tags={tags} /> : <div className="tags-list" />}
        {introduction && <div className="resource-introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}
        <ReactSVG src={arrowIcon} className='btn-img' />
      </Link>
    </article>
  );
};

export default ResourceCard;
