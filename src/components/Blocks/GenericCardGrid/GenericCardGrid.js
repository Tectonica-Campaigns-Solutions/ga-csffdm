import React, { useEffect, useState } from 'react';
import { Link } from 'gatsby';

import './styles.scss';

const GenericCardGrid = ({ items = [] }) => {
  const [currentUrl, setCurrentUrl] = useState('');

  useEffect(() => {
    if (window) {
      setCurrentUrl(window.location.pathname);
    }
  }, []);

  const [, conference, conferenceSlug, subTopic] = currentUrl.trim().split('/');

  return (
    <div className="generic-card-grid">
      {items.map((item) => {
        let urlTo = '';
        const { slug, model } = item.cta.link;

        // console.log('model', model, 'slug', slug);

        if (model.apiKey === 'conference_subtopic') {
          urlTo = `/${conference}/${conferenceSlug}/${slug}`;
        } else if (model.apiKey === 'basic_page') {
          urlTo = `/${slug}`
        } else {
          //urlTo = `/${conference}/${conferenceSlug}/${subTopic}/${slug}`;
          urlTo = `/${model.apiKey}/${slug}`; //item.cta.link;
        }
        

        return (
          <Link className="generic-card" to={urlTo}>
            <h3>{item.title}</h3>
            <div className="intro" dangerouslySetInnerHTML={{ __html: item.introduction }} />
          </Link>
        );
      })}
    </div>
  );
};

export default GenericCardGrid;
