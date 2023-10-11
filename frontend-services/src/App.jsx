import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import AudioPlayer from "./components/AudioPlayer/AudioPlayer";
import SongFetcher from "./pages/SongFetcher/SongFetcher";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <SongFetcher />
      <AudioPlayer
        audioUrl={"http://localhost:8000/media/downloads/Nayan.mp3"}
      />
    </div>
  );
}

export default App;
