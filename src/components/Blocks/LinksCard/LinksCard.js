import React from 'react';
import './styles.scss';

const LinksCard = ({ block }) => {
  return (
    <div className='container'>
    <div className="links-card">
      <h3>{block.title}</h3>
      <div className="intro" dangerouslySetInnerHTML={{ __html: block.introduction }} />
      <div className="links" dangerouslySetInnerHTML={{ __html: block.links }} />
    </div>
    </div>
  );
};

export default LinksCard;
