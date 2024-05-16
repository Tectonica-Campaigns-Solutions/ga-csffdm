import React, { useState } from 'react';
import { graphql } from 'gatsby';
import Layout from '../components/Layout/Layout';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import HeroBasic from '../components/Global/HeroBasic/HeroBasic';
import ResourceCard from '../components/Blocks/Resources/ResourceCard';
import Blocks from '../components/Blocks/Blocks';
import Dropdown from '../components/Global/Inputs/Dropdown/Dropdown';
import ListPaginated from '../components/Global/Pagination/ListPaginated';


import './basic.scss';

function Resources({ pageContext, data: { page, resources = [], favicon } }) {
  const { seo, title, introduction, backgroundImage, blocks = [] } = page;

  const rawPosts = resources.edges.map((e) => e.node);

  const [filteredPosts, setFilteredPosts] = useState(rawPosts);
  const [filters, setFilters] = useState(() =>
    Array.from(new Set(resources.edges.flatMap((e) => e.node.tags.map((t) => t.title))))
  );

  const [filtersByType, setFiltersByType] = useState(() =>
    Array.from(new Set(resources.edges.map((e) => e.node.typeOfResource)))
  /*
    Array.from(new Set(resources.edges.map((e) => ({
      value: e.node.typeOfResource,
      label: e.node.typeOfResource.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    })*/
  );

  console.log(filtersByType);

  
  /*const filtersByType = resources.edges.flatMap((e) => ({
    value: e.node.typeOfResource,
    label: e.node.typeOfResource.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
  }));*/

  const handleOnFilterPosts = (currentTag) => {
    if (currentTag) {
      const newPosts = rawPosts.filter((post) => post.tags.some((t) => t.title === currentTag));
      setFilteredPosts(newPosts);
    } else {
      setFilteredPosts(rawPosts);
    }
  };

  const handleOnFilterPostsByType = (currentType) => {
    if (currentType) {
      const newPosts = rawPosts.filter((post) => post.typeOfResource === currentType);
      setFilteredPosts(newPosts);
    } else {
      setFilteredPosts(rawPosts);
    }
  };

  return (
    <Layout>
      <SeoDatoCMS seo={seo} favicon={favicon} />
      <HeroBasic title={title} image={backgroundImage} currentPage={title} />

      <div className="container basic-layout">
        {introduction && (
          <div className="page-introduction">
            <p>{introduction}</p>
          </div>
        )}

        <div className="row page-grid">
          <div className="filters">
              
              <div className='col-md-6'>
                <h3>Filter by type of resource</h3>
                <Dropdown options={filtersByType.map((f) => ({ value: f, label: f.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }))} onSelect={handleOnFilterPostsByType} />
              </div>
              <div className='col-md-6'>
                <h3>Filter by area of work</h3>
                <Dropdown options={filters.map((f) => ({ value: f, label: f }))} onSelect={handleOnFilterPosts} />
              </div>

          </div>

          {/*isArray(resources?.nodes) &&
            resources.nodes.map((resource) => (
              <div className="col-md-4" key={resource.id}>
                <ResourceCard resource={resource} />
              </div>
            ))*/}

          <ListPaginated
            list={filteredPosts}
            renderItem={(post) => (
              <div className="col-md-4" key={post.id}>
                <ResourceCard resource={post} />
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

export const ResourcesQuery = graphql`
  query datoCmsResourcesModel {
    favicon: datoCmsSite {
      faviconMetaTags {
        tags
      }
    }
    page: datoCmsResourcesModel {
      id
      title
      introduction
      backgroundImage {
        url
      }
      blocks {
        ... on DatoCmsFormBlock {
          ...BlockForm
        }
        ... on DatoCmsSimpleText {
          ...BlockText
        }
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
    resources: allDatoCmsResource {
      edges {
        node {
          id
          title
          introduction
          date
          slug
          typeOfResource
          tags {
            title
          }
          model {
            apiKey
          }
        }
      }
    }
  }
`;

export default Resources;
