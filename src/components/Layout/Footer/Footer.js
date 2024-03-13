import React from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Link from '../../Global/Link/Link';
import { ReactSVG } from 'react-svg';
/*
import facebookIcon from '../../Icons/facebook.svg';
import xIcon from '../../Icons/social-media-icons-x.svg';
import youtubeIcon from '../../Icons/social-media-icons-youtube.svg';
import instagramIcon from '../../Icons/social-media-icons-instagram.svg';
import linkedinIcon from '../../Icons/social-media-icons-linkedin.svg';
*/
import './index.scss';

function Footer({ isLanding = false, customLogo = null }) {
  const data = useStaticQuery(graphql`
    query FooterData {
      datoCmsFooter {
        id
        logo {
          url
          width
          height
          alt
        }
        contactInfo
        socialLinks {
          ... on DatoCmsSocialLink {
            id
            url
            socialNetwork
          }
        }
        bottomLinks {
          ... on DatoCmsGlobalLink {
            id
            label
            externalUrl
            content {
              ... on DatoCmsBasicPage {
                id
                slug
                title
              }
            }
          }
        }
        about
      }
    }
  `);

  const { logo = null, bottomLinks = [], socialLinks = [], contactInfo, about } = data.datoCmsFooter;

  return (
    <div className={`footer-container ${isLanding ? 'landing' : ''}`}>
      <div className="container">
        {/* First row */}
        <div className="first-row">
          <div>
            <Link to={'/'}>
              <img className="logo" src={isLanding ? customLogo?.url : logo?.url} alt={logo.alt} />
            </Link>
          </div>

          {/* Social links */}
          <div className="extra-links">
              {socialLinks.map((link) => (
                <a
                className={`social-btn ${link.socialNetwork}-btn`}
                href={`${link.url}`}
                target="_blank"
                rel="noopener noreferrer"
                ></a>
              ))}
            </div>

        </div>

        {/* Second row */}
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="content" dangerouslySetInnerHTML={{ __html: contactInfo }} />
          </div>
          <div className="col-5 ms-auto">
            <div className="extra-links">
              {bottomLinks.map((link) => (
                <Link key={link.id} to={link}>
                  {link.label}
                </Link>
              ))}
            </div>
            <div className="extra-text" dangerouslySetInnerHTML={{ __html: about }} />
          </div>
        </div>

        {/* Third row */}
        <div className="row">
          <div className="col-12 text-center">
            Built by <a
                href="https://www.tectonica.co"
                target="_blank"
                rel="noopener noreferrer"
                >Tectonica</a>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Footer;
