import React from 'react';
import Section from '../../Layout/Section/Section';
import WorkCard from './WorkCard';

import './styles.scss';

const WorkBlock = ({ block }) => {
  const { headline, introduction, items = [], backgroundImage = null } = block;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  return (
    <Section headline={headline} introduction={introduction} bgImage={bgImageUrl} extraClassNames="work-section">
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4" key={item.id}>
            <WorkCard work={item} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default WorkBlock;
