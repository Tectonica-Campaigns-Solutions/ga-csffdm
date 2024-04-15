import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import ConferenceHero from '../components/Layout/Conference/ConferenceHero/ConferenceHero';
import ConferenceWrapper from '../components/Layout/Conference/ConferenceWrapper/ConferenceWrapper';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';

const Conference = ({ pageContext, data: { conference, prevConferences, favicon } }) => {
  const mappedPrevConferences = prevConferences.nodes;
  const { title, slug, description, heroImage, themes = [], seo } = conference;

  const mainTheme = Array.isArray(themes[0]?.subtopics) ? themes[0].subtopics[0] : null;

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <ConferenceHero
        title={title}
        description={description}
        image={heroImage}
        previousConferences={mappedPrevConferences}
      />

      <ConferenceWrapper themes={themes} themeFirstActive parentSlug={slug}>
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
      slug
      description
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
                          ...BlockCta
                        }
                      }
                    }
                  }
                }
              }
              subItems {
                ... on DatoCmsConferenceSubtopic {
                  id
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
                              ...BlockCta
                            }
                          }
                        }
                      }
                    }
                  }
                  model {
                    apiKey
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
