import axios from "axios";
import React from "react";

class AuthService {
  getHeaders() {
    let access = localStorage.getItem("access");
    if (access === undefined || access === "" || access === null) {
      localStorage.setItem("access", "temptoken");
      window.location.href = REACT_APP_AD_URL;
    }
    return { headers: { Authorization: "Bearer " + access } };
  }

  async refreshToken() {
    try {
      // Ensure that the access token and refresh token are available
      const accessToken = localStorage.getItem("access");
      const refreshToken = localStorage.getItem("refresh");

      if (!accessToken || !refreshToken) {
        throw new Error("Access token or refresh token not available.");
      }

      // Make a request to refresh the access token
      const url =
        import.meta.env.VITE_REACT_APP_BACKEND_URI + "/api/token/refresh/";
      const response = await axios.post(url, { refresh: refreshToken });

      // Update the access token in local storage
      localStorage.setItem("access", response.data.access);
    } catch (error) {
      // Handle token refresh error, e.g., display a message to the user
      console.error("Token refresh error:", error);
    }
  }
}

export default new AuthService();
