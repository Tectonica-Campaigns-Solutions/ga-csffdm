import React from 'react';

import './styles.scss';

function FormBlock({ block }) {
  const { title, backgroundColor, backgroundImage } = block;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  return (
    <div className={`form-block-wrapper ${backgroundColor ? backgroundColor : ''}`}>
      <div className="container">
        <div className={`form-block`}>
          <div className="form-container-content">
            <div className={`row`}>
              {title && <h2>{title}</h2>}
              <div className="form-container">
                <form>
                  <div className="row">
                    <div className="col">
                      <input className="form-control" type="text" placeholder="Name" />
                    </div>
                    <div className="col">
                      <input className="form-control" type="email" placeholder="Email" />
                    </div>
                    <div className="col">
                      <select className="form-select" aria-label="Default select example">
                        <option selected>Country</option>
                        <option value="1">One</option>
                        <option value="2">Two</option>
                        <option value="3">Three</option>
                      </select>
                    </div>
                    <div className="col-md-2">
                      <button className='custom-btn custom-btn-primary custom-btn-primary' type="submit">Sign Up</button>
                    </div>
                  </div>
                  <div className="row mt-4">
                    <div className="col-12">
                      <label className='mb-3' for="form-check-input">I consent receiving email from CSFFD</label>
                    </div>
                    <div className="col">
                      <div className="form-check float-start me-3">
                        <input className="form-check-input" type="radio" name="flexRadioConsent" id="flexRadioConsent2" />
                        <label className="form-check-label" for="flexRadioConsent2">
                          No
                        </label>
                      </div>
                      <div className="form-check float-start">
                        <input className="form-check-input" type="radio" name="flexRadioConsent" id="flexRadioConsent1" />
                        <label className="form-check-label" for="flexRadioConsent1">
                          Yes
                        </label>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {bgImageUrl && <img src={bgImageUrl} alt="Updates form image" className="fixed-image" />}
    </div>
  );
}

export default FormBlock;
