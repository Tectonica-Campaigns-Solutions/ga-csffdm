import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import { formatDate, isArray, truncateText } from '../../../utils';
import TagList from '../../Global/Tag/TagList';
import Link from '../../Global/Link/Link';
import { ReactSVG } from 'react-svg';
import arrowIcon from '../../Icons/resource-arrow.svg';

import './styles.scss';

const ResourceCard = ({ resource }) => {
  const { title, introduction, tags = [] } = resource;

  return (
    <article className="resource-card">
      <div className="basic-information">
        <h2>{title}</h2>
      </div>

      <ReactSVG src={arrowIcon} />
    </article>
  );
};

export default ResourceCard;
