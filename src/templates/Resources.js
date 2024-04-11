import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import ResourceCard from '../components/Blocks/Resources/ResourceCard';
import { isArray } from '../utils';
import Blocks from '../components/Blocks/Blocks';

import './basic.scss';

function Resources({ pageContext, data: { page, resources = [], favicon } }) {
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
          {isArray(resources?.nodes) &&
            resources.nodes.map((resource) => (
              <div className="col-md-4" key={resource.id}>
                <ResourceCard resource={resource} />
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

export const ResourcesQuery = graphql`
  query datoCmsResourcesModel {
    favicon: datoCmsSite {
      faviconMetaTags {
        tags
      }
    }
    page: datoCmsResourcesModel {
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
        ... on DatoCmsSimpleText {
          ...BlockText
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    resources: allDatoCmsResource {
      nodes {
        id
        title
        introduction
        date
        slug
        tags {
          title
        }
        model {
          apiKey
        }
      }
    }
  }
`;

export default Resources;
