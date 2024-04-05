import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Blocks from '../components/Blocks/Blocks';
import ShareButtons from '../components/Global/ShareButtons/ShareButtons';
import HeroDetail from '../components/Global/HeroDetail/HeroDetail';
import FormBlock from '../components/Blocks/FormBlock/FormBlock';

import './basic.scss';

const Organization = ({ pageContext, data: { page, favicon } }) => {
  const { seo, title, introduction, logo, linkToWebsite, blocks = [] } = page;

  console.log(blocks);
  const renderMainContent = () => (
    <>
      <Blocks blocks={blocks} />
    </>
  );

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <div className="inner-page organization-layout" style={{ backgroundColor: '#FFF' }}>

        <HeroDetail currentPage={title} title={title} description={introduction} image={logo} link={linkToWebsite} type="organization" />

        <div className="container page-content">
          <ShareButtons /> 
          {renderMainContent()}
          
        </div>
       
      </div>
      <FormBlock block={{ title:'Subscribe to the latest updates', backgroundColor:'blue', backgroundImage:'', footerForm:true }} />
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
      linkToWebsite
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