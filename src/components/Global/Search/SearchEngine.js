import React, { useState } from 'react';
import { buildClient } from '@datocms/cma-client-browser';
import { useSiteSearch } from 'react-datocms';
import Link from '../Link';
import Spinner from '../Spinner/Spinner';
import { useEffect } from 'react';

import './index.scss';

const client = buildClient({ apiToken: 'a835f214689eaa72fa0f49fd3c5c1f' });

export default function SearchEngine({ searchEngineVisible, setSearchEngineVisible }) {
  const [query, setQuery] = useState('');

  const { state, error, data } = useSiteSearch({
    client,
    buildTriggerId: '26249',
    resultsPerPage: 10,
  });

  useEffect(() => {
    if (!searchEngineVisible) {
      setQuery('');
      state.setQuery('');
    }
  }, [searchEngineVisible]);

  useEffect(() => {
    state.setQuery(query);
  }, [query]);

  return (
    <div className={`search-engine ${searchEngineVisible ? 'search-engine--visible' : null}`}>
      {/* Close icon */}
      <div className="search-engine__close-icon" onClick={() => setSearchEngineVisible((prev) => !prev)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g clipPath="url(#clip0_2912_30965)">
            <path
              d="M3.77817 4.22183L11.5563 12M19.3345 19.7782L11.5563 12M11.5563 12L3.77817 19.7782M11.5563 12L19.3345 4.22183"
              stroke="white"
              strokeWidth={4}
              strokeLinecap="round"
            ></path>
          </g>
          <defs>
            <clipPath id="clip0_2912_30965">
              <rect width="24" height="24" fill="white"></rect>
            </clipPath>
          </defs>
        </svg>
      </div>

      <div className="content">
        <label htmlFor="search-input" placeholder="ie: projects">
          Search this website
        </label>

        <form
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input id="search-input" type="search" value={query} onChange={(e) => setQuery(e.target.value)} />
        </form>

        <div className="spinner">{!data && !error && <Spinner />}</div>

        {error && <p>Error! {error}</p>}

        {data && data.pageResults.length > 0 && (
          <div className="search-engine__results search-engine__results--active">
            <ul className="search-engine__results-list">
              {data.pageResults.map((result, index) => (
                <SearchItem key={index} item={result} />
              ))}
            </ul>
          </div>
        )}

        {data && data.pageResults.length == 0 && query.length > 0 && (
          <p className="search-engine__message">Sorry, no results found. Try a different search</p>
        )}
      </div>
    </div>
  );
}

const SearchItem = ({ item }) => {
  return (
    <li className="search-engine__results-item">
      <Link to={item.url}>
        <h6>{item.title || 'Test title'}</h6>
        <p>{item.bodyExcerpt || item.raw.attributes.body_excerpt}</p>
      </Link>
    </li>
  );
};
