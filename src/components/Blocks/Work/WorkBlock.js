import React, { useRef } from 'react';
import { graphql, useStaticQuery } from 'gatsby';
import Section from '../../Layout/Section/Section';
import WorkCard from './WorkCard';
import Carousel from '../../Global/Carousel/Carousel';
import CarouselActions from '../../Global/Carousel/CarouselActions';

import './styles.scss';

const WorkBlock = ({ block }) => {
  const sliderRef = useRef();
  const { headline, introduction, backgroundImage = null } = block;
  const bgImageUrl = backgroundImage?.gatsbyImageData?.images?.fallback?.src;

  const workPosts = useStaticQuery(graphql`
    query allPosts {
      allDatoCmsWork {
        nodes {
          title
          slug
          introduction
          description
          id
          model {
            apiKey
          }
          icon {
            alt
            width
            height
            url
          }
          model {
            apiKey
          }
        }
      }
    }
  `);
  const itemsSorted = [...workPosts.allDatoCmsWork.nodes];

  const renderCarouselActions = () => (
    <CarouselActions
      onPrevSlide={() => sliderRef.current?.slickPrev()}
      onNextSlide={() => {
        sliderRef.current?.slickNext();
      }}
    />
  );

  return (
    <Section
      headline={headline}
      introduction={introduction}
      bgImage={bgImageUrl}
      extraClassNames="work-section"
      headerChildren={renderCarouselActions()}
    >
      <div className="row">
        <Carousel
          customRef={sliderRef}
          items={itemsSorted}
          renderItem={(item) => (
            <div className="col-md-4" key={item.id}>
              <WorkCard work={item} />
            </div>
          )}
        />
      </div>
    </Section>
  );
};

export default WorkBlock;
