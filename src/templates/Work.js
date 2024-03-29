import React from 'react';
import { graphql } from 'gatsby';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Layout from '../components/Layout/Layout';
import HeroDetail from '../components/Global/HeroDetail/HeroDetail';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';

import './basic.scss';

const Work = ({ pageContext, data: { work, favicon } }) => {
  const { title, introduction, image, content, seo } = work;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <HeroDetail currentPage={title} title={title} description={introduction} image={image} />

      <div className="container page-content">{content?.value && <StructuredTextDefault content={content} />}</div>
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
    }
  }
`;
