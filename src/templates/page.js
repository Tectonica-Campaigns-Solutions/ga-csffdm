import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Blocks from '../components/Blocks/Blocks';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import HeroDetail from '../components/Global/HeroDetail/HeroDetail';
import ShareButtons from '../components/Global/ShareButtons/ShareButtons';

const Page = ({ pageContext, data: { page, favicon } }) => {
  const { seo, title, introduction, image, blocks = [], headerCtas } = page;

  // console.log(pageContext);

  let breadcrumb = {};

  switch (pageContext.slug) {
    case 'governance':
      breadcrumb = {
        title: 'About',
        url: '/about'
      }
      break;
    case 'our-demands':
      breadcrumb = {
        title: 'About',
        url: '/about'
      }
      break;
    default:
      breadcrumb = null
  }

  const renderMainContent = () => (
    <>
      <Blocks blocks={blocks} />
    </>
  );

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <div className={`inner-page ${pageContext.slug}`} style={{ backgroundColor: '#FFF' }}>

        { pageContext.slug === 'about' && (<HeroBasic title={title} image={image} currentPage={title} />) }
        { pageContext.slug !== 'about' && (<HeroDetail currentPage={title} title={title} description={introduction} image={image} ctas={headerCtas} breadcrumb={breadcrumb} />) }
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
      headerCtas
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
        ... on DatoCmsEmbedForm {
          __typename
          embedCode
        }
      }
    }
  }
`;