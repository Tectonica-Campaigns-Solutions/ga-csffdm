import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Blocks from '../components/Blocks/Blocks';
//import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import HeroDetail from '../components/Global/HeroDetail/HeroDetail';
import ShareButtons from '../components/Global/ShareButtons/ShareButtons';

const Page = ({ pageContext, data: { page, favicon } }) => {
  const { seo, title, introduction, image, blocks = [] } = page;

  //console.log(blocks);
  const renderMainContent = () => (
    <>
      <Blocks blocks={blocks} />
    </>
  );

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <div className="inner-page" style={{ backgroundColor: '#FFF' }}>

        {/*<HeroBasic title={title} image={heroBackgroundImage} backgroundColor={backgroundColor} overlay={false} />*/}
        <HeroDetail currentPage={title} title={title} description={introduction} image={image} />
        <div className="container page-content">
          <ShareButtons /> 
          {renderMainContent()}
          
        </div>
       
      </div>
    </Layout>
  );
};

export default Page;

export const PageQuery = graphql`
  query PageById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    page: datoCmsBasicPage(id: { eq: $id }) {
      id
      title
      introduction
      image {
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
        ... on DatoCmsImage {
          __typename
          id: originalId
          image {
            alt
            gatsbyImageData
          }
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
        ... on DatoCmsLinksCard {
          __typename
          id: originalId
          introduction
          title
          links
        }
      }
    }
  }
`;