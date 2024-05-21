import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import WorkCard from '../components/Blocks/Work/WorkCard';
import { isArray } from '../utils';
import Blocks from '../components/Blocks/Blocks';

import './basic.scss';

function AreasOfWork({ pageContext, data: { page, works = [], favicon } }) {
  const { seo, title, introduction, backgroundImage, blocks = [] } = page;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <HeroBasic title={title} image={backgroundImage} currentPage={title} />

      <div className="container basic-layout">
        {introduction && (
          <div className="page-introduction">
            <p>{introduction}</p>
          </div>
        )}

        <div className="row page-grid">
          {isArray(works?.nodes) &&
            works.nodes.map((work) => (
              <div className="col-md-4" key={work.id}>
                <WorkCard work={work} />
              </div>
            ))}
        </div>
      </div>

      <div className="inner-page">
        <Blocks blocks={blocks} />
      </div>
    </Layout>
  );
}

export const AreasOfWorkQuery = graphql`
  query AreasOfWork {
    favicon: datoCmsSite {
      faviconMetaTags {
        tags
      }
    }
    page: datoCmsAreasOfWork {
      id
      title
      introduction
      backgroundImage {
        url
      }
      blocks {
        ... on DatoCmsFormBlock {
          ...BlockForm
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    works: allDatoCmsWork {
      nodes {
        title
        slug
        description
        introduction
        id
        icon {
          alt
          width
          height
          url
        }
        model {
          apiKey
        }
      }
    }
  }
`;

export default AreasOfWork;
