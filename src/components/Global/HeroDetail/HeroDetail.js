import React from 'react';
import ImageWrapper from '../Image/ImageWrapper';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

import './styles.scss';
import Cta from '../Cta/Cta';

const HeroDetail = ({ currentPage, title, description, link = null, image, type = null }) => {


  return (
    <div className="hero-detail">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Breadcrumb currentPage={currentPage} />
          </div>

          {type === 'organization' && (
            <>
              {image && (
                <div className="col-lg-6">
                  <ImageWrapper image={image} />
                </div>
              )}
              <div className="col-lg-6">
                <h1 className="organization-title">{title}</h1>
                {description && <p>{description}</p>}
                {link && 
                <div className='mt-3'>
                  <Cta cta={{ style: 'secondary' }} url={link} customVariant="default" externalTitle="Go to main site" />
                </div>
                }
              </div>
            </>
          )}

          { type === null && 
          <>
            <div className="col-lg-6">
              <h1>{title}</h1>
              <p>{description}</p>
            </div>
            <div className="col-lg-6">
              <ImageWrapper image={image} />
            </div>
          </>
          }

        </div>
      </div>
    </div>
  );
};

export default HeroDetail;
