import React, { useState, useRef } from "react";

const AudioPlayer = ({ audioUrl }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playAudio = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const pauseAudio = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  return (
    <div>
      <audio ref={audioRef}>
        <source src={audioUrl} type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>

      <div>
        <button onClick={playAudio} disabled={isPlaying}>
          Play
        </button>
        <button onClick={pauseAudio} disabled={!isPlaying}>
          Pause
        </button>
      </div>
    </div>
  );
};

export default AudioPlayer;
