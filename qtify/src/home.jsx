import React from "react";
import LandingPage from "./LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Notfound/NotFound";
import SelectedAlbum from "./SelectedAlbumPage/SelectedAlbum";

const Home = () => {
  return (
    <Routes>
      <Route exact path="/" element={<LandingPage />} />
      <Route exact path="/album" element={<NotFound />} />
      <Route exact path="/album/:albumName" element={<SelectedAlbum />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Home;
