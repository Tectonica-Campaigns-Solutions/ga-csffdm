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
import Section from '../components/Layout/Section/Section';
import ResourceCard from '../components/Blocks/Resources/ResourceCard';

import './basic.scss';

const Resource = ({ pageContext, data: { resource, favicon, resources } }) => {
  const { title, introduction, mainImage, content, seo, tags, blocks = [], typeOfResource } = resource;

  const itemsSorted = [...resources.nodes];
  const breadcrumb = {
    title: 'Resources',
    url: '/resources',
  };
  const resourcesCta = {
    url: '/resources',
    externalTitle: 'Explore all the resources',
    isButton: true,
    customVariant: 'custom-btn-secondary',
    off: false,
    isCta: true
  }

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <div className="container post-layout">
        <Breadcrumb currentPage={title} breadcrumb={breadcrumb} />
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
      <Section headline="Related Resources" cta={resourcesCta} extraClassNames={`updatesSection ${typeOfResource}`}  hClass="h4">
        <div className="row">
          {itemsSorted.map((item) => (
            <div className="col-md-4" key={item.id}>
              <ResourceCard resource={item} className={typeOfResource} />
            </div>
          ))}
        </div>
      </Section>
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
  query ResourceById($id: String, $type: String) {
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
      typeOfResource
      mainImage {
        alt
        gatsbyImageData
      }
      content {
        value
      }
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
        ... on DatoCmsPdfButton {
          __typename
          id: originalId
          label
          file {
            url
          }
        }
      }
    }
    resources: allDatoCmsResource(filter: { typeOfResource: { eq: $type }, id: { ne: $id } }, limit: 3) {
      nodes {
        id
        title
        introduction
        date
        slug
        typeOfResource
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
