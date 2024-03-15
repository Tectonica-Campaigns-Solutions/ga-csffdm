import React from 'react';
import ImageWrapper from '../../Global/Image/ImageWrapper';
import { formatDate, isArray, truncateText } from '../../../utils';
import TagList from '../../Global/Tag/TagList';
import Link from '../../Global/Link/Link';

import './styles.scss';

const EventCard = ({ event }) => {
  const { title, introduction, mainImage, date, tags = [] } = event;

  const renderContent = () => (
    <>
      <div className="metadata">
        {date && <span className="date">{formatDate(date)}</span>}

        <div className="venue">TODO: Venue</div>

        {isArray(tags) ? <TagList tags={tags} /> : <div className="tags-list" />}
      </div>

      <div className="basic-info">
        {title && <h4>{title}</h4>}
        {introduction && (
          <div className="introduction" dangerouslySetInnerHTML={{ __html: truncateText(introduction, 200) }} />
        )}

        <span className="custom-btn">Read more and RSVP</span>
      </div>

      {(mainImage?.gatsbyImageData || mainImage?.url) && (
        <div className="image">
          <ImageWrapper image={mainImage} />
        </div>
      )}
    </>
  );

  return (
    <Link to={event} className={`event-card`}>
      {renderContent()}
    </Link>
  );
};

export default EventCard;
