import axios from "axios";
import React from "react";

export function getHeaders() {
  const accessToken = localStorage.getItem("access"); // Replace with the actual access token

  const headers = {
    Authorization: `Bearer ${accessToken}`,
    "Content-Type": "application/json", // Adjust as needed
  };

  return headers;
}

export function refreshToken() {
  const url =
    import.meta.env.VITE_REACT_APP_BACKEND_URI + "/api/token/refresh/";
  axios
    .post(url, localStorage.getItem("refresh"))
    .then((response) => {
      localStorage.setItem("access", response.data.access);
    })
    .catch((error) => console.log(error));
}
