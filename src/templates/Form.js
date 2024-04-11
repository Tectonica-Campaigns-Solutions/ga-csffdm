import React, { useState } from 'react';
import { graphql } from 'gatsby';
import axios from 'axios';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Layout from '../components/Layout/Layout';
import Breadcrumb from '../components/Global/Breadcrumb/Breadcrumb';
import SocialLinkList from '../components/Global/SocialLink/SocialLinkList';
import '../components/Blocks/FormBlock/styles.scss';
import '../components/Blocks/Form/styles.scss';

const Form = ({ pageContext, data: { form, favicon } }) => {
  const { title, formType, introduction, backgroundColor, backgroundImage, seo } = form;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    country: '',
    consent: '',
  });

  const { name, email, country, consent } = formState;

  const onChange = (event) => {
    setFormState({
      ...formState,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: name,
      email: email,
      country: country,
      consent: consent,
    };

    console.log(data);
    //insertDataToSheet(data);
    setIsLoading(true);
    // Send data to server

    try {
      await axios.post('/api/submit-data', data);
      alert('Los datos se enviaron correctamente.');
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      alert('Ocurrió un error al enviar los datos.');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <Layout extraClassNames={`form-page ${backgroundColor}`}>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <div className="container page-content">
        <div className="row">
          <div className="col-12">
            <Breadcrumb currentPage={title} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            {title && <h1>{title}</h1>}
            {introduction && <p>{introduction}</p>}
          </div>
          <div className="col-lg-6 offset-lg-1">
            <div className={`form-block-wrapper`}>
              <div className="form-block">
                <div className="form-container-content">
                  <div className="form-container">
                    {formType === 'subscribe' && (
                      <form>
                        <div className="row mb-md-3">
                          <div className="col-md-12">
                            <input
                              name="name"
                              className="form-control"
                              type="text"
                              placeholder="First Name*"
                              required
                              onChange={onChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-md-3">
                          <div className="col-12">
                            <input
                              name="email"
                              className="form-control"
                              type="email"
                              placeholder="Email*"
                              required
                              onChange={onChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-md-3">
                          <div className="col">
                            <select name="country" className="form-select" aria-label="" onChange={onChange}>
                              <option selected>Country</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-12">
                            <label className="mb-3" for="form-check-input">
                              I consent receiving email from CSFFD
                            </label>
                          </div>
                          <div className="col">
                            <div className="form-check float-start me-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="consent"
                                id="flexRadioConsent2"
                                value="no"
                                onChange={onChange}
                                required
                              />
                              <label className="form-check-label" for="flexRadioConsent2">
                                No
                              </label>
                            </div>
                            <div className="form-check float-start">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="consent"
                                id="flexRadioConsent1"
                                value="yes"
                                onChange={onChange}
                                required
                              />
                              <label className="form-check-label" for="flexRadioConsent1">
                                Yes
                              </label>
                            </div>
                          </div>
                        </div>
                        <button className="custom-btn custom-btn-primary custom-btn-primary w-100 mt-4" type="submit">
                          Subscribe
                        </button>
                      </form>
                    )}
                    {formType === 'join' && (
                      <form onSubmit={onSubmit}>
                        <div className="row mb-md-3">
                          <div className="col-md-6">
                            <input
                              name="name"
                              className="form-control"
                              type="text"
                              placeholder="First Name*"
                              required
                              onChange={onChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              name="lastname"
                              className="form-control"
                              type="text"
                              placeholder="Last Name*"
                              required
                              onChange={onChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-md-3">
                          <div className="col-12">
                            <input
                              name="email"
                              className="form-control"
                              type="email"
                              placeholder="Email*"
                              required
                              onChange={onChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-md-3">
                          <div className="col-md-6">
                            <input
                              name="name"
                              className="form-control"
                              type="text"
                              placeholder="Organization*"
                              onChange={onChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              name="name"
                              className="form-control"
                              type="text"
                              placeholder="Role*"
                              onChange={onChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-md-3">
                          <div className="col-12">
                            <select
                              name="country"
                              className="form-select"
                              aria-label="Default select example"
                              onChange={onChange}
                            >
                              <option selected>Country</option>
                              <option value="1">One</option>
                              <option value="2">Two</option>
                              <option value="3">Three</option>
                            </select>
                          </div>
                        </div>
                        <div className="row mb-md-3">
                          <div className="col-12">
                            <textarea name="message" placeholder="Message" className="form-control"></textarea>
                          </div>
                        </div>
                        <div className="row mt-4">
                          <div className="col-12">
                            <label className="mb-3" for="form-check-input">
                              I consent receiving email from CSFFD
                            </label>
                          </div>
                          <div className="col">
                            <div className="form-check float-start me-3">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="consent"
                                id="flexRadioConsent2"
                                value="no"
                                onChange={onChange}
                                required
                              />
                              <label className="form-check-label" for="flexRadioConsent2">
                                No
                              </label>
                            </div>
                            <div className="form-check float-start">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="consent"
                                id="flexRadioConsent1"
                                value="yes"
                                onChange={onChange}
                                required
                              />
                              <label className="form-check-label" for="flexRadioConsent1">
                                Yes
                              </label>
                            </div>
                          </div>
                        </div>
                        <div className="col-12">
                          <button className="custom-btn custom-btn-primary custom-btn-primary w-100 mt-4" type="submit">
                            Join
                          </button>
                        </div>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {formType === 'subscribe' && (
          <div className="mt-md-5">
            <div className="row">
              <div className="col-md-5">
                <h2 className="h1">Follow us on Social Network</h2>
              </div>
              <div className="col-md-6 offset-md-1 align-self-center">
                <SocialLinkList socialLinks={
                    [
                        { socialNetwork: 'facebook', url: 'https://www.facebook.com/CSforFFDMechanism' },
                        { socialNetwork: 'twitter', url: '#' },
                        { socialNetwork: 'youtube', url: 'https://www.youtube.com/watch?v=sH7iD-jA-wo&feature=youtu.be' },
                        { socialNetwork: 'instagram', url: 'https://www.instagram.com/csffdmechanism/' },
                        { socialNetwork: 'linkedin', url: '#' },
                    ]
                } />
              </div>
            </div>
          </div>
        )}
      </div>
      {bgImageUrl && <img src={bgImageUrl} alt="Join the Mechanism form image" className="fixed-image" />}
    </Layout>
  );
};

export default Form;

export const FormQuery = graphql`
  query FormById($id: String) {
    favicon: datoCmsSite {
      faviconMetaTags {
        ...GatsbyDatoCmsFaviconMetaTags
      }
    }
    form: datoCmsForm(id: { eq: $id }) {
      id
      title
      formType
      introduction
      backgroundColor
      backgroundImage {
        alt
        gatsbyImageData
      }
      seo: seoMetaTags {
        ...GatsbyDatoCmsSeoMetaTags
      }
    }
  }
`;
