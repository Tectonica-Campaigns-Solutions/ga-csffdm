import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Blocks from '../components/Blocks/Blocks';
import PostCard from '../components/Blocks/Updates/PostCard';
import HeroPost from '../components/Global/HeroPost/HeroPost';
import Dropdown from '../components/Global/Inputs/Dropdown/Dropdown';
import ListPaginated from '../components/Global/Pagination/ListPaginated';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';

import './basic.scss';

function NewsDistributor({ pageContext, data: { page, news = [], tags, favicon } }) {
  const { seo, title, highlightedPost, blocks = [], introduction } = page;

  const rawPosts = news.edges.map((e) => e.node);
  rawPosts.sort((a, b) => new Date(b.date) - new Date(a.date));

  const [filteredPosts, setFilteredPosts] = useState(rawPosts);
  // const [filters, setFilters] = useState(() =>
  //   Array.from(new Set(news.edges.flatMap((e) => e.node.tags.map((t) => t.title))))
  // );
  const [filters, setFilters] = useState(() =>
    Array.from(new Set(tags.edges.flatMap((e) => e.node.title)))
  );

  const handleOnFilterPosts = (currentTag) => {
    if (currentTag) {
      const newPosts = rawPosts.filter((post) => post.tags.some((t) => t.title === currentTag));
      setFilteredPosts(newPosts);
    } else {
      setFilteredPosts(rawPosts);
    }
  };

  const handleOnFilterPostsByYear = (currentYear) => {
    if (currentYear) {
      const newPosts = rawPosts.filter((post) => new Date(post.date).getFullYear().toString() === currentYear);
      setFilteredPosts(newPosts);
    } else {
      setFilteredPosts(rawPosts);
    }
  };

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      {/*highlightedPost && <HeroPost post={highlightedPost} currentPage={title} />*/}
      <HeroBasic title={title} currentPage={title} />

      <div className="container basic-layout">
        {introduction && introduction.length > 0 && (
          <div className="page-introduction">
            <div className="row">
              <div className='col-12' dangerouslySetInnerHTML={{ __html: introduction }} />
            </div>
          </div>
        )}
        <div className="row page-grid">
          <div className="filters">
            
              <div className='col'>
                <h3>Find by topics</h3>
                <Dropdown options={filters.map((f) => ({ value: f, label: f }))} onSelect={handleOnFilterPosts} />
              </div>
              <div className='col'>
                <h3>Find by date</h3>
                <Dropdown
                  options={[
                    // Add code here to generate years until last with descending order starting from ten years ago
                    ...Array.from({ length: new Date().getFullYear() - 10 }, (_, i) => ({
                      value: (new Date().getFullYear() - i).toString(),
                      label: (new Date().getFullYear() - i).toString(),
                    })).slice(0, 10), // Limit the array to 10 elements
                  ]}
                  onSelect={handleOnFilterPostsByYear}
                />
              </div>

          </div>

          { filteredPosts.length === 0 && (
            <div className="col-12">
              <h4>There are no records matching the filter criteria. Please select another option and try again.</h4>
            </div>
          )}

          <ListPaginated
            list={filteredPosts}
            renderItem={(post) => (
              <div className="col-md-4" key={post.id}>
                <PostCard post={post} />
              </div>
            )}            
          />
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
      introduction
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
    news: allDatoCmsPost(filter: {typeOfPost: {eq: "news"}}) {
      edges {
        node {
          id
          slug
          title
          date
          introduction
          content {
            value
          }
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
    tags: allDatoCmsTag {
      edges {
        node {
          title
          id
        }
      }
    }
  }
`;

export default NewsDistributor;
