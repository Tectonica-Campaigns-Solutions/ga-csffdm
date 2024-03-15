import React from 'react';
import Section from '../../Layout/Section/Section';
import ResourceCard from './ResourceCard';

import './styles.scss';

const ResourcesBlock = ({ block }) => {
  const { headline, introduction, cta = [], items = [] } = block;

  return (
    <Section headline={headline} introduction={introduction} cta={cta}>
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4" key={item.id}>
            <ResourceCard resource={item} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ResourcesBlock;
