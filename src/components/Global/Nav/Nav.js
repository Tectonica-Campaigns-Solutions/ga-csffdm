import React, { useEffect, useState } from 'react';
import Link from '../Link/Link';
import headerLogo from '../../Icons/Logo Component.svg';
import searchIcon from '../../Icons/icons-search.svg';

import './index.scss';

const LinkItem = ({ link, label, isButton }) => {
  return (
    <li className="nav-item">
      <Link to={link} className={isButton ? 'btn btn-primary' : ''}>
        {label}
      </Link>
    </li>
  );
};

const DropdownItem = ({ link, label, children }) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const mouseEnter = () => {
    setDropdownOpen(true);
  };

  const mouseLeave = () => {
    setDropdownOpen(false);
  };

  return (
    <li className="dropdown nav-item" onMouseEnter={mouseEnter} onMouseLeave={mouseLeave}>
      <Link to={link} type="button" aria-label="Expand" aria-expanded="false" data-bs-toggle="dropdown">
        {label}
      </Link>

      <ul className={`dropdown-menu ${dropdownOpen ? 'open' : null}`}>
        {children
          ?.sort((a, b) => a.position - b.position)
          .map((link) => (
            <li className="dropdown-item" key={link.id}>
              <Link className="dropdown-link" to={link}>
                {link?.title}
              </Link>
            </li>
          ))}
      </ul>
    </li>
  );
};

export default function Nav({ navData, location, hideLinks = false, setSearchEngineVisible }) {
  const navLinks = navData.nodes;

  const [expanded, setExpanded] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);

  const handleScroll = () => {
    if (typeof window !== 'undefined') {
      const position = window.pageYOffset;
      setScrollPosition(position);
    }
  };

  // Use effect for sticky nav
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  const handleNavClick = () => {
    setExpanded(!expanded);
  };

  const isHome = location ? location?.pathname === '/' : false;

  const groupedLinks = navLinks.reduce(
    (result, item) => {
      if (item.icon && item.icon.url) {
        result.withIcon.push(item);
      } else {
        result.withoutIcon.push(item);
      }
      return result;
    },
    { withIcon: [], withoutIcon: [] }
  );

  return (
    <nav
      className={`navbar navbar-expand-lg ${isHome ? 'home-nav' : ''} ${expanded ? 'expanded' : ''} ${
        scrollPosition > 75 ? 'sticky-nav' : ''
      }`}
    >
      <Link className="navbar-brand" to={'/'}>
        <img src={headerLogo} alt="CSFFDM Logo" />
      </Link>

      <button
        type="button"
        data-target="#navNav"
        aria-expanded="false"
        aria-controls="navNav"
        data-toggle="collapse"
        className="navbar-toggler"
        aria-label="Toggle navigation"
        onClick={() => handleNavClick()}
      >
        <span className={`${expanded ? 'open-toggle ' : ''} navbar-toggler-icon`} />
      </button>

      {!hideLinks && (
        <div className={`${expanded ? 'show' : ''} collapse navbar-collapse site-nav`} id="navNav">
          <ul className={`navbar-nav mr-auto`}>
            {groupedLinks?.withoutIcon?.map((link) =>
              link.treeChildren.length === 0 ? (
                <LinkItem key={link.id} link={link} label={link?.title} isButton={link?.isButton} />
              ) : (
                <DropdownItem key={link.id} link={link} label={link?.title} children={link?.treeChildren} />
              )
            )}

            {/* Final icons */}
            <div className="nav-actions">
              <Link onClick={() => setSearchEngineVisible(true)} style={{ cursor: 'pointer' }}>
                <img src={searchIcon} alt="Search icon" />
              </Link>

              {groupedLinks?.withIcon?.map((link) => (
                <Link key={link.id} to={link}>
                  <img src={link.icon.url} alt="Link icon" />
                </Link>
              ))}
            </div>
          </ul>
        </div>
      )}
    </nav>
  );
}
