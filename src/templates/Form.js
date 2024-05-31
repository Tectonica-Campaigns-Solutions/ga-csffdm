import React, { useState } from 'react';
import { graphql } from 'gatsby';
import SeoDatoCMS from '../components/Layout/SeoDatocms';
import Layout from '../components/Layout/Layout';
import Breadcrumb from '../components/Global/Breadcrumb/Breadcrumb';
import SocialLinkList from '../components/Global/SocialLink/SocialLinkList';
import CountryDropdown from '../components/Blocks/Form/CountryDropdown';
import '../components/Blocks/FormBlock/styles.scss';
import '../components/Blocks/Form/styles.scss';
import EmbedIframe from '../components/Blocks/EmbedIframe/EmbedIframe';
//import addToMailchimp from 'gatsby-plugin-mailchimp'


const Form = ({ pageContext, data: { form, favicon } }) => {
  const { title, formType, introduction, backgroundColor, backgroundImage, seo, embedForm } = form;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  const [isLoading, setIsLoading] = useState(false);
  const [formState, setFormState] = useState({
    name: '',
    lastname: '',
    email: '',
    organization: '',
    role: '',
    country: '',
    message: '',
    consent: '',
  });

  const { name, lastname, email, organization, role, country, message, consent } = formState;

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
      lastname: lastname,
      email: email,
      organization: organization,
      role: role,
      country: country,
      message: message,
      consent: consent,
    };

    setIsLoading(true);

    const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
    const appendAlert = (message, type) => {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = [
        `<div class="alert alert-${type} alert-dismissible" role="alert">`,
        `   <div>${message}</div>`,
        //'   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
        '</div>',
      ].join('');

      alertPlaceholder.append(wrapper);
    };
    const removeAlerts = () => {
      while (alertPlaceholder.firstChild) {
        alertPlaceholder.removeChild(alertPlaceholder.lastChild);
      }
    };

    appendAlert('Submitting data...', 'primary');

    //const result = await addToMailchimp(data.email, data)

    // Send data to server
    /*
    try {
      const zapierHook =
        lastname == ''
          ? 'https://hooks.zapier.com/hooks/catch/6569013/3n6mcm9/'
          : 'https://hooks.zapier.com/hooks/catch/6569013/3nty9te/';
      const sendToZapier = await fetch(zapierHook, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const responseZapier = await sendToZapier.json();
      if (responseZapier.status == 'success') {
        setIsLoading(false);
        removeAlerts();
        appendAlert('Your data has been sent. Thank you!', 'success');
      }
    } catch (error) {
      console.error('Error al enviar los datos:', error);
      setIsLoading(false);
      removeAlerts();
      appendAlert('Your data could not be sent. Please, try again.', 'danger');
    }
    */
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  const breadcrumb = {
    title: 'About Us',
    url: '/about'
  }

  return (
    <Layout extraClassNames={`form-page ${backgroundColor}`}>
      <SeoDatoCMS seo={seo} favicon={favicon} />

      <div className="container page-content">
        <div className="row">
          <div className="col-12">
            <Breadcrumb breadcrumb={breadcrumb} currentPage={title} />
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5">
            {title && <h1>{title}</h1>}
            {introduction && <p dangerouslySetInnerHTML={{ __html: introduction }} />}
          </div>
          {formType !== 'contact' && (
          <div className="col-lg-7">
            <div id="liveAlertPlaceholder"></div>
            <div className={`form-block-wrapper`}>
              <div className="form-block">
                <div className="form-container-content">
                  <div className="form-container">
                    {formType === 'subscribe' && (
                      <form onSubmit={onSubmit}>
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
                            <CountryDropdown selectedCountry={country} handleCountryChange={onChange} />
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
                      <EmbedIframe content={embedForm} />
                      /*<form onSubmit={onSubmit}>
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
                              name="organization"
                              className="form-control"
                              type="text"
                              placeholder="Organization*"
                              onChange={onChange}
                            />
                          </div>
                          <div className="col-md-6">
                            <input
                              name="role"
                              className="form-control"
                              type="text"
                              placeholder="Role*"
                              onChange={onChange}
                            />
                          </div>
                        </div>
                        <div className="row mb-md-3">
                          <div className="col-12">
                            <CountryDropdown selectedCountry={country} handleCountryChange={onChange} />
                          </div>
                        </div>
                        <div className="row mb-md-3">
                          <div className="col-12">
                            <textarea
                              name="message"
                              placeholder="Message"
                              className="form-control"
                              onChange={onChange}
                            ></textarea>
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
                            <label className="form-check-label" for="flexRadioConsent2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="consent"
                                id="flexRadioConsent2"
                                value="no"
                                onChange={onChange}
                                required
                              />
                                No
                              </label>
                            </div>
                            <div className="form-check float-start">
                            <label className="form-check-label" for="flexRadioConsent1">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="consent"
                                id="flexRadioConsent1"
                                value="yes"
                                onChange={onChange}
                                required
                              />
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
                    */)}
                    {formType === 'contact' && (
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
                          <div className="col-12">
                            <CountryDropdown selectedCountry={country} handleCountryChange={onChange} />
                          </div>
                        </div>
                        <div className="row mb-md-3">
                          <div className="col-12">
                            <textarea
                              name="message"
                              placeholder="Message"
                              className="form-control"
                              onChange={onChange}
                            ></textarea>
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
                            <label className="form-check-label" for="flexRadioConsent2">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="consent"
                                id="flexRadioConsent2"
                                value="no"
                                onChange={onChange}
                                required
                              />
                                No
                              </label>
                            </div>
                            <div className="form-check float-start">
                            <label className="form-check-label" for="flexRadioConsent1">
                              <input
                                className="form-check-input"
                                type="radio"
                                name="consent"
                                id="flexRadioConsent1"
                                value="yes"
                                onChange={onChange}
                                required
                              />
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
          )}
        </div>
        {formType === 'subscribe' && (
          <div className="mt-md-5">
            <div className="row">
              <div className="col-md-5">
                <h2 className="h1">Follow us on Social Network</h2>
              </div>
              <div className="col-md-6 offset-md-1 align-self-center">
                <SocialLinkList
                  socialLinks={[
                    { socialNetwork: 'facebook', url: 'https://www.facebook.com/CSforFFDMechanism' },
                    { socialNetwork: 'twitter', url: '#' },
                    { socialNetwork: 'youtube', url: 'https://www.youtube.com/watch?v=sH7iD-jA-wo&feature=youtu.be' },
                    { socialNetwork: 'instagram', url: 'https://www.instagram.com/csffdmechanism/' },
                    { socialNetwork: 'linkedin', url: '#' },
                  ]}
                />
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
      embedForm {
        embedCode
      }
    }
  }
`;
