import React from 'react';
import { navigate } from 'gatsby';
import { isArray } from '../../../../utils';

import './styles.scss';

const ConferenceSidebar = ({
  items = [],
  themeFirstActive = false,
  slug = '',
  parentSlug,
  isMobileOpen = false,
  toggleMobileOpen,
}) => {
  const handleOnToggleOpen = (themeSlug, topicSlug) => {
    navigate('/conference/' + parentSlug + '/' + themeSlug + '/' + topicSlug);
  };

  const handleNavigateSubtopic = (themeSlug, topicSlug) => {
    navigate(`/conference/${parentSlug}/${themeSlug}/${topicSlug}`);
  };

  const splittedSlug = slug.split('/').filter(Boolean);
  const [, , , subtopic] = splittedSlug;

  return (
    <div className={`conference-sidebar ${isMobileOpen ? 'mobile' : ''}`}>
      <div className="mobile-close">
        <button onClick={() => toggleMobileOpen((prev) => !prev)}>
          <svg xmlns="http://www.w3.org/2000/svg" width="41" height="41" viewBox="0 0 41 41" fill="none">
            <path
              d="M11.9585 11.9583L29.0418 29.0416M11.9585 29.0416L29.0418 11.9583"
              stroke="black"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {items.map((item, mainIndex) => {
        return (
          <div className="theme">
            <h5>{item.title}</h5>

            <ul className="topics">
              {item.subtopics.map((topic, index) => {
                const hasSubtopics = isArray(topic.subItems);

                const isActive =
                  (themeFirstActive && mainIndex == 0 && index === 0) ||
                  topic.slug === subtopic ||
                  topic.subItems.find((t) => t.slug === subtopic);

                return (
                  <li className={`${isActive ? 'open' : ''} ${isActive ? 'active' : ''}`}>
                    <span onClick={() => handleOnToggleOpen(item.slug, topic.slug)}>
                      {topic.title}

                      {hasSubtopics && (
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="9" viewBox="0 0 12 9" fill="none">
                          <path d="M6 9L0.803848 0H11.1962L6 9Z" fill="#37557F" />
                        </svg>
                      )}
                    </span>

                    {hasSubtopics && (
                      <ul className="sub-topics">
                        {topic.subItems.map((subTopic) => {
                          const isChildActive = subTopic.slug === subtopic;

                          return (
                            <li
                              className={`${isChildActive ? 'active' : ''}`}
                              onClick={() => handleNavigateSubtopic(item.slug, subTopic.slug)}
                            >
                              {subTopic.title}
                            </li>
                          );
                        })}
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
