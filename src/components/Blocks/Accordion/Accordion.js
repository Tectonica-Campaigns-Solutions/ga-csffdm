import React, { useState } from 'react';
import accordionOpen from '../../Icons/accordion_open.svg';
import accordionClose from '../../Icons/accordion_close.svg';
import Blocks from '../Blocks';

import './index.scss';

function Accordion({ items, renderCustomTitle = null, defaultActive = 0 }) {
  const [activeItem, setActiveItem] = useState(defaultActive);

  const handleOnChangeAccordion = (newIndex) => {
    setActiveItem(newIndex)
    // if the current item has the class 'active', remove it
    if (activeItem === newIndex) {
      setActiveItem(null);
    }
  };

  if (items.length === 0) return null;

  return (
    <div className="accordion">
      {items.map((item, index) => (
        <div
          key={index}
          className={`item ${activeItem === index ? 'active' : ''}`}
          onClick={() => handleOnChangeAccordion(index)}
        >
          <div className="ac-title">
            <h3>{renderCustomTitle ? renderCustomTitle(item) : item?.title}</h3>
            <img src={activeItem === index ? accordionClose : accordionOpen} alt="Accordion close/open icon" />
          </div>

          <div id="ac-content" className="ac-content">
            <div className='mb-4' dangerouslySetInnerHTML={{ __html: item.text }} />
            { item.blocks && (
            <Blocks blocks={item.blocks} />) 
            }
          </div>

        </div>
      ))}
    </div>
  );
}

export default Accordion;
