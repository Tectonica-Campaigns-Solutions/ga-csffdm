import React from 'react';
import { graphql } from 'gatsby';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Layout from '../components/Layout/Layout';
import HeroDetail from '../components/Global/HeroDetail/HeroDetail';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';
import ShareButtons from '../components/Global/ShareButtons/ShareButtons';
import Blocks from '../components/Blocks/Blocks';
import RelatedContent from '../components/Blocks/RelatedContent/RelatedContent';

import './basic.scss';

const Work = ({ pageContext, data: { work, favicon, updates, resources, meetings, events, pastEvents } }) => {
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
      <div className="container">
      {blocks.map((block) => {
          if (block.__typename === 'DatoCmsRelatedContent') 
              console.log(block);
              if (block.typeOfContent === 'news')
                return <RelatedContent key={block.id} block={block} posts={updates} />;
              else if (block.typeOfContent === 'resources')
                return <RelatedContent key={block.id} block={block} posts={resources} />;
              else if (block.typeOfContent === 'meetings')
                return <RelatedContent key={block.id} block={block} posts={meetings} />;
              else if (block.typeOfContent === 'events')
                return (
                <>
                  <RelatedContent key={block.id} block={block} posts={events} />
                  <RelatedContent key="pastEvents" block={block} posts={pastEvents} blockHeadline="Past Events" />
                </>
              )
          }
        )}
      </div>
    </Layout>
  );
};

export default Work;

export const WorkQuery = graphql`
  query WorkById($id: String, $tag: String, $today: Date){
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
      ##content {
      ## value
      ##}
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
        ... on DatoCmsRelatedContent {
          ...BlockRelatedContent
        }
      }
    }
    updates: allDatoCmsPost(filter: {tags: {elemMatch: {title: {eq: $tag}}}}, limit: 3) {
      nodes {
        id
        title
        slug
        date
        introduction
        tags {
          title
        }
        mainImage {
          width
          height
          alt
          gatsbyImageData
        }
        model {
          apiKey
        }
      }
    }
    resources: allDatoCmsResource(filter: {tags: {elemMatch: {title: {eq: $tag}}}}, limit: 4) {
      nodes {
        title
        slug
        date
        introduction
        mainImage {
          width
          height
          gatsbyImageData
          alt
        }
      }
    }
    events: allDatoCmsEvent(filter: {tags: {elemMatch: {title: {eq: $tag}}}, date: {gte: $today}}, limit: 3) {
      nodes {
        title
        slug
        date
        introduction
        mainImage {
          width
          height
          gatsbyImageData
          alt
        }
      }
    }
    pastEvents: allDatoCmsEvent(filter: {tags: {elemMatch: {title: {eq: $tag}}}, date: {lt: $today}}, limit: 3) {
      nodes {
        title
        slug
        date
        introduction
        mainImage {
          width
          height
          gatsbyImageData
          alt
        }
      }
    }

  }
`;

