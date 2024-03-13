import * as React from 'react';
import { useState } from 'react';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import Nav from '../Global/Nav/Nav';
import SearchEngine from '../Global/Search/SearchEngine';

const Header = ({ setNavOpen, heroBgColor }) => {

  const [searchEngineVisible, setSearchEngineVisible] = useState(false);

  const menus = useStaticQuery(graphql`
    query {
      mainMenu: allDatoCmsMenuItem(filter: { root: { eq: true } }, sort: { position: ASC }) {
        nodes {
          ...MainNavigation
        }
      }
    }
  `);

  return (
    <header data-datocms-noindex>
      <SearchEngine searchEngineVisible={searchEngineVisible} setSearchEngineVisible={setSearchEngineVisible} />

      <Nav 
        navData={menus.mainMenu} 
        setSearchEngineVisible={setSearchEngineVisible} />
    </header>
  );
};

export default Header;
