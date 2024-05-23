import React from 'react';
import ImageWrapper from '../Image/ImageWrapper';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

import './styles.scss';
import Cta from '../Cta/Cta';

const HeroDetail = ({ currentPage, title, description, link = null, image, type = null, ctas, breadcrumb = null }) => {

  return (
    <div className="hero-detail">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <Breadcrumb currentPage={currentPage} breadcrumb={breadcrumb}/>
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
                {description && <div dangerouslySetInnerHTML={{ __html: description }} />}
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
            <div className={(image || ctas) ? `col-lg-6 `: `col-lg-10`}>
              <h1>{title}</h1>
              {description && <p dangerouslySetInnerHTML={{ __html: description }} />}
            </div>
            <div className="col-lg-6">
              {image && <ImageWrapper image={image} /> }
              {ctas && 
              <div className='text-end header-ctas'>
                <div dangerouslySetInnerHTML={{ __html: ctas }} />
              </div>}
            </div>
          </>
          }

        </div>
      </div>
    </div>
  );
};

export default HeroDetail;
