import React, { useState, useEffect, useRef } from 'react';
import './CountDownTimer.scss';
import TimerStyled from '../TimerStyled/TimerStyled';

const CountDownTimer = ({
  seconds,
  minutes,
  hours,
  isRunning,
  pause,
  resume,
  setTimerHandler,
  setTimerStart,
  timerStart,
}) => {
  const [hour, setHour] = useState(0);
  const [minute, setMinute] = useState(0);
  const [second, setSecond] = useState(0);
  const audioRef = useRef(null); // ref cho âm thanh
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const wasStartedRef = useRef(false);


  

  const setTimerBtnHandler = () => {
    setTimerHandler(hour, minute, second);
    setTimerStart(true);
    wasStartedRef.current = true; // đánh dấu là đã bắt đầu thật sự
  };
  

  // Kiểm tra hết giờ => phát âm thanh
  useEffect(() => {
    if (
      timerStart &&
      wasStartedRef.current &&
      hours === 0 &&
      minutes === 0 &&
      seconds === 0 &&
      !isTimerExpired
    ) {
      setIsTimerExpired(true);
      if (audioRef.current) {
        audioRef.current.play();
      }
    }
  }, [hours, minutes, seconds, timerStart, isTimerExpired]);
  

  return (
    <div className='countdown'>
      <audio ref={audioRef} src='./assets/musics/ring.mp3' preload='auto' />
      {timerStart ? (
        <div className='countdownRunning'>
          <div className='displayTime'>
            <TimerStyled seconds={seconds} minutes={minutes} hours={hours} />
          </div>
          <div className='controller'>
            <button
              className='buttonTimer'
              onClick={() => {
                setTimerHandler(0, 0, 0);
                setIsTimerExpired(false);
                wasStartedRef.current = false; // xóa dấu vết đã chạy
              }}
              
              
            >
              Cancel
            </button>
            {isRunning ? (
              <button className='buttonTimer' onClick={pause}>
                Pause
              </button>
            ) : (
              <button className='buttonTimer' onClick={resume}>
                Resume
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className='countdownNotRun'>
          <div className='input'>
            <input
              className='number-input'
              type='number'
              value={hour}
              onChange={(e) => setHour(e.target.value)}
              max={24}
              min={0}
            />
            <span>hour</span>
            <input
              className='number-input'
              type='number'
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
              max={60}
              min={0}
            />
            <span>min</span>
            <input
              className='number-input'
              type='number'
              value={second}
              onChange={(e) => setSecond(e.target.value)}
              max={60}
              min={0}
            />
            <span>sec</span>
          </div>

          <button className='buttonTimer setup' onClick={setTimerBtnHandler}>
            Set Timer
          </button>
        </div>
      )}
    </div>
  );
};

export default CountDownTimer;
