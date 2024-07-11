import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../../Layout/Section/Section';
import PostCard from './PostCard';
import Cta from '../../Global/Cta/Cta';

import './styles.scss';

const UpdatesBlock = ({ block }) => {
  const { headline, introduction, cta = [], backgroundImage = null, items = [] } = block;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  const updatesPosts = useStaticQuery(graphql`
    query allUpdatesPosts {
      allDatoCmsPost(limit: 3, sort: {date: DESC}) {
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
  // const itemsLatest = [...updatesPosts.allDatoCmsPost.nodes];
  // const itemsSorted = items.length > 0 ? [...items] : itemsLatest;

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

        {cta && (
          <div className="col cta-extra">
            <Cta cta={cta} />
          </div>
        )}
      </div>
    </Section>
  );
};

export default UpdatesBlock;
