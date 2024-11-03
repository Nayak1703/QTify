import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";
import Navbar from "./Navbar/Navbar.jsx";
import Hero from "./Hero/Hero.jsx";
import Section from "./Section/Section.jsx";
import AccordionComponent from "./Accordion/Accordion.jsx";
import MusicPlayer from "./MusicPlayer/MusicPlayer.jsx";

function App() {
  const [topAlbums, setTopAlbums] = useState([]);
  const [newAlbums, setnewAlbums] = useState([]);
  const [genres, setGenres] = useState([]);

  const fetchingTopAlbums = async () => {
    const response = await axios.get(
      "https://qtify-backend-labs.crio.do/albums/top"
    );
    setTopAlbums(response.data);
  };
  const fetchingNewAlbums = async () => {
    const response = await axios.get(
      "https://qtify-backend-labs.crio.do/albums/new"
    );
    setnewAlbums(response.data);
  };
  const fetchingGenres = async () => {
    const response = await axios.get(
      "https://qtify-backend-labs.crio.do/genres"
    );
    setGenres(response.data.data);
  };

  useEffect(() => {
    const onLoadHandler = async () => {
      await fetchingTopAlbums();
      await fetchingNewAlbums();
      await fetchingGenres();
    };
    onLoadHandler();
  }, []);

  return (
    <div className="App">
      <Navbar />
      <Hero />
      <div className="songsSection">
        <Section albumName={"Top Albums"} albumData={topAlbums} />
        <Section albumName={"New Albums"} albumData={newAlbums} />
        <Section albumName={"Songs"} genres={genres} />
      </div>
      <AccordionComponent />
      <MusicPlayer />
    </div>
  );
}

export default App;
