import React from 'react';
import { graphql } from 'gatsby';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Layout from '../components/Layout/Layout';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';
import Breadcrumb from '../components/Global/Breadcrumb/Breadcrumb';
import ImageWrapper from '../components/Global/Image/ImageWrapper';
import { formatDate, isArray } from '../utils';
import TagList from '../components/Global/Tag/TagList';
import ShareButtons from '../components/Global/ShareButtons/ShareButtons';
import Blocks from '../components/Blocks/Blocks';
import Section from '../components/Layout/Section/Section';
import PostCard from '../components/Blocks/Updates/PostCard';
import Cta from '../components/Global/Cta/Cta';
import './basic.scss';

const Post = ({ pageContext, data: { post, favicon, updates } }) => {
  const { title, date, tags = [], introduction, mainImage, content, seo, blocks = [] } = post;

  const breadcrumb = {
    title: 'News & Events',
    url: '/news',
  };

  const itemsSorted = [...updates.nodes];
  const updatesCta = {
    url: '/news',
    externalTitle: 'Explore all the updates',
    isButton: true,
    customVariant: 'custom-btn-primary',
  }

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <div className="container post-layout">
        <Breadcrumb currentPage={title} breadcrumb={breadcrumb} />
        <ShareButtons />

        <div className="post-info">
          {date && <span className="date">{formatDate(date)}</span>}
          {title && <h1>{title}</h1>}
          {introduction && <p className="post-intro">{introduction}</p>}
          {mainImage && <ImageWrapper image={mainImage} />}

          {content?.value && <StructuredTextDefault content={content} />}

          {blocks && <Blocks blocks={blocks} />}

          {isArray(tags) && (
            <div className="mt-4">
              <TagList tags={tags} />
            </div>
          )}
        </div>
      </div>

      <Section headline="Related Updates" cta={updatesCta} extraClassNames="updatesSection" hClass="h4">
        <div className="row">
          {itemsSorted.map((item) => (
            <div className="col-md-4" key={item.id}>
              <PostCard post={item} />
            </div>
          ))}
        </div>
      </Section>
    </Layout>
  );
};

export default Post;

export const PostQuery = graphql`
  query PostById($id: String, $tags: [String]) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    post: datoCmsPost(id: { eq: $id }) {
      id
      title
      date
      tags {
        ...Tags
      }
      introduction
      mainImage {
        alt
        title
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
        ... on DatoCmsFormBlock {
          ...BlockForm
        }
        ... on DatoCmsPdfButton {
          id: originalId
          label
          file {
            url
          }
        }
      }
    }
    updates: allDatoCmsPost(filter: { tags: { elemMatch: { title: { in: $tags } } }, id: { ne: $id } }, limit: 3) {
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
  }
`;
