import React from 'react';
import { useState } from 'react';
import './styles.scss';
import CountryDropdown from './CountryDropdown';

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

    // Send data to server
    try {
      const zapierHook =
      formType === 'subscribe'
          ? 'https://hooks.zapier.com/hooks/catch/6569013/3n6mcm9/'
          : 'https://hooks.zapier.com/hooks/catch/6569013/3nty9te/';
      const sendToZapier = await fetch(zapierHook, {
        method: 'POST',
        body: JSON.stringify(data),
      });

      const responseZapier = await sendToZapier.json();
      if (responseZapier.status === 'success') {
        setIsLoading(false);
        removeAlerts();
        appendAlert('Your data has been sent. Thank you!', 'success');
      }
    } catch (error) {
      setIsLoading(false);
      removeAlerts();
      appendAlert('Your data could not be sent. Please, try again.', 'danger');
    }
  };

  const onSubmit = (event) => {
    event.preventDefault();
    handleSubmit(event);
  };

  return (
    <div className="form-container">
      <div id="liveAlertPlaceholder"></div>
      
        <form onSubmit={onSubmit}>
          <div className="row">
            <div className="col-md-3">
              <input name="name" className="form-control" type="text" placeholder="Name" onChange={onChange} />
            </div>
            <div className="col-md-3">
              <input name="email" className="form-control" type="email" placeholder="Email" onChange={onChange} />
            </div>
            <div className="col-md-3">
              <CountryDropdown selectedCountry={country} handleCountryChange={onChange} />
            </div>
            <div className="col-md-2">
              <button className="custom-btn custom-btn-primary custom-btn-primary" type="submit">
                Sign Up
              </button>
            </div>
          </div>
          <div className="row mt-4">
            <div className="col-12">
              <p>
                I consent receiving email from CSFFD
              </p>
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
        </form>

      {isLoading && <p>Submitting data...</p>}
    </div>
  );
}

export default Form;
