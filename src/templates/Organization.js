import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Blocks from '../components/Blocks/Blocks';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import ShareButtons from '../components/Global/ShareButtons/ShareButtons';

import './basic.scss';

const Organization = ({ pageContext, data: { page, favicon } }) => {
  const { seo, title, introduction, logo, blocks = [] } = page;

  const renderMainContent = () => (
    <>
      <Blocks blocks={blocks} />
    </>
  );

  console.log('Logo', page);

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <div className="inner-page organization-layout" style={{ backgroundColor: '#FFF' }}>

        <HeroBasic title={title} introduction={introduction} image={logo} currentPage={title} type="organization" />

        <div className="container page-content">
          <ShareButtons /> 
          {renderMainContent()}
          
        </div>
       
      </div>
    </Layout>
  );
};

export default Organization;

export const PageQuery = graphql`
  query PageById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    page: datoCmsOrganization(id: { eq: $id }) {
      title
      introduction
      logo {
        alt
        gatsbyImageData
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      blocks {
        ... on DatoCmsNarrativeBlock {
          ...BlockNarrativeBlock
        }
        ... on DatoCmsAcordion {
          ...BlockAccordion
        }
        ... on DatoCmsSimpleText {
          ...BlockText
        }
        ... on DatoCmsVideoBlock {
          ...BlockVideo
        }
        ... on DatoCmsTable {
          ...BlockTable
        }        
        ... on DatoCmsShare {
          ...BlockShare
        }
        ... on DatoCmsFormBlock {
          ...BlockForm
        }
      }
    }
  }
`;