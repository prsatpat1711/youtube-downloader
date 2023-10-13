import React, { useState } from "react";
import "./App.scss";
import Library from "./pages/Library/Library";
import Navbar from "./components/Navbar/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Library />
    </div>
  );
}

export default App;
