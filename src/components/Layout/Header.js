import * as React from 'react';
import { useState } from 'react';
import { useStaticQuery } from 'gatsby';
import { graphql } from 'gatsby';
import Nav from '../Global/Nav/Nav';
import SearchEngine from '../Global/Search/SearchEngine';
import Banner from '../Global/Banner/Banner';

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
    <>
    <Banner message="Welcome to our new website! We're still in the process of making updates and improvements, so please stay with us." />
    <header data-datocms-noindex>

      <SearchEngine searchEngineVisible={searchEngineVisible} setSearchEngineVisible={setSearchEngineVisible} />

      <Nav 
        navData={menus.mainMenu} 
        setSearchEngineVisible={setSearchEngineVisible} />
    </header>
    </>
  );
};

export default Header;
