import React, { useState } from "react";
import styles from "./Section.module.css";
import Card from "../Card/Card.jsx";
import { CircularProgress } from "@mui/material";
import Carousel from "../Carousel/Carousel.jsx";
import TabsComponent from "../Tabs/Tabs.jsx";

const Section = ({ albumName, albumData, genres }) => {
  const [isShowAll, setIsShowAll] = useState(true);

  return (
    <div
      className={
        albumName === "Songs"
          ? `${styles.sectionSongs} ${styles.section}`
          : `${styles.section}`
      }
    >
      {albumName === "Songs" ? (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeaderTitle}>{albumName}</h2>
          </div>
          <TabsComponent
            genres={genres}
            albumName={albumName}
            albumData={albumData}
          />
        </>
      ) : (
        <>
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionHeaderTitle}>{albumName}</h2>
            <h2
              className={styles.sectionHeaderBtn}
              onClick={() => setIsShowAll(!isShowAll)}
            >
              {isShowAll ? "Show All" : "Collapse"}
            </h2>
          </div>
          <div className={styles.sectionCards}>
            {!albumData.length ? (
              <CircularProgress />
            ) : (
              <>
                {!isShowAll ? (
                  <div className={styles.cardsFlex}>
                    {albumData.map((song) => (
                      <Card
                        key={song.id}
                        img={song.image}
                        chipData={song.follows}
                        title={song.title}
                        altName={song.slug}
                        totalSongNum={song.songs.length}
                        artist=""
                      />
                    ))}
                  </div>
                ) : (
                  <div className={styles.cardsCollapse}>
                    <Carousel albumData={albumData} />
                  </div>
                )}
              </>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Section;
