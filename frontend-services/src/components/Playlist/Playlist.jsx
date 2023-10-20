import React from "react";

export default function Playlist({ playlist }) {
  return (
    <div className="container-fluid m-0 p-0">
      <h1>{playlist.title}</h1>
      <h4>{playlist.description}</h4>
      <div class="table-responsive m-0 p-0 w-100 d-flex">
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
            {playlist.songs &&
              playlist.songs.map((song, index) => {
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
                        onClick={() => setCurrentSong(song)}
                      >
                        Play
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
