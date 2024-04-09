import React from 'react';
import { useState } from 'react'
import './styles.scss';
import axios from 'axios';

function Form({ form }) {

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
            consent:  consent,
        }

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
        <div className="form-container">
        {form == 'inner-join' && 
            <form onSubmit={onSubmit}>
            <div className="row">
                <div className="col">
                <input name='name' className="form-control" type="text" placeholder="Name" onChange={onChange} />
                </div>
                <div className="col">
                <input name='email' className="form-control" type="email" placeholder="Email" onChange={onChange} />
                </div>
                <div className="col">
                <select name='country' className="form-select" aria-label="Default select example" onChange={onChange}>
                    <option selected>Country</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
                </div>
                <div className="col-md-2">
                <button className="custom-btn custom-btn-primary custom-btn-primary" type="submit">
                    Sign Up
                </button>
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
                    <input className="form-check-input" type="radio" name="consent" id="flexRadioConsent2" value="no" onChange={onChange} required />
                    <label className="form-check-label" for="flexRadioConsent2">
                    No
                    </label>
                </div>
                <div className="form-check float-start">
                    <input className="form-check-input" type="radio" name="consent" id="flexRadioConsent1" value="yes" onChange={onChange} required />
                    <label className="form-check-label" for="flexRadioConsent1">
                    Yes
                    </label>
                </div>
                </div>
            </div>
            </form>
        }
        {isLoading && <p>Submitting data...</p>}
        </div>
    );
}

export default Form;
