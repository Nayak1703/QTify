import React, { useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import axios from "axios";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Button from "@mui/material/Button";
import Navbar from "../Navbar/Navbar";
import styles from "./SelectedAlbum.module.css";
import Pagination from "@mui/material/Pagination";
import { ReactComponent as ShuffleIcon } from "../assets/shuffleBtn.svg";
import { ReactComponent as AddToLibIcon } from "../assets/addToLibBtn.svg";
import MusicPlayer from "../MusicPlayer/MusicPlayer";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import Footer from "../Footer/Footer";

const SelectedAlbum = ({ searchData }) => {
  let navigate = useNavigate();
  const { albumName } = useParams();
  const [albumData, setAlbumData] = useState({});
  const [albumDetails, setAlbumDetails] = useState({
    songNum: "",
    totalTime: "",
    follows: "",
  });
  const [songListByPage, setSongListByPage] = useState([]);

  const [selectedPage, setSelectedPage] = React.useState(1);
  const handlePageChange = (event, value) => {
    setSelectedPage(value);
    getSongListByPage(value, albumData);
  };

  const theme = useTheme();
  const isXs = useMediaQuery(theme.breakpoints.down("sm"));

  const fetchingSongs = async (albumName) => {
    const response = await axios.get(
      `https://qtify-backend-labs.crio.do/album/${albumName}`
    );
    setAlbumData(response.data);

    return response.data;
  };

  const calculateTime = (ms) => {
    const timeInMin = Math.floor(ms / 6000);
    const timeInSec = Math.floor((ms / 1000) % 60);

    return `${timeInMin}:${timeInSec} min`;
  };

  const getAlbumInfo = (songData) => {
    const songNum = songData.songs.length;

    const totalTimeInMs = songData.songs.reduce(
      (total, song) => total + song.durationInMs,
      0
    );
    const totalTimeInHr = Math.floor(totalTimeInMs / 60000 / 60);
    const totalTimeInMin = Math.floor((totalTimeInMs / 60000) % 60);
    const follows = songData.follows;

    setAlbumDetails({
      songNum,
      totalTime: totalTimeInHr
        ? `${totalTimeInHr} hr ${totalTimeInMin} min`
        : `${totalTimeInMin} min`,
      follows,
    });
  };

  const getSongListByPage = (pageNo, albumData) => {
    const getAllSong = albumData.songs;
    const songsByPage = getAllSong.slice((pageNo - 1) * 7, 7 * pageNo);
    setSongListByPage(songsByPage);
  };

  useEffect(() => {
    const handleOnLoad = async () => {
      try {
        const songData = await fetchingSongs(albumName);
        await getAlbumInfo(songData);
        await getSongListByPage(selectedPage, songData);
      } catch (error) {
        navigate("/not-found", { replace: true });
      }
    };
    handleOnLoad();
  }, [albumName]);

  return (
    <>
      <Navbar searchData={searchData} />
      <div className={styles.albumPage}>
        <div className={styles.albumBanner}>
          <div className={styles.backBtnParent}>
            <Link to="/">
              <ArrowBackRoundedIcon
                sx={{ width: "35px", height: "35px", cursor: "pointer" }}
                className={styles.backBtn}
              />
            </Link>
          </div>
          <div className={styles.albumBannerContent}>
            <div className={styles.albumBannerMedia}>
              <img
                className={styles.albumBannerImg}
                src={albumData.image}
                alt={albumName}
              />
            </div>
            <div className={styles.albumBannerDetails}>
              <div className={styles.albumBannerInfo}>
                <h1 className={styles.albumTitle}>{albumData.title}</h1>
                <p className={styles.albumDescription}>
                  {albumData.description}
                </p>
                <p className={styles.albumYear}>2023</p>
                <p className={styles.albumInfo}>
                  {albumDetails.songNum} Songs{" "}
                  {
                    <FiberManualRecordIcon
                      sx={{ width: "10px", height: "10px" }}
                    />
                  }{" "}
                  {albumDetails.totalTime}
                  {"  "}
                  {
                    <FiberManualRecordIcon
                      sx={{ width: "10px", height: "10px" }}
                    />
                  }{" "}
                  {albumDetails.follows} Follows
                </p>
              </div>
              <div className={styles.albumBannerBtn}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    color: "#ffffff",
                    backgroundColor: "#34c94b",
                    fontWeight: 600,
                    fontFamily: "Poppins, sans-serif",
                    textTransform: "none",
                    fontSize: "1rem",
                    letterSpacing: "1px",
                    "&:hover": {
                      backgroundColor: "#059c11",
                    },
                  }}
                  className={styles.suffleBtn}
                  startIcon={<ShuffleIcon />}
                >
                  Shuffle
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    color: "#34c94b",
                    fontWeight: 600,
                    fontFamily: "Poppins, sans-serif",
                    borderColor: "#34c94b",
                    textTransform: "none",
                    fontSize: "1rem",
                    letterSpacing: "1px",
                    lineHeight: "1.2",
                  }}
                  startIcon={<AddToLibIcon />}
                >
                  Add to library
                </Button>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.albumPagination}>
          <Pagination
            count={Math.ceil(albumDetails.songNum / 7)}
            page={selectedPage}
            onChange={handlePageChange}
            size={isXs ? "small" : ""}
            sx={{
              "& .MuiButtonBase-root, .MuiPaginationItem-ellipsis": {
                color: "#ffffff",
              },
              "& .Mui-selected": {
                backgroundColor: "#34c94b !important",
                color: "#121212",
              },
            }}
          />
        </div>
        <div className={styles.albumSongsByPage}>
          <table className={styles.albumSongTable}>
            <thead className={styles.albumTableHead}>
              <tr className={styles.albumSongTheadRow}>
                <th className={styles.albumSongHead} style={{ width: "40%" }}>
                  Title
                </th>
                <th className={styles.albumSongHead} style={{ width: "30%" }}>
                  Artist
                </th>
                <th className={styles.albumSongHead} style={{ width: "15%" }}>
                  Duration
                </th>
                <th className={styles.albumSongHead} style={{ width: "15%" }}>
                  Likes
                </th>
              </tr>
            </thead>
            <tbody className={styles.albumTableBody}>
              {songListByPage.map((song, index) => (
                <tr key={index} className={styles.albumSongTBodyRow}>
                  <td
                    className={styles.songImgTitleParent}
                    style={{ width: "40%" }}
                  >
                    <div className={styles.songImgTitle}>
                      <div className={styles.songImgParent}>
                        <img
                          className={styles.songImg}
                          src={song.image}
                          alt={song.title}
                        />
                      </div>
                      <div className={styles.songTitleParent}>
                        <h4 className={styles.songTitle}> {song.title}</h4>
                      </div>
                    </div>
                  </td>
                  <td className={styles.songArtist} style={{ width: "30%" }}>
                    {song.artists.length > 1
                      ? song.artists.join(", ")
                      : song.artists[0]}
                  </td>
                  <td className={styles.songDuration} style={{ width: "15%" }}>
                    {calculateTime(song.durationInMs)}
                  </td>
                  <td className={styles.songLikes} style={{ width: "15%" }}>
                    <ThumbUpIcon sx={{ width: "15px", height: "15px" }} />{" "}
                    {song.likes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <MusicPlayer />
      <Footer />
    </>
  );
};

export default React.memo(SelectedAlbum);
