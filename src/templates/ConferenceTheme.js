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
    for (let i = 0; i < allThemes.length; i++) {
      const exist = allThemes[i].topics.find((topic) => topic.slug === slug);
      if (exist) {
        return exist;
      }
    }
    return null;
  }

  const selectedTopic = findTopicBySlug(themes, pageContext.slug);

  return (
    <Layout>
      {/* <SeoDatoCMS seo={seo} favicon={favicon} /> */}
      <ConferenceHero title={parentTitle} image={heroImage} isInnerPage previousConferences={mappedPrevConferences} />

      <ConferenceWrapper themes={themes} parentSlug={slug}>
        {selectedTopic && (
          <div>
            <h2>{selectedTopic.title}</h2>
            {selectedTopic.content && <StructuredTextDefault content={selectedTopic.content} />}
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
                blocks
              }
              subTopics {
                ... on DatoCmsConferenceTopic {
                  id
                  title
                  slug
                  content {
                    __typename
                    value
                    blocks
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
