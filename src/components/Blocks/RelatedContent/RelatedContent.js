import React from 'react';
import Section from '../../Layout/Section/Section';
import PostCard from '../Updates/PostCard';
import EventCard from '../Calendar/EventCard';

import './styles.scss';
import ResourceCard from '../Resources/ResourceCard';

export const RelatedContent = ({ block, posts, blockHeadline = '', extraClassNames = '' }) => {
  const { headline, introduction, typeOfContent, cta } = block;

  const itemsSorted = [...posts.nodes];
  const featured = extraClassNames.includes('future');

  if ( cta !== null && cta.title !== null)
    cta.title = blockHeadline.includes('Past Events') ? cta.title.replace('upcoming', 'past') : cta.title;

  return (
    <Section
      headline={blockHeadline === '' ? headline : blockHeadline}
      introduction={introduction}
      cta={cta}
      bgImage=""
      extraClassNames={`${typeOfContent} ${extraClassNames}`}
      hClass="h4"
    >
      <div className="row">
        {itemsSorted?.map((item) => (
          <>
            {featured == true && 
              <div className={ extraClassNames == 'future-meeting' ? "col-md-10" : "col-md-4" }  key={item.id}>
                {typeOfContent === 'news' && <PostCard post={item} />}
                {typeOfContent === 'resources' && <PostCard post={item} />}
                {typeOfContent === 'meetings' && <EventCard event={item} type="meeting" future={true} />}
                {typeOfContent === 'events' && <EventCard event={item} type="event" future={true} />}
              </div>
            }
            {featured == false && (
              <div className="col-md-4" key={item.id}>
                {typeOfContent === 'news' && <PostCard post={item} />}
                {typeOfContent === 'resources' && <ResourceCard resource={item} />}
                {typeOfContent === 'meetings' && <EventCard event={item} type="meeting" future={false} />}
                {typeOfContent === 'events' && <EventCard event={item} type="event" future={false} />}
              </div>
            )}
          </>
        ))}
        {itemsSorted.length === 0 && <p>No content available.</p>}
      </div>
    </Section>
  );
};

export default RelatedContent;
