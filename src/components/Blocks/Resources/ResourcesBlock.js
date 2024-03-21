import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../../Layout/Section/Section';
import ResourceCard from './ResourceCard';

import './styles.scss';

const ResourcesBlock = ({ block }) => {
  const { headline, introduction, cta = [], items = [] } = block;

  const resourcesPosts = useStaticQuery(graphql`
    query allResources {
      allDatoCmsResource {
          nodes {
            id
            title
            slug
            introduction
            tags {
              title
            }
          }
      }
    }
  `);

const itemsSorted = [...resourcesPosts.allDatoCmsResource.nodes];

  return (
    <Section headline={headline} introduction={introduction} cta={cta} hClass='h4'>
      <div className="row">
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
