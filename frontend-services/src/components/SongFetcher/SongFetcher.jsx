import React, { useEffect, useState } from "react";
import axios from "axios";

export default function SongFetcher() {
  const [addSong, setAddSong] = useState({
    url: "",
    title: "",
    artist: "",
    movie: "",
    site_name: "",
  });

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
    <div className="col-3 p-5 m-5 d-flex flex-column align-items-center justify-content-center">
      <p className="text-center fs-2 text-text d-block">
        Add your own choice of song
      </p>
      <button
        type="button"
        class="btn btn-primary d-block"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Add Song
      </button>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title text-dark" id="exampleModalLabel">
                Add a song
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div className="container-fluid">
                <input
                  type="url"
                  className="form-control m-2"
                  id="addSong.url"
                  placeholder="youtube.com/song_extension"
                  onChange={(e) => {
                    setAddSong({ ...addSong, url: e.target.value });
                  }}
                />

                <input
                  type="text"
                  className="form-control m-2"
                  id="addSong.title"
                  placeholder="Song Name"
                  onChange={(e) => {
                    setAddSong({ ...addSong, title: e.target.value });
                  }}
                />

                <input
                  type="text"
                  className="form-control m-2"
                  id="addSong.artist"
                  placeholder="Artist"
                  onChange={(e) => {
                    setAddSong({ ...addSong, artist: e.target.value });
                  }}
                />

                <input
                  type="text"
                  className="form-control m-2"
                  id="addSong.movie"
                  placeholder="Source : Movie or Solo or Band?"
                  onChange={(e) => {
                    setAddSong({ ...addSong, movie: e.target.value });
                  }}
                />

                <input
                  type="text"
                  className="form-control m-2"
                  id="addSong.site_name"
                  placeholder="Site from where we are downloading"
                  onChange={(e) => {
                    setAddSong({ ...addSong, site_name: e.target.value });
                  }}
                />
              </div>
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button
                type="button"
                class="btn btn-primary"
                onClick={() => handleAddSong()}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
