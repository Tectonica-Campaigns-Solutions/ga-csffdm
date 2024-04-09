import React from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import ConferenceHero from '../components/Layout/Conference/ConferenceHero/ConferenceHero';
import ConferenceWrapper from '../components/Layout/Conference/ConferenceWrapper/ConferenceWrapper';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';

const ConferenceTheme = ({ pageContext, data: { parentConference, prevConferences, favicon } }) => {
  const mappedPrevConferences = prevConferences.nodes;
  const { title: parentTitle, slug, heroImage, themes = [] } = parentConference;

  function findTopicBySlug(allThemes, slug) {
    for (const currentTheme of allThemes) {
      const mainTopic = currentTheme.topics.find((topic) => topic.slug === slug);

      if (mainTopic) {
        return mainTopic;
      } else {
        for (const currentTopic of currentTheme.topics) {
          const subTopic = currentTopic.subTopics.find((subTopic) => subTopic.slug === slug);
          if (subTopic) {
            return subTopic;
          }
        }
      }
    }
    return null;
  }

  const selectedTopic = findTopicBySlug(themes, pageContext.slug);
  const { title, content, seo } = selectedTopic || {};

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <ConferenceHero title={parentTitle} image={heroImage} isInnerPage previousConferences={mappedPrevConferences} />

      <ConferenceWrapper themes={themes} slug={pageContext.fullSlug} parentSlug={slug}>
        {selectedTopic && (
          <div>
            <h2>{title}</h2>
            {content && <StructuredTextDefault content={content} />}
          </div>
        )}
      </ConferenceWrapper>
    </Layout>
  );
};

export default ConferenceTheme;

export const ConferenceThemeQuery = graphql`
  query ConferenceThemeById($parentId: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    parentConference: datoCmsConference(id: { eq: $parentId }) {
      id
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
          topics {
            ... on DatoCmsConferenceTopic {
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
                        linkTo
                      }
                    }
                  }
                }
              }
              subTopics {
                ... on DatoCmsConferenceTopic {
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
                            linkTo
                          }
                        }
                      }
                    }
                  }
                  model {
                    apiKey
                  }
                  seo: seoMetaTags {
                    ...GatsbyDatoCmsSeoMetaTags
                  }
                }
              }
              seo: seoMetaTags {
                ...GatsbyDatoCmsSeoMetaTags
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
