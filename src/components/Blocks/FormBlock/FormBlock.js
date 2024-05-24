import React from 'react';
import Form from '../Form/Form';
import './styles.scss';

function FormBlock({ block }) {
  const { title, backgroundColor, backgroundImage, footerForm, formType } = block;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  return (
    <div className={`form-block-wrapper ${backgroundColor ? backgroundColor : ''}`}>
      <div className="container">
        <div className={`form-block`}>
          <div className={`${footerForm ? "form-container-content" : ''}`} >
            <div className={`row`}>
              {title && <div class="col-12"><h2>{title}</h2></div>}
              <Form formType={formType} />   
            </div>
          </div>
        </div>
      </div>

      {bgImageUrl && <img src={bgImageUrl} alt={formType} className="fixed-image" />}
    </div>
  );
}

export default FormBlock;
