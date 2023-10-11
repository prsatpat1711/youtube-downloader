import React, { useEffect, useState } from "react";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import axios from "axios";

export default function SongFetcher() {
  const [songs, setSongs] = useState([]);
  const [addSong, setAddSong] = useState({
    url: "",
    title: "",
    artist: "",
    movie: "",
    site_name: "",
  });

  useEffect(() => {
    const url = import.meta.env.VITE_REACT_APP_BACKEND_URI + `/songs/`;
    const fetchData = async () => {
      await axios
        .get(url, {
          auth: {
            username: "ShivaPS",
            password: "Pratik12",
          },

          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => setSongs(response.data))
        .catch((err) => console.log(err));
    };
    fetchData();
  }, []);

  const handleAddSong = async () => {
    const url = import.meta.env.VITE_REACT_APP_BACKEND_URI + `/songs/create/`;
    await axios
      .post(url, addSong, {
        auth: {
          username: "ShivaPS",
          password: "Pratik12",
        },

        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => alert(response.data))
      .catch((err) => console.log(err));
  };

  return (
    <div className="container-fluid">
      <div className="container-fluid">
        <input
          type="url"
          className="form-control"
          id="addSong.url"
          placeholder="youtube.com/song_extension"
          onChange={(e) => {
            setAddSong({ ...addSong, url: e.target.value });
          }}
        />

        <input
          type="text"
          className="form-control"
          id="addSong.title"
          placeholder="Song Name"
          onChange={(e) => {
            setAddSong({ ...addSong, title: e.target.value });
          }}
        />

        <input
          type="text"
          className="form-control"
          id="addSong.artist"
          placeholder="Artist"
          onChange={(e) => {
            setAddSong({ ...addSong, artist: e.target.value });
          }}
        />

        <input
          type="text"
          className="form-control"
          id="addSong.movie"
          placeholder="Source : Movie or Solo or Band?"
          onChange={(e) => {
            setAddSong({ ...addSong, movie: e.target.value });
          }}
        />

        <input
          type="text"
          className="form-control"
          id="addSong.site_name"
          placeholder="Site from where we are downloading"
          onChange={(e) => {
            setAddSong({ ...addSong, site_name: e.target.value });
          }}
        />

        <button
          type="button"
          class="btn btn-primary"
          onClick={() => handleAddSong()}
        >
          Add Song
        </button>
      </div>
      {songs &&
        songs?.map((song) => {
          return (
            <div className="card" style={{ width: "18rem" }}>
              <img src="#" className="card-img-top" alt=".." />
              <div className="card-body">
                <h5 className="card-title">{song.title}</h5>

                <AudioPlayer audioUrl={song.file} />

                <a href="#" className="btn btn-primary">
                  {song.artist}
                </a>
              </div>
            </div>
          );
        })}
    </div>
  );
}
