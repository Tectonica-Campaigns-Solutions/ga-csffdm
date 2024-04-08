import React, { useState } from 'react';
import { navigate } from 'gatsby';
// import { navigate } from '@reach/router';
import { isArray, prepareQueryParam } from '../../../../utils';

import './styles.scss';

const ConferenceSidebar = ({ items = [], parentSlug }) => {
  const [openItems, setOpenItems] = useState([]);

  const handleOnToggleOpen = (themeSlug, topicSlug, withSubtopics) => {
    if (!withSubtopics) {
      navigate('/conference/' + parentSlug + '/' + themeSlug + '/' + topicSlug);
      return;
    }

    const isOpen = openItems.includes(topicSlug);
    const updatedOpenItems = isOpen ? openItems.filter((id) => id !== topicSlug) : [...openItems, topicSlug];

    setOpenItems(updatedOpenItems);
  };

  const handleNavigateSubtopic = (themeSlug, topic) => {
    const cleanName = prepareQueryParam(topic);
    navigate(`/conference/${parentSlug}/${themeSlug}?id=${cleanName}`);
  };

  return (
    <div className="conference-sidebar">
      {items.map((item) => {
        return (
          <div className="theme">
            <h5>{item.title}</h5>

            <ul className="topics">
              {item.topics.map((topic) => {
                const hasSubtopics = isArray(topic.subTopics);
                const isOpen = openItems.find((i) => i === topic.slug);

                return (
                  <li className={`${isOpen ? 'open' : ''}`}>
                    <span onClick={() => handleOnToggleOpen(item.slug, topic.slug, hasSubtopics)}>
                      {topic.title}

                      {hasSubtopics && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
                          <path d="M6 9L0.803848 0H11.1962L6 9Z" fill="#37557F" />
                        </svg>
                      )}
                    </span>

                    {hasSubtopics && (
                      <ul className="sub-topics">
                        {topic.subTopics.map((subTopic) => (
                          <li onClick={() => handleNavigateSubtopic(item.slug, subTopic.title)}>{subTopic.title}</li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ConferenceSidebar;
