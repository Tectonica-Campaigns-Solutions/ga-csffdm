import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import ImageWrapper from '../Image/ImageWrapper';

import './index.scss';

function HeroBasic({ title, introduction = null,  image = null, currentPage, type = null }) {
  return (
    <div className={`hero-detail`}>
      <div className="container">
        <Breadcrumb currentPage={currentPage} />
        
        { type === 'organization' && 
        <div className='row'>
          {image &&
          <div className='col-lg-6'>
              <ImageWrapper image={image} />
          </div>
          }
          <div className='col-lg-6'>
            <h1 className="organization-title">{title}</h1> 
            {introduction && <p>{introduction}</p>}
          </div>
        </div>
        }
        
        { type === null && <h1>{title}</h1> }

      </div>

      {image && <img className="fixed-img" src={image?.url} />}
    </div>
  );
}

export default HeroBasic;
