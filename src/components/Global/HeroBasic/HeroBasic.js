import React from 'react';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import ImageWrapper from '../Image/ImageWrapper';
import imgGlobe from '../../Icons/globe.png';
import './index.scss';


function HeroBasic({ title, introduction = null,  image = null, currentPage, type = null }) {

  return (
    <div className={`hero-basic`}>
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
      {image == null && <img className="fixed-img" src={imgGlobe} />}
    </div>
  );
}

export default HeroBasic;
