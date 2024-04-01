import React, { useState } from 'react';
import { Chrono } from 'react-chrono';
import arrowPrev from '../../Icons/Arrow previous.svg';
import arrowNext from '../../Icons/Arrow next.svg';

import './index.scss';

function Timeline({ block }) {
  const [currentItemIndex, setCurrentItemIndex] = useState(0);

  const items = block.items?.map((item) => ({
    title: item.navigationTitle,
    cardTitle: item.title,
    cardDetailedText: item.text,
    media: { type: 'IMAGE', source: { url: item?.image?.gatsbyImageData?.images?.fallback?.src || '' } },
  }));

  const handleNextClick = () => {
    if (currentItemIndex < items.length - 1) {
      setCurrentItemIndex(currentItemIndex + 1);
    }
  };

  const handlePrevClick = () => {
    if (currentItemIndex > 0) {
      setCurrentItemIndex(currentItemIndex - 1);
    }
  };

  return (
    <div className="custom-timeline">
      <div className="container">
        <div style={{ width: '100%', height: '800px' }}>
          <div className="row">
            <div className="col-1 prev">
              <div onClick={handlePrevClick} className="handler-icon" style={{ cursor: 'pointer' }}>
                <img src={arrowPrev} alt="arrow prev icon" />
              </div>
            </div>

            <div className="col-10 content">
              <Chrono
                items={items}
                activeItemIndex={currentItemIndex}
                mode="HORIZONTAL"
                showAllCardsHorizontal
                cardWidth={470}
                cardHeight={580}
                contentDetailsHeight={100}
                hideControls
                classNames={{
                  card: 'my-card',
                  cardMedia: 'my-card-media',
                  cardSubTitle: 'my-card-subtitle',
                  cardText: 'my-card-text',
                  cardTitle: 'my-card-title',
                  controls: 'my-controls',
                  title: 'my-title',
                }}
              />
            </div>

            <div className="col-1 next">
              <div onClick={handleNextClick} className="handler-icon" style={{ cursor: 'pointer' }}>
                <img src={arrowNext} alt="arrow next icon" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Timeline;
