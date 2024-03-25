import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../../Layout/Section/Section';
import ResourceCard from './ResourceCard';

import './styles.scss';

const ResourcesBlock = ({ block }) => {
  const { headline, introduction, cta = [], fixedCardTitle, fixedCardLink, fixedCardIntro, items = [] } = block;

  const resourcesPosts = useStaticQuery(graphql`
    query allResources {
      allDatoCmsResource (limit: 2) {
          nodes {
            id
            title
            slug
            introduction
            date
            tags {
              title
            }
          }
      }
    }
  `);

  const itemsSorted = [...resourcesPosts.allDatoCmsResource.nodes];
  const fixedCard = {
    title: fixedCardTitle, 
    slug: fixedCardLink, 
    introduction: fixedCardIntro
  }

  return (
    <Section headline={headline} introduction={introduction} cta={cta} hClass='h4'>
      <div className="row">
        <div className="col-md-4">
          <ResourceCard resource={fixedCard} className="fixedCard" />
        </div>
        {itemsSorted.map((item) => (
          <div className="col-md-4" key={item.id}>
            <ResourceCard resource={item} />
          </div>
        ))}
      </div>
    </Section>
  );
};

export default ResourcesBlock;
