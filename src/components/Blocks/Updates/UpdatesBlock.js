import React from 'react';
import Section from '../../Layout/Section/Section';
import PostCard from './PostCard';

import './styles.scss';

const UpdatesBlock = ({ block }) => {
  const { headline, introduction, cta = [], items = [], backgroundImage = null } = block;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  return (
    <Section headline={headline} introduction={introduction} cta={cta} bgImage={bgImageUrl}>
      <div className="row">
        {items.map((item) => (
          <div className="col-md-4" key={item.id}>
            <PostCard post={item} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default UpdatesBlock;
