import React from 'react';
import { graphql } from 'gatsby';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Layout from '../components/Layout/Layout';
import StructuredTextDefault from '../components/Blocks/StructuredTextDefault/StructuredTextDefault';
import Breadcrumb from '../components/Global/Breadcrumb/Breadcrumb';
import ImageWrapper from '../components/Global/Image/ImageWrapper';
import { formatDate, isArray } from '../utils';
import TagList from '../components/Global/Tag/TagList';
import ShareButtons from '../components/Global/ShareButtons/ShareButtons';
import Blocks from '../components/Blocks/Blocks';
import Section from '../components/Layout/Section/Section';
import PostCard from '../components/Blocks/Updates/PostCard';
import Cta from '../components/Global/Cta/Cta';
import './basic.scss';

const Post = ({ pageContext, data: { post, favicon, updates, updatesNonRelated } }) => {
  const { title, date, typeOfPost, tags = [], introduction, mainImage, content, seo, blocks = [] } = post;

  let breadcrumbUrl = '';
  let breadcrumbTitle = '';

  switch (typeOfPost) { 
    case 'news':
      breadcrumbTitle = 'News & Events';
      breadcrumbUrl = '/news';
      break;
    case 'ffd_chronicle':
      breadcrumbTitle = 'The FfD Chronicle';
      breadcrumbUrl = '/the-ffd-chronicle';
      break;
    case 'press_release':
      breadcrumbTitle = 'Press Releases';
      breadcrumbUrl = '/press-releases';
      break;
  }

  const breadcrumb = {
    title: breadcrumbTitle,
    url: breadcrumbUrl,
  };

  const itemsSorted = [...updates.nodes];
  const itemsNonRelatedSorted = [...updatesNonRelated.nodes];

  const updatesCta = {
    url: '/news',
    externalTitle: 'Explore all the updates',
    isButton: true,
    customVariant: 'custom-btn-secondary',
    isCta: true,
  };

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <div className="container post-layout">
        <Breadcrumb currentPage={title} breadcrumb={breadcrumb} />
        <ShareButtons />

        <div className="post-info">
          {date && <span className="date">{formatDate(date)}</span>}
          {title && <h1>{title}</h1>}
          {introduction && <p className="post-intro">{introduction}</p>}
          {mainImage && <ImageWrapper image={mainImage} />}

          {content?.value && <StructuredTextDefault content={content} />}

          {blocks && <Blocks blocks={blocks} />}

          {isArray(tags) && (
            <div className="mt-4">
              <TagList tags={tags} />
            </div>
          )}
        </div>
      </div>

      <Section headline="Related Updates" cta={updatesCta} extraClassNames="updatesSection" hClass="h4">
        <div className="row">
          {itemsSorted.length > 0 && (itemsSorted.map((item) => (
            <div className="col-md-4" key={item.id}>
              <PostCard post={item} />
            </div>
          )))}
          {itemsSorted.length === 0 && (itemsNonRelatedSorted.map((item) => (
            <div className="col-md-4" key={item.id}>
              <PostCard post={item} />
            </div>
          )))}
        </div>
      </Section>
    </Layout>
  );
};

export default Post;

export const PostQuery = graphql`
  query PostById($id: String, $tags: [String]) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    post: datoCmsPost(id: { eq: $id }) {
      id
      title
      date
      typeOfPost
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
      blocks {
        ... on DatoCmsNarrativeBlock {
          ...BlockNarrativeBlock
        }
        ... on DatoCmsAcordion {
          ...BlockAccordion
        }
        ... on DatoCmsSimpleText {
          ...BlockText
        }
        ... on DatoCmsImage {
          __typename
          id: originalId
          image {
            alt
            gatsbyImageData
          }
        }
        ... on DatoCmsVideoBlock {
          ...BlockVideo
        }
        ... on DatoCmsTable {
          ...BlockTable
        }
        ... on DatoCmsFormBlock {
          ...BlockForm
        }
        ... on DatoCmsPdfButton {
          __typename
          id: originalId
          label
          file {
            url
          }
        }
        ... on DatoCmsEmbedForm {
          __typename
          id: originalId
          embedCode
        }
        ... on DatoCmsGenericCardGrid {
          __typename
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
    updates: allDatoCmsPost(filter: { tags: { elemMatch: { title: { in: $tags } } }, id: { ne: $id } }, limit: 3, sort: {date: DESC}) {
      nodes {
        id
        title
        slug
        date
        introduction
        tags {
          title
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
    updatesNonRelated: allDatoCmsPost(filter: { id: { ne: $id } }, limit: 3, sort: {date: DESC}) {
      nodes {
        id
        title
        slug
        date
        introduction
        tags {
          title
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
`;
