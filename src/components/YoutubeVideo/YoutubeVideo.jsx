import React, { useState } from 'react';

import './YoutubeVideo.scss';
import ReactPlayer from 'react-player';
import Draggable from 'react-draggable';


const YoutubeVideo = () => {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [submited, setSubmited] = useState(false);

  const changeYoutubeHandlder = (e) => {
    setYoutubeLink(e.target.value);
  };

  const submitYoutubeHandlder = (e) => {
    e.preventDefault();
    setSubmited(true);
  };

  return (
    <Draggable>
      <div className="youtube-wrapper">
        <button className="youtube-toggle" onClick={() => setSubmited(false)}>
          🎵 Your Music
        </button>
  
        {!submited && (
          <form onSubmit={submitYoutubeHandlder} className="youtube-form">
            <input
              value={youtubeLink}
              onChange={changeYoutubeHandlder}
              placeholder="Paste Youtube Music URL..."
            />
            <button type="submit">Play</button>
          </form>
        )}
  
        {submited && (
          <div className="youtube-player">
          <div className="player-wrapper">
            <ReactPlayer
              width="100%"
              height="100%"
              loop
              controls
              url={youtubeLink}
            />
          </div>
          <button onClick={() => setSubmited(false)}>Change video</button>
        </div>
        
        )}
      </div>
    </Draggable>
  );
};

export default YoutubeVideo;
