import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import { formatDate, isArray, truncateText } from '../../../utils';
import TagList from '../../Global/Tag/TagList';
import Link from '../../Global/Link/Link';

import './styles.scss';

const PostCard = ({ post }) => {
  const { title, introduction, content, date, tags = [], mainImage, logo, location, externalUrl } = post;

  function truncateToWords(str, n) {
    // Split the string into an array of words
    const words = str.split(' ');
  
    // If the number of words is less than or equal to n, return the original string
    if (words.length <= n) {
      return str;
    }
  
    // Slice the array to get the first n words and join them back into a string
    return words.slice(0, n).join(' ');
  }

  let link = '';
  externalUrl != null ?
    link = externalUrl.length > 0 ? externalUrl : post
  :
    link = post;  

  const intro = content?.value?.document.children[0].children[0].value !== undefined ? truncateToWords(content.value.document.children[0].children[0].value, 20) + '...' : '';

  return (
    <article className="post-card">
      <Link to={link}>
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

          {introduction.length > 0 && <div className="post-introduction" dangerouslySetInnerHTML={{ __html: introduction }} />}
          {introduction.length  == 0 && <div className="post-introduction" dangerouslySetInnerHTML={{ __html: intro }} />}
        </div>
      </Link>
    </article>
  );
};

export default PostCard;
