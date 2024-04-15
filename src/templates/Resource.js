import React from 'react';
import { graphql } from 'gatsby';
import { isArray } from '../utils';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Layout from '../components/Layout/Layout';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';
import ShareButtons from '../components/Global/ShareButtons/ShareButtons';
import Blocks from '../components/Blocks/Blocks';
import Breadcrumb from '../components/Global/Breadcrumb/Breadcrumb';
import ImageWrapper from '../components/Global/Image/ImageWrapper';
import TagList from '../components/Global/Tag/TagList';
import FormBlock from '../components/Blocks/FormBlock/FormBlock';

import './basic.scss';

const Resource = ({ pageContext, data: { resource, favicon } }) => {
  const { title, introduction, mainImage, content, seo, tags, blocks = [] } = resource;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <div className="container post-layout">
        <Breadcrumb currentPage={title} />
        <ShareButtons />

        <div className="post-info">
          {title && <h1>{title}</h1>}
          {introduction && <p className="post-intro">{introduction}</p>}
          {mainImage && <ImageWrapper image={mainImage} />}

          {content?.value && <StructuredTextDefault content={content} />}
          {blocks && <Blocks blocks={blocks} />}
          {isArray(tags) && (
            <div className="mt-5 mb-4">
              <TagList tags={tags} />
            </div>
          )}
        </div>
      </div>
      <FormBlock
        block={{
          title: 'Subscribe to the latest updates',
          backgroundColor: 'blue',
          backgroundImage: '',
          footerForm: true,
        }}
      />
    </Layout>
  );
};

export default Resource;

export const ResourceQuery = graphql`
  query ResourceById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    resource: datoCmsResource(id: { eq: $id }) {
      id
      title
      date
      introduction
      mainImage {
        alt
        gatsbyImageData
      }
      ## content {
      ## value
      ##}
      tags {
        ...Tags
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
        ... on DatoCmsCta {
          ...BlockCta
        }
      }
    }
  }
`;
