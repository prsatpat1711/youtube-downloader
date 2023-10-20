import React, { useState, useEffect, useRef } from "react";

const AudioPlayer = ({ audio, setSongOver }) => {
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(audio);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReplaying, setIsReplaying] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = audio.file;
      audioRef.current.load();
      audioRef.current.play();
      setIsPlaying(true);

      audioRef.current.addEventListener("ended", () => {
        if (isReplaying) {
          // If replay is enabled, restart the audio
          audioRef.current.currentTime = 0;
          audioRef.current.play();
          setIsPlaying(true);
        } else {
          setSongOver(true);
        }
      });
    }
  }, [audio, isReplaying]);

  const playAudio = () => {
    audioRef.current.play();
    console.log(audio);
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const updateTime = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      setSliderValue(
        (100 * audioRef.current.currentTime) / audioRef.current.duration
      );
    }
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.addEventListener("timeupdate", updateTime);
    }
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener("timeupdate", updateTime);
      }
    };
  }, [audioRef]);

  return (
    <div className="col-8 m-2 p-2">
      <p className="text-center fs-1 m-2">
        {audio.title || "No song selected"}
      </p>
      <p class="text-center fs-3 m-2">{audio.artist || "No artist"}</p>
      <audio ref={audioRef}>
        <source src={audio.file} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
      <input
        type="range"
        class="form-range bg-dark text-primary m-2"
        min="0"
        max={audio.duration}
        step="1"
        id="customRange3"
        value={sliderValue}
        onChange={(e) => {
          setSliderValue(e.target.value);
          audioRef.current.currentTime =
            (e.target.value * audioRef.current.duration) / 100;
        }}
        onClick={(e) => {
          const clickTime =
            (e.nativeEvent.offsetX / e.target.clientWidth) *
            audioRef.current.duration;
          audioRef.current.currentTime = clickTime;
        }}
      ></input>

      <div className="d-flex justify-content-center">
        <button
          type="button"
          className="btn btn-button m-2"
          onClick={playAudio}
          disabled={isPlaying}
        >
          Play
        </button>
        <button
          type="button"
          className="btn btn-button m-2"
          onClick={pauseAudio}
          disabled={!isPlaying}
        >
          Pause
        </button>
        <button
          type="button"
          className="btn btn-button m-2"
          onClick={() => setIsReplaying(!isReplaying)}
        >
          {isReplaying ? "Disable Replay" : "Enable Replay"}
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
