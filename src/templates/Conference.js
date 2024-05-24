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

  const filteredPrevConferences = mappedPrevConferences.filter(event => event.eventType === conference.eventType);

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <ConferenceHero
        title={title}
        description={description}
        image={heroImage}
        previousConferences={filteredPrevConferences}
        eventType={conference.eventType}
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
        eventType
      }
    }
    conference: datoCmsConference(id: { eq: $id }) {
      id
      title
      slug
      description
      eventType
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
                  ... on DatoCmsImage {
                    __typename
                    id: originalId
                    image {
                      alt
                      gatsbyImageData
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
                          link {
                            #... on DatoCmsGlobalLink {
                            #  label
                            #  externalUrl
                            #  content {
                                ... on DatoCmsHome {
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsResource {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsEvent {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsWork {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsEvent {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsPost {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsAreasOfWork {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsBasicPage {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsNews {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsGovernance {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsForm {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsConference {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ... on DatoCmsConferenceTheme {
                                  slug
                                  model {
                                    apiKey
                                  }
                                }
                                ##... on DatoCmsConferenceSubtopic {
                                ##slug
                                ##model {
                                ##apiKey
                                ##}
                                ##}
                              }
                              model {
                                apiKey
                              }
                            #}
                          #}
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
