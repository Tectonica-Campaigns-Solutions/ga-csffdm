import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import { isArray } from '../utils';
import Blocks from '../components/Blocks/Blocks';
import PostCard from '../components/Blocks/Updates/PostCard';
import HeroPost from '../components/Global/HeroPost/HeroPost';
import Dropdown from '../components/Global/Inputs/Dropdown/Dropdown';

import './basic.scss';

function NewsDistributor({ pageContext, data: { page, news = [], favicon } }) {
  const { seo, title, highlightedPost, blocks = [] } = page;

  const rawPosts = news.edges.map((e) => e.node);

  const [posts, setPosts] = useState(rawPosts);
  const [filteredPosts, setFilteredPosts] = useState(rawPosts);
  const [filters, setFilters] = useState(() =>
    Array.from(new Set(news.edges.flatMap((e) => e.node.tags.map((t) => t.title))))
  );

  const handleOnFilterPosts = (currentTag) => {
    const newPosts = rawPosts.filter((post) => post.tags.some((t) => t.title === currentTag));
    setFilteredPosts(newPosts);
  };

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      {highlightedPost && <HeroPost post={highlightedPost} currentPage={title} />}

      <div className="container basic-layout">
        <div className="row page-grid">
          <div className="filters">
            <h3>Find updates by topics</h3>
            <Dropdown options={filters.map((f) => ({ value: f, label: f }))} onSelect={handleOnFilterPosts} />
          </div>

          {isArray(filteredPosts) &&
            filteredPosts.map((post) => (
              <div className="col-md-4" key={post.id}>
                <PostCard post={post} />
              </div>
            ))}
        </div>
      </div>

      <div className="inner-page">
        <Blocks blocks={blocks} />
      </div>
    </Layout>
  );
}

export const NewsDistributorQuery = graphql`
  query NewsDistributor {
    favicon: datoCmsSite {
      faviconMetaTags {
        tags
      }
    }
    page: datoCmsNews {
      id
      title
      highlightedPost {
        ... on DatoCmsPost {
          id
          title
          slug
          date
          introduction
          tags {
            ...Tags
          }
          mainImage {
            alt
            gatsbyImageData
          }
          model {
            apiKey
          }
        }
      }
      blocks {
        ... on DatoCmsFormBlock {
          ...BlockForm
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    news: allDatoCmsPost {
      edges {
        node {
          id
          slug
          title
          date
          introduction
          tags {
            ...Tags
          }
          mainImage {
            alt
            gatsbyImageData
          }
          model {
            apiKey
          }
        }
      }
    }
  }
`;

export default NewsDistributor;
