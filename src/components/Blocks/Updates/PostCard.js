import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import { formatDate, isArray, truncateText } from '../../../utils';
import TagList from '../../Global/Tag/TagList';
import Link from '../../Global/Link/Link';

import './styles.scss';

const PostCard = ({ post }) => {
  const { title, introduction, date, tags = [], mainImage, logo, location } = post;

  return (
    <article className="post-card">
      <Link to={post}>
        {mainImage && (
          <div className="image">
            <ImageWrapper image={mainImage} />
            {isArray(tags) ? <TagList tags={tags} /> : <div className="tags-list" />}
          </div>
        )}
        {logo && (
          <div className="image">
            <ImageWrapper image={logo} />
          </div>
        )}

        <div className="content">
          {date && <span className="date">{formatDate(date)}</span>}
          {location && <span className="location">{location}</span>}
          {title && <h3>{title}</h3>}
          {introduction && <div className="post-introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
