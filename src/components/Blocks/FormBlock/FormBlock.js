import React from 'react';
import HubspotForm from '../HubspotForm/HubspotForm';

import './styles.scss';

function FormBlock({ block }) {
  const { title, backgroundColor, backgroundImage, hubspot } = block;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  return (
    <div className={`form-block-wrapper ${backgroundColor ? backgroundColor : ''}`}>
      <div className="container">
        <div className={`form-block`}>
          <div className="form-container-content">
            <div className={`row`}>
              {title && <h2>{title}</h2>}

              {/* Hubspot form */}
              {hubspot && (
                <div className="col-lg">
                  <HubspotForm
                    id={hubspot.id}
                    formId={hubspot.formId}
                    region={hubspot.region}
                    portalId={hubspot.portalId}
                    style="default"
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {bgImageUrl && <img src={bgImageUrl} alt="Updates form image" className="fixed-image" />}
    </div>
  );
}

export default FormBlock;
