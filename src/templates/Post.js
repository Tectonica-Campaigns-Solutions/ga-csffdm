import React from 'react';
import { graphql } from 'gatsby';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Layout from '../components/Layout/Layout';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';
import Breadcrumb from '../components/Global/Breadcrumb/Breadcrumb';
import ImageWrapper from '../components/Global/Image/ImageWrapper';
import { isArray } from '../utils';
import TagList from '../components/Global/Tag/TagList';

import './basic.scss';

const Post = ({ pageContext, data: { post, favicon } }) => {
  const { title, date, tags = [], introduction, mainImage, content, seo } = post;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <div className="container post-layout">
        <Breadcrumb currentPage={title} />

        <div className="post-info">
          {date && <span className="date">{date}</span>}
          {title && <h1>{title}</h1>}
          {introduction && <p className="post-intro">{introduction}</p>}
          {mainImage && <ImageWrapper image={mainImage} />}

          {content?.value && <StructuredTextDefault content={content} />}
          {isArray(tags) && <TagList tags={tags} />}
        </div>
      </div>
    </Layout>
  );
};

export default Post;

export const PostQuery = graphql`
  query PostById($id: String) {
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
    }
  }
`;
