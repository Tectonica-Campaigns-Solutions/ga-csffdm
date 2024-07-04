import React from 'react';
import VideoPlayer from '../../Global/VideoPlayer/VideoPlayer';

function Video({ content, withContainer = false }) {
  return (
    <>
      { content?.video && (
        <div className={`${withContainer ? 'container' : ''}`}>
          <VideoPlayer video={content?.video} />
        </div>
      )}
      { !content?.video && (
      <iframe
        width="560"
        height="315"
        src={content.localVideoUrl}
        frameBorder="0"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ maxWidth: '100%' }}
      ></iframe>
      )}
    </>
  );
}

export default Video;
