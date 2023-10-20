import React, { useState } from "react";
import "./App.scss";
import Library from "./pages/Library/Library";
import Navbar from "./components/Navbar/Navbar";
import { Route, Routes } from "react-router-dom";
import LoginPage from "./pages/Login/Login";
import PlaylistPage from "./pages/PlaylistPage/PlaylistPage";

function App() {
  return (
    <Routes>
      <Route path="/library" element={<Library />} />
      <Route path="/playlists" element={<PlaylistPage />} />
      <Route path="/" element={<LoginPage />} />
    </Routes>
  );
}

export default App;
