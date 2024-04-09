import React from 'react';
import { Link } from 'gatsby';
import './styles.scss';

const GenericCardGrid = ({ items = [] }) => {
  return (
    <div className="generic-card-grid">
      {items.map((item) => {
        return (
          <Link className="generic-card" to={item.linkTo}>
            <h3>{item.title}</h3>
            <div className="intro" dangerouslySetInnerHTML={{ __html: item.introduction }} />
          </Link>
        );
      })}
    </div>
  );
};

export default GenericCardGrid;
