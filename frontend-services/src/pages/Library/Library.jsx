import React, { useEffect, useState } from "react";
import SongsGrid from "../../components/SongsGrid/SongsGrid";
import SongFetcher from "../../components/SongFetcher/SongFetcher";
import AudioPlayer from "../../components/AudioPlayer/AudioPlayer";
import axios from "axios";

export default function Library() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState({});
  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [songOver, setSongOver] = useState(false);

  const handleCurrentSongChange = (song) => {
    setCurrentSong(song);
  };

  const fetchData = async () => {
    let url = import.meta.env.VITE_REACT_APP_BACKEND_URI + `/songs/`;
    if (searchText) {
      if (filterValue === "Album") {
        url += `?movie=${searchText}`;
      } else if (filterValue === "Artist") {
        url += `?artist=${searchText}`;
      } else {
        url += `?title=${searchText}`;
      }
    }
    await axios
      .get(url, {
        auth: {
          username: "ShivaPS",
          password: "Pratik12",
        },
        headers: {
          "content-type": "application/text",
        },
      })
      .then((response) => setSongs(response.data))
      .catch((err) => console.log(err));
  };

  const handleSearch = (searchText) => {
    fetchData();
  };

  useEffect(() => {
    let url = import.meta.env.VITE_REACT_APP_BACKEND_URI + `/songs/`;
    axios
      .get(url, {
        auth: {
          username: "ShivaPS",
          password: "Pratik12",
        },
        headers: {
          "content-type": "application/text",
        },
      })
      .then((response) => setSongs(response.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    const currentIndex = songs.findIndex((song) => song.id === currentSong.id);
    if (currentIndex !== -1 && currentIndex < songs.length - 1) {
      const nextSong = songs[currentIndex + 1];
      setCurrentSong(nextSong);
    }
    setSongOver(false);
  }, [songOver]);

  return (
    <div className="container-fluid p-0 text-text bg-dark ">
      <div className="row justify-content-start">
        <AudioPlayer audio={currentSong} setSongOver={setSongOver} />
        <SongFetcher />
      </div>

      <div className="row">
        <div className="col-lg-6 col-md-12 mb-3">
          <p className="text-start fs-1 m-3 p-3 d-inline">
            Take a look at the whole library
          </p>
        </div>
        <div className="col-lg-6 col-md-12 text-end">
          <div class="input-group d-flex align-items-center">
            <p className="text-start fs-3 m-2 d-inline">Search : </p>
            <input
              type="text"
              class="form-control rounded-3 m-2"
              aria-label="search.."
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
            <button
              class="btn btn-primary btn-outline-text rounded-3 m-2"
              type="button"
              onClick={() => handleSearch(searchText)}
            >
              Search
            </button>
            <button
              class="btn btn-outline-text dropdown-toggle rounded-3 m-2"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              aria-label="Filters"
            >
              {filterValue}
            </button>
            <ul class="dropdown-menu dropdown-menu-end">
              <li>
                <a
                  class="dropdown-item"
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterValue("Name");
                  }}
                >
                  Name
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterValue("Artist");
                  }}
                >
                  Artist
                </a>
              </li>
              <li>
                <a
                  class="dropdown-item"
                  href=""
                  onClick={(e) => {
                    e.preventDefault();
                    setFilterValue("Album");
                  }}
                >
                  Album
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <SongsGrid songs={songs} setCurrentSong={handleCurrentSongChange} />
    </div>
  );
}
