import React, { useState, useEffect } from "react";
import axios from "axios";
import LandingPage from "./LandingPage/LandingPage";
import { Routes, Route } from "react-router-dom";
import NotFound from "./Notfound/NotFound";
import SelectedAlbum from "./SelectedAlbumPage/SelectedAlbum";

const Home = () => {
  const [searchData, setSearchData] = useState([]);
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setnewAlbums] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchingTopAlbums = async () => {
    const response = await axios.get(
      "https://qtify-backend-labs.crio.do/albums/top"
    );
    setTopAlbums(response.data);
    return response.data;
  };
  const fetchingNewAlbums = async () => {
    const response = await axios.get(
      "https://qtify-backend-labs.crio.do/albums/new"
    );
    setnewAlbums(response.data);
    return response.data;
  };
  const fetchingGenres = async () => {
    const response = await axios.get(
      "https://qtify-backend-labs.crio.do/genres"
    );
    setGenres(response.data.data);
  };

  useEffect(() => {
    const onLoadHandler = async () => {
      const topAlbum = await fetchingTopAlbums();
      const newAlbum = await fetchingNewAlbums();
      await fetchingGenres();

      setSearchData([...topAlbum, ...newAlbum]);
    };
    onLoadHandler();
  }, []);

  return (
    <Routes>
      <Route
        exact
        path="/"
        element={
          <LandingPage
            searchData={searchData}
            topAlbums={topAlbums}
            newAlbums={newAlbums}
            genres={genres}
          />
        }
      />
      <Route exact path="/album" element={<NotFound />} />
      <Route
        exact
        path="/album/:albumName"
        element={<SelectedAlbum searchData={searchData} />}
      />
      <Route exact path="/not-found" element={<NotFound />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default Home;
