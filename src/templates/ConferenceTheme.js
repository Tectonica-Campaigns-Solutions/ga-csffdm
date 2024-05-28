import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import ConferenceHero from '../components/Layout/Conference/ConferenceHero/ConferenceHero';
import ConferenceWrapper from '../components/Layout/Conference/ConferenceWrapper/ConferenceWrapper';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';
import Blocks from '../components/Blocks/Blocks';

const ConferenceTheme = ({ pageContext, data: { parentConference, topic, prevConferences, favicon } }) => {
  const mappedPrevConferences = prevConferences.nodes;
  const { title: parentTitle, slug, heroImage, themes = [] } = parentConference;
  const { title, content, seo, blocks = [] } = topic || {};

  const filteredPrevConferences = mappedPrevConferences.filter(event => event.eventType === parentConference.eventType);

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <ConferenceHero 
        title={parentTitle} 
        image={heroImage} 
        isInnerPage 
        previousConferences={filteredPrevConferences} 
        eventType={parentConference.eventType}
      />

      <ConferenceWrapper themes={themes} slug={pageContext.fullSlug} parentSlug={slug}>
        <div>
          <h2 className='section-title'>{title}</h2>
          {content?.value && <StructuredTextDefault content={content} />}
          {blocks && (
            <div className="blocks-wrapper">
              <Blocks blocks={blocks} fixedCard={false} homePage={false} />
            </div>
          )}
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
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
      title
      slug
      content {
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
              title
              introduction
              id
              cta {
                id: originalId
                title
                isButton
                style
                link {
                      ... on DatoCmsNews {
                        slug
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
                      ... on DatoCmsConference {
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
                      ... on DatoCmsBasicPage {
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
                }
              }
            }
          }
          ... on DatoCmsAcordion {
            __typename
            id: originalId
            items {
              title
              text
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
        }
      }
      blocks {
        ... on DatoCmsUpdatesBlock {
          ...BlockUpdates
        }
        ... on DatoCmsCalendarBlock {
          __typename
          id: originalId
          headline
          introduction
          cta {
            ...BlockCta
          }
          items {
            ... on DatoCmsEvent {
              id
              title
              slug
              introduction
              date
              tags {
                ...Tags
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
        ... on DatoCmsResourcesBlock {
          __typename
          id: originalId
          headline
          introduction
          fixedCardIntro
          fixedCardTitle
          cta {
            ... on DatoCmsCta {
              id: originalId
              title
              isButton
              style
              link {
                ... on DatoCmsGlobalLink {
                  id
                  content {
                    ... on DatoCmsResourcesModel {
                      id
                      slug
                      model {
                        apiKey
                      }
                    }
                  }
                }
              }
            }
          }
          items {
            ... on DatoCmsResource {
              id
              title
              slug
              introduction
              tags {
                ...Tags
              }
              model {
                apiKey
              }
            }
          }
        }
      }
    }
    parentConference: datoCmsConference(id: { eq: $parentId }) {
      title
      slug
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
        eventType
      }
    }
  }
`;
