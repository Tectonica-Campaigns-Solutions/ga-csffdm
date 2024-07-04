import React, { useState } from 'react';
import ImageWrapper from '../Image/ImageWrapper';
import closeIcon from '../../Icons/ico-close-line.svg';

import './index.scss';

function VideoPlayer({ video }) {
  const [isFullScreen, setIsFullScreen] = useState(false);

  const handleOnPlayVideo = () => setIsFullScreen(true);
  const handleOnCloseVideo = () => setIsFullScreen(false);

  const getYoutubeVideoSrc = () => {
    // const url = video?.url ?? video.source.url;
    // const videoId = url?.match(/[?&]v=([^&]+)/)[1];
    const url = video?.source ? video.source.url : video?.url;
    const videoId = url?.match(/[?&]v=([^&]+)/)[1];    
    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  const getVideoThumbnail = () => {
    return video.source ? { url: video.source.thumbnailUrl } : { url: video?.thumbnailUrl };
  };

  return (
    <div className="video-player">
      {isFullScreen ? (
        <div className="fullscreen">
          <span onClick={handleOnCloseVideo}>Close <img src={closeIcon} /></span>
          <iframe src={getYoutubeVideoSrc()} />
        </div>
      ) : (
        <div className="thumbnail" onClick={handleOnPlayVideo}>
          <ImageWrapper image={getVideoThumbnail()} />
        </div>
      )}
    </div>
  );
}

export default VideoPlayer;
