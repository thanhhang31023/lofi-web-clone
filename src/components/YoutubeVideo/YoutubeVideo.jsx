import React, { useState } from 'react';

import './YoutubeVideo.scss';
import ReactPlayer from 'react-player';
import Draggable from 'react-draggable';
import { useSelector } from 'react-redux';

const YoutubeVideo = () => {
  const [youtubeLink, setYoutubeLink] = useState('');
  const [submited, setSubmited] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isHidden, setIsHidden] = useState(false);
  const mode = useSelector((state) => state.modeState.mode);

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
        <Draggable handle=".youtube-header" cancel=".youtube-hide-btn, .youtube-form button">
          <div className={`youtube-wrapper ${mode}`}>
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

            {!submited && !isHidden && (
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
              <div
                className="youtube-player-container"
                style={{
                  position: isHidden ? 'absolute' : 'relative',
                  left: isHidden ? '-9999px' : '0',
                  width: isHidden ? '1px' : '100%',
                  height: isHidden ? '1px' : 'auto',
                  overflow: 'hidden',
                }}
              >
                <div className="player-wrapper">
                  <ReactPlayer
                    url={youtubeLink}
                    playing
                    loop
                    controls={!isHidden}
                    width="100%"
                    height="100%"
                  />
                </div>
                {!isHidden && (
                  <button onClick={() => setSubmited(false)}>Change video</button>
                )}
              </div>
            )}
          </div>
        </Draggable>
      )}
    </>
  );
};

export default YoutubeVideo;
