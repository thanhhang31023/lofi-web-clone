import React, { useState } from 'react';

import './YoutubeVideo.scss';
import ReactPlayer from 'react-player';
import Draggable from 'react-draggable';


const YoutubeVideo = () => {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [submited, setSubmited] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHidden, setIsHidden] = useState(false);



  const changeYoutubeHandlder = (e) => {
    setYoutubeLink(e.target.value);
  };

  const submitYoutubeHandlder = (e) => {
    e.preventDefault();
    setSubmited(true);
  };

  return (
    <>
 

  {isVisible && (
    <Draggable>
    <div className="youtube-wrapper">
      <div className="youtube-header">
        <span className="youtube-title">🎵 Your Music</span>
        <button
          className="youtube-hide-btn"
          onClick={() => setIsHidden(!isHidden)}
          title={isHidden ? 'Hiện lại player' : 'Ẩn player'}
        >
          {isHidden ? '+' : '–'}
        </button>
      </div>
  
      {!isHidden && (
        <>
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

        </>
      )}
    </div>
  </Draggable>
  
  )}
</>
  )
};

export default YoutubeVideo;
