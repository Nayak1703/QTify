import React, { useEffect } from "react";
import styles from "./MusicPlayer.module.css";
import song from "../assets/song.mp3";
import songImg from "../assets/songImg.jpg";
import { Slider } from "@mui/material";
import { VolumeUp } from "@mui/icons-material";

const MusicPlayer = () => {
  const [volume, setVolume] = React.useState(60);

  const handleChange = (event, newValue) => {
    setVolume(newValue);
  };

  function preventHorizontalKeyboardNavigation(event) {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
    }
  }

  const audioRef = React.useRef(null);

  const changeVol = (volumeData) => {
    audioRef.current.volume = volumeData / 100;
    console.log(audioRef.current.volume);
  };

  useEffect(() => {
    changeVol(volume);
  }, [volume]);

  return (
    <>
      <audio ref={audioRef} src={song} controls />
      <div className={styles.musicPlayer}>
        <div className={styles.songContent}>
          <div className={styles.songDetails}>
            <div className={styles.songMedia}>
              <img className={styles.songImg} src={songImg} />
            </div>
            <div className={styles.songInfo}>
              <h2 className={styles.songTitle}>Pat Panda</h2>
              <p className={styles.songAlbumName}>GawdMode Records</p>
              <p className={styles.songArtistName}>Artist: N.A</p>
            </div>
          </div>
          <h3>yash</h3>
          <div className={styles.songVolumeControl}>
            <p className={styles.songVolumeNum}>{volume}</p>
            <Slider
              sx={{
                '& input[type="range"]': {
                  WebkitAppearance: "slider-vertical",
                },
                color: "#34c94b",
                width: "2px",
              }}
              min={0}
              max={100}
              aria-label="Volume"
              value={volume}
              orientation="vertical"
              onKeyDown={preventHorizontalKeyboardNavigation}
              onChange={handleChange}
              // valueLabelDisplay="auto"
            />

            <VolumeUp />
          </div>
        </div>
        {/* <div className={styles.songController}>
          <div className={styles.songPausePlayStop}></div>
          <div className={styles.songDuration_Slider}></div>
        </div> */}

        <h1>slider</h1>
      </div>
    </>
  );
};

export default MusicPlayer;

{
  /* <div className={styles.songMedia}>
<img className={styles.songImg} src={songImg} />
</div>
<div className={styles.songDetails_control}>
<div className={styles.songContent}>
  <h3 className={styles.songTitle}>Pat Panda</h3>
</div>
<div className={styles.songControl}></div>
</div>
<div className={styles.songVolume}> </div> */
}
