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

function Resources({ pageContext, data: { page, resources = [], tags, favicon } }) {
  const { seo, title, introduction, backgroundImage, blocks = [] } = page;

  const rawPosts = resources.edges.map((e) => e.node);

  const [filteredPosts, setFilteredPosts] = useState(rawPosts);
  // const [filters, setFilters] = useState(() =>
  //   Array.from(new Set(resources.edges.flatMap((e) => e.node.tags.map((t) => t.title))))
  // );
  const [filters, setFilters] = useState(() =>
    Array.from(new Set(tags.edges.flatMap((e) => e.node.title)))
  );

  // const [filtersByType, setFiltersByType] = useState(() =>
  //   Array.from(new Set(resources.edges.map((e) => e.node.typeOfResource)))
  // );
  const [filtersByType, setFiltersByType] = useState([
      'the_ffd_chronicle',
      'member_states_tracker',
      'cs_ffd_mechanism_statements_and_inputs',
      'policy_briefs_and_papers',
      'campaign_resources_and_tools',
      'introduction_toolkit',
      'statements_and_interventions']);

  const [innerTitle, setInnerTitle] = useState('');
  // const [innerTitleArea, setInnerTitleArea] = useState('');

  // State for selected filters
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedType, setSelectedType] = useState('');

  // Filter function
  const filterItems = (tag, type) => {
    let filtered = rawPosts;

    if (tag) {
      filtered = filtered.filter((post) => post.tags.some((t) => t.title === tag));
    }

    if (type) {
      filtered = filtered.filter((post) => post.typeOfResource === type);
    }

    setFilteredPosts(filtered);
  };

  const handleOnFilterPosts = (currentTag) => {

    filterItems(currentTag, selectedType);
    if (currentTag) {
      setSelectedTag(currentTag);
    } else {
      setInnerTitle('');
    }

  };

  const handleOnFilterPostsByType = (currentType) => {
    
    filterItems(selectedTag, currentType);
    if (currentType) {
      setSelectedType(currentType);
      setInnerTitle(currentType.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()));
    } else {
      setInnerTitle('');
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
                <Dropdown title="Explore all resources" options={filtersByType.map((f) => ({ value: f, label: f.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) }))} onSelect={handleOnFilterPostsByType} />
              </div>
              <div className='col-md-6'>
                <h3>Filter by area of work</h3>
                <Dropdown title="All" options={filters.map((f) => ({ value: f, label: f }))} onSelect={handleOnFilterPosts} />
              </div>
          </div>

          { innerTitle && (
            <h2 className='inner-title'>{innerTitle}</h2>
          )}

          { filteredPosts.length === 0 && (
            <div className="col-12">
              <h4>There are no records matching the filter criteria. Please select another option and try again.</h4>
            </div>
          )}

          <ListPaginated
            list={filteredPosts}
            renderItem={(post) => (
              <div className="col-md-4" key={post.id}>
                <ResourceCard resource={post} className={post.typeOfResource} />
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

export default Resources;
