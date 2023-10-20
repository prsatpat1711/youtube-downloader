import React from "react";

export default function Navbar() {
  return (
    <nav className="navbar navbar-light bg-dark">
      <div className="container-fluid">
        <a className="navbar-brand text-text" href="#">
          <img
            src="./music_image.png"
            alt=""
            width="30"
            height="24"
            className="d-inline-block align-text-top me-2"
          />
          Music Mixer
        </a>
        <div className="d-flex text-text">
          <a className="nav-link me-4" href="/library">
            Library
          </a>
          <a className="nav-link me-4" href="/playlists">
            Playlists
          </a>
          <a className="nav-link me-4" href="#">
            Convert
          </a>
          <a className="nav-link me-4" href="#">
            Profile
          </a>
        </div>
      </div>
    </nav>
  );
}
