import React from 'react';
import { graphql } from 'gatsby';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Layout from '../components/Layout/Layout';
import HeroDetail from '../components/Global/HeroDetail/HeroDetail';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';
import ShareButtons from '../components/Global/ShareButtons/ShareButtons';
import Blocks from '../components/Blocks/Blocks';

import './basic.scss';

const UNMeeting = ({ pageContext, data: { unMeeting, favicon } }) => {
  const { title, image, content, seo, blocks = [] } = unMeeting;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <HeroDetail currentPage={title} title={title} image={image} />

      <div className="container page-content">
        <ShareButtons />
        {content?.value && <StructuredTextDefault content={content} />}
        {blocks && <Blocks blocks={blocks} />}
      </div>
    </Layout>
  );
};

export default UNMeeting;

export const WorkQuery = graphql`
  query UNMeetingById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    unMeeting: datoCmsUnMeeting(id: { eq: $id }) {
      id
      title
      content {
       value
      }
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
        ... on DatoCmsCalendarBlock {
          ...BlockCalendar
        }
      }
    }
  }
`;
