import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import PostCard from '../components/Blocks/Updates/PostCard';
import { isArray } from '../utils';
import Blocks from '../components/Blocks/Blocks';

import './basic.scss';

function Governance({ pageContext, data: { page, organizations = [], favicon } }) {
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
          {isArray(organizations?.edges) &&
            organizations.edges.map((org) => (
              <div className="col-md-4 item-organization" key={org.node.id}>
                <PostCard post={org.node} />
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

export const GovernanceQuery = graphql`
  query Governance {
    favicon: datoCmsSite {
      faviconMetaTags {
        tags
      }
    }
    page: datoCmsGovernance {
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
    organizations: allDatoCmsOrganization {
      edges {
        node {
          title
          slug
          location
          introduction
          id
          logo {
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
  }
`;

export default Governance;
