import React from 'react';
import { graphql } from 'gatsby';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Layout from '../components/Layout/Layout';
import HeroDetail from '../components/Global/HeroDetail/HeroDetail';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';
import ShareButtons from '../components/Global/ShareButtons/ShareButtons';
import Blocks from '../components/Blocks/Blocks';

import './basic.scss';

const Work = ({ pageContext, data: { work, favicon } }) => {
  const { title, introduction, image, content, seo, blocks = [] } = work;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <HeroDetail currentPage={title} title={title} description={introduction} image={image} />

      <div className="container page-content">
        <ShareButtons />
        {content?.value && <StructuredTextDefault content={content} />}
        {blocks && <Blocks blocks={blocks} />}
      </div>
    </Layout>
  );
};

export default Work;

export const WorkQuery = graphql`
  query WorkById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    work: datoCmsWork(id: { eq: $id }) {
      id
      title
      introduction
      image {
        alt
        gatsbyImageData
      }
      content {
        value
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
