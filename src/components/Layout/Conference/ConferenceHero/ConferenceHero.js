import React from 'react';
import { navigate } from 'gatsby';
import Dropdown from '../../../Global/Inputs/Dropdown/Dropdown';

import './styles.scss';

const ConferenceHero = ({ title, description, image, previousConferences = [], isInnerPage = false, eventType }) => {
  const handleOnSelectPrevConference = (value) => {
    if (!value) return;
    navigate('/conference/' + value);
  };

  const dropdownLabel = eventType == 'conference' ? 'Browse Previous Conferences' : 'Browse Past Forums';
  return (
    <>
      <div className="previous-conferences-wrapper">
        { eventType !== 'other' && (
        <Dropdown
          title={dropdownLabel}
          onSelect={handleOnSelectPrevConference}
          options={previousConferences.map((c) => ({ value: c.slug, label: c.title }))}
          showAllOption={false}
        />
        )}
      </div>

      <div className={`conference-hero ${isInnerPage ? 'inner-page' : ''}`}>
        <div className="container">
          <div className="main-section">
            <h1>{title}</h1>
            {!isInnerPage && (
              <div className="description-conference" dangerouslySetInnerHTML={{ __html: description }} />
            )}
          </div>
        </div>

        {image && <img className="fixed-img" src={image.url} alt="Conference hero" />}
      </div>
    </>
  );
};

export default ConferenceHero;
