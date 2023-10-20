import React, { useState } from "react";
import Navbar from "../../components/Navbar/Navbar";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import SignUp from "../../components/SignUp/SignUp";

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    const url = import.meta.env.VITE_REACT_APP_BACKEND_URI + "/api/token/";
    axios
      .post(url, {
        username,
        password,
      })
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("access", response.data.access);
        localStorage.setItem("refresh", response.data.refresh);
        navigate("/library");
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="d-flex bg-dark align-items-center justify-content-center vh-100">
      <div className="form-container">
        <div className="form-floating mb-5 text-white">
          <h1>Pratik's Music Player</h1>
        </div>
        <div className="form-floating mb-3">
          <input
            type="email"
            className="form-control"
            id="floatingInput"
            placeholder="name@example.com"
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="d-flex justify-content-center">
          <button
            type="button"
            className="btn btn-button me-2"
            onClick={handleLogin}
          >
            Login
          </button>
          <button
            type="button"
            className="btn btn-button ms-2"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Sign up
          </button>
        </div>
      </div>
      <div
        className="modal"
        id="staticBackdrop"
        tabIndex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <SignUp />
      </div>
    </div>
  );
}
