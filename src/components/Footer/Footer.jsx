import React, { useState } from 'react';

import { chill, jazzy, sleep } from '../../data/songData';
import { useSelector } from 'react-redux';
import './Footer.scss';
import Player from '../Player/Player';

const Footer = () => {
  const data = useSelector((state) => state.moodState);

  const { moodMode } = data;

  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  return (
    <div className='footer'>
  <div className='controller'>
    <Player
      currentSongIndex={currentSongIndex}
      setCurrentSongIndex={setCurrentSongIndex}
      songs={
        moodMode === 'chill' ? chill :
        moodMode === 'jazzy' ? jazzy : sleep
      }
    />
    <div className='author'>
      <span>
        Song name: {
          moodMode === 'chill' ? chill[currentSongIndex].name :
          moodMode === 'jazzy' ? jazzy[currentSongIndex].name :
          sleep[currentSongIndex].name
        }
      </span>
    </div>
  </div>
</div>

  );
};

export default Footer;
