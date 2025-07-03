import React from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import Home from "./Pages/Home";
import Albums from "./Pages/Albums";
import Songs from "./Pages/Songs";
import Artists from "./Pages/Artists";

const App = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Albums" element={<Albums />} />
          <Route path="/Songs" element={<Songs />} />
          <Route path="/Artists" element={<Artists />} />
        </Routes>
      </Router>
    );
  };
  export default App;