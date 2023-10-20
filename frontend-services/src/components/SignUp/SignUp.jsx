import axios from "axios";
import React, { useState } from "react";

export default function SignUp() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = () => {
    const url =
      import.meta.env.VITE_REACT_APP_BACKEND_URI + "/profiles/create/";
    axios
      .post(url, {
        firstName,
        lastName,
        username,
        email,
        password,
        confirmPassword,
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="modal-dialog modal-dialog-centered d-flex">
      <div className="modal-content p-5">
        <form className="row g-3 needs-validation" noValidate>
          <div className="col-12">
            <label for="validationCustom01" className="form-label">
              First name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom01"
              required
              onChange={(e) => setFirstName(e.target.value)}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-12">
            <label for="validationCustom02" className="form-label">
              Last name
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom02"
              required
              onChange={(e) => setLastName(e.target.value)}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-12">
            <label for="validationCustom03" className="form-label">
              Email
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom03"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
            <div className="valid-feedback">Looks good!</div>
          </div>
          <div className="col-12">
            <label for="validationCustomUsername" className="form-label">
              Username
            </label>
            <div className="input-group has-validation">
              <span className="input-group-text" id="inputGroupPrepend">
                @
              </span>
              <input
                type="text"
                className="form-control"
                id="validationCustomUsername"
                aria-describedby="inputGroupPrepend"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <div className="invalid-feedback">Please choose a username.</div>
            </div>
          </div>
          <div className="col-12">
            <label for="validationCustom04" className="form-label">
              Password
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom04"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="invalid-feedback">
              Please provide a valid Password.
            </div>
          </div>
          <div className="col-12">
            <label for="validationCustom05" className="form-label">
              Confirm Password
            </label>
            <input
              type="text"
              className="form-control"
              id="validationCustom05"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="invalid-feedback">
              Please provide a valid Password.
            </div>
          </div>
          <div className="col-12">
            <button
              className="btn btn-primary"
              type="submit"
              onClick={handleSubmit}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
