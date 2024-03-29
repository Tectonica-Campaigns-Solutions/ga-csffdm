import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../../Layout/Section/Section';
import PostCard from './PostCard';

import './styles.scss';

const UpdatesBlock = ({ block }) => {
  const { headline, introduction, cta = [], items = [], backgroundImage = null } = block;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  const updatesPosts = useStaticQuery(graphql`
    query allUpdatesPosts {
      allDatoCmsPost(limit: 3) {
        nodes {
          id
          title
          slug
          date
          introduction
          tags {
            title
          }
          mainImage {
            width
            height
            alt
            gatsbyImageData
          }
          model {
            apiKey
          }
        }
      }
    }
  `);

  const itemsSorted = [...updatesPosts.allDatoCmsPost.nodes];

  return (
    <Section
      headline={headline}
      introduction={introduction}
      cta={cta}
      bgImage={bgImageUrl}
      extraClassNames="updatesSection"
      hClass="h4"
    >
      <div className="row">
        {itemsSorted.map((item) => (
          <div className="col-md-4" key={item.id}>
            <PostCard post={item} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default UpdatesBlock;
