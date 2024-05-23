import React from 'react';
import Link from '../../Global/Link/Link';

import './styles.scss';

const WorkCard = ({ work }) => {
  const { title, introduction, description, icon } = work;

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

  return (
    
      <Link to={work}>
        <article className="work-card">
        <div className="content">
          {title && <h3>{title}</h3>}
          {description && <div className="work-introduction" dangerouslySetInnerHTML={{ __html: truncateToWords(description, 20) + '...' }} />}
          {icon && <img src={icon.url} className='workIcon' />}
        </div>
        </article>
      </Link>

  );
};

export default WorkCard;
