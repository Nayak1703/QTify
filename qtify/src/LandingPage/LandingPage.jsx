import React from "react";
import { useState, useEffect } from "react";
import Navbar from "../Navbar/Navbar.jsx";
import Hero from "../Hero/Hero.jsx";
import Section from "../Section/Section.jsx";
import AccordionComponent from "../Accordion/Accordion.jsx";
import MusicPlayer from "../MusicPlayer/MusicPlayer.jsx";
import Footer from "../Footer/Footer.jsx";

const LandingPage = ({ searchData, topAlbums, newAlbums, genres }) => {
  return (
    <>
      <Navbar searchData={searchData} />
      <Hero />
      <div className="songsSection">
        <Section albumName={"Top Albums"} albumData={topAlbums} />
        <Section albumName={"New Albums"} albumData={newAlbums} />
        <Section albumName={"Songs"} genres={genres} />
      </div>
      <AccordionComponent />
      <MusicPlayer />
      <Footer />
    </>
  );
};

export default React.memo(LandingPage);
