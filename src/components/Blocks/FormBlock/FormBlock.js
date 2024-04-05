import React from 'react';
import Form from '../Form/Form';
import './styles.scss';

function FormBlock({ block }) {
  const { title, backgroundColor, backgroundImage, footerForm } = block;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  return (
    <div className={`form-block-wrapper ${backgroundColor ? backgroundColor : ''}`}>
      <div className="container">
        <div className={`form-block`}>
          <div className={`${footerForm ? "form-container-content" : ''}`} >
            <div className={`row`}>
              {title && <h2>{title}</h2>}
              <Form form="inner-join" />   
            </div>
          </div>
        </div>
      </div>

      {bgImageUrl && <img src={bgImageUrl} alt="Updates form image" className="fixed-image" />}
    </div>
  );
}

export default FormBlock;
