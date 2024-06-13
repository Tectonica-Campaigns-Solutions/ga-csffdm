import React from 'react';
import { useState } from 'react';
import './styles.scss';
import CountryDropdown from './CountryDropdown';
import addToMailchimp from 'gatsby-plugin-mailchimp';

function Form({ formType }) {
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

    try {
      const result = await addToMailchimp(email);
      removeAlerts();
      console.log(result);
      appendAlert(result.msg, 'success');
    } catch (error) {
       setIsLoading(false);
       removeAlerts();
       appendAlert('Your data could not be sent. Please, try again.', 'danger');
       console.log(error);
    }

    // Send data to server
    // try {
    //   const zapierHook =
    //   formType === 'subscribe'
    //       ? 'https://hooks.zapier.com/hooks/catch/6569013/3n6mcm9/'
    //       : 'https://hooks.zapier.com/hooks/catch/6569013/3nty9te/';
    //   const sendToZapier = await fetch(zapierHook, {
    //     method: 'POST',
    //     body: JSON.stringify(data),
    //   });

    //   const responseZapier = await sendToZapier.json();
    //   if (responseZapier.status === 'success') {
    //     setIsLoading(false);
    //     removeAlerts();
    //     appendAlert('Your data has been sent. Thank you!', 'success');
    //   }
    // } catch (error) {
    //   setIsLoading(false);
    //   removeAlerts();
    //   appendAlert('Your data could not be sent. Please, try again.', 'danger');
    // }
  };

    return (
      <div className="form-container">
        <div id="liveAlertPlaceholder"></div>
        <form onSubmit={handleSubmit}>
          <div className="row">
            <div className="col-md-3">
              <input
                type="text"
                name="name"
                className="text form-control"
                id="mce-FNAME"
                placeholder="Name"
                value={formState.name}
                onChange={onChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                name="lastname"
                className="text form-control"
                id="mce-LNAME"
                placeholder="Last name"
                value={formState.lastname}
                onChange={onChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="email"
                name="email"
                className="required email form-control"
                id="mce-EMAIL"
                placeholder="Email"
                required=""
                value={formState.email}
                onChange={onChange}
              />
            </div>
            <div className="col-md-2">
            {/*<button className="custom-btn custom-btn-primary custom-btn-primary w-100" type="submit">Subscribe</button>*/}
              <input
                type="submit"
                name="subscribe"
                id="mc-embedded-subscribe"
                className="button custom-btn custom-btn-primary custom-btn-primary w-100"
                value="Subscribe"
              />
              <p style={{ margin: '0px auto' }}>
                <a
                  href="http://eepurl.com/iQwQfQ"
                  title="Mailchimp - email marketing made easy and fun"
                >
                  <span
                    style={{
                      display: 'inline-block',
                      backgroundColor: 'transparent',
                      borderRadius: '4px',
                    }}
                  >
                    <img
                      className="refferal_badge"
                      src="https://digitalasset.intuit.com/render/content/dam/intuit/mc-fe/en_us/images/intuit-mc-rewards-text-dark.svg"
                      alt="Intuit Mailchimp"
                      style={{
                        width: '220px',
                        height: '40px',
                        display: 'flex',
                        padding: '2px 0px',
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}
                    />
                  </span>
                </a>
              </p>
            </div>
            <div id="mce-responses" className="clear foot">
              <div className="response" id="mce-error-response" style={{ display: 'none' }}></div>
              <div className="response" id="mce-success-response" style={{ display: 'none' }}></div>
            </div>
            <div aria-hidden="true" style={{ position: 'absolute', left: '-5000px' }}>
              <input type="text" name="b_1ba8e4790b637950a94f17b25_0d1ec580c7" tabindex="-1" value="" />
            </div>
          </div>
        </form>
      </div>
      
    );
  };

export default Form
