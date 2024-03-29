import React from 'react';
import Section from '../../Layout/Section/Section';
import Carousel from '../../Global/Carousel/Carousel';
import Cta from '../../Global/Cta/Cta';
import BasicCard from '../../Global/BasicCard/BasicCard';

import './styles.scss';

const ProcessBlock = ({ block }) => {
  const { headline, introduction, items = [], cta } = block;

  return (
    <Section headline={headline} introduction={introduction} extraClassNames="process-section">
      <div className="row">
        <Carousel
          dots={false}
          items={items}
          renderItem={(item) => (
            <div className="col-md-4" key={item.id}>
              <BasicCard {...item} />
            </div>
          )}
        />

        {cta && (
          <div className="col cta-extra">
            <Cta cta={cta} />
          </div>
        )}
      </div>
    </Section>
  );
};

export default ProcessBlock;
