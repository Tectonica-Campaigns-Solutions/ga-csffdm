import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import ConferenceHero from '../components/Layout/Conference/ConferenceHero/ConferenceHero';
import ConferenceWrapper from '../components/Layout/Conference/ConferenceWrapper/ConferenceWrapper';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';

const ConferenceTheme = ({ pageContext, data: { parentConference, topic, prevConferences, favicon } }) => {
  const mappedPrevConferences = prevConferences.nodes;
  const { title: parentTitle, slug, heroImage, themes = [] } = parentConference;
  const { title, content, seo } = topic || {};

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <ConferenceHero title={parentTitle} image={heroImage} isInnerPage previousConferences={mappedPrevConferences} />

      <ConferenceWrapper themes={themes} slug={pageContext.fullSlug} parentSlug={slug}>
        <div>
          <h2>{title}</h2>
          {content && <StructuredTextDefault content={content} />}
        </div>
      </ConferenceWrapper>
    </Layout>
  );
};

export default ConferenceTheme;

export const ConferenceThemeQuery = graphql`
  query ConferenceThemeById($parentId: String, $id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    topic: datoCmsConferenceSubtopic(id: { eq: $id }) {
      title
      slug
      content {
        __typename
        value
        blocks {
          __typename
          ... on DatoCmsPdfButton {
            id: originalId
            label
            file {
              url
            }
          }
          ... on DatoCmsGenericCardGrid {
            id: originalId
            items {
              ... on DatoCmsGenericCard {
                id
                title
                introduction
                cta {
                  id: originalId
                  title
                  isButton
                  style
                }
              }
            }
          }
        }
      }
    }
    parentConference: datoCmsConference(id: { eq: $parentId }) {
      title
      slug
      heroImage {
        alt
        url
      }
      themes {
        ... on DatoCmsConferenceTheme {
          title
          slug
          model {
            apiKey
          }
          subtopics {
            ... on DatoCmsConferenceSubtopic {
              id
              title
              slug
              subItems {
                ... on DatoCmsConferenceSubtopic {
                  id
                  title
                  slug
                }
              }
            }
          }
        }
      }
    }
    prevConferences: allDatoCmsConference(filter: { id: { ne: $parentId } }) {
      nodes {
        id
        title
        slug
      }
    }
  }
`;
