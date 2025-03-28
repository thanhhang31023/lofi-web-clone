import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import "./ModifierBoard.scss";
import Stack from "@mui/material/Stack";
import Slider from "@mui/material/Slider";
import { changeMoodStatus } from "../../redux/actions";

import ReactAudioPlayer from "react-audio-player";
import { changeRainStatus } from "../../redux/actions";
import { changeVolume } from "../../redux/actions";
import CountDownTimer from "../CountDownTimer/CountDownTimer";
import TodoList from "../TodoList/TodoList";
import Draggable from "react-draggable"; // 💡 thêm dòng này


const ModifierBoard = ({
    seconds,
    minutes,
    hours,
    isRunning,
    pause,
    resume,
    restart,
    setTimerHandler,
    setTimerStart,
    timerStart,
}) => {
    const dispatch = useDispatch();
    const data = useSelector((state) => state.moodState);
    const rainData = useSelector((state) => state.rainState);
    const volumeData = useSelector((state) => state.volumeState);
  


    const { rainValue } = rainData;
    const { moodMode } = data;
    const { volumeValue } = volumeData;

    const [openMood, setOpenMood] = useState(false);
    const [openFocus, setOpenFocus] = useState(false);

    const [campFire, setCampFire] = useState(0);
    const [cityRain, setCityRain] = useState(rainValue);
    const [birds, setBirds] = useState(0);
    const [chicks, setChicks] = useState(0);
    const [summerStorm, setSummerStorm] = useState(0);
   
    const [forestNight, setForestNight] = useState(0);
    const [wave, setWave] = useState(0);

    const [people, setPeople] = useState(0);
    const [river, setRiver] = useState(0);
    const [rainForest, setRainForest] = useState(0);

    const rainSliderHandler = (e) => {
        // if slide then make it rain
        if (e.target.value > 0) dispatch(changeRainStatus("clear", cityRain));
        // if value = 0 then stop rain
        else if (e.target.value === 0) dispatch(changeRainStatus("rain", 0));
        setCityRain(e.target.value);
    };

    const openFocusHandler = () => {
        setOpenFocus(!openFocus);
        setOpenMood(false);
    };

    const openMoodHandler = () => {
        setOpenMood(!openMood);
        setOpenFocus(false);
    };

    const changeMoodHandler = (e) => {
        dispatch(changeMoodStatus(e.target.id));
    };

    const changeVolumeHandler = (e) => {
        dispatch(changeVolume(e.target.value));    };

    return (
        <>
            {!openMood && (
                <div>
                    <ReactAudioPlayer
                        preload="auto"
                        autoPlay
                        src="./assets/musics/campfire.mp3"
                        loop
                        volume={campFire / 100}
                    />

                    <ReactAudioPlayer
                        preload="auto"
                        autoPlay
                        src="./assets/musics/birds.mp3"
                        loop
                        volume={birds / 100}
                    />

                    <ReactAudioPlayer
                        preload="auto"
                        autoPlay
                        src="./assets/musics/rain_city.mp3"
                        loop
                        volume={rainValue / 100}
                    />
                </div>
            )}
           <Draggable handle=".modifier__icon" cancel=".icon, .modifier-toggle-button">
  <div className="modifier-wrapper">

              
                    <div className={`modifier ` + (openMood && "mood ") + (openFocus && " focus ")}>
                        <div className="modifier__icon">
                            <div className={`icon ` + (openMood && "active")}>
                                <i onClick={openMoodHandler} className="fas fa-sliders-h fa-2x"></i>
                            </div>
                            <div className={"icon " + (openFocus && "active")}>
                                <i onClick={openFocusHandler} className="fas fa-book-reader fa-2x"></i>
                            </div>
                            
                        </div>
                    {openMood && (
                        <div className="modifierBox">
                            <h4>Mood</h4>
                            <div className="options">
                                <div
                                    id="sleep"
                                    onClick={changeMoodHandler}
                                    className={`item ` + (moodMode === "sleep" ? "active" : "")}
                                >
                                    <i id="sleep" className="fas fa-moon fa-2x"></i>
                                    <span id="sleep">Sleep</span>
                                </div>
                                <div
                                    id="jazzy"
                                    onClick={changeMoodHandler}
                                    className={`item ` + (moodMode === "jazzy" ? "active" : "")}
                                >
                                    <i id="jazzy" className="fas fa-guitar fa-2x"></i>
                                    <span id="jazzy">Jazzy</span>
                                </div>
                                <div
                                    id="chill"
                                    onClick={changeMoodHandler}
                                    className={`item ` + (moodMode === "chill" ? "active" : "")}
                                >
                                    <i id="chill" className="fas fa-coffee fa-2x"></i>
                                    <span id="chill">Chill</span>
                                </div>
                            </div>
                            <div className="volume">
                                <Stack spacing={2} direction="row" sx={{ mb: 1 }} alignItems="center">
                                    <i className="fas fa-volume-down fa-lg"></i>
                                    <Slider
                                        className="volume-slider"
                                        value={volumeValue}
                                        onChange={changeVolumeHandler}
                                    />
                                    <i className="fas fa-volume-up fa-lg"></i>
                                </Stack>
                            </div>
                            <h5>Background Noise</h5>
                            <div className="backgroundNoise">
                                <div className="noise-option">
                                    <p>Camp Fire</p>
                                    <ReactAudioPlayer
                                        preload="auto"
                                        autoPlay
                                        src="./assets/musics/campfire.mp3"
                                        loop
                                        volume={campFire / 100}
                                    />
                                    <Slider
                                        className="slider"
                                        value={campFire}
                                        onChange={(e) => setCampFire(e.target.value)}
                                    />
                                </div>
                                <div className="noise-option">
                                    <p>Rain</p>
                                    <ReactAudioPlayer
                                        preload="auto"
                                        autoPlay
                                        src="./assets/musics/rain_city.mp3"
                                        loop
                                        volume={rainValue / 100}
                                    />
                                    <Slider className="slider" value={rainValue} onChange={rainSliderHandler} />
                                </div>
                                <div className="noise-option">
                                    <p>Birds</p>
                                    <ReactAudioPlayer
                                        preload="auto"
                                        autoPlay
                                        src="./assets/musics/birds.mp3"
                                        loop
                                        volume={birds / 100}
                                    />
                                    <Slider
                                        className="slider"
                                        value={birds}
                                        onChange={(e) => setBirds(e.target.value)}
                                    />
                                </div>

                                <div className="noise-option">
                                    <p>River</p>
                                    <ReactAudioPlayer
                                        preload="auto"
                                        autoPlay
                                        src="./assets/musics/river.mp3"
                                        loop
                                        volume={river / 100}
                                    />
                                    <Slider
                                        className="slider"
                                        value={river}
                                        onChange={(e) => setRiver(e.target.value)}
                                    />
                                </div>
                                <div className="noise-option">
                                    <p>Rain Forest</p>
                                    <ReactAudioPlayer
                                        preload="auto"
                                        autoPlay
                                        src="./assets/musics/rain_forest.mp3"
                                        loop
                                        volume={rainForest / 100}
                                    />
                                    <Slider
                                        className="slider"
                                        value={rainForest}
                                        onChange={(e) => setRainForest(e.target.value)}
                                    />
                                </div>

                                <div className="noise-option">
                                    <p>Summer Storm</p>
                                    <ReactAudioPlayer
                                        preload="auto"
                                        autoPlay
                                        src="./assets/musics/summer_storm.mp3"
                                        loop
                                        volume={summerStorm / 100}
                                    />
                                    <Slider
                                        className="slider"
                                        value={summerStorm}
                                        onChange={(e) => setSummerStorm(e.target.value)}
                                    />
                                </div>

                                <div className="noise-option">
                                    <p>Forest Night</p>
                                    <ReactAudioPlayer
                                        preload="auto"
                                        autoPlay
                                        src="./assets/musics/forest_night.mp3"
                                        loop
                                        volume={forestNight / 100}
                                    />
                                    <Slider
                                        className="slider"
                                        value={forestNight}
                                        onChange={(e) => setForestNight(e.target.value)}
                                    />
                                </div>

                                <div className="noise-option">
                                    <p>Chicks</p>
                                    <ReactAudioPlayer
                                        preload="auto"
                                        autoPlay
                                        src="./assets/musics/chicks.mp3"
                                        loop
                                        volume={chicks / 100}
                                    />
                                    <Slider
                                        className="slider"
                                        value={chicks}
                                        onChange={(e) => setChicks(e.target.value)}
                                    />
                                </div>

                                                              <div className="noise-option">
                                    <p>Wave</p>
                                    <ReactAudioPlayer
                                        preload="auto"
                                        autoPlay
                                        src="./assets/musics/waves.mp3"
                                        loop
                                        volume={wave / 100}
                                    />
                                    <Slider className="slider" value={wave} onChange={(e) => setWave(e.target.value)} />
                                </div>
                               
                                <div className="noise-option">
                                    <p>People</p>
                                    <ReactAudioPlayer
                                        preload="auto"
                                        autoPlay
                                        src="./assets/musics/people_talk_inside.mp3"
                                        loop
                                        volume={people / 100}
                                    />
                                    <Slider
                                        className="slider"
                                        value={people}
                                        onChange={(e) => setPeople(e.target.value)}
                                    />
                                </div>
                            </div>
                        </div>
                    )}
              
                {openFocus && (
                    <div className="modifierBox">
                        <h4>Focus Mode</h4>
                        <CountDownTimer
                            seconds={seconds}
                            minutes={minutes}
                            hours={hours}
                            isRunning={isRunning}
                            pause={pause}
                            resume={resume}
                            restart={restart}
                            setTimerHandler={setTimerHandler}
                            setTimerStart={setTimerStart}
                            timerStart={timerStart}
                        />
                        <h4>To do list</h4>
                        <TodoList />
                    </div>
                )}
            </div>
        
    </div>
</Draggable>
        </>
    );
};

export default ModifierBoard;
