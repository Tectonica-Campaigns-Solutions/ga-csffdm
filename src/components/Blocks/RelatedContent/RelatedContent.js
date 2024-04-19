import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../../Layout/Section/Section';
import PostCard from '../Updates/PostCard';

import './styles.scss';

export const RelatedContent = ({ block, posts, blockHeadline = '' }) => {
  const { headline, introduction, typeOfContent } = block;

  const itemsSorted = [...posts.nodes];

  return (
    <Section
      headline={ blockHeadline === '' ?  headline : blockHeadline}
      introduction={introduction}
      cta=""
      bgImage=""
      extraClassNames=""
      hClass="h4"
    >
      <div className="row">
        {itemsSorted?.map((item) => (
          <div className="col-md-4" key={item.id}>
            <PostCard post={item} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default RelatedContent;
