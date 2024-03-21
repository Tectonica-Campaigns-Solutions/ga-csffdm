import React from 'react';
import Section from '../../Layout/Section/Section';
import EventCard from './EventCard';

import './styles.scss';

const CalendarBlock = ({ block }) => {
  const { headline, introduction, cta = [], items = [] } = block;

  return (
    <Section headline={headline} introduction={introduction} cta={cta} extraClassNames="eventsSection" hClass="h4">
      {items.map((item) => (
        <EventCard event={item} key={item.id} />
      ))}
    </Section>
  );
};

export default CalendarBlock;
