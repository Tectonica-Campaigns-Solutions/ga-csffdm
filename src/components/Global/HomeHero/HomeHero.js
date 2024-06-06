import React, { useState } from 'react';
import CtaList from '../Cta/CtaList';
import closeIcon from '../../Icons/ico-close-line.svg';

import './index.scss';

function HomeHero({ title, subtitle, image, mobileImage = null, ctas = [] }) {
  const bgImageUrl = image?.gatsbyImageData?.images?.fallback?.src;

  const css = `
    @media (max-width: 767px) {
      .hero-home {
        background-image: url("${mobileImage?.gatsbyImageData?.images?.fallback?.src}");
        background-position: center;
      }
    }
  `;

  const video = {
    source: {
      url: 'https://www.youtube.com/watch?v=EMHvQ8OyAO0',
      thumbnailUrl: 'https://img.youtube.com/vi/EMHvQ8OyAO0/maxresdefault.jpg',
    },
  };

  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleOnPlayVideo = () => setIsFullScreen(true);
  const handleOnCloseVideo = () => setIsFullScreen(false);

  const getYoutubeVideoSrc = () => {
    const url = video?.url ?? video.source.url;
    const videoId = url?.match(/[?&]v=([^&]+)/)[1];
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <>
      <div className="wrapper-hero">
        <style scoped>{css}</style>

        <div className="hero-home" style={{ backgroundImage: `url(${bgImageUrl})` }}>
          <div className="container">
            <div className="content">
              {title && <h1 dangerouslySetInnerHTML={{ __html: title }} />}
              {subtitle && <div className="introduction" dangerouslySetInnerHTML={{ __html: subtitle }} />}

              {ctas && <CtaList ctas={ctas}></CtaList>}
              <a class="custom-btn custom-btn-play" onClick={handleOnPlayVideo}>
                Watch the explanatory video
              </a>
            </div>
          </div>

          <div className="overlay" />
        </div>
      </div>
      <div className="video-player my-0">
        {isFullScreen ? (
          <div className="fullscreen">
            <span onClick={handleOnCloseVideo}>
              Close <img src={closeIcon} />
            </span>
            <iframe src={getYoutubeVideoSrc()} />
          </div>
        ) : (
          ''
        )}
      </div>
    </>
  );
}

export default HomeHero;
