import React from "react";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const name = localStorage.getItem("name") || "";
  const id = localStorage.getItem("id") || "";
  const role =
    localStorage.getItem("role").charAt(0).toUpperCase() +
      localStorage.getItem("role").slice(1) || "";

  const handleLogout = () => {
    localStorage.removeItem("name");
    localStorage.removeItem("id");
    localStorage.removeItem("role");
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

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
          <a
            className="nav-link me-4"
            href="#"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            Profile
          </a>
        </div>
        <div
          class="modal fade"
          id="exampleModal"
          tabindex="-1"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div class="modal-dialog text-primary">
            <div class="modal-content">
              <div class="modal-header">
                <h5 class="modal-title" id="exampleModalLabel">
                  My Profile
                </h5>
                <button
                  type="button"
                  class="btn-close"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                ></button>
              </div>
              <div class="modal-body">
                <div className="d-flex flex-column">
                  <label>Name: {name}</label>
                  <label>ID: {id}</label>
                  <label>Role: {role}</label>
                </div>
              </div>
              <div class="modal-footer">
                <button
                  type="button"
                  class="btn btn-button"
                  data-bs-dismiss="modal"
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-secondary"
                  onClick={handleLogout}
                  data-bs-dismiss="modal"
                >
                  Logout
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
