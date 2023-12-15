import React, { useEffect, useState } from "react";
import AuthService from "../../utils/Auth";
import axios from "axios";

export default function SongsAddModal({
  closeSongsAddModal,
  playlistSongs,
  setPlaylistSongs,
}) {
  const [songs, setSongs] = useState([]);

  const [searchText, setSearchText] = useState("");
  const [filterValue, setFilterValue] = useState("");

  const fetchData = async (retry) => {
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
      .get(url, AuthService.getHeaders())
      .then((response) => setSongs(response.data))
      .catch((err) =>
        AuthService.refreshToken().then((response) => {
          fetchData(true);
        })
      );
  };

  const handleSearch = () => {
    fetchData();
  };

  useEffect(() => {
    const url = import.meta.env.VITE_REACT_APP_BACKEND_URI + `/songs/`;
    const fetchSongs = async (retry) => {
      await axios
        .get(url, AuthService.getHeaders())
        .then((response) => setSongs(response.data))
        .catch((error) => {
          if (retry === undefined) {
            AuthService.refreshToken().then((response) => fetchSongs(true));
          }
          console.log(error);
        });
    };
    fetchSongs();
  }, []);

  return (
    <div className="modal-dialog bg-dark modal-dialog-centered d-flex">
      <div className="modal-content p-5">
        <form className="row g-3 needs-validation" noValidate>
          <div className="col-12">
            <button
              type="button"
              className="btn btn-primary"
              onClick={closeSongsAddModal}
            >
              Return
            </button>
            <h1 className="text-primary text-center mb-3">Added songs</h1>
            {playlistSongs.length > 0 ? (
              playlistSongs?.map((playlistSong, index) => (
                <div
                  className={`d-inline-flex justify-content-between w-100 rounded-2 align-items-center mb-2 mt-2 ${
                    index % 2 === 1 ? "bg-primary" : "bg-dark"
                  }`}
                >
                  <h4>{index + 1}</h4>
                  <h4>{playlistSong.title}</h4>
                  <button
                    type="button"
                    className="btn text-text"
                    onClick={() => {
                      setPlaylistSongs((prevPlaylistSongs) =>
                        prevPlaylistSongs.filter(
                          (song) => song.id !== playlistSong.id
                        )
                      );
                    }}
                  >
                    Remove
                  </button>
                </div>
              ))
            ) : (
              <h2 className="text-center text-button">No Songs Added</h2>
            )}
          </div>
          <div className="col-12 d-inline">
            <label for="validationCustom01" className="form-label">
              Enter a search text and click on button
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              required
              onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-12 justify-content-end d-inline-flex">
            <button
              type="button"
              className="btn btn-button d-inline me-2"
              onClick={handleSearch}
            >
              Search
            </button>
            <button
              class="btn btn-outline-text dropdown-toggle rounded-3 ms-2"
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
          <table class="table table-dark">
            <thead>
              <tr>
                <th scope="col">Index</th>
                <th scope="col">Name</th>
                <th scope="col">Artist</th>
                <th scope="col">Album</th>
                <th scope="col">Source</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {songs &&
                songs.map((song, index) => {
                  return (
                    <tr>
                      <td>{song.id}</td>
                      <td>{song.title}</td>
                      <td>{song.artist}</td>
                      <td>{song.movie}</td>
                      <td>{song.site_name}</td>
                      <td>
                        <button
                          type="button"
                          className="btn btn-button m-0"
                          onClick={() => {
                            if (
                              !playlistSongs.some(
                                (playlistSong) => playlistSong.id === song.id
                              )
                            ) {
                              // If it doesn't exist, add it to the playlist
                              setPlaylistSongs((prevPlaylistSongs) => [
                                ...prevPlaylistSongs,
                                song,
                              ]);
                            }
                          }}
                        >
                          Add
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <div className="col-12 d-inline-flex justify-content-end">
            <button
              type="button"
              className="btn btn-primary"
              onClick={closeSongsAddModal}
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
