import React, { useState } from 'react';
import { graphql } from 'gatsby';
import { useLocation } from "@reach/router"
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

  const location = useLocation()
  const params = new URLSearchParams(location.search)

  const rawPosts = resources.edges.map((e) => e.node);
  rawPosts.sort((a, b) => new Date(b.date) - new Date(a.date));
  
  const [filteredPosts, setFilteredPosts] = useState(() => {
      if (params.get('type')) {
        return resources.edges.filter((e) => e.node.typeOfResource === params.get('type')).map((e) => e.node).sort((a, b) => new Date(b.date) - new Date(a.date));
      } else {
        return rawPosts;
      }
  });

  const [filters, setFilters] = useState(() =>
    Array.from(new Set(tags.edges.flatMap((e) => e.node.title)))
  );

  const [filtersByType, setFiltersByType] = useState([
      {
        value: 'the_ffd_chronicle',
        label: 'The FFD Chronicle'
      },
      {
        value: 'member_states_tracker',
        label: 'Member States Tracker'
      },
      // {
      //   value: 'cs_ffd_mechanism_statements_and_inputs',
      //   label: 'CS FFD Mechanism Statements and Inputs'
      // },
      {
        value: 'policy_briefs_and_papers',
        label: 'Policy Briefs and Papers'
      },
      {
        value: 'campaign_resources_and_tools',
        label: 'Campaign Resources and Tools'
      },
      {
        value: 'introduction_toolkit',
        label: 'Introduction Toolkit'
      },
      {
        value: 'statements_and_interventions',
        label: 'CS FFD Mechanism Statements and Inputs'
      }
  ]);

  const [innerTitle, setInnerTitle] = useState('');
  // const [innerTitleArea, setInnerTitleArea] = useState('');

  // State for selected filters
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedType, setSelectedType] = useState(params.get('type') ? filtersByType.find((f) => f.value === params.get('type')).value : 'Explore all resources');
  const selectedTypeLabel = params.get('type') ? filtersByType.find((f) => f.value === params.get('type')).label : 'Explore all resources';

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

    if (currentTag) {
      setSelectedTag(currentTag);
    } else {
      setInnerTitle('');
      setSelectedTag('');
    }

    filterItems(currentTag, selectedType);

  };

  const handleOnFilterPostsByType = (currentType) => {
    
    if (currentType) {
      setSelectedType(currentType);
      setInnerTitle(
        filtersByType.find((f) => f.value === currentType).label
      );
    } else {
      setInnerTitle('');
      setSelectedType('');
    }

    filterItems(selectedTag, currentType);

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
                <Dropdown title={selectedTypeLabel} options={filtersByType.map((f) => ({ value: f.value, label: f.label }))} onSelect={handleOnFilterPostsByType} />
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
          externalUrl
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
