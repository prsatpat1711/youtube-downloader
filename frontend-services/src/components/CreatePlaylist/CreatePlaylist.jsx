import React, { useState } from "react";
import SongsAddModal from "../SongsAddModal/SongsAddModal";
import axios from "axios";
import AuthService from "../../utils/Auth";

export default function CreatePlaylist({ closeModal }) {
  const [isSongsAddModalOpen, setIsSongsAddModalOpen] = useState(false);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playlistTitle, setPlaylistTitle] = useState("");
  const [playlistDescription, setPlaylistDescription] = useState("");

  const handleCreatePlaylist = async (retry) => {
    const url =
      import.meta.env.VITE_REACT_APP_BACKEND_URI + `/playlists/create/`;
    const playlistSongsIds = playlistSongs.map(
      (playlistSong) => playlistSong.id
    );
    const tobeCreatedPlaylist = {
      songs: playlistSongsIds,
      title: playlistTitle,
      description: playlistDescription,
      user: localStorage.getItem("id"),
    };
    await axios
      .post(
        url,

        tobeCreatedPlaylist,
        AuthService.getHeaders()
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (retry === undefined) {
          AuthService.refreshToken().then((response) =>
            handleCreatePlaylist(true)
          );
        }
        console.log(error);
      });
  };

  return (
    <div className="d-flex align-items-center justify-content-center">
      {isSongsAddModalOpen ? (
        <SongsAddModal
          playlistSongs={playlistSongs}
          setPlaylistSongs={setPlaylistSongs}
          closeSongsAddModal={() => setIsSongsAddModalOpen(false)}
        />
      ) : (
        <div className="modal-dialog modal-dialog-centered d-flex">
          <div className="modal-content p-5">
            <form className="row g-3 needs-validation" noValidate>
              <div className="col-12">
                <label for="validationCustom01" className="form-label">
                  Name of the playlist
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom01"
                  required
                  onChange={(e) => setPlaylistTitle(e.target.value)}
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-12">
                <label for="validationCustom02" className="form-label">
                  Description for the playlist
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="validationCustom02"
                  required
                  onChange={(e) => setPlaylistDescription(e.target.value)}
                />
                <div className="valid-feedback">Looks good!</div>
              </div>
              <div className="col-12"></div>
              <div className="col-12 justify-content-between d-flex">
                <h4>Number of songs added</h4>
                <h4>{playlistSongs.length}</h4>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setIsSongsAddModalOpen(true)}
                >
                  Add Songs
                </button>
              </div>
              <div className="col-12 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreatePlaylist}
                >
                  Create Playlist
                </button>
              </div>
              <div className="col-12 d-flex justify-content-end">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Close
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
