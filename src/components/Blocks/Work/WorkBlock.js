import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../../Layout/Section/Section';
import WorkCard from './WorkCard';

import './styles.scss';

const WorkBlock = ({ block }) => {
  const { headline, introduction, backgroundImage = null } = block;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  const workPosts = useStaticQuery(graphql`
    query allPosts {
      allDatoCmsWork {
        nodes {
          title
          slug
          introduction
          id
          icon {
            alt
            width
            height
            url
          }
        }
      }
    }
  `);

const itemsSorted = [...workPosts.allDatoCmsWork.nodes];

  return (
    <Section headline={headline} introduction={introduction} bgImage={bgImageUrl} extraClassNames="work-section">
      <div className="row"  draggable="true">
        {itemsSorted.map((item) => (
          <div className="col-md-4" key={item.id}>
            <WorkCard work={item} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default WorkBlock;
