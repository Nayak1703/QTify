import React, { useEffect, useState, useRef } from "react";
import { Slider } from "@mui/material";
import { VolumeUp } from "@mui/icons-material";
import PlayCircleFilledRoundedIcon from "@mui/icons-material/PlayCircleFilledRounded";
import PauseCircleFilledRoundedIcon from "@mui/icons-material/PauseCircleFilledRounded";
import VolumeOffRoundedIcon from "@mui/icons-material/VolumeOffRounded";
import StopCircleRoundedIcon from "@mui/icons-material/StopCircleRounded";
import styles from "./MusicPlayer.module.css";
import song from "../assets/song.mp3";
import songImg from "../assets/songImg.jpg";

const MusicPlayer = () => {
  const audioRef = useRef("");
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioTotalTime, setAudioTotalTime] = useState(0);
  const [audioCurrentTime, setAudioCurrentTime] = useState(0);
  const [songCurrentTime, setSongCurrentTime] = useState("");
  const [songRemainingTime, setSongRemainingTime] = useState("");
  const [volume, setVolume] = useState(60);
  const [isMute, setIsMute] = useState(false);

  const formatNum = (num) => {
    if (num < 10) return `0${num}`;
    else if (num > 9) return `${num}`;
  };

  const calculateCurrentTime = () => {
    return `${formatNum(
      Math.floor(audioRef.current.currentTime / 60)
    )}:${formatNum(Math.floor(audioRef.current.currentTime % 60))}`;
  };

  const calculateRemainingTime = () => {
    return `${formatNum(
      Math.floor(
        (audioRef.current.duration - audioRef.current.currentTime) / 60
      )
    )}:${formatNum(
      Math.floor(
        (audioRef.current.duration - audioRef.current.currentTime) % 60
      )
    )}`;
  };

  // VOLUME

  const handleVolumeChange = (event, newValue) => {
    setVolume(newValue);
    setIsMute(false);
  };
  const changeVol = (volumeData) => {
    audioRef.current.volume = volumeData / 100;
  };

  // AUDIO

  const handleFetchingAudioDetails = async () => {
    setAudioTotalTime(Math.floor(audioRef.current.duration));
    setAudioCurrentTime(Math.floor(audioRef.current.currentTime));
  };

  const onLoadSongTimerFetch = async () => {
    const songCurrentTime = calculateCurrentTime();
    setSongCurrentTime(songCurrentTime);

    const songRemainingTime = calculateRemainingTime();
    setSongRemainingTime(songRemainingTime);
  };

  const handleAudioTime = (event) => {
    setAudioCurrentTime(event.target.value);
    audioRef.current.currentTime = event.target.value;
    onLoadSongTimerFetch();
  };

  // HANDLE-BTN

  const handleMute = () => {
    setIsMute(true);
    setVolume(0);
  };

  const handleSound = () => {
    setIsMute(false);
    setVolume(60);
  };

  const handlePlayBtn = () => {
    audioRef.current.play();
    setIsPlaying(true);
  };

  const handlePauseBtn = () => {
    audioRef.current.pause();
    setIsPlaying(false);
  };

  const handleStopBtn = () => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
    setAudioCurrentTime(0);
    setIsPlaying(false);
    onLoadSongTimerFetch();
  };

  useEffect(() => {
    changeVol(volume);
  }, [volume]);

  useEffect(() => {
    const handleFirstLoad = async () => {
      await handleFetchingAudioDetails();
      await onLoadSongTimerFetch();
    };
    audioRef.current.addEventListener("loadedmetadata", handleFirstLoad);

    return () => {
      audioRef.current.removeEventListener("loadedmetadata", handleFirstLoad);
    };
  }, []);

  useEffect(() => {
    if (isPlaying) {
      const interval = setInterval(() => {
        setAudioCurrentTime(audioRef.current.currentTime);
        const songCurrentTime = calculateCurrentTime();
        setSongCurrentTime(songCurrentTime);

        const songRemainingTime = calculateRemainingTime();
        setSongRemainingTime(songRemainingTime);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isPlaying, audioRef.current.currentTime]);

  useEffect(() => {
    const handleSongEnd = () => {
      setIsPlaying(false);
    };
    audioRef.current.addEventListener("ended", handleSongEnd);

    return () => {
      audioRef.current.removeEventListener("ended", handleSongEnd);
    };
  });

  return (
    <>
      <audio ref={audioRef} src={song} controls className={styles.audioEle} />
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
          <div
            className={`${styles.songController} ${styles.songControllerDesktop}`}
          >
            <div className={styles.songPausePlayStop}>
              {isPlaying ? (
                <PauseCircleFilledRoundedIcon
                  sx={{ height: "30px", width: "30px", cursor: "Pointer" }}
                  onClick={handlePauseBtn}
                />
              ) : (
                <PlayCircleFilledRoundedIcon
                  sx={{ height: "30px", width: "30px", cursor: "Pointer" }}
                  onClick={handlePlayBtn}
                />
              )}
              <StopCircleRoundedIcon
                sx={{ height: "30px", width: "30px", cursor: "Pointer" }}
                onClick={handleStopBtn}
              />
            </div>
            <div className={styles.songDuration_Slider}>
              <div className={styles.songTimer}>
                <p>{songCurrentTime}</p>
              </div>

              <Slider
                sx={{
                  color: "#34c94b",
                  width: "100%",
                  "& .MuiSlider-thumb": {
                    height: 10,
                    width: 10,
                  },
                  "& .MuiSlider-thumb::after, .MuiSlider-thumb::before ": {
                    height: 5,
                    width: 5,
                  },
                }}
                min={0}
                max={audioTotalTime}
                value={audioCurrentTime}
                onChange={handleAudioTime}
              />
              <div className={styles.songTimer}>
                <p>{`-${songRemainingTime}`}</p>
              </div>
            </div>
          </div>
          <div className={styles.songVolumeControl}>
            <p className={styles.songVolumeNum}>{volume}</p>
            <Slider
              sx={{
                color: "#34c94b",
                width: "2px",
                "& .MuiSlider-thumb": {
                  height: 15,
                  width: 15,
                },
                "& .MuiSlider-thumb::after, .MuiSlider-thumb::before ": {
                  height: 5,
                  width: 5,
                },
              }}
              min={0}
              max={100}
              aria-label="Volume"
              value={volume}
              orientation="vertical"
              onChange={handleVolumeChange}
              className={styles.volSilder}
            />
            {isMute ? (
              <VolumeOffRoundedIcon
                onClick={handleSound}
                sx={{ cursor: "pointer" }}
              />
            ) : (
              <VolumeUp onClick={handleMute} sx={{ cursor: "pointer" }} />
            )}
          </div>
        </div>
        <div
          className={`${styles.songController} ${styles.songControllerMobile}`}
        >
          <div className={styles.songPausePlayStop}>
            {isPlaying ? (
              <PauseCircleFilledRoundedIcon
                sx={{ height: "30px", width: "30px", cursor: "Pointer" }}
                onClick={handlePauseBtn}
              />
            ) : (
              <PlayCircleFilledRoundedIcon
                sx={{ height: "30px", width: "30px", cursor: "Pointer" }}
                onClick={handlePlayBtn}
              />
            )}
            <StopCircleRoundedIcon
              sx={{ height: "30px", width: "30px", cursor: "Pointer" }}
              onClick={handleStopBtn}
            />
          </div>
          <div className={styles.songDuration_Slider}>
            <div className={styles.songTimer}>
              <p>{songCurrentTime}</p>
            </div>

            <Slider
              sx={{
                color: "#34c94b",
                width: "100%",
                "& .MuiSlider-thumb": {
                  height: 10,
                  width: 10,
                },
                "& .MuiSlider-thumb::after, .MuiSlider-thumb::before ": {
                  height: 5,
                  width: 5,
                },
              }}
              min={0}
              max={audioTotalTime}
              value={audioCurrentTime}
              onChange={handleAudioTime}
            />
            <div className={styles.songTimer}>
              <p className={styles.songTimer}>{`-${songRemainingTime}`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MusicPlayer;
