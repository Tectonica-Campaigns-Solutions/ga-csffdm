import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../../Layout/Section/Section';
import ResourceCard from './ResourceCard';
import Cta from '../../Global/Cta/Cta';

import './styles.scss';

const ResourcesBlock = ({ block, withFixedCard = false, homePage = true }) => {
  const { headline, introduction, cta = [], fixedCardTitle = null, fixedCardLink = null, fixedCardIntro = null, items = [] } = block;

  const resourcesPosts = useStaticQuery(graphql`
    query allResources {
      allDatoCmsResource(limit: 2) {
        nodes {
          id
          title
          slug
          introduction
          date
          tags {
            title
          }
          model {
            apiKey
          }
        }
      }
    }
  `);

  //const itemsSorted = homePage ? [...items] : [...items];
  const itemsSorted = [...items];
  /*
  const fixedCard = {
    title: fixedCardTitle != undefined ? fixedCardTitle : '',
    slug: fixedCardLink?.content?.slug != undefined ? fixedCardLink?.content?.slug : '',
    introduction: fixedCardIntro != undefined ? fixedCardIntro : '',
    model: { apiKey: "resource" }
  };
  */

  return (
    <Section headline={headline} introduction={introduction} cta={cta} hClass="h4" extraClassNames="resources-section">
      <div className="row">
        {/* withFixedCard && (
        <div className="col-lg-4">
          <ResourceCard resource={fixedCard} className="fixedCard" />
        </div>
        )*/}

        {itemsSorted.map((item) => (
          <div className={ itemsSorted.length > 3 ? "col-lg-6" : "col-lg-4" }  key={item.id}>
            <ResourceCard resource={item} />
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

export default ResourcesBlock;
