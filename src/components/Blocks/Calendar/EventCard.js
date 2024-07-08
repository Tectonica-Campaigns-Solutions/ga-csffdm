import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import { formatDate, isArray, truncateText } from '../../../utils';
import TagList from '../../Global/Tag/TagList';
import Link from '../../Global/Link/Link';

import './styles.scss';

const EventCard = ({ event, type = 'event', future = false }) => {
  const { title, introduction, mainImage, image, date, tags = [], externalUrl } = event;

  const renderContent = () => (
    <>
      {type === 'meeting' && future && (image?.gatsbyImageData || image?.url) && (
        <div className="image">
          <ImageWrapper image={image} />
        </div>
      )}
      <div className="event-card-data">
        <div className="metadata">
          {type === 'event' && future && (
            <div class="tags-list">
              <span class="tag">Upcoming Event</span>
            </div>
          )}
          {type === 'event' && !future && (
            <div class="tags-list">
              <span class="tag">Past Event</span>
            </div>
          )}
          
          {type === 'meeting' && future && (
            <div class="tags-list">
              <span class="tag">Upcoming UN Meeting</span>
            </div>
          )}
          {type === 'meeting' && !future && (
            <div class="tags-list">
              <span class="tag">Past UN Meeting</span>
            </div>
          )}

          {date && <span className="date">{formatDate(date)}</span>}
        </div>

        <div className="basic-info">
          {title && <h4>{title}</h4>}
          {introduction && (
            <div className="introduction" dangerouslySetInnerHTML={{ __html: truncateText(introduction, 200) }} />
          )}
        </div>

      </div>
    </>
  );

  return (
    <>
    { externalUrl && (
      <a href={externalUrl} className={`event-card ${type}`} target='blank'>
        {renderContent()}
      </a>
    )}
    { !externalUrl && (
      <Link to={event} className={`event-card ${type}`}>
        {renderContent()}
      </Link>
    )}
    </>
  );
};

export default EventCard;
