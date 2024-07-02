import React, { useEffect, useState } from 'react';
import Link from '../Link/Link';
import headerLogo from '../../Icons/Logo Component.svg';
import searchIcon from '../../Icons/icons-search.svg';

import './index.scss';

const LinkItem = ({ link, label, isButton }) => {

  const closeMegamenu = () => {
    document.getElementById('megamenu').classList.remove('open');
  };
  
  return (
    <li className="nav-item"
      onMouseEnter={() => {
          closeMegamenu();
      }}
    >
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
    if (link.hasMegaMenu === false) setDropdownOpen(false);
  };

  const openMegamenu = () => {
    document.getElementById('megamenu').classList.add('open');
  };

  const closeMegamenu = () => {
    document.getElementById('megamenu').classList.remove('open');
  };

  //console.log(link);
  return (
    <li
      className="dropdown nav-item"
      onMouseEnter={() => {
        mouseEnter();
        if (link.hasMegaMenu) {
          openMegamenu();
        } else {
          closeMegamenu();
        }
      }}
      onMouseLeave={() => {
        if (link.hasMegaMenu === false) {
          mouseLeave();
        }
      }}
    >
      <Link type="button" aria-label="Expand" aria-expanded="false" data-bs-toggle="dropdown">
        {label}
      </Link>

      <ul
        id={`${link.hasMegaMenu ? 'megamenu' : label.toLowerCase().replace(/ /g, '_')}`}
        className={`dropdown-menu ${link.hasMegaMenu ? 'megamenu column-count-' + children.length : null} ${dropdownOpen ? 'open' : null}`}
        onMouseLeave={closeMegamenu}
      >
        
        {
        children
          ?.sort((a, b) => a.position - b.position)
          .map((link) => (
            //console.log(link),
            <li className="dropdown-item" key={link.id}>
              
              { link?.treeChildren && link?.treeChildren.length === 0 &&  (
                <Link className="dropdown-link" to={link} onClick={openMegamenu}>
                  <div className="dropdown-title">{link?.title}</div>
                  {link.introText && <div className='introtext' dangerouslySetInnerHTML={{ __html: link?.introText }} ></div>}
                </Link>
              )}

              { link?.treeChildren && link?.treeChildren.length > 0 && (
              <div className="dropdown-link" to={link}>
                <div className="dropdown-title"><Link to={`/conference/${link?.content?.slug}`}>{link?.title}</Link></div>
                    <ul className="megamenu-col">
                      {link.treeChildren.sort((a, b) => a.position - b.position).map((subLink) => (
                        
                        <li key={subLink.id}>
                          { subLink.conferenceTheme !== null && (
                          <Link to={`/conference/${link?.content?.slug}/${subLink?.conferenceTheme?.slug}/${subLink?.content?.slug}`}>{subLink?.title}</Link>
                          )}
                          { subLink.conferenceTheme == null && (
                          <Link to={`/conference/${subLink.content?.slug}`}>{subLink?.title}</Link>
                          )}
                        </li>
                      ))}
                    </ul>
              </div>
              )}
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
    let banner = document.getElementsByClassName('banner');
    if (expanded) {
      // const bannerVisible = banner[0] !== undefined ? banner[0].style.display = 'block' : '';
    } else {
      const bannerVisible = banner[0] !== undefined ? banner[0].style.display = 'none': '';
    } 
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
