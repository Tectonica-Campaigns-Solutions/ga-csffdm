import React from 'react';
import './styles.scss';

const ConferenceSidebar = ({ items = [] }) => {
  return (
    <div className="conference-sidebar">
      {items.map((item) => {
        return (
          <div className="theme">
            <h5>{item.title}</h5>

            <ul className="topics">
              {item.topics.map((topic) => (
                <li>
                  {topic.title}

                  <ul className="sub-topics">
                    {topic.subTopics.map((subTopic) => (
                      <li>{subTopic.title}</li>
                    ))}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ConferenceSidebar;
