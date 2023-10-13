import React from "react";

export default function SongsGrid({ songs, setCurrentSong }) {
  return (
    <div className="container-fluid m-0 p-0">
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
            {songs &&
              songs.map((song, index) => {
                return (
                  <tr>
                    <td>{index + 1}</td>
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
      {/* <div className="row row-cols-2">
        {songs &&
          songs.map((song) => {
            return (
              <div className="card bg-primary m-3" style={{ width: "18rem" }}>
                <div className="card-body d-flex flex-column align-items-center">
                  <h5 className="card-title text-center">Name: {song.title}</h5>
                  <button
                    type="button"
                    className="btn btn-button m-0"
                    onClick={() => setCurrentSong(song)}
                  >
                    Play
                  </button>
                  <h5 className="card-title text-dark text-center">
                    Artists: {song.artist}
                  </h5>
                </div>
              </div>
            );
          })}
      </div> */}
    </div>
  );
}
