import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import ConferenceHero from '../components/Layout/Conference/ConferenceHero/ConferenceHero';
import ConferenceWrapper from '../components/Layout/Conference/ConferenceWrapper/ConferenceWrapper';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';

const ConferenceTheme = ({ pageContext, data: { theme, parentConference, prevConferences, favicon } }) => {
  const { title, content, seo } = theme;
  const { title: parentTitle, heroImage } = parentConference;

  const mappedPrevConferences = prevConferences.nodes;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <ConferenceHero title={parentTitle} image={heroImage} isInnerPage previousConferences={mappedPrevConferences} />

      <ConferenceWrapper>
        THEME: {title}
        <StructuredTextDefault content={content} />
      </ConferenceWrapper>
    </Layout>
  );
};

export default ConferenceTheme;

export const ConferenceThemeQuery = graphql`
  query ConferenceThemeById($id: String, $parentId: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    parentConference: datoCmsConference(id: { eq: $parentId }) {
      id
      title
      heroImage {
        alt
        url
      }
    }
    prevConferences: allDatoCmsConference(filter: { id: { ne: $parentId } }) {
      nodes {
        id
        title
        slug
      }
    }
    theme: datoCmsConferenceTheme(id: { eq: $id }) {
      id
      title
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
