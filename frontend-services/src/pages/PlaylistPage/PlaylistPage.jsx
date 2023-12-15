import React, { useEffect, useState } from "react";
import axios from "axios";
import AuthService from "../../utils/Auth";
import Navbar from "../../components/Navbar/Navbar";
import Playlist from "../../components/Playlist/Playlist";
import CreatePlaylist from "../../components/CreatePlaylist/CreatePlaylist";

export default function PlaylistPage() {
  const [playlists, setPlaylists] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showingPlaylist, setShowingPlaylist] = useState({});
  const [isCreatePlaylistModalOpen, setCreatePlaylistModalOpen] =
    useState(false);

  const playlistsPerPage = 5;

  const fetchPlaylist = async (retry) => {
    let url =
      import.meta.env.VITE_REACT_APP_BACKEND_URI + `/playlists/?archive=false`;
    try {
      const response = await axios.get(url, AuthService.getHeaders());
      console.log(response.data);

      setPlaylists(response.data);
    } catch (error) {
      if (retry === undefined) {
        AuthService.refreshToken().then(() => {
          fetchPlaylist(true);
        });
      }
      console.log(error);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const indexOfLastPlaylist = currentPage * playlistsPerPage;
  const indexOfFirstPlaylist = indexOfLastPlaylist - playlistsPerPage;
  const currentPlaylists = playlists.slice(
    indexOfFirstPlaylist,
    indexOfLastPlaylist
  );

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleShowPlaylist = (playlist) => {
    console.log(currentPlaylists);
    setShowingPlaylist(playlist);
  };

  const handleDeletePlaylist = async (id, retry) => {
    const url =
      import.meta.env.VITE_REACT_APP_BACKEND_URI + `/playlists/${id}/`;
    await axios
      .delete(url, AuthService.getHeaders())
      .then((response) => fetchPlaylist())
      .catch((error) => {
        if (retry === undefined) {
          AuthService.refreshToken().then((response) =>
            handleDeletePlaylist(id, true)
          );
        }
        console.log(error);
      });
  };

  return (
    <div className="bg-dark vh-100 text-text">
      <Navbar />

      {isCreatePlaylistModalOpen ? (
        <CreatePlaylist closeModal={() => setCreatePlaylistModalOpen(false)} />
      ) : (
        <div>
          <div className="mt-3 text-text">
            <div className="d-inline-flex w-100 justify-content-between">
              <h1 className="mb-0 ms-5 text-primary text-decoration-underline">
                All of your playlists!
              </h1>
              <button
                type="button"
                className="d-block btn btn-primary me-5"
                onClick={() => setCreatePlaylistModalOpen(true)}
              >
                Create a new playlist
              </button>
            </div>
          </div>

          <table className="table table-dark table-striped mt-5">
            <thead>
              <tr>
                <th className="text-button" scope="col">
                  Index
                </th>
                <th className="text-button" scope="col">
                  Title
                </th>
                <th className="text-button" scope="col">
                  Description
                </th>
                <th className="text-button" scope="col">
                  Songs count
                </th>
                <th className="text-button" scope="col">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {currentPlaylists.length > 0 ? (
                currentPlaylists.map((playlist, index) => (
                  <tr key={playlist.id}>
                    <th scope="row">{index + 1}</th>
                    <td>{playlist.title}</td>
                    <td>{playlist.description}</td>
                    <td>{playlist.songs.length}</td>
                    <td>
                      <button
                        type="button"
                        className="btn btn-button me-2"
                        onClick={() => handleShowPlaylist(playlist)}
                      >
                        View
                      </button>
                      <button
                        type="button"
                        className="btn btn-secondary ms-2"
                        onClick={() => handleDeletePlaylist(playlist.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td className="bg-dark text-text" colSpan="5">
                    Loading playlists...
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <nav>
            <ul className="pagination justify-content-center">
              {Array.from({
                length: Math.ceil(playlists.length / playlistsPerPage),
              }).map((_, index) => (
                <li
                  className={`page-item ${
                    index + 1 === currentPage ? "active" : ""
                  }`}
                  key={index}
                >
                  <button
                    className={`btn rounded-circle m-2 btn-primary ${
                      index + 1 === currentPage ? "btn-button " : ""
                    }`}
                    onClick={() => paginate(index + 1)}
                  >
                    {index + 1}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          <Playlist playlist={showingPlaylist} />
        </div>
      )}
    </div>
  );
}
