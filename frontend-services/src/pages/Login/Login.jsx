import React from "react";
import Navbar from "../../components/Navbar/Navbar";

export default function LoginPage() {
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
          />
          <label htmlFor="floatingInput">Username</label>
        </div>
        <div className="form-floating mb-3">
          <input
            type="password"
            className="form-control"
            id="floatingPassword"
            placeholder="Password"
          />
          <label htmlFor="floatingPassword">Password</label>
        </div>
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-button me-2">
            Login
          </button>
          <button type="button" className="btn btn-button ms-2">
            Sign up
          </button>
        </div>
      </div>
    </div>
  );
}
