import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import ConferenceHero from '../components/Layout/Conference/ConferenceHero/ConferenceHero';
import ConferenceWrapper from '../components/Layout/Conference/ConferenceWrapper/ConferenceWrapper';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';

const Conference = ({ pageContext, data: { conference, prevConferences, favicon } }) => {
  const mappedPrevConferences = prevConferences.nodes;
  const { title, description, heroImage, themes = [], seo } = conference;

  const mainTheme = Array.isArray(themes[0].topics) ? themes[0].topics[0] : null;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <ConferenceHero
        title={title}
        description={description}
        image={heroImage}
        previousConferences={mappedPrevConferences}
      />

      <ConferenceWrapper themes={themes}>
        {mainTheme && (
          <>
            <h2>{mainTheme.title}</h2>
            <StructuredTextDefault content={mainTheme.content} />
          </>
        )}
      </ConferenceWrapper>
    </Layout>
  );
};

export default Conference;

export const ConferenceQuery = graphql`
  query ConferenceById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    prevConferences: allDatoCmsConference(filter: { id: { ne: $id } }) {
      nodes {
        id
        title
        slug
      }
    }
    conference: datoCmsConference(id: { eq: $id }) {
      id
      title
      description
      heroImage {
        alt
        url
      }
      themes {
        ... on DatoCmsConferenceTheme {
          title
          topics {
            ... on DatoCmsConferenceTopic {
              id
              title
              content {
                __typename
                value
                blocks
              }
              subTopics {
                ... on DatoCmsConferenceTopic {
                  id
                  title
                  content {
                    __typename
                    value
                    blocks
                  }
                }
              }
            }
          }
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
